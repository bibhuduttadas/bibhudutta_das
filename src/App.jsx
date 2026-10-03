import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  ExternalLink, 
  Terminal, 
  Database, 
  Cloud, 
  Smartphone,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container">
      <div className="gradient-bg" style={{ transform: `translateY(${y})` }} />

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="#top" className="brand" onClick={() => setMobileMenuOpen(false)}>
            <span className="brand-dot"></span>
            Bibhudutta Das
          </a>
          <div className="nav-links">
            <a href="#work" className="nav-item">Work</a>
            <a href="#stack" className="nav-item">Stack</a>
            <a href="#about" className="nav-item">About</a>
          </div>
          <div className="nav-actions">
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="icon-btn mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mobile-menu"
            >
              <a href="#work" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Work</a>
              <a href="#stack" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>Stack</a>
              <a href="#about" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>About</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="top">
        {/* Hero Section */}
        <section className="hero container">
          <div className="hero-content">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="hero-badge">
                <span className="pulse-dot"></span>
                Technology • Products • Digital Transformation
              </motion.div>
              <motion.h1 variants={fadeUp}>
                I build <span className="hero-highlight">real-world software</span> that connects people, data and operations.
              </motion.h1>
              <motion.p variants={fadeUp}>
                I'm Bibhudutta Das, a technology professional and software builder based in Odisha, India. I work across product engineering, mobile and web applications, cloud systems, and operational platforms.
              </motion.p>
              <motion.div variants={fadeUp} className="hero-actions">
                <a href="#work" className="btn btn-primary">
                  Explore my work <ExternalLink size={18} />
                </a>
                <a href="https://github.com/bibhuduttadas" target="_blank" rel="noreferrer" className="btn btn-outline">
                  <GithubIcon size={18} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/bibhudutta-das-897400184/" target="_blank" rel="noreferrer" className="btn btn-outline">
                  <LinkedinIcon size={18} /> LinkedIn
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hero-image-container"
            >
              <div className="hero-image-wrapper glass">
                <img src="https://github.com/bibhuduttadas.png" alt="Bibhudutta Das" className="hero-image" onError={(e) => e.target.src = 'https://avatars.githubusercontent.com/u/0?v=4'} />
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="floating-card top-right glass"
              >
                <div className="icon-box"><Terminal size={20} /></div>
                <div>
                  <p>Full Stack</p>
                  <span>Development</span>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="floating-card bottom-left glass"
              >
                <div className="icon-box"><Database size={20} /></div>
                <div>
                  <p>Data Systems</p>
                  <span>Architecture</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Ticker */}
        <div className="ticker-container">
          <div className="ticker-track">
            {Array(5).fill(0).map((_, i) => (
              <span key={i} className="ticker-item">
                PRODUCT ENGINEERING <span className="ticker-star">✦</span>
                SMART GOVERNANCE <span className="ticker-star">✦</span>
                FLEET & LOGISTICS <span className="ticker-star">✦</span>
                CLOUD SYSTEMS <span className="ticker-star">✦</span>
                AI & AUTOMATION <span className="ticker-star">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Work Section */}
        <section id="work" className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="section-subtitle">01 / Selected Work</span>
            <h2 className="section-title">Systems built for the real world.</h2>
            <p style={{ maxWidth: '600px', color: 'var(--text-secondary)' }}>
              From operational workflows to enterprise platforms, I focus on software that has a clear operational purpose and measurable day-to-day value.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="work-grid"
          >
            <motion.article variants={fadeUp} className="project-card featured">
              <div>
                <span className="project-tag">FLAGSHIP PROJECT</span>
                <h3 className="project-title">Smart Vehicle Management System</h3>
                <p className="project-desc">A digital fleet operations platform designed around vehicle movement, approvals, GPS telemetry, driver workflows and administrative control. Bringing operational data into one place for faster decisions.</p>
                <div className="project-tech">
                  <span className="tech-pill">React</span>
                  <span className="tech-pill">Node.js</span>
                  <span className="tech-pill">IoT / Telemetry</span>
                  <span className="tech-pill">PostgreSQL</span>
                </div>
                <a href="#contact" className="btn btn-outline">Discuss System ↗</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                  <Smartphone size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
                  <h4>Mobile Apps</h4>
                </div>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                  <Cloud size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
                  <h4>API Layer</h4>
                </div>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                  <Database size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
                  <h4>Operations DB</h4>
                </div>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
                  <Terminal size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
                  <h4>Dashboards</h4>
                </div>
              </div>
            </motion.article>

            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Enterprise Ecosystem</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Fleet & Vehicle Pooling Systems</h3>
              <p className="project-desc">Architected a comprehensive vehicle pooling ecosystem containing interconnected platforms: <strong>PoolVehicle User, Driver, and Admin Apps</strong>, powered by a robust <strong>PoolTaxiBackend</strong> and Traccar GPS integration for real-time routing.</p>
              <div className="project-tech">
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">JavaScript</span>
                <span className="tech-pill">Dart / Flutter</span>
                <span className="tech-pill">Traccar</span>
              </div>
            </motion.article>

            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Civic Tech</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Municipal Operations (BMC)</h3>
              <p className="project-desc">Developed end-to-end municipal platforms comprising Angular web interfaces, specialized <strong>NestJS</strong> backend reporting engines (<strong>bmc_backend_nest</strong>), and field-level driver applications for civic waste workflows.</p>
              <div className="project-tech">
                <span className="tech-pill">Angular</span>
                <span className="tech-pill">NestJS</span>
                <span className="tech-pill">TypeScript</span>
              </div>
            </motion.article>
            
            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Enterprise B2B</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Corporate Portals & SAP Integrations</h3>
              <p className="project-desc">Engineered large-scale enterprise portals for major corporations (<strong>JSW</strong>, <strong>TSBSL</strong>), including specialized Vahan portals, backend architectures via <strong>Hasura</strong>, and automated <strong>bulk SAP invoice</strong> processing systems.</p>
              <div className="project-tech">
                <span className="tech-pill">Hasura / GraphQL</span>
                <span className="tech-pill">SAP Integration</span>
                <span className="tech-pill">Vue.js</span>
              </div>
            </motion.article>

            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">EdTech & Gov</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Odisha Quest & State Portals</h3>
              <p className="project-desc">Built specialized government and educational tech platforms including the complete <strong>Odisha Quiz</strong> ecosystem, leveraging a robust TypeScript backend to serve massive concurrent user loads.</p>
              <div className="project-tech">
                <span className="tech-pill">TypeScript</span>
                <span className="tech-pill">JavaScript</span>
                <span className="tech-pill">Web Portals</span>
              </div>
            </motion.article>
            
            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Transit & Logistics</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Flying Chittal & Shuttle Transit</h3>
              <p className="project-desc">Built core logistics and passenger transit solutions including the <strong>Shuttle Bus ecosystem</strong> (Vue Admin, Kotlin Mobile, APIs), <strong>Flying_Chittal</strong> apps, and the <strong>YatriBhojan</strong> network.</p>
              <div className="project-tech">
                <span className="tech-pill">Kotlin</span>
                <span className="tech-pill">Vue.js</span>
                <span className="tech-pill">Dart / Flutter</span>
                <span className="tech-pill">C#</span>
              </div>
            </motion.article>

            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Immersive Tech</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Augmented Reality (WebAR)</h3>
              <p className="project-desc">Designed and deployed immersive <strong>WebAR</strong> experiences using the <strong>Blippar</strong> platform. Created interactive, browser-based augmented reality content that blends digital assets with the physical world without requiring dedicated mobile apps.</p>
              <div className="project-tech">
                <span className="tech-pill">WebAR</span>
                <span className="tech-pill">Blippar</span>
                <span className="tech-pill">JavaScript</span>
              </div>
              <a href="https://blipps.blippar.com/blipps/QmxpcHA6NTIzMTMw/view" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}><GithubIcon size={16} /> View AR Experience</a>
            </motion.article>

            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Commercial & Industrial</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Industrial & Booking Platforms</h3>
              <p className="project-desc">Engineered diverse solutions from industrial management (<strong>CoalApp</strong>), financial data interfaces (<strong>CapitalIQ</strong>), to commercial platforms like <strong>Fuzom</strong> delivery and <strong>Kaara Hotel Booking</strong>.</p>
              <div className="project-tech">
                <span className="tech-pill">JavaScript</span>
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
              </div>
            </motion.article>
            
            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Open Source</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Ticketing Microservice</h3>
              <p className="project-desc">A highly-concurrent, TypeScript-based backend service utilizing Docker for isolated containerized deployment. Designed for robust and secure ticket management workflows.</p>
              <div className="project-tech">
                <span className="tech-pill">TypeScript</span>
                <span className="tech-pill">Docker</span>
                <span className="tech-pill">Node.js</span>
              </div>
              <a href="https://github.com/bibhuduttadas/tikceting" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}><GithubIcon size={16} /> View Repo</a>
            </motion.article>

            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Open Source</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>Revu Platform</h3>
              <p className="project-desc">A modern web administration platform focusing on streamlined user workflows, built entirely with TypeScript and featuring automated shell scripts for continuous integration and seamless deployment.</p>
              <div className="project-tech">
                <span className="tech-pill">TypeScript</span>
                <span className="tech-pill">Shell</span>
                <span className="tech-pill">CI/CD</span>
              </div>
              <a href="https://github.com/bibhuduttadas/revu-latest" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}><GithubIcon size={16} /> View Repo</a>
            </motion.article>
            
            <motion.article variants={fadeUp} className="project-card">
              <span className="project-tag">Open Source</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem' }}>IUsedAPI & Firebase</h3>
              <p className="project-desc">API integration exercises and Firebase backend practice in Java.</p>
              <div className="project-tech">
                <span className="tech-pill">JavaScript</span>
                <span className="tech-pill">Java</span>
                <span className="tech-pill">Firebase</span>
              </div>
              <a href="https://github.com/bibhuduttadas/iusedapi" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}><GithubIcon size={16} /> View Repo</a>
            </motion.article>
          </motion.div>
        </section>

        {/* Stack Section */}
        <section id="stack" className="container stack-section">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="section-subtitle">02 / Technology</span>
            <h2 className="section-title">A practical, full-stack toolkit.</h2>
            <p style={{ maxWidth: '600px', color: 'var(--text-secondary)' }}>
              I work across the layers needed to take a product from interface to production infrastructure.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="stack-grid"
          >
            {[
              { num: '01', title: 'Frontend', desc: 'React • Angular • Vue.js • WebAR' },
              { num: '02', title: 'Backend', desc: 'Node.js • NestJS • Python / Django • ASP.NET' },
              { num: '03', title: 'Mobile Apps', desc: 'Kotlin • Dart (Flutter) • React Native' },
              { num: '04', title: 'Data & Auth', desc: 'PostgreSQL • Hasura / GraphQL • Firebase' },
              { num: '05', title: 'Immersive & Realtime', desc: 'Blippar AR • Traccar GPS • WebSockets' },
              { num: '06', title: 'Enterprise', desc: 'SAP Integrations • Cloud Run • Docker • AWS' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="stack-card">
                <div className="stack-number">{item.num}</div>
                <h3 className="stack-title">{item.title}</h3>
                <p className="stack-desc">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="container">
          <div className="about-grid">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <span className="section-subtitle">03 / About</span>
              <h2 className="section-title">Technology is useful when it makes the operation simpler.</h2>
              <div className="about-text">
                <p>My work sits at the intersection of software engineering and business operations. I enjoy taking a process that is spread across spreadsheets, phone calls, manual approvals and disconnected systems, then turning it into a clear digital workflow.</p>
                <p>That means thinking about the full picture: the user experience, backend architecture, data model, integrations, deployment, reporting and what happens when the system is used by real teams every day.</p>
                <div className="about-quote">
                  “Build the system around the work, not the other way around.”
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="timeline"
            >
              {[
                { num: '2016', title: 'Technology Foundation', desc: 'Started professional software engineering journey. Focused on building robust backend systems, databases, and core application logic.' },
                { num: '2019', title: 'Full-Stack & Mobile', desc: 'Expanded into full-stack product engineering and mobile app development (Flutter/React Native) for complex operational needs.' },
                { num: '2022', title: 'Enterprise Ecosystems', desc: 'Began architecting connected platforms involving vehicle telematics, Traccar GPS, SAP integrations, and cloud infrastructure.' },
                { num: 'Now', title: 'Senior Technical Lead', desc: 'Orchestrating massive B2B, civic, and commercial platforms. Turning complex operational requirements into highly scalable digital products.' }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="timeline-item">
                  <div className="timeline-dot">{item.num}</div>
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="contact-box glass"
          >
            <span className="section-subtitle">04 / Contact</span>
            <h2>Have a system that needs to be built?</h2>
            <p>Tell me what you are trying to solve. We can start with the workflow, the users and the outcome, then work backward into the technology.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a href="mailto:hello@atulyabhinav.com" className="btn btn-primary">
                <Mail size={18} /> Start a conversation
              </a>
              <a href="https://www.linkedin.com/in/bibhudutta-das-897400184/" target="_blank" rel="noreferrer" className="btn btn-outline">
                <LinkedinIcon size={18} /> Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer container">
        <div className="footer-content">
          <span>© {new Date().getFullYear()} Bibhudutta Das</span>
          <span>Built with curiosity & code.</span>
        </div>
      </footer>
    </div>
  );
}
