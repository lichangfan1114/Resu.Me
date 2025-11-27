import React from 'react';
import { ArrowRight, Layout, Wand2, Monitor, Code, FileText, Share2 } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-100 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <FileText size={24} />
          <span>ResumeBuilder AI</span>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          开始制作 (Start)
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            打造您的专属 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">个人简历网站</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            不仅仅是一份简历，更是一个展示自我的在线平台。
            <br className="hidden md:block"/>
            选择模版，实时预览，AI 辅助写作，一键生成。
          </p>
          
          <div className="pt-8">
            <button 
              onClick={onStart}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-xl shadow-blue-200"
            >
              立即开始创作
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold">多样化模版</h3>
            <p className="text-gray-500 leading-relaxed">
              提供现代、极简、专业等多种风格模版，满足不同行业和职业的需求。一键切换，实时生效。
            </p>
          </div>

          <div className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Wand2 size={24} />
            </div>
            <h3 className="text-xl font-bold">AI 智能辅助</h3>
            <p className="text-gray-500 leading-relaxed">
              内置 Gemini AI 写作助手，帮你润色个人简介和项目经历，让文字更具专业感和吸引力。
            </p>
          </div>

          <div className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Monitor size={24} />
            </div>
            <h3 className="text-xl font-bold">实时预览</h3>
            <p className="text-gray-500 leading-relaxed">
              所见即所得的编辑体验。左侧修改，右侧即时呈现，让简历制作变得简单直观且高效。
            </p>
          </div>
        </div>

        {/* Demo Preview Image */}
        <div className="mt-32 relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100">
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
           <div className="p-4 bg-white/80 backdrop-blur border-b border-gray-200 flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-400"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
             <div className="w-3 h-3 rounded-full bg-green-400"></div>
           </div>
           <div className="aspect-[16/9] bg-gray-50 flex items-center justify-center text-gray-400">
              <div className="text-center">
                 <p className="text-lg font-medium mb-2">Editor Interface Preview</p>
                 <Code size={48} className="mx-auto opacity-50"/>
              </div>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>© 2024 ResumeBuilder AI. Empowering careers.</p>
        </div>
      </footer>
    </div>
  );
};
