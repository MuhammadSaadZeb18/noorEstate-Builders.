import Image from "next/image";
import { agents, teamContent } from "@/data/homepage";
import { SectionLabel } from "./SectionLabel";

export function Team() {
  return <section id="team" className="team-section page-section" tabIndex={-1} aria-labelledby="team-title">
    <SectionLabel label={teamContent.eyebrow} number="08" />
    <div className="editorial-heading"><h2 id="team-title">{teamContent.title[0]}<br /><span>{teamContent.title[1]}</span></h2><p>{teamContent.description}</p></div>
    <div className="team-grid">{agents.map((agent) => <article className="agent" key={agent.id}><div className="agent-portrait"><Image src={agent.image} alt={`Illustrative portrait for the ${agent.name} demonstration profile`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><p className="eyebrow">Example profile · {agent.role}</p><h3>{agent.name}</h3><p className="agent-bio">{agent.bio}</p><a href="#contact" className="editorial-link">Prepare an enquiry<span aria-hidden="true">↗</span></a></article>)}</div>
    <p className="content-disclosure">{teamContent.disclosure}</p>
  </section>;
}
