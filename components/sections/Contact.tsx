"use client";

import { useRef, useState } from "react";
import { contactContent, contactDetails } from "@/data/homepage";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Buying");
  const [message, setMessage] = useState("");
  const [prepared, setPrepared] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const preview = useRef<HTMLTextAreaElement>(null);
  const draft = `Hello Noor Estate & Builders,\n\nI’m interested in: ${interest.toLowerCase()}.\n\n${message.trim()}\n\n${name.trim()}${email.trim() ? `\nReply to: ${email.trim()}` : ""}`;
  const hasContact = !!(contactDetails.email || contactDetails.phone || contactDetails.whatsapp);
  const update = (setValue: (value: string) => void, value: string) => { setValue(value); setPrepared(false); setCopyStatus(""); };

  return <section id="contact" className="contact-section page-section" tabIndex={-1} aria-labelledby="contact-title">
    <p className="eyebrow"><span className="section-dot" />{contactContent.eyebrow}</p>
    <h2 id="contact-title" className="closing-title"><span>{contactContent.title[0]}<br />{contactContent.title[1]}</span><span className="banner-ink" aria-hidden="true" data-banner>{contactContent.title[0]}<br />{contactContent.title[1]}</span></h2>
    <div className="contact-layout"><div className="contact-intro"><p>{contactContent.description}</p><div className="contact-methods">
      {contactDetails.email && <a href={`mailto:${contactDetails.email}`}><span>Email us</span><span>{contactDetails.email} ↗</span></a>}
      {contactDetails.phone && <a href={`tel:${contactDetails.phone.replace(/[^+\d]/g, "")}`}><span>Call us</span><span>{contactDetails.phone} ↗</span></a>}
      {contactDetails.whatsapp && <a href={`https://wa.me/${contactDetails.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><span>Start a conversation ↗</span></a>}
      {!hasContact && <p className="contact-pending">Direct contact details are being confirmed. For now, prepare a message to keep for later.</p>}
    </div><span className="contact-flourish" aria-hidden="true">↗</span></div>
      <form className="enquiry-form" onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        for (const fieldName of ["enquiry-name", "enquiry-message"]) {
          const field = form.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement;
          field.setCustomValidity(field.value.trim() ? "" : "Please enter more than just spaces.");
        }
        if (!form.reportValidity()) return;
        setPrepared(true); setCopyStatus(""); requestAnimationFrame(() => preview.current?.focus());
      }} onInput={(event) => {
        const field = event.target;
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity("");
      }}>
        <div className="enquiry-form-top"><h3>Your next chapter</h3><span className="eyebrow">Enquiry draft</span></div>
        <div className="enquiry-fields"><label>Your name<input name="enquiry-name" autoComplete="name" value={name} required maxLength={120} onChange={(event) => update(setName, event.target.value)} /></label><label>Email <span>(optional)</span><input name="enquiry-email" type="email" autoComplete="email" value={email} maxLength={254} onChange={(event) => update(setEmail, event.target.value)} /></label></div>
        <label>I’m thinking about<select name="enquiry-interest" value={interest} onChange={(event) => update(setInterest, event.target.value)}><option>Buying</option><option>Renting</option><option>Selling</option><option>Something else</option></select></label>
        <label>What do you have in mind?<textarea name="enquiry-message" rows={3} value={message} required maxLength={3000} placeholder="An area you love, a little more space, a fresh start…" onChange={(event) => update(setMessage, event.target.value)} /></label>
        <p className="enquiry-note">Prepare a draft to copy{contactDetails.email || contactDetails.whatsapp ? " or send from your own app" : " and keep"}. Nothing is submitted or sent by this website.</p>
        <button type="submit" className="enquiry-submit">Prepare my enquiry<span aria-hidden="true">↗</span></button>
        {prepared && <div className="enquiry-preview"><label>Your draft<textarea ref={preview} readOnly rows={8} value={draft} aria-describedby="draft-instructions" /></label><p id="draft-instructions">Review your message, then copy it{contactDetails.email || contactDetails.whatsapp ? " or open your preferred app to send it yourself" : " for later"}.</p><div className="draft-actions"><button type="button" onClick={async () => {
          try { await navigator.clipboard.writeText(draft); setCopyStatus("Draft copied to your clipboard. Nothing has been sent."); }
          catch { preview.current?.focus(); preview.current?.select(); setCopyStatus("Select the draft and copy it manually. Nothing has been sent."); }
        }}>Copy draft <span aria-hidden="true">↗</span></button>
          {contactDetails.email && <a href={`mailto:${contactDetails.email}?subject=${encodeURIComponent(`A new enquiry: ${interest}`)}&body=${encodeURIComponent(draft)}`}>Open email app ↗</a>}
          {contactDetails.whatsapp && <a href={`https://wa.me/${contactDetails.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(draft)}`} target="_blank" rel="noopener noreferrer">Open WhatsApp ↗</a>}
        </div><p className="copy-status" role="status" aria-live="polite">{copyStatus}</p></div>}
      </form>
    </div>
  </section>;
}
