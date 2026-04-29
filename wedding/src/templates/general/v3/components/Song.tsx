"use client"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Riple } from 'react-loading-indicators'
import { AnimatePresence, motion } from 'framer-motion'

type Track = {
    id: string
    name: string
    artist: string
    image: string | null
    preview: string | null
    source: 'itunes' | 'spotify'
}

function Song() {
    const [value, setValue] = useState('')
    const [tracks, setTracks] = useState<Track[]>([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<Track | null>(null)
    const [playingId, setPlayingId] = useState<string | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const trackKey = (t: Track) => `${t.source}-${t.id}`
    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

    const play = (track: Track) => {
        if (!track.preview) return
        audioRef.current?.pause()
        const audio = new Audio(track.preview)
        audioRef.current = audio
        setCurrentTime(0)
        setDuration(0)
        audio.onloadedmetadata = () => setDuration(audio.duration)
        audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
        audio.onended = () => { setPlayingId(null); setCurrentTime(0) }
        audio.play().catch(() => {})
        setPlayingId(trackKey(track))
    }

    const togglePlay = () => {
        if (!selected) return
        if (playingId === trackKey(selected)) {
            audioRef.current?.pause()
            setPlayingId(null)
        } else {
            play(selected)
        }
    }

    const handleSelect = (track: Track) => {
        setSelected(track)
        play(track)
    }

    const handleDeselect = () => {
        audioRef.current?.pause()
        setPlayingId(null)
        setSelected(null)
        setCurrentTime(0)
    }

    const doSearch = async (q: string) => {
        setLoading(true)
        handleDeselect()
        setTracks([])
        const res = await fetch(`/api/spotify?q=${encodeURIComponent(q)}`)
        const data: Track[] = await res.json()
        setTracks(data)
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        setValue(v)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (!v.trim()) { setTracks([]); setLoading(false); return }
        debounceRef.current = setTimeout(() => doSearch(v), 600)
    }

    useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

    const isPlaying = selected ? playingId === trackKey(selected) : false
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
        <div className='flex flex-col items-center text-center gap-6'>
            <div className='space-y-2'>
                <header className='font-serenity text-[#4d0c12] text-[2rem]'>Choose a song</header>
                <p className='font-belleza text-[#642c2b] text-[0.85rem] px-8'>
                    Help us create the perfect soundtrack for our
                    special day. Search a song below and add it to our wedding playlist.
                </p>
            </div>

            {/* Vinyl */}
            <div
                className='relative inline-block animate-spin'
                style={{
                    animationDuration: '20s',
                    animationTimingFunction: 'linear',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                    filter: 'drop-shadow(0px 12px 28px rgba(0,0,0,0.5)) drop-shadow(0px 4px 10px rgba(0,0,0,0.35))',
                }}
            >
                <Image src="/images/templates/v3/musik.png" alt="song" width={400} height={400} className='py-2' />

                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-40 w-40 overflow-hidden transition-opacity duration-300 ${selected?.image ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    {selected?.image && <img src={selected.image} alt={selected.name} className='w-full h-full object-cover' />}
                </div>

                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-6 w-6 transition-opacity duration-300 ${selected?.image ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: '#f5f0e4',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.45), inset 0 -1px 2px rgba(0,0,0,0.25), 0 0 0 1.5px rgba(0,0,0,0.15)',
                    }}
                />
            </div>

            {/* Playback bar */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="playback"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className='w-full max-w-100 flex flex-col gap-3 px-1'
                    >
                        <div
                            className='relative w-full cursor-pointer py-2'
                            onClick={(e) => {
                                if (!audioRef.current || !duration) return
                                const rect = e.currentTarget.getBoundingClientRect()
                                audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration
                            }}
                        >
                            <div className='w-full bg-[#c4a08f]/50 rounded-full h-1.5'>
                                <div className='bg-[#4d0c12] h-1.5 rounded-full' style={{ width: `${progress}%` }} />
                            </div>
                            <div
                                className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#4d0c12] rounded-full shadow-md border-2 border-[#f5f0e4] pointer-events-none'
                                style={{ left: `${progress}%` }}
                            />
                        </div>
                        <div className='flex items-center justify-between px-1'>
                            <span className='font-belleza text-[#642c2b] text-xs w-8 text-left'>{fmt(currentTime)}</span>
                            <button
                                onClick={togglePlay}
                                disabled={!selected.preview}
                                className='w-11 h-11 rounded-full bg-[#4d0c12] flex items-center justify-center hover:bg-[#642c2b] transition-colors disabled:opacity-40'
                            >
                                {isPlaying ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                )}
                            </button>
                            <span className='font-belleza text-[#642c2b] text-xs w-8 text-right'>
                                {duration > 0 ? fmt(duration) : '0:30'}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search bar */}
            <div className='bg-[#c4a08f] py-2 rounded-full w-full max-w-100 flex justify-between'>
                <div className='flex items-center gap-4 flex-1'>
                    <Image src="/icons/templetes/v3/spotify.svg" alt="spotify icon" width={50} height={50} className='inline-block ml-2 flex-shrink-0' />
                    <input
                        type="text"
                        placeholder="Search for a song or artist"
                        className='font-belleza text-[#4a4a4a] bg-transparent outline-none w-full'
                        value={value}
                        onChange={handleChange}
                    />
                </div>
                {loading ? (
                    <div className='flex items-center mr-2'>
                        <Riple color="#4d0c12" size="small" text="" textColor="" style={{ fontSize: '9px' }} />
                    </div>
                ) : (
                    <Image src="/icons/templetes/v3/search.svg" alt="search icon" width={30} height={30} className='inline-block mr-4' />
                )}
            </div>

            {/* Track list */}
            <AnimatePresence mode="wait">
                {tracks.length > 0 && (
                    <motion.div
                        key={selected ? 'selected' : 'list'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className='w-full max-w-100 flex flex-col gap-2'
                    >
                        {selected ? (
                            <div className='flex items-center gap-3 p-3 rounded-xl bg-[#4d0c12]'>
                                {selected.image && (
                                    <img src={selected.image} alt={selected.name} className='w-12 h-12 rounded-lg object-cover flex-shrink-0' />
                                )}
                                <div className='flex-1 min-w-0 text-left'>
                                    <p className='font-belleza text-sm font-semibold truncate text-white'>{selected.name}</p>
                                    <p className='font-belleza text-xs truncate text-[#c4a08f]'>{selected.artist}</p>
                                </div>
                                <span className='text-[10px] font-belleza px-2 py-0.5 rounded-full bg-white/20 text-white flex-shrink-0'>
                                    {selected.source === 'itunes' ? 'iTunes' : 'Spotify'}
                                </span>
                                <button onClick={handleDeselect} className='text-white/50 hover:text-white text-sm flex-shrink-0 leading-none'>
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                className='max-h-[232px] overflow-y-auto flex flex-col gap-2 pr-1'
                                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                                initial="hidden"
                                animate="show"
                            >
                                {tracks.map((track) => (
                                    <motion.button
                                        key={trackKey(track)}
                                        variants={{
                                            hidden: { opacity: 0, y: 8 },
                                            show:   { opacity: 1, y: 0 },
                                        }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                        onClick={() => handleSelect(track)}
                                        className='flex items-center gap-3 p-3 rounded-xl text-left bg-[#c4a08f]/40 hover:bg-[#c4a08f]/70 transition-colors flex-shrink-0'
                                    >
                                        {track.image && (
                                            <img src={track.image} alt={track.name} className='w-12 h-12 rounded-lg object-cover flex-shrink-0' />
                                        )}
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-belleza text-sm font-semibold truncate text-[#4d0c12]'>{track.name}</p>
                                            <p className='font-belleza text-xs truncate text-[#642c2b]'>{track.artist}</p>
                                            {!track.preview && <p className='font-belleza text-[10px] italic text-[#642c2b]/50'>No preview</p>}
                                        </div>
                                        <span className={`text-[10px] font-belleza px-2 py-0.5 rounded-full flex-shrink-0 ${
                                            track.source === 'itunes' ? 'bg-[#4d0c12]/20 text-[#4d0c12]' : 'bg-green-700/20 text-green-800'
                                        }`}>
                                            {track.source === 'itunes' ? 'iTunes' : 'Spotify'}
                                        </span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                disabled={!selected}
                className='bg-[#4d0c12] mt-2 text-white py-2 font-belleza px-12 rounded-full hover:bg-[#642c2b] disabled:opacity-40 disabled:cursor-not-allowed'
            >
                Add to Our <br /> Wedding Playlist
            </button>
        </div>
    )
}

export default Song
