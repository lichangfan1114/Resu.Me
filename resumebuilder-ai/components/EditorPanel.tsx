import React, { useState } from 'react';
import { ResumeData, Education, Project, Internship, PortfolioItem, TemplateId } from '../types';
import { optimizeText } from '../services/geminiService';
import { Wand2, Plus, Trash2, ChevronDown, ChevronUp, Loader2, Layout, Upload, Image as ImageIcon, User, Camera } from 'lucide-react';

interface EditorPanelProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ data, onChange }) => {
  const [isOptimizing, setIsOptimizing] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('template');

  const handleTextChange = (field: keyof ResumeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleTemplateChange = (templateId: TemplateId) => {
    onChange({ ...data, template: templateId });
  };

  const handleOptimize = async (text: string, field: keyof ResumeData | 'project' | 'internship', id?: string) => {
    if (!text) return;
    const key = id ? `${field}-${id}` : field;
    setIsOptimizing(key);
    
    try {
      const optimized = await optimizeText(text, field === 'summary' ? 'summary' : 'experience');
      
      if (field === 'summary') {
        onChange({ ...data, summary: optimized });
      } else if (field === 'project' && id) {
        const newProjects = data.projects.map(p => 
          p.id === id ? { ...p, description: optimized } : p
        );
        onChange({ ...data, projects: newProjects });
      } else if (field === 'internship' && id) {
        const newInternships = data.internships.map(i => 
          i.id === id ? { ...i, description: optimized } : i
        );
        onChange({ ...data, internships: newInternships });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsOptimizing(null);
    }
  };

  // --- Education ---
  const addEducation = () => {
    const newEdu: Education = { id: Date.now().toString(), school: 'New University', degree: 'Degree', year: '2024' };
    onChange({ ...data, education: [...data.education, newEdu] });
  };
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };
  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  // --- Internships ---
  const addInternship = () => {
    const newInternship: Internship = { id: Date.now().toString(), company: 'Company Name', role: 'Role', period: '2024', description: 'Description...' };
    onChange({ ...data, internships: [...data.internships, newInternship] });
  };
  const updateInternship = (id: string, field: keyof Internship, value: string) => {
    onChange({
      ...data,
      internships: data.internships.map(i => i.id === id ? { ...i, [field]: value } : i)
    });
  };
  const removeInternship = (id: string) => {
    onChange({ ...data, internships: data.internships.filter(i => i.id !== id) });
  };

  // --- Projects ---
  const addProject = () => {
    const newProj: Project = { id: Date.now().toString(), name: 'New Project', description: 'Project description...' };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };
  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };
  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  // --- Portfolio ---
  const addPortfolio = () => {
    const newItem: PortfolioItem = { id: Date.now().toString(), title: 'Project Title', imageUrl: 'https://via.placeholder.com/300' };
    onChange({ ...data, portfolio: [...data.portfolio, newItem] });
  };
  const updatePortfolio = (id: string, field: keyof PortfolioItem, value: string) => {
    onChange({
      ...data,
      portfolio: data.portfolio.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };
  const removePortfolio = (id: string) => {
    onChange({ ...data, portfolio: data.portfolio.filter(p => p.id !== id) });
  };

  const updateSkills = (value: string) => {
    onChange({ ...data, skills: value.split(',').map(s => s.trim()) });
  };

  // Mock File Upload (since no backend)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (name: string, url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a fake URL for local preview
      const url = URL.createObjectURL(file);
      callback(file.name, url);
    }
  };

