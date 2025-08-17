import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Database,
  Brain,
  Server,
  GitBranch,
  Palette,
  Globe,
} from "lucide-react";
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiVercel,
  SiJest,
  SiCypress,
  SiVite,
  SiWebpack,
  SiPostman,
  SiTensorflow,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code2 className="w-6 h-6" />,
      color: "bg-gradient-primary",
      skills: [
        {
          name: "React.js",
          level: 80,
          icon: <FaReact className="text-sky-400" />,
        },
        {
          name: "TypeScript",
          level: 70,
          icon: <SiTypescript className="text-blue-500" />,
        },
        {
          name: "JavaScript (ES6+)",
          level: 70,
          icon: <Code2 className="text-yellow-400" />,
        },
        {
          name: "HTML5/CSS3",
          level: 85,
          icon: <Palette className="text-orange-500" />,
        },
        {
          name: "Tailwind CSS",
          level: 75,
          icon: <Palette className="text-cyan-400" />,
        },
        { name: "Next.js", level: 50, icon: <Globe className="text-black" /> },
        {
          name: "Vue.js",
          level: 60,
          icon: <FaVuejs className="text-green-500" />,
        },
        {
          name: "SASS/SCSS",
          level: 40,
          icon: <Palette className="text-pink-500" />,
        },
      ],
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      color: "bg-gradient-accent",
      skills: [
        {
          name: "Node.js",
          level: 40,
          icon: <FaNodeJs className="text-green-600" />,
        },
        {
          name: "Express.js",
          level: 30,
          icon: <Server className="text-gray-600" />,
        },
        {
          name: "Python",
          level: 50,
          icon: <FaPython className="text-yellow-400" />,
        },
        {
          name: "RESTful APIs",
          level: 50,
          icon: <Globe className="text-blue-500" />,
        },
        {
          name: "GraphQL",
          level: 30,
          icon: <Code2 className="text-pink-500" />,
        },
        {
          name: "Microservices",
          level: 30,
          icon: <Server className="text-purple-500" />,
        },
      ],
    },
    {
      title: "Database & Tools",
      icon: <Database className="w-6 h-6" />,
      color: "bg-red-800",
      skills: [
        {
          name: "MongoDB",
          level: 40,
          icon: <SiMongodb className="text-green-500" />,
        },
        {
          name: "PostgreSQL",
          level: 40,
          icon: <SiPostgresql className="text-blue-500" />,
        },
        {
          name: "MySQL",
          level: 70,
          icon: <SiMysql className="text-orange-400" />,
        },
        {
          name: "Redis",
          level: 20,
          icon: <SiRedis className="text-red-500" />,
        },
        {
          name: "Supabase",
          level: 70,
          icon: <Database className="text-green-400" />,
        },
        {
          name: "Firebase",
          level: 60,
          icon: <SiFirebase className="text-yellow-500" />,
        },
      ],
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-gradient-primary",
      skills: [
        {
          name: "TensorFlow.js",
          level: 40,
          icon: <SiTensorflow className="text-orange-500" />,
        },
        {
          name: "OpenAI API",
          level: 70,
          icon: <Brain className="text-purple-500" />,
        },
        {
          name: "Chatbot Development",
          level: 75,
          icon: <Brain className="text-blue-400" />,
        },
        {
          name: "Natural Language Processing",
          level: 40,
          icon: <Brain className="text-green-500" />,
        },
        {
          name: "Computer Vision",
          level: 50,
          icon: <Brain className="text-pink-400" />,
        },
        {
          name: "Prompt Engineering",
          level: 60,
          icon: <Brain className="text-yellow-500" />,
        },
      ],
    },
  ];

  const tools = [
    { name: "VS Code", icon: <VscVscode className="text-blue-500" /> },
    { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
    { name: "GitHub", icon: <FaGithub className="text-black" /> },
    { name: "Docker", icon: <FaDocker className="text-sky-400" /> },
    { name: "Figma", icon: <FaFigma className="text-pink-500" /> },
    { name: "Adobe XD", icon: <Palette className="text-red-500" /> },
    { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
    { name: "Jest", icon: <SiJest className="text-red-600" /> },
    { name: "Cypress", icon: <SiCypress className="text-green-600" /> },
    { name: "Webpack", icon: <SiWebpack className="text-blue-500" /> },
    { name: "Vite", icon: <SiVite className="text-purple-500" /> },
    { name: "Vercel", icon: <SiVercel className="text-black" /> },
  ];

  return (
    <div className="min-h-screen bg-green-200 py-20">
      <div className="container bg-gradient-to-b mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-pulse">
            Kỹ năng chuyên môn
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tổng hợp những kỹ năng và công nghệ tôi đã thành thạo qua quá trình
            học tập và làm việc.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="p-6 card-hover bg-gradient-card border-none group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white`}
                >
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
                      <span className="flex items-center gap-2 text-foreground font-medium">
                        {skill.icon} {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-2 rounded-full w-0 group-hover:w-[var(--skill-level)] transition-all duration-1000"
                        style={{ ["--skill-level" as any]: `${skill.level}%` }}
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
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm bg-secondary flex items-center gap-2 
                   transition-all duration-300
                   hover:scale-150 hover:shadow-5xl hover:bg-green-500 hover:text-white
                   hover:z-10 relative"
              >
                {tool.icon} {tool.name}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Skills;
