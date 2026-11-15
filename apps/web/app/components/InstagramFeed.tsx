'use client'

import Script from 'next/script'
import { useState } from 'react'

export default function InstagramFeed() {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  return (
    <div className="instagram-embed-wrap">
      <div className="sk-instagram-feed" data-embed-id="25729880" />
      <p className="instagram-status muted" aria-live="polite">
        {scriptLoaded
          ? 'If the feed is not visible, open the official Instagram profile above.'
          : 'Loading the Instagram feed… If it does not appear, open the official profile above.'}
      </p>
      <noscript><p className="muted">Enable JavaScript to view the embedded feed, or open the official Instagram profile above.</p></noscript>
      <Script
        src="https://widgets.sociablekit.com/instagram-feed/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptLoaded(true)}
      />
    </div>
  )
}
