import React from 'react';
import { ResumeData } from '../types';
import { ArrowDown, Mail, Github, GraduationCap, Briefcase, Code, MapPin, Globe, Building2, FolderOpen, Image as ImageIcon, FileText, Link as LinkIcon, Download } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

// Helper for smooth scroll
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// 1. Modern Template (Updated with Navigation and new sections)
export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const navItems = [
    { label: '首页', id: 'home' },
    { label: '教育', id: 'education' },
    { label: '项目', id: 'projects' },
    { label: '实习', id: 'internships' },
    { label: '作品集', id: 'portfolio' },
    { label: '技能', id: 'skills' },
    { label: '联系', id: 'contact' },
  ];

  return (
    <div className="w-full h-full bg-[#f4f6f9] relative font-sans text-gray-800 scroll-smooth">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-xl text-gray-800 tracking-tight hidden md:block">{data.fullName}</span>
          <div className="flex space-x-1 md:space-x-6 overflow-x-auto no-scrollbar w-full md:w-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors whitespace-nowrap px-2 py-1"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-20 pt-8">
        
        {/* Home / Hero */}
        <section id="home" className="min-h-[50vh] flex flex-col md:flex-row items-center gap-12 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">{data.fullName}</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-blue-600">{data.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{data.summary}</p>
          </div>
          <div className="relative group shrink-0">
            <div className="absolute -inset-4 bg-blue-200 rounded-full opacity-50 blur-3xl group-hover:opacity-70 transition-opacity"></div>
            <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
              <img src={data.avatarUrl} alt={data.fullName} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-2">
            <GraduationCap className="text-blue-600" size={24} />
            <h3 className="text-2xl font-bold text-gray-800">教育背景</h3>
          </div>
          <div className="grid gap-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{edu.school}</h4>
                    <p className="text-blue-600 font-medium">{edu.degree}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{edu.year}</span>
                </div>
                {edu.proofUrl && (
                  <div className="mt-3">
                     <a href={edu.proofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 border border-gray-200 px-3 py-1.5 rounded-md hover:border-blue-200 transition-colors">
                       <FileText size={14} /> 
                       <span>查看学历证明: {edu.proofName || 'Document'}</span>
                     </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24 mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-2">
            <FolderOpen className="text-blue-600" size={24} />
            <h3 className="text-2xl font-bold text-gray-800">项目经历</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((proj) => (
              <div key={proj.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all hover:-translate-y-1 duration-200">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{proj.name}</h4>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                      <LinkIcon size={18} />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internships */}
        <section id="internships" className="scroll-mt-24 mb-16">
           <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-2">
            <Building2 className="text-blue-600" size={24} />
            <h3 className="text-2xl font-bold text-gray-800">实习经历</h3>
          </div>
          <div className="space-y-6">
            {data.internships.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{job.company}</h4>
                    <span className="text-blue-600 font-medium">{job.role}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">{job.period}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
                {job.proofUrl && (
                  <div className="mt-4 pt-4 border-t border-gray-50">
                     <a href={job.proofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 bg-gray-50 px-3 py-2 rounded hover:bg-blue-50 transition-colors">
                       <FileText size={14} /> 
                       <span>实习证明: {job.proofName || 'Attachment'}</span>
                     </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="scroll-mt-24 mb-16">
           <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-2">
            <ImageIcon className="text-blue-600" size={24} />
            <h3 className="text-2xl font-bold text-gray-800">作品集</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.portfolio.map((item) => (
              <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  {item.description && <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>}
                </div>
                {item.link && (
                   <a href={item.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-10 bg-black/0 hover:bg-black/5 transition-colors" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24 mb-16">
           <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-2">
            <Code className="text-blue-600" size={24} />
            <h3 className="text-2xl font-bold text-gray-800">技术栈</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-16 border-t border-gray-100 mb-12 text-center bg-white rounded-2xl shadow-sm">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">联系方式</h3>
          <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-6 py-3 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <Mail size={20} />
              <span className="font-medium">{data.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              <Github size={20} />
              <span className="font-medium">{data.github}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// 2. Minimalist Template (Clean, centered, b&w) - Updated for new sections
export const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-white font-sans text-gray-900 px-8 py-16">
      <main className="max-w-3xl mx-auto space-y-12">
        <header className="text-center space-y-4 pb-12 border-b border-gray-200">
          <h1 className="text-4xl font-light tracking-wide uppercase">{data.fullName}</h1>
          <p className="text-lg text-gray-500 tracking-widest uppercase text-xs">{data.title}</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500 pt-4">
             <span>{data.email}</span>
             <span>•</span>
             <span>{data.github}</span>
          </div>
        </header>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Summary</h3>
          <p className="text-gray-700 leading-loose">{data.summary}</p>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Experience</h3>
          <div className="space-y-8">
            {/* Internships + Projects mixed or separate. Let's list Internships first. */}
             {data.internships.map((job) => (
              <div key={job.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                   <span className="text-xs font-semibold border-b border-black pb-1">INTERNSHIP</span>
                   <p className="text-xs text-gray-400 mt-1">{job.period}</p>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <h4 className="font-bold text-lg">{job.company} - {job.role}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
                </div>
              </div>
            ))}
            {data.projects.map((proj) => (
              <div key={proj.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                   <span className="text-xs font-semibold border-b border-black pb-1">PROJECT</span>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-lg">{proj.name}</h4>
                    {proj.link && <a href={proj.link} className="text-xs underline underline-offset-4">LINK</a>}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Education</h3>
          <div className="space-y-6">
             {data.education.map((edu) => (
               <div key={edu.id} className="flex flex-col md:flex-row justify-between md:items-end border-b border-dotted border-gray-300 pb-2">
                 <div>
                   <h4 className="font-bold">{edu.school}</h4>
                   <p className="text-sm text-gray-600">{edu.degree}</p>
                 </div>
                 <span className="text-sm font-mono text-gray-500">{edu.year}</span>
               </div>
             ))}
          </div>
        </section>
        
        {data.portfolio.length > 0 && (
          <section>
             <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Portfolio</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.portfolio.map(item => (
                  <div key={item.id}>
                    <img src={item.imageUrl} alt={item.title} className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all" />
                    <p className="text-xs mt-1 font-bold">{item.title}</p>
                  </div>
                ))}
             </div>
          </section>
        )}

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-400">Skills</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
            {data.skills.map(s => <span key={s}>{s}</span>)}
          </div>
        </section>
      </main>
    </div>
  );
};

// 3. Professional Template - Updated
export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="w-full min-h-full bg-gray-100 flex flex-col md:flex-row shadow-xl">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-slate-900 text-white p-8 md:p-12 flex flex-col gap-10">
        <div className="text-center md:text-left">
          <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-slate-700 mb-6">
             <img src={data.avatarUrl} className="w-full h-full object-cover" alt="avatar" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{data.fullName}</h1>
          <p className="text-slate-400 font-medium">{data.title}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3"><Mail size={16} /> {data.email}</div>
              <div className="flex items-center gap-3"><Github size={16} /> {data.github}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Education</h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-white">{edu.school}</p>
                  <p className="text-sm text-slate-400">{edu.degree}</p>
                  <p className="text-xs text-slate-500 mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Skills</h3>
             <div className="flex flex-wrap gap-2">
               {data.skills.map(s => (
                 <span key={s} className="bg-slate-800 text-slate-200 px-2 py-1 text-xs rounded">{s}</span>
               ))}
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-2/3 bg-white p-8 md:p-16">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-900 pb-2 mb-6">Profile</h2>
          <p className="text-slate-600 leading-relaxed">{data.summary}</p>
        </section>
        
        {data.internships.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-900 pb-2 mb-6">Internships</h2>
            <div className="space-y-8">
              {data.internships.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{job.company}</h3>
                    <span className="text-sm font-mono text-slate-500">{job.period}</span>
                  </div>
                  <p className="text-slate-700 italic mb-2">{job.role}</p>
                  <p className="text-slate-600 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-900 pb-2 mb-6">Projects</h2>
          <div className="space-y-8">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{proj.name}</h3>
                </div>
                <p className="text-slate-600 mb-2">{proj.description}</p>
                {proj.link && <a href={proj.link} className="text-blue-600 hover:underline text-sm font-medium">View Project</a>}
              </div>
            ))}
          </div>
        </section>
        
        {data.portfolio.length > 0 && (
           <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-900 pb-2 mb-6">Portfolio</h2>
             <div className="grid grid-cols-2 gap-4">
               {data.portfolio.map(item => (
                 <div key={item.id} className="relative group overflow-hidden rounded-lg">
                   <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                   <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-white font-bold">{item.title}</span>
                   </div>
                 </div>
               ))}
             </div>
           </section>
        )}
      </main>
    </div>
  );
};

// 4. Creative Template - Updated
export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="w-full min-h-full bg-white font-sans text-gray-800">
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-12 md:p-20 text-center clip-path-slant relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 drop-shadow-lg">{data.fullName}</h1>
          <p className="text-xl md:text-2xl font-medium bg-white/20 inline-block px-6 py-2 rounded-full backdrop-blur-sm">{data.title}</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-8">
           <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100">
             <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
               <Mail size={18} /> Contact
             </h3>
             <div className="space-y-2 text-sm text-indigo-800 break-all">
               <p>{data.email}</p>
               <p>{data.github}</p>
             </div>
           </div>

           <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-100">
             <h3 className="font-bold text-pink-900 mb-4 flex items-center gap-2">
               <Code size={18} /> Skills
             </h3>
             <div className="flex flex-wrap gap-2">
               {data.skills.map(s => (
                 <span key={s} className="px-3 py-1 bg-white text-pink-600 rounded-full text-xs font-bold border border-pink-200 shadow-sm">{s}</span>
               ))}
             </div>
           </div>
           
           <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
              <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                <GraduationCap size={18} /> Education
              </h3>
              {data.education.map(e => (
                <div key={e.id} className="mb-4 last:mb-0">
                  <div className="font-bold text-purple-800">{e.school}</div>
                  <div className="text-xs text-purple-600">{e.degree}</div>
                  <div className="text-xs text-purple-400">{e.year}</div>
                </div>
              ))}
           </div>
        </div>

        <div className="md:col-span-2 space-y-10">
           <section>
             <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">About Me</h2>
             <p className="text-lg text-gray-600 leading-loose font-light border-l-4 border-purple-200 pl-4">
               {data.summary}
             </p>
           </section>
           
           {data.internships.length > 0 && (
             <section>
               <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Experience</h2>
               <div className="space-y-6">
                 {data.internships.map(job => (
                   <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex justify-between font-bold text-lg">
                        <span>{job.company}</span>
                        <span className="text-sm text-gray-400">{job.period}</span>
                      </div>
                      <div className="text-purple-600 font-medium mb-2">{job.role}</div>
                      <p className="text-gray-500 text-sm">{job.description}</p>
                   </div>
                 ))}
               </div>
             </section>
           )}

           <section>
             <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Selected Works</h2>
             <div className="grid grid-cols-1 gap-6">
                {data.projects.map(proj => (
                  <div key={proj.id} className="group bg-white rounded-2xl p-6 shadow-xl shadow-indigo-100 border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{proj.name}</h3>
                      {proj.link && <a href={proj.link} target="_blank" className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"><ArrowDown size={16} className="-rotate-90" /></a>}
                    </div>
                    <p className="mt-3 text-gray-500">{proj.description}</p>
                  </div>
                ))}
             </div>
           </section>
           
           {data.portfolio.length > 0 && (
              <section>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-6">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                   {data.portfolio.map(item => (
                     <div key={item.id} className="rounded-xl overflow-hidden shadow-lg">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                     </div>
                   ))}
                </div>
              </section>
           )}
        </div>
      </div>
    </div>
  );
};

// 5. Classic Template - Updated
export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="w-full min-h-full bg-[#fdfbf7] font-serif text-gray-900 p-8 md:p-16">
      <main className="max-w-4xl mx-auto border bg-white p-12 shadow-sm min-h-[1000px]">
        
        <header className="border-b-2 border-black pb-8 mb-10 text-center">
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-4">{data.fullName}</h1>
          <div className="flex justify-center gap-4 text-sm italic text-gray-600">
             <span>{data.email}</span>
             <span>|</span>
             <span>{data.title}</span>
             <span>|</span>
             <span>{data.github}</span>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Professional Summary</h2>
          <p className="text-justify leading-relaxed text-gray-800">{data.summary}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline mb-2">
              <div>
                <span className="font-bold text-lg block">{edu.school}</span>
                <span className="italic text-gray-700">{edu.degree}</span>
              </div>
              <span className="font-bold">{edu.year}</span>
            </div>
          ))}
        </section>
        
        {data.internships.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
            {data.internships.map(job => (
              <div key={job.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">{job.company} - {job.role}</h3>
                  <span className="italic text-sm">{job.period}</span>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">{job.description}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Projects</h2>
          <div className="space-y-6">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">{proj.name}</h3>
                  {proj.link && <a href={proj.link} className="text-sm text-blue-800 underline">Project Link</a>}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

         <section>
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Skills</h2>
          <p className="leading-loose">
            {data.skills.join(' • ')}
          </p>
        </section>

      </main>
    </div>
  );
};