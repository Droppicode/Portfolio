import React, { useState, useEffect, useRef } from 'react';

import img_perfil from './assets/perfil.png';
import img_algorithmVisualizer from './assets/algorithm-visualizer.png';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const fullText = "Hello, I'm Marcos Menezes!";
  const typingSpeed = 100;
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (isLoaded) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, typingSpeed);

      return () => clearInterval(intervalId);
    }
  }, [isLoaded]);

  // Page load effect
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const scrollToSection = (ref:React.RefObject<HTMLDivElement | null>) => {
    if(ref.current?.offsetTop != null) window.scrollTo({ top: ref.current?.offsetTop - 75, behavior: "smooth" })
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openEmail = () => { window.open("mailto:contact.marcosmenezes@gmail.com"); };
  const openLocation = () => { window.open("https://www.google.com.br/maps/place/Hortolândia,+SP/@-22.8770241,-47.2501985,13z"); };
  const openPlatform = (platform:string) => { 
    if(platform === 'github') window.open('https://www.github.com/Droppicode');
    if(platform === 'linkedin') window.open('https://www.linkedin.com/in/marcos-menezes-31a10435a/');
    if(platform === 'instagram') window.open('https://www.instagram.com/marcoss.mn/');
  };
  const openProject = (project:string|undefined, type:string) => {
    if(project === 'Algorithm Visualizer') {
      if(type === 'live') window.open('https://droppicode.github.io/Algorithm-Visualizer/');
      if(type === 'github') window.open('https://github.com/Droppicode/Algorithm-Visualizer');
    }
  };

  const projects = [
    {
      id: 1,
      title: "Algorithm Visualizer",
      category: "Web",
      image: img_algorithmVisualizer,
      description: "A minimalist visualizer to programming algorithms.",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
  ];

  const skills = [
    { name: "JavaScript", category: "Frontend", level: 80 },
    { name: "HTML/CSS", category: "Frontend", level: 70 },
    { name: "C++", category: "Backend", level: 60 },
    { name: "Python", category: "Backend", level: 50 },
    { name: "React", category: "Frontend", level: 30 },
    { name: "Git", category: "Tools", level: 75 },
    { name: "TailwindCSS", category: "Tools", level: 20 },
  ];

  const themeClasses = {
    background: isDarkMode ? 'bg-[#121212]' : 'bg-[#fbfafa]',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    secondaryText: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    accent: isDarkMode ? 'bg-gray-800' : 'bg-gray-300',
    accentHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400',
    card: isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200',
    cardHover: isDarkMode ? 'hover:bg-[#222]' : 'hover:bg-gray-100',
    border: isDarkMode ? 'border-white/10' : 'border-gray-200',
    input: isDarkMode ? 'bg-[#252525]' : 'bg-gray-100',
    button: isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400',
  };

  return (
    <div className={`min-h-screen min-w-screen ${themeClasses.background} ${themeClasses.text} font-sans relative z-0 overflow-x-hidden`}>
      {/* Grid Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 1px, transparent 1px), 
                           linear-gradient(90deg, ${isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full backdrop-blur-sm z-40 border-b ${themeClasses.background}/80 ${themeClasses.border}`}> {/* Navbar */}
        <div className="container mx-auto px-6 py-4 flex justify-between items-center"> {/* Centered Container */}
          <div className="text-2xl font-bold relative overflow-hidden"> {/* MM. Text */}
            <span className={`inline-block transition-transform duration-1000 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}>
              MM<span className="text-gray-500">.</span>
            </span>
          </div>
          <div className="flex items-center space-x-8"> {/* Nav Items */}
            <ul className="hidden md:flex space-x-8">
              {['Home', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <li key={index} className="relative cursor-pointer group" onClick={() => {
                  if (item === 'Home') scrollToSection(heroRef);
                  if (item === 'Projects') scrollToSection(projectsRef);
                  if (item === 'Skills') scrollToSection(skillsRef);
                  if (item === 'Contact') scrollToSection(contactRef);
                }}>
                  <span className="text-sm tracking-wider">{item}</span>
                  <span className={`absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full  ${themeClasses.accent}`}></span>
                </li>
              ))}
            </ul>
            <button 
              onClick={toggleTheme}
              className={`p-2 ${themeClasses.accentHover} rounded-lg cursor-pointer transition-all duration-300 !rounded-button whitespace-nowrap`}
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
          <button 
            // onClick={toggleSidebar}
            className="md:hidden text-xl !rounded-button whitespace-nowrap"
          > {/* Sidebar Btn */}
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className={`min-h-screen flex items-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20"> {/* 'Opacity' on Background */}
          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-400/5 to-[#121212]/5' : 'from-gray-400/5 to-gray-100/5'}`}></div>
          {/* <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, ${isDarkMode ? 'rgba(75, 85, 99, 0.1)' : 'rgba(209, 213, 219, 0.3)'} 0%, transparent 25%), 
                             radial-gradient(circle at 70% 70%, ${isDarkMode ? 'rgba(75, 85, 99, 0.1)' : 'rgba(209, 213, 219, 0.3)'} 0%, transparent 25%)`
          }}></div> */}
        </div>
        <div className="container mx-auto px-6 z-10"> {/* Centered Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8"> {/* Description */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="block">{typedText}</span>
                </h1>
                <span className={`block text-2xl md:text-3xl ${themeClasses.secondaryText} transition-opacity duration-1000 ${typedText.length === fullText.length ? 'opacity-100' : 'opacity-0'}`}>
                  Computer Science, Unicamp
                </span>
              </div>
              <p className={`text-lg ${themeClasses.secondaryText} max-w-lg transition-opacity duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                I am very passionate about technology and love to learn more every day. Haven't decided yet on which career I should focus, but I like working with math and algorithms.
              </p>
              <div className={`flex space-x-4 transition-opacity duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <button className={`${themeClasses.button} px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center space-x-2 !rounded-button whitespace-nowrap`}>
                  <span>View Projects</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <button className={`${themeClasses.button} px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 !rounded-button whitespace-nowrap`}>
                  Contact Me
                </button>
              </div>
            </div>
            <div className="hidden lg:block"> {/* Image */}
              <div className="relative">
                <img 
                  src={img_perfil} 
                  alt="Developer Portrait" 
                  className="rounded-lg object-cover w-full h-full max-w-[600px] max-h-[600px] object-top opacity-[.9]"
                />
                <div className={`absolute inset-0 z-10 opacity-50`}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce"> {/* Scroll Down */}
          <span className={`text-sm ${themeClasses.secondaryText} mb-2`}>Scroll Down</span>
          <i className={`fas fa-chevron-down ${themeClasses.secondaryText}`}></i>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="pt-15 pb-20">
        <div className="container mx-auto px-6"> {/* Centered Container */}
          <div className="mb-16 text-center"> {/* Title and Description */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <p className={`${themeClasses.secondaryText} max-w-2xl mx-auto`}>
              A selection from some of my works. Click on any project to explore it in detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Projects */}
            {projects.map((project) => (
              <div 
                key={project.id} 
                className={`${themeClasses.card} rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.05] hover:shadow-xl`}
                onClick={() => setActiveProject(project.id)}
              > {/* Project */}
                <div className="relative h-64 overflow-hidden"> {/* Image */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6"> {/* Text */}
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className={`${themeClasses.secondaryText} text-sm mb-4`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className={`text-xs ${themeClasses.accent} px-3 py-1 rounded-full`}>{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className={`text-xs ${themeClasses.accent} px-3 py-1 rounded-full`}>+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className={`pt-15 pb-20 ${isDarkMode ? 'bg-gray-700/5' : 'bg-gray-300/5'}`}>
        <div className="container mx-auto px-6"> {/* Centered Container */}
          <div className="mb-16 text-center"> {/* Title and Description */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
            <p className={`${themeClasses.secondaryText} max-w-2xl mx-auto`}>
              An overview of my technical skills and proficiency levels across different domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8"> {/* Technical Skills */}
              <h3 className="text-xl font-bold mb-6">Technical Proficiency</h3>
              {skills.slice(0, 5).map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className={themeClasses.secondaryText}>{skill.level}%</span>
                  </div>
                  <div className={`h-2 ${themeClasses.accent} rounded-full overflow-hidden`}>
                    <div 
                      className="h-full bg-gray-500 rounded-full transition-all duration-1000 ease-out z-10"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8"> {/* Tools & Technologies Skills */}
              <h3 className="text-xl font-bold mb-6">Tools & Technologies</h3>
              {skills.slice(5).map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className={themeClasses.secondaryText}>{skill.level}%</span>
                  </div>
                  <div className={`h-2 ${themeClasses.accent} rounded-full overflow-hidden`}>
                    <div 
                      className="h-full bg-gray-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Frontend', 'Design', 'Tools'].map((category, index) => (
              <div key={index} className={`${themeClasses.card} p-6 rounded-lg text-center ${themeClasses.cardHover} transition-colors duration-300`}>
                <div className={`w-16 h-16 mx-auto mb-4 ${themeClasses.accent} rounded-full flex items-center justify-center`}>
                  <i className={`fas ${
                    category === 'Frontend' ? 'fa-code' : 
                    category === 'Design' ? 'fa-palette' : 'fa-tools'
                  } text-2xl text-gray-500`}></i>
                </div>
                <h4 className="text-lg font-bold mb-2">{category}</h4>
                <p className={`text-sm ${themeClasses.secondaryText}`}>
                  {category === 'Frontend' ? 'Creating responsive, interactive interfaces' : 
                   category === 'Design' ? 'Crafting intuitive and elegant experiences' : 
                   'Utilizing modern development tools'}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="pt-15 pb-20">
        <div className="container mx-auto px-6"> {/* Centered Container */}
          <div className="mb-16 text-center"> {/* Title and Description */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
            <p className={`${themeClasses.secondaryText} max-w-2xl mx-auto`}>
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className={`${themeClasses.card} p-8 rounded-lg`}> {/* Message Forms */}
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              <form className="space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    className={`w-full ${themeClasses.input} border-none rounded-lg px-4 py-3 ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300`}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    className={`w-full ${themeClasses.input} border-none rounded-lg px-4 py-3 ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300`}
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="relative">
                  <textarea 
                    className={`w-full ${themeClasses.input} border-none rounded-lg px-4 py-3 ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 min-h-[150px]`}
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`${themeClasses.button} cursor-pointer text-current px-6 py-3 rounded-lg transition-all duration-300 w-full !rounded-button whitespace-nowrap`}
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-8"> {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${themeClasses.accent} ${themeClasses.accentHover} transition-colors duration-300 cursor-pointer rounded-full flex items-center justify-center`} onClick={openEmail}>
                      <i className="fas fa-envelope text-gray-500"></i>
                    </div>
                    <div>
                      <p className={`text-sm ${themeClasses.secondaryText}`}>Email</p>
                      <p className="font-medium">contact.marcosmenezes@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${themeClasses.accent} ${themeClasses.accentHover} transition-colors duration-300 cursor-pointer rounded-full flex items-center justify-center`} onClick={openLocation}>
                      <i className="fas fa-map-marker-alt text-gray-500"></i>
                    </div>
                    <div>
                      <p className={`text-sm ${themeClasses.secondaryText}`}>Location</p>
                      <p className="font-medium">Hortolândia, SP | Campinas, SP</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  {['github', 'linkedin', 'instagram'].map((platform, _) => (
                    <div
                      className={`w-12 h-12 ${themeClasses.accent} ${themeClasses.accentHover} rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer`}
                      onClick={() => { openPlatform(platform) }}
                    >
                      <i className={`fab fa-${platform} text-lg`}></i>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${themeClasses.card} p-6 rounded-lg`}>
                <h4 className="font-bold mb-2">Available for</h4>
                <p className={`${themeClasses.secondaryText} text-sm mb-4`}>
                  I'm currently accepting new projects and freelance work. If you have an interesting project, let's discuss it!
                </p>
                <button className="text-gray-500 hover:text-gray-400 transition-colors duration-300 flex items-center space-x-2 cursor-wait !rounded-button whitespace-nowrap">
                  <span>Still working on the resume</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${themeClasses.border}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className={themeClasses.secondaryText}>
                © {new Date().getFullYear()} Marcos Menezes. All rights reserved.
              </p>
            </div>
            <div className={themeClasses.secondaryText}>
              <p>Built with <span className="text-red-500">♥</span> by Marcos Menezes</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center p-4 md:p-8">
          <div className={`${themeClasses.card} rounded-lg w-full max-w-4xl h-[80vh] overflow-y-auto`}>
            <div className="relative">
              <button 
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors duration-300 z-10 cursor-pointer !rounded-button whitespace-nowrap"
                onClick={() => setActiveProject(null)}
              >
                <i className="fas fa-times"></i>
              </button>
              <img 
                src={projects.find(p => p.id === activeProject)?.image} 
                alt={projects.find(p => p.id === activeProject)?.title} 
                className="w-full h-[40vh] object-cover object-top"
              />
            </div>
            <div className="p-8">
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {projects.find(p => p.id === activeProject)?.category}
              </span>
              <h2 className="text-2xl font-bold mt-2 mb-4">
                {projects.find(p => p.id === activeProject)?.title}
              </h2>
              <p className={`${themeClasses.secondaryText} mb-6`}>
                {projects.find(p => p.id === activeProject)?.description}
              </p>
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {projects.find(p => p.id === activeProject)?.technologies.map((tech, index) => (
                    <span key={index} className={`text-sm ${themeClasses.accent} px-4 py-1 rounded-full`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <div 
                  className={`${themeClasses.button} cursor-pointer px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 !rounded-button whitespace-nowrap`}
                  onClick={() => { openProject(projects.find(p => p.id === activeProject)?.title, 'live') }}
                >
                  <span>View Live Demo</span>
                  <i className="fas fa-external-link-alt"></i>
                </div>
                <div 
                  className={`border ${themeClasses.border} cursor-pointer px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 !rounded-button whitespace-nowrap`}
                  onClick={() => { openProject(projects.find(p => p.id === activeProject)?.title, 'github') }}
                >
                  <span>View Source</span>
                  <i className="fab fa-github"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App
