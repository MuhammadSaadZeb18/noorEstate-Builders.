"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects, projectsContent, type Project } from "@/data/projects";
import { contactDetails } from "@/data/homepage";
import { SectionLabel } from "./SectionLabel";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { useAnimatedDialog } from "@/components/properties/useAnimatedDialog";
import "@/components/properties/PropertyDetailDialog.css";
import "./Projects.css";

function TourLink({ project }: { project: Project }) {
  const href = contactDetails.email
    ? `mailto:${contactDetails.email}?subject=${encodeURIComponent(`Tour enquiry: ${project.name}`)}&body=${encodeURIComponent(`Hello Noor Estate & Builders,\n\nI would like to enquire about a tour of ${project.name}. Please share availability and further details.\n\nThank you.`)}`
    : "#contact";
  return <a href={href}><span aria-hidden="true">&#9638;</span> Schedule a Tour</a>;
}

function ProjectDetails({ project, trigger, onClose }: { project: Project; trigger: HTMLButtonElement; onClose: () => void }) {
  const { dialog, close } = useAnimatedDialog(trigger);
  return <dialog ref={dialog} id="project-details" className="property-dialog project-detail-panel" aria-labelledby="project-detail-title" aria-describedby="project-image-note" data-lenis-prevent onClose={(event) => { if (!event.currentTarget.open) onClose(); }} onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <div className="property-dialog-content">
      <div className="property-dialog-top"><span className="eyebrow">Project details</span><button autoFocus type="button" className="property-close" aria-label="Close project details" onClick={close}>Close &#215;</button></div>
      <div className="property-detail-heading"><p className="eyebrow">{project.status} &middot; Delivery: {project.delivery}</p><h2 id="project-detail-title">{project.name}</h2><p className="property-detail-price">{project.price.toLocaleString("en-US")} <span>{project.currency}</span></p><p>{project.location}</p></div>
      <PropertyGallery images={project.images} title={project.name} />
      <dl className="property-detail-facts"><div><dt>Bedrooms</dt><dd>{project.bedrooms}</dd></div><div><dt>Bathrooms</dt><dd>{project.bathrooms}</dd></div><div><dt>Interior</dt><dd>{project.area} sq ft</dd></div><div><dt>Delivery</dt><dd>{project.delivery}</dd></div></dl>
      <p>Enquire for the latest project information, availability, and tour options.</p>
      <div className="project-actions"><TourLink project={project} /></div>
      <p id="project-image-note" className="property-demo-note">Photography is illustrative. The tour link opens an email draft; no booking is submitted by this website.</p>
    </div>
  </dialog>;
}

export function Locations() {
  const [selected, setSelected] = useState<{ project: Project; trigger: HTMLButtonElement } | null>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const projectTrack = useRef<HTMLDivElement>(null);
  const syncProjectDot = () => {
    const track = projectTrack.current;
    const cards = track?.querySelectorAll<HTMLElement>(".project-card");
    if (!track || !cards?.length) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    let nearest = 0;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const position = Math.min(card.offsetLeft - cards[0].offsetLeft, maxScroll);
      const difference = Math.abs(track.scrollLeft - position);
      if (difference < distance) { nearest = index; distance = difference; }
    });
    setCurrentProject(nearest);
  };
  const showProject = (index: number) => {
    const track = projectTrack.current;
    const cards = track?.querySelectorAll<HTMLElement>(".project-card");
    if (!track || !cards?.length) return;
    track.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section id="projects" className="projects-section page-section" tabIndex={-1} aria-labelledby="projects-title">
    <SectionLabel label={projectsContent.eyebrow} number="07" />
    <div className="editorial-heading"><h2 id="projects-title">{projectsContent.title}</h2><p>{projectsContent.description}</p></div>
    <div ref={projectTrack} className="projects-grid projects-scroll" style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", gap: "clamp(12px, 1.2vw, 20px)" }} role="region" aria-label="Project cards" tabIndex={0} onScroll={syncProjectDot}>{projects.map((project) => <article className="project-card" key={project.id}>
      <Image src={project.image} alt={`Illustrative architecture for ${project.name}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      <div className="project-badges"><span>{project.status}</span><span>Delivery Date: {project.delivery}</span></div>
      <div className="project-card-copy"><h3>{project.name}</h3>
        <div className="project-actions"><TourLink project={project} /><button className="project-details-trigger" type="button" aria-haspopup="dialog" aria-controls="project-details" onClick={(event) => setSelected({ project, trigger: event.currentTarget })}>View Details</button></div>
      </div>
    </article>)}</div>
    <div className="project-dots" role="group" aria-label="Choose a project">{projects.map((project, index) => <button key={project.id} type="button" aria-label={`Show project ${index + 1}: ${project.name}`} aria-current={currentProject === index ? "true" : undefined} onClick={() => showProject(index)}><span /></button>)}</div>
    {selected && <ProjectDetails project={selected.project} trigger={selected.trigger} onClose={() => setSelected(null)} />}
  </section>;
}
