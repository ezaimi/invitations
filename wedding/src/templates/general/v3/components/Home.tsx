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
        y: 18,
    },
    show: (delay: number) => ({
        clipPath: 'inset(-45% -70% -45% -35%)',
        opacity: 1,
        y: 0,
        transition: {
            clipPath: {
                delay,
                duration: 1.55,
                ease: [0.16, 1, 0.3, 1],
            },
            opacity: {
                delay,
                duration: 0.45,
            },
            y: {
                delay,
                duration: 1.35,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    }),
}

function Home() {
    return (
        <section className="h-screen overflow-hidden flex flex-col items-center">
            <div
                className="relative w-full h-168 ml-4 flex flex-col items-center justify-center
                font-sloop text-[12rem] text-[#642c2b]"
            >
                <motion.div
                    className="absolute top-25 -ml-9 z-10 flex"
                    initial="hidden"
                    animate="show"
                >
                    <motion.p
                        custom={1.15}
                        variants={letterVariants}
                        className="will-change-transform"
                    >
                        M
                    </motion.p>
                    <motion.p
                        custom={1.45}
                        variants={letterVariants}
                        className="mt-22 -ml-19 will-change-transform"
                    >
                        D
                    </motion.p>
                </motion.div>

                <div className="absolute top-50 left-1/2 z-0 h-[427px] w-[320px] -translate-x-1/2">
                    <motion.div
                        className="absolute inset-0 will-change-transform"
                        style={{
                            transformOrigin: '50% 50%',
                            backfaceVisibility: 'hidden',
                        }}
                        initial={{ opacity: 0, scale: 0.86, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={harpFadeTransition}
                    >
                        <Image
                            src="/images/templates/v3/harp.svg"
                            alt="harp"
                            width={320}
                            height={427}
                            priority
                            className="h-full w-full object-contain"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 will-change-transform"
                        style={{
                            transformOrigin: '50% 50%',
                            backfaceVisibility: 'hidden',
                        }}
                        initial={{ opacity: 0, scale: 0.86, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={harpFadeTransition}
                    >
                        <Image
                            src="/images/templates/v3/harp.svg"
                            alt="harp"
                            width={320}
                            height={427}
                            priority
                            className="h-full w-full object-contain"
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-80 right-18 z-20 will-change-transform"
                    initial={{ opacity: 0, scale: 0.86, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{
                        ...harpFadeTransition,
                    }}
                >
                    <Image
                        src="/images/templates/v3/harp-part.svg"
                        alt="harp detail"
                        width={120}
                        height={120}
                        priority
                    />
                </motion.div>
            </div>

            <motion.p
                className="font-serenity text-[#4d0c12] text-[2rem] text-center tracking-wider leading-10 will-change-transform"
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