  const SectionHeader = ({ title, id, icon }: { title: string, id: string, icon?: React.ReactNode }) => (
    <button 
      onClick={() => setActiveSection(activeSection === id ? '' : id)}
      className="w-full flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors text-left"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold text-gray-700">{title}</span>
      </div>
      {activeSection === id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  const templates: {id: TemplateId, name: string, color: string}[] = [
    { id: 'modern', name: 'Modern', color: 'bg-blue-500' },
    { id: 'minimalist', name: 'Minimal', color: 'bg-gray-200' },
    { id: 'professional', name: 'Pro', color: 'bg-slate-800' },
    { id: 'creative', name: 'Creative', color: 'bg-purple-500' },
    { id: 'classic', name: 'Classic', color: 'bg-amber-100' },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold text-gray-800">简历编辑器</h2>
        <p className="text-sm text-gray-500">Resume Builder</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        
        {/* Templates Section */}
        <SectionHeader title="选择模板 (Templates)" id="template" icon={<Layout size={18} className="text-blue-600"/>} />
        {activeSection === 'template' && (
          <div className="p-6 bg-white grid grid-cols-2 gap-3">
             {templates.map(t => (
               <button
                key={t.id}
                onClick={() => handleTemplateChange(t.id)}
                className={`
                  relative p-3 rounded-lg border-2 text-left transition-all
                  ${data.template === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
                `}
               >
                 <div className={`w-full h-12 rounded mb-2 ${t.color} opacity-80`}></div>
                 <span className="text-sm font-medium text-gray-700">{t.name}</span>
                 {data.template === t.id && (
                   <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500"></div>
                 )}
               </button>
             ))}
          </div>
        )}

        {/* Profile Section */}
        <SectionHeader title="个人信息 (Profile)" id="profile" icon={<User size={18} className="text-green-600" />} />
        {activeSection === 'profile' && (
          <div className="p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名 (Name)</label>
              <input 
                type="text" 
                value={data.fullName} 
                onChange={(e) => handleTextChange('fullName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">头衔 / 学历 (Title)</label>
              <input 
                type="text" 
                value={data.title} 
                onChange={(e) => handleTextChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">个人简介 (Bio)</label>
                <button 
                  onClick={() => handleOptimize(data.summary, 'summary')}
                  disabled={isOptimizing === 'summary'}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium bg-blue-50 px-2 py-1 rounded"
                >
                  {isOptimizing === 'summary' ? <Loader2 className="animate-spin" size={12} /> : <Wand2 size={12} />}
                  AI Rewrite
                </button>
              </div>
              <textarea 
                value={data.summary} 
                onChange={(e) => handleTextChange('summary', e.target.value)}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm leading-relaxed"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="text" 
                  value={data.email} 
                  onChange={(e) => handleTextChange('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub (no https://)</label>
                <input 
                  type="text" 
                  value={data.github} 
                  onChange={(e) => handleTextChange('github', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Avatar Section - NEW */}
        <SectionHeader title="头像照片 (Profile Photo)" id="avatar" icon={<Camera size={18} className="text-purple-500"/>} />
        {activeSection === 'avatar' && (
          <div className="p-6 flex flex-col items-center">
              <div className="relative group w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-gray-100 bg-gray-50">
                  <img 
                    src={data.avatarUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image' }}
                  />
                  <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                      <Upload className="text-white mb-1" size={24} />
                      <span className="text-white text-xs font-bold uppercase tracking-wider">Upload Photo</span>
                      <input 
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, (_, url) => handleTextChange('avatarUrl', url))}
                      />
                  </label>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center max-w-xs">
                  点击上方图片上传您的个人照片。<br/>
                  <span className="text-xs text-gray-400">建议使用正方形图片 (JPG, PNG)</span>
              </p>
              
               <div className="mt-6 w-full">
                  <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">或输入图片链接 (Or Image URL)</label>
                  <input 
                    type="text" 
                    value={data.avatarUrl} 
                    onChange={(e) => handleTextChange('avatarUrl', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="https://..."
                  />
              </div>
          </div>
        )}

        {/* Education Section */}
        <SectionHeader title="教育背景 (Education)" id="education" icon={<Trash2 className='hidden'/> /* using generic spacing */} />
        {activeSection === 'education' && (
          <div className="p-6 space-y-6 bg-gray-50/50">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative group">
                <button 
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 gap-3">
                  <input 
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="font-semibold text-gray-800 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                    placeholder="School Name"
                  />
                  <input 
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="text-sm text-gray-600 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                    placeholder="Degree"
                  />
                   <input 
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                    className="text-xs text-gray-400 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                    placeholder="Years"
                  />
                  {/* Proof Upload */}
                  <div className="flex items-center gap-2 mt-2">
                    <label className="cursor-pointer flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200 transition-colors">
                      <Upload size={12} />
                      {edu.proofName ? 'Update Proof' : 'Upload Proof'}
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, (name, url) => {
                          updateEducation(edu.id, 'proofName', name);
                          updateEducation(edu.id, 'proofUrl', url);
                        })}
                      />
                    </label>
                    {edu.proofName && <span className="text-xs text-green-600 truncate max-w-[150px]">{edu.proofName}</span>}
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={addEducation}
              className="w-full py-2 flex justify-center items-center gap-2 text-sm text-blue-600 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}

        {/* Projects Section */}
        <SectionHeader title="项目经历 (Projects)" id="projects" />
        {activeSection === 'projects' && (
          <div className="p-6 space-y-6 bg-gray-50/50">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative group">
                <button 
                  onClick={() => removeProject(proj.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <div className="space-y-3">
                  <input 
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    className="w-full font-bold text-gray-800 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                    placeholder="Project Name"
                  />
                  <div className="relative">
                     <textarea 
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full text-sm text-gray-600 border border-gray-100 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none resize-none bg-gray-50"
                      placeholder="Description"
                    />
                    <button 
                      onClick={() => handleOptimize(proj.description, 'project', proj.id)}
                      disabled={isOptimizing === `project-${proj.id}`}
                      className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors"
                      title="AI Optimize"
                    >
                       {isOptimizing === `project-${proj.id}` ? <Loader2 className="animate-spin" size={14} /> : <Wand2 size={14} />}
                    </button>
                  </div>
                  <input 
                    value={proj.link || ''}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    className="w-full text-xs text-blue-500 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                    placeholder="Project Link (URL)"
                  />
                </div>
              </div>
            ))}
            <button 
              onClick={addProject}
              className="w-full py-2 flex justify-center items-center gap-2 text-sm text-blue-600 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
        )}

        {/* Internships Section - NEW */}
        <SectionHeader title="实习经历 (Internships)" id="internships" />
        {activeSection === 'internships' && (
          <div className="p-6 space-y-6 bg-gray-50/50">
             {data.internships.map((job) => (
               <div key={job.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative group">
                  <button 
                    onClick={() => removeInternship(job.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-3">
                    <input 
                      value={job.company}
                      onChange={(e) => updateInternship(job.id, 'company', e.target.value)}
                      className="w-full font-bold text-gray-800 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                      placeholder="Company Name"
                    />
                    <div className="flex gap-2">
                       <input 
                        value={job.role}
                        onChange={(e) => updateInternship(job.id, 'role', e.target.value)}
                        className="flex-1 text-sm text-gray-600 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                        placeholder="Role"
                      />
                       <input 
                        value={job.period}
                        onChange={(e) => updateInternship(job.id, 'period', e.target.value)}
                        className="w-24 text-sm text-gray-400 border-b border-transparent focus:border-blue-500 outline-none bg-transparent text-right"
                        placeholder="Period"
                      />
                    </div>
                     <div className="relative">
                     <textarea 
                      value={job.description}
                      onChange={(e) => updateInternship(job.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full text-sm text-gray-600 border border-gray-100 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none resize-none bg-gray-50"
                      placeholder="Description"
                    />
                     <button 
                      onClick={() => handleOptimize(job.description, 'internship', job.id)}
                      disabled={isOptimizing === `internship-${job.id}`}
                      className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors"
                      title="AI Optimize"
                    >
                       {isOptimizing === `internship-${job.id}` ? <Loader2 className="animate-spin" size={14} /> : <Wand2 size={14} />}
                    </button>
                    </div>
                     {/* Proof Upload */}
                    <div className="flex items-center gap-2 mt-2">
                      <label className="cursor-pointer flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200 transition-colors">
                        <Upload size={12} />
                        {job.proofName ? 'Update Proof' : 'Upload Proof'}
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(e, (name, url) => {
                            updateInternship(job.id, 'proofName', name);
                            updateInternship(job.id, 'proofUrl', url);
                          })}
                        />
                      </label>
                      {job.proofName && <span className="text-xs text-green-600 truncate max-w-[150px]">{job.proofName}</span>}
                    </div>
                  </div>
               </div>
             ))}
             <button 
              onClick={addInternship}
              className="w-full py-2 flex justify-center items-center gap-2 text-sm text-blue-600 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Plus size={16} /> Add Internship
            </button>
          </div>
        )}

        {/* Portfolio Section - NEW */}
        <SectionHeader title="作品集 (Portfolio)" id="portfolio" />
        {activeSection === 'portfolio' && (
          <div className="p-6 space-y-6 bg-gray-50/50">
             {data.portfolio.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative group">
                  <button 
                    onClick={() => removePortfolio(item.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200 relative group/img">
                       {item.imageUrl ? (
                         <img src={item.imageUrl} alt="preview" className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-400">
                           <ImageIcon size={20} />
                         </div>
                       )}
                       <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer text-white">
                         <Upload size={16} />
                         <input 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleFileUpload(e, (name, url) => updatePortfolio(item.id, 'imageUrl', url))}
                          />
                       </label>
                    </div>
                    <div className="flex-1 space-y-2">
                       <input 
                        value={item.title}
                        onChange={(e) => updatePortfolio(item.id, 'title', e.target.value)}
                        className="w-full font-bold text-gray-800 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                        placeholder="Title"
                      />
                       <input 
                        value={item.description || ''}
                        onChange={(e) => updatePortfolio(item.id, 'description', e.target.value)}
                        className="w-full text-xs text-gray-500 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                        placeholder="Short Description"
                      />
                       <input 
                        value={item.link || ''}
                        onChange={(e) => updatePortfolio(item.id, 'link', e.target.value)}
                        className="w-full text-xs text-blue-500 border-b border-transparent focus:border-blue-500 outline-none bg-transparent"
                        placeholder="Link (Optional)"
                      />
                    </div>
                  </div>
                </div>
             ))}
             <button 
              onClick={addPortfolio}
              className="w-full py-2 flex justify-center items-center gap-2 text-sm text-blue-600 bg-white border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
            >
              <Plus size={16} /> Add Portfolio Item
            </button>
          </div>
        )}

        {/* Skills Section */}
        <SectionHeader title="技能 (Skills)" id="skills" />
        {activeSection === 'skills' && (
           <div className="p-6">
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Skills (Comma separated)
             </label>
             <textarea 
                value={data.skills.join(', ')}
                onChange={(e) => updateSkills(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                rows={4}
             />
             <p className="mt-2 text-xs text-gray-500">
               Example: React, TypeScript, Node.js
             </p>
           </div>
        )}
      </div>
    </div>
  );
};