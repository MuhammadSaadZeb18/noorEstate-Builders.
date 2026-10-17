"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, projectsContent, type Project } from "@/data/projects";
import { contactDetails } from "@/data/homepage";
import { SectionLabel } from "./SectionLabel";
import "./Projects.css";

function TourLink({ project }: { project: Project }) {
  const href = contactDetails.email
    ? `mailto:${contactDetails.email}?subject=${encodeURIComponent(`Tour enquiry: ${project.name}`)}&body=${encodeURIComponent(`Hello Noor Estate & Builders,\n\nI would like to enquire about a tour of ${project.name}. Please share availability and further details.\n\nThank you.`)}`
    : "#contact";
  return <a href={href}><span aria-hidden="true">&#9638;</span> Schedule a Tour</a>;
}

function ProjectDetails({ project, trigger, onClose }: { project: Project; trigger: HTMLButtonElement; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); if (trigger.isConnected) trigger.focus({ preventScroll: true }); };
  }, [trigger]);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-detail-title" data-lenis-prevent onClose={(event) => { if (!event.currentTarget.open) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
    <div className="project-dialog-top"><span>Project details</span><button autoFocus type="button" onClick={() => dialog.current?.close()}>Close &#215;</button></div>
    <div className="project-dialog-image"><Image src={project.image} alt={`Illustrative architecture for ${project.name}`} fill sizes="(max-width: 800px) 100vw, 800px" /></div>
    <div className="project-dialog-copy"><p>{project.status} &middot; Delivery: {project.delivery}</p><h2 id="project-detail-title">{project.name}</h2><p className="project-dialog-price">{project.price.toLocaleString("en-US")} {project.currency}</p><p>{project.location}</p>
      <dl><div><dt>Bedrooms</dt><dd>{project.bedrooms}</dd></div><div><dt>Bathrooms</dt><dd>{project.bathrooms}</dd></div><div><dt>Area</dt><dd>{project.area} sq ft</dd></div></dl>
      <p>Enquire for the latest project information, availability, and tour options.</p><div className="project-actions"><TourLink project={project} /></div><p className="project-image-note">Photography is illustrative. The tour link opens an email draft; no booking is submitted by this website.</p>
    </div>
  </dialog>;
}

export function Locations() {
  const [selected, setSelected] = useState<{ project: Project; trigger: HTMLButtonElement } | null>(null);
  return <section id="projects" className="projects-section page-section" tabIndex={-1} aria-labelledby="projects-title">
    <SectionLabel label={projectsContent.eyebrow} number="07" />
    <div className="editorial-heading"><h2 id="projects-title">{projectsContent.title}</h2><p>{projectsContent.description}</p></div>
    <div className="projects-grid">{projects.map((project) => <article className="project-card" key={project.id}>
      <Image src={project.image} alt={`Illustrative architecture for ${project.name}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      <div className="project-badges"><span>{project.status}</span><span>Delivery Date: {project.delivery}</span></div>
      <div className="project-card-copy"><h3>{project.name}</h3><p className="project-price-label">Launch Price:</p><p className="project-price">{project.price.toLocaleString("en-US")} {project.currency}</p><p className="project-location"><span aria-hidden="true">&#9906;</span>{project.location}</p>
        <ul className="project-facts"><li>{project.bedrooms} Bed</li><li>{project.bathrooms} Bath</li><li>{project.area} sq ft</li></ul>
        <div className="project-actions"><TourLink project={project} /><button type="button" onClick={(event) => setSelected({ project, trigger: event.currentTarget })}>View Details</button></div>
      </div>
    </article>)}</div>
    {selected && <ProjectDetails project={selected.project} trigger={selected.trigger} onClose={() => setSelected(null)} />}
  </section>;
}
