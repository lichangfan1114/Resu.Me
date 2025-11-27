import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  template: 'modern',
  fullName: "姓名",
  title: "学校 / 专业 / 学历",
  summary: "这里是您的个人简介。您可以使用右侧的“AI Rewrite”功能来润色这段文字。简要介绍您的核心技能、职业目标以及您能为团队带来的价值。",
  avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix",
  email: "your.email@example.com",
  github: "github.com/yourname",
  education: [
    {
      id: '1',
      school: '学校名称',
      degree: '专业 / 学位',
      year: '2020 - 2024'
    }
  ],
  internships: [
    {
      id: '1',
      company: '公司名称',
      role: '职位',
      period: '2023.06 - 2023.09',
      description: '在这里描述您的实习经历。您可以列出您的主要职责、参与的项目以及取得的成果。'
    }
  ],
  projects: [
    {
      id: '1',
      name: '项目名称',
      description: '在这里描述您的项目。使用了什么技术栈？解决了什么问题？取得了什么具体效果？',
      link: '#'
    }
  ],
  portfolio: [
    {
      id: '1',
      title: '作品名称',
      imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400',
      description: '简短的作品描述。'
    }
  ],
  skills: ['Skill 1', 'Skill 2', 'Skill 3']
};