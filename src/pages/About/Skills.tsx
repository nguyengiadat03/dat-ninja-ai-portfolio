import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Database, 
  Brain, 
  Palette, 
  Server,
  Smartphone,
  Globe,
  GitBranch
} from "lucide-react";
import frontendSkills from "@/assets/frontend-skills.jpg";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code2 className="w-6 h-6" />,
      color: "bg-gradient-primary",
      skills: [
        { name: "React.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript (ES6+)", level: 95 },
        { name: "HTML5/CSS3", level: 98 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Next.js", level: 85 },
        { name: "Vue.js", level: 75 },
        { name: "SASS/SCSS", level: 88 }
      ]
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      color: "bg-gradient-accent",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 78 },
        { name: "Python", level: 70 },
        { name: "RESTful APIs", level: 85 },
        { name: "GraphQL", level: 65 },
        { name: "Microservices", level: 60 }
      ]
    },
    {
      title: "Database & Tools",
      icon: <Database className="w-6 h-6" />,
      color: "bg-gradient-secondary",
      skills: [
        { name: "MongoDB", level: 82 },
        { name: "PostgreSQL", level: 75 },
        { name: "MySQL", level: 80 },
        { name: "Redis", level: 65 },
        { name: "Supabase", level: 88 },
        { name: "Firebase", level: 85 }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-gradient-primary",
      skills: [
        { name: "TensorFlow.js", level: 70 },
        { name: "OpenAI API", level: 85 },
        { name: "Chatbot Development", level: 90 },
        { name: "Natural Language Processing", level: 75 },
        { name: "Computer Vision", level: 60 },
        { name: "Prompt Engineering", level: 88 }
      ]
    }
  ];

  const tools = [
    "VS Code", "Git", "GitHub", "Docker", "Figma", "Adobe XD", 
    "Postman", "Jest", "Cypress", "Webpack", "Vite", "Vercel"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Kỹ năng chuyên môn
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tổng hợp những kỹ năng và công nghệ tôi đã thành thạo qua quá trình học tập và làm việc. 
            Luôn học hỏi và cập nhật những xu hướng công nghệ mới nhất.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 text-center">
          <img 
            src={frontendSkills} 
            alt="Frontend Development Skills" 
            className="mx-auto rounded-lg shadow-lg max-w-2xl w-full"
          />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="p-6 card-hover bg-gradient-card border-none"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Tools & Technologies */}
        <Card className="p-8 bg-gradient-card border-none">
          <div className="text-center mb-8">
            <GitBranch className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Công cụ & Công nghệ
            </h3>
            <p className="text-muted-foreground">
              Các công cụ và platform tôi sử dụng hàng ngày trong quá trình phát triển
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary-dark transition-colors"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Skills;