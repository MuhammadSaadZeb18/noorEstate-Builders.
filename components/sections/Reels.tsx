"use client";

import Image from "next/image";
import { useState } from "react";
import { reels, reelsContent } from "@/data/reels";
import "./Reels.css";

export function Reels() {
  const [active, setActive] = useState<string | null>(null);
  return <section id="reels" className="reels-section page-section" style={{ background: "#20271f", color: "#e3e8de" }} tabIndex={-1} aria-labelledby="reels-title">
    <h2 id="reels-title" className="reels-heading">{reelsContent.title}</h2>
    <ul className="reels-grid" aria-label="YouTube Shorts from Noor Estate & Builders">{reels.map((reel) => <li className="reel" key={reel.id}>
      <div className="reel-screen">
        {active === reel.id
          ? <iframe className="reel-player" src={`https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&playsinline=1&controls=0&iv_load_policy=3&rel=0`} title={reel.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          : <button className="reel-preview" type="button" onClick={() => setActive(reel.id)} aria-label={`Play: ${reel.title}`}>
            <Image src={`/images/reels/${reel.id}-hd.jpg`} alt="" fill unoptimized />
            <span className="reel-play" aria-hidden="true"><svg viewBox="0 0 32 32" fill="currentColor"><path d="M11 7v18l15-9z" /></svg></span>
          </button>}
      </div>
    </li>)}</ul>
  </section>;
}
