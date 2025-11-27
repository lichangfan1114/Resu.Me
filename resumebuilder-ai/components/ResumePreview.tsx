import React from 'react';
import { ResumeData } from '../types';
import { ModernTemplate, MinimalistTemplate, ProfessionalTemplate, CreativeTemplate, ClassicTemplate } from './ResumeTemplates';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const renderTemplate = () => {
    switch (data.template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      {renderTemplate()}
    </div>
  );
};