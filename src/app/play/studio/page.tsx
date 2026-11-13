"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, Download, FileText, Layers, Lightbulb, RotateCcw, Save, Sparkles } from "lucide-react";
import { ageBands, getAgeExperience, type AgeBand, type StudioFormat } from "@/lib/age-experience";
type Draft = { title:string; format:StudioFormat; content:string; updatedAt:string };
const storageKey="autween-studio-draft-v1";
export default function CreativeStudioPage(){
 const [ageBand,setAgeBand]=useState<AgeBand>("13-15");
 const [format,setFormat]=useState<StudioFormat>("visual-journal");
 const [title,setTitle]=useState("Untitled project");
 const [content,setContent]=useState("");
 const [saved,setSaved]=useState(false);
 const experience=useMemo(()=>getAgeExperience(ageBand),[ageBand]);
 const selectedFormat=experience.formats.find(item=>item.id===format)??experience.formats[0];
 useEffect(()=>{const requested=new URLSearchParams(window.location.search).get("age");if(requested==="6-9"||requested==="10-12"||requested==="13-15"||requested==="16-17")setAgeBand(requested);try{const raw=window.localStorage.getItem(storageKey);if(!raw)return;const draft=JSON.parse(raw) as Draft;if(typeof draft.title==="string")setTitle(draft.title);if(typeof draft.content==="string")setContent(draft.content);if(typeof draft.format==="string")setFormat(draft.format);}catch{/* Ignore unavailable local drafts. */}},[]);
 function saveDraft(){const draft:Draft={title,format,content,updatedAt:new Date().toISOString()};try{window.localStorage.setItem(storageKey,JSON.stringify(draft));setSaved(true);}catch{setSaved(false);}}
 function exportDraft(){const text="# "+title+"\n\nFormat: "+selectedFormat.title+"\nAge experience selected: "+ageBand+"\n\n"+content+"\n";const blob=new Blob([text],{type:"text/markdown;charset=utf-8"});const url=URL.createObjectURL(blob);const anchor=document.createElement("a");anchor.href=url;anchor.download="autween-creative-project.md";anchor.click();URL.revokeObjectURL(url);}
 function resetDraft(){setTitle("Untitled project");setContent("");setSaved(false);try{window.localStorage.removeItem(storageKey);}catch{/* Storage may be disabled. */}}
 return <main className={ageBand==="16-17"||ageBand==="13-15"?"studio-page studio-teen":"studio-page"}>
 <header className="studio-nav"><Link href="/play"><ArrowLeft size={17}/> Back to activities</Link><span className="studio-wordmark">autween <i>studio</i></span><span className="studio-local-label"><span/> Private on this device</span></header>
 <section className="studio-shell"><div className="studio-intro"><span className="studio-kicker"><Sparkles size={14}/> A SPACE TO MAKE THINGS</span><h1>{ageBand==="16-17"?"Your ideas, your workspace.":ageBand==="13-15"?"Make room for an idea.":"What would you like to create?"}</h1><p>{experience.introduction}</p></div>
 <section className="studio-age-panel" aria-labelledby="age-heading"><div><span className="studio-section-label" id="age-heading">EXPERIENCE PREVIEW</span><p>This changes project prompts and presentation. It is a demo setting, not age verification or an assessment.</p></div><div className="studio-age-options">{ageBands.map(band=><button type="button" key={band.id} className={ageBand===band.id?"selected":""} onClick={()=>{setAgeBand(band.id);setSaved(false);}}>{band.label}</button>)}</div></section>
 <div className="studio-workspace"><aside className="studio-tools"><span className="studio-section-label">PROJECT FORMAT</span>{experience.formats.map(item=><button type="button" key={item.id} className={format===item.id?"selected":""} onClick={()=>{setFormat(item.id);setSaved(false);}}><span className="studio-tool-icon">{item.id==="story"?<BookOpen size={18}/>:item.id==="zine"?<Layers size={18}/>:item.id==="worldbuilding"?<Lightbulb size={18}/>:<FileText size={18}/>}</span><span><strong>{item.title}</strong><small>{item.description}</small></span></button>)}</aside>
 <section className="studio-editor"><div className="studio-editor-top"><div><span className="studio-section-label">{experience.label.toUpperCase()}</span><h2>{selectedFormat.title}</h2></div><span className="studio-style-note">{experience.tone}</span></div>
 <label className="studio-field-label">PROJECT TITLE<input value={title} onChange={event=>{setTitle(event.target.value);setSaved(false);}} maxLength={80}/></label>
 <div className="studio-prompt"><Sparkles size={16}/><div><strong>A starting point — only if useful</strong><p>{selectedFormat.prompt}</p></div></div>
 <label className="studio-field-label">YOUR WORK<textarea value={content} onChange={event=>{setContent(event.target.value);setSaved(false);}} placeholder="Start anywhere. You can change direction, leave this blank or come back later." rows={12}/></label>
 <div className="studio-actions"><button type="button" className="studio-save" onClick={saveDraft}><Save size={16}/> Save on this device</button><button type="button" className="studio-export" onClick={exportDraft}><Download size={16}/> Export as Markdown</button><button type="button" className="studio-reset" onClick={resetDraft}><RotateCcw size={15}/> Clear</button></div>
 {saved&&<p className="studio-saved" role="status"><Check size={15}/> Saved on this device. It has not been uploaded.</p>}
 {!saved&&<p className="studio-privacy-note">Nothing is saved until you choose to save. Export creates a file only when you ask.</p>}
 </section></div></section></main>;
}
