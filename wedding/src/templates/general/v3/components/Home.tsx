'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const harpFadeTransition = {
    duration: 1.85,
    ease: [0.16, 1, 0.3, 1],
} as const

const letterVariants: Variants = {
    hidden: {
        clipPath: 'inset(-45% 100% -45% 0)',
        opacity: 0,
        y: 24,
        filter: 'blur(3px)',
    },
    show: (delay: number) => ({
        clipPath: 'inset(-45% -70% -45% -35%)',
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            clipPath: {
                delay,
                duration: 2.35,
                ease: [0.12, 0.88, 0.2, 1],
            },
            opacity: {
                delay,
                duration: 1.05,
                ease: 'easeOut',
            },
            y: {
                delay,
                duration: 1.9,
                ease: [0.12, 0.88, 0.2, 1],
            },
            filter: {
                delay,
                duration: 1.35,
                ease: 'easeOut',
            },
        },
    }),
}

function Home() {
    return (
        <section className="min-h-[100svh] overflow-hidden flex flex-col items-center justify-center gap-[clamp(2rem,6vh,4rem)] px-4 py-8">
            <div className="relative w-[min(82vw,22rem)] aspect-[450/600] font-sloop text-[clamp(11.7rem,33vw,13rem)] text-[#642c2b]">
                <motion.div
                    className="absolute left-1/2 -ml-5 top-[4%] z-10 flex -translate-x-1/2"
                    initial="hidden"
                    animate="show"
                >
                    <motion.p
                        custom={1.25}
                        variants={letterVariants}
                        className="will-change-transform"
                    >
                        M
                    </motion.p>
                    <motion.p
                        custom={1.75}
                        variants={letterVariants}
                        className="mt-[0.45em] -ml-[0.40em] will-change-transform"
                    >
                        D
                    </motion.p>
                </motion.div>

                <motion.div
                    className="absolute inset-x-0 top-[26%] z-0 mx-auto aspect-[450/600] w-[78%] will-change-transform"
                    style={{
                        transformOrigin: '50% 50%',
                        backfaceVisibility: 'hidden',
                    }}
                    initial={{ opacity: 0, scale: 0.86, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={harpFadeTransition}
                >
                    <motion.div
                        className="absolute inset-0"
                        initial={false}
                    >
                        <Image
                            src="/images/templates/v3/harp.svg"
                            alt="harp"
                            fill
                            sizes="(max-width: 568px) 64vw, 275px"
                            priority
                            className="object-contain"
                        />
                    </motion.div>

                    <div className="absolute inset-0">
                        <Image
                            src="/images/templates/v3/harp.svg"
                            alt="harp"
                            fill
                            sizes="(max-width: 568px) 64vw, 275px"
                            priority
                            className="object-contain"
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="absolute right-[15%] top-[49%] z-30 aspect-square w-[27%] will-change-transform"
                    style={{
                        transformOrigin: '50% 50%',
                        backfaceVisibility: 'hidden',
                    }}
                    initial={{ opacity: 0, scale: 0.86, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={harpFadeTransition}
                >
                    <Image
                        src="/images/templates/v3/harp-part.svg"
                        alt="harp detail"
                        fill
                        sizes="(max-width: 568px) 23vw, 106px"
                        priority
                        className="object-contain"
                    />
                </motion.div>
            </div>

            <motion.p
                className="font-serenity text-[#4d0c12] text-[clamp(1.6rem,7vw,2rem)] text-center tracking-wider leading-tight will-change-transform"
                initial={{ y: 46, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    delay: 1.55,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                Play a note to <br /> reveal our story
            </motion.p>
        </section>
    )
}

export default Home
