import React, { useState } from 'react';
import { ResumeData } from './types';
import { INITIAL_RESUME_DATA } from './constants';
import { EditorPanel } from './components/EditorPanel';
import { ResumePreview } from './components/ResumePreview';
import { LandingPage } from './components/LandingPage';
import { Eye, Edit3, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'builder'>('landing');
  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('preview');

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('builder')} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden animate-in fade-in duration-300">
      
      {/* Header (Desktop & Mobile) */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('landing')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} /> <span className="hidden md:inline">Back to Home</span>
          </button>
          <span className="font-bold text-gray-800">ResumeBuilder</span>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex gap-3">
          <button 
            onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {mobileView === 'editor' ? <Eye size={20} /> : <Edit3 size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Panel: Editor */}
        <div 
          className={`
            w-full lg:w-[400px] xl:w-[450px] bg-white h-full z-20 
            absolute lg:relative transition-transform duration-300 ease-in-out border-r border-gray-200
            ${mobileView === 'editor' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <EditorPanel data={data} onChange={setData} />
        </div>

        {/* Right Panel: Preview */}
        <div className="flex-1 h-full relative bg-gray-50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03]" 
               style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          </div>
          
          <div className="h-full w-full overflow-y-auto p-0 lg:p-8 flex justify-center">
            <div className="w-full max-w-5xl bg-white shadow-2xl shadow-gray-200/50 min-h-full lg:min-h-[auto] lg:rounded-xl overflow-hidden animate-in fade-in duration-500">
               <ResumePreview data={data} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
