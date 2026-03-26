import { motion } from "motion/react";
import { Code2, Layout, Database } from "lucide-react";
import { SiNextdotjs, SiTailwindcss, SiDotnet, SiReact, SiMysql, SiPostgresql, SiTypescript, SiSharp, SiGit, SiDocker } from "react-icons/si";

export default function Skills() {
  const skillGroups = [
    {
      title: "Backend",
      icon: <Code2 className="w-6 h-6 text-brand-teal" />,
      skills: [
        { name: "C#", icon: <SiSharp />, level: 95 },
        { name: ".NET Core", icon: <SiDotnet />, level: 90 },
        { name: "SQL Server", icon: <Database className="w-4 h-4" />, level: 85 },
        { name: "Architecture REST", icon: <Code2 className="w-4 h-4" />, level: 90 },
      ],
    },
    {
      title: "Frontend",
      icon: <Layout className="w-6 h-6 text-brand-dark" />,
      skills: [
        { name: "Next.js", icon: <SiNextdotjs />, level: 95 },
        { name: "React", icon: <SiReact />, level: 90 },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 95 },
        { name: "TypeScript", icon: <SiTypescript />, level: 85 },
      ],
    },
    {
      title: "Database & Tools",
      icon: <Database className="w-6 h-6 text-brand-teal" />,
      skills: [
        { name: "MySQL", icon: <SiMysql />, level: 85 },
        { name: "PostgreSQL", icon: <SiPostgresql />, level: 80 },
        { name: "Git", icon: <SiGit />, level: 90 },
        { name: "Docker", icon: <SiDocker />, level: 75 },
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-white/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-brand-dark">Expertise Technique</h2>
          <p className="text-slate-600">Des technologies modernes pour des solutions performantes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(32, 178, 170, 0.1)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative glass p-8 rounded-2xl h-full overflow-hidden transition-all duration-300 border-white/40">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/20 flex items-center justify-center mb-6 shadow-sm">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-brand-dark">{group.title}</h3>
                  <div className="space-y-6">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-slate-700">
                            <span className="text-slate-800">{skill.icon}</span>
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200 shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "circOut", delay: index * 0.1 }}
                            className="h-full bg-brand-teal relative"
                          >
                            <motion.div 
                              animate={{ opacity: [0.1, 0.2, 0.1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute inset-0 bg-white/20" 
                            />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
