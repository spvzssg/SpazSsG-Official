'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HeroMedia() {
  const [videoFailed, setVideoFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(motionPreference.matches)
    updatePreference()
    motionPreference.addEventListener('change', updatePreference)
    return () => motionPreference.removeEventListener('change', updatePreference)
  }, [])

  return (
    <div className="hero-media" aria-hidden="true">
      {!videoFailed && !reducedMotion && (
        <video
          className="hero-media__video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/spaz-ssg-logo.png"
          onError={() => setVideoFailed(true)}
        >
          <source src="/animated-header.mp4" type="video/mp4" />
        </video>
      )}
      <Image
        className={`hero-media__logo${videoFailed ? ' hero-media__logo--fallback' : ''}`}
        src="/spaz-ssg-logo.png"
        alt=""
        width={1842}
        height={854}
        priority
        sizes="(max-width: 640px) 88vw, 620px"
      />
    </div>
  )
}
