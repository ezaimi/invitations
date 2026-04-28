// app/api/spotify/route.ts

type Track = {
    id: string
    name: string
    artist: string
    image: string | null
    preview: string | null
    source: 'itunes' | 'spotify'
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')

    if (!query) {
        return Response.json({ error: 'Missing query' }, { status: 400 })
    }

    // Fetch iTunes + Spotify token in parallel
    const [itunesRes, tokenRes] = await Promise.all([
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=10`),
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization':
                    'Basic ' +
                    Buffer.from(
                        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
                    ).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        })
    ])

    const [itunesData, tokenData] = await Promise.all([
        itunesRes.json(),
        tokenRes.json()
    ])

    const spotifyRes = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
        { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    )
    const spotifyData = await spotifyRes.json()

    const itunesTracks: Track[] = (itunesData.results ?? []).map((t: any) => ({
        id: String(t.trackId),
        name: t.trackName,
        artist: t.artistName,
        image: t.artworkUrl100?.replace('100x100', '300x300') ?? null,
        preview: t.previewUrl ?? null,
        source: 'itunes'
    }))

    const spotifyTracks: Track[] = (spotifyData.tracks?.items ?? []).map((t: any) => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0]?.name ?? '',
        image: t.album.images[0]?.url ?? null,
        preview: t.preview_url ?? null,
        source: 'spotify'
    }))

    // Priority: iTunes tracks that have a preview come first.
    // Fill remaining slots (up to 5) with Spotify results.
    const itunesWithPreview = itunesTracks.filter(t => t.preview)
    const combined: Track[] = [...itunesWithPreview]

    for (const track of spotifyTracks) {
        if (combined.length >= 10) break
        combined.push(track)
    }

    return Response.json(combined)
}
