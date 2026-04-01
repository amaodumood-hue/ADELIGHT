import React, { useEffect, useState } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Intersection Observer for reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: observer.unobserve(entry.target); if we only want it to animate once
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .process-section').forEach(el => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor hidden md:block ${isHovering ? 'hovering' : ''}`} 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>

      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0F1E]/90 backdrop-blur-md py-4 border-b border-[rgba(245,168,0,0.15)]' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 text-2xl font-bold font-heading">
            <span className="text-[#F5A800]">ADE</span>
            <i className="ri-flashlight-fill text-[#00C2FF]"></i>
            <span className="text-white">LIGHT</span>
          </a>
          <nav className="hidden md:flex gap-8" role="navigation">
            <a href="#services" className="text-sm font-body text-[#E0E6ED] hover:text-[#F5A800] transition-colors">Services</a>
            <a href="#expertise" className="text-sm font-body text-[#E0E6ED] hover:text-[#F5A800] transition-colors">Expertise</a>
            <a href="#projects" className="text-sm font-body text-[#E0E6ED] hover:text-[#F5A800] transition-colors">Projects</a>
            <a href="#process" className="text-sm font-body text-[#E0E6ED] hover:text-[#F5A800] transition-colors">Process</a>
          </nav>
          <a href="#contact" className="hidden md:inline-block bg-[#F5A800] text-[#060B18] px-6 py-2 rounded-sm font-bold font-body text-sm uppercase tracking-wider hover:bg-[#00C2FF] hover:text-white hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all">
            Get a Quote
          </a>
          <button className="md:hidden text-white text-2xl" aria-label="Menu">
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </header>

      <main role="main">
        {/* Hero Section */}
        <section id="hero" className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden clip-bottom bg-[#0A0F1E]">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop" alt="Electrical Engineering Background" className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#0A0F1E]/80 to-[#0A0F1E]"></div>
          </div>
          <div className="container mx-auto relative z-10 max-w-4xl text-center reveal">
            <div className="inline-block mb-6 px-4 py-1 border border-[#F5A800]/30 rounded-full bg-[#F5A800]/10 text-[#F5A800] font-mono text-xs tracking-widest uppercase">
              Ingénierie Électrique — Cotonou, Bénin
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6">
              Precision Engineering.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A800] to-[#00C2FF]">Powerful Solutions.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8A94A6] mb-10 max-w-2xl mx-auto font-body">
              Delivering certified electrical installations, smart energy systems, and industrial power solutions across West Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-[#F5A800] text-[#060B18] px-8 py-4 rounded-sm font-bold font-body uppercase tracking-wider hover:bg-[#00C2FF] hover:text-white hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] transition-all flex items-center justify-center gap-2">
                Start Your Project <i className="ri-arrow-right-line"></i>
              </a>
              <a href="#projects" className="border border-[#8A94A6]/30 text-white px-8 py-4 rounded-sm font-bold font-body uppercase tracking-wider hover:border-[#F5A800] hover:text-[#F5A800] transition-all flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm">
                View Our Work
              </a>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-[#F5A800] h-11 overflow-hidden flex items-center">
          <div className="animate-marquee whitespace-nowrap text-[#060B18] font-mono text-sm tracking-[0.15em] font-bold uppercase">
            ELECTRICAL DESIGN &nbsp;·&nbsp; INSTALLATION &nbsp;·&nbsp; SMART SYSTEMS &nbsp;·&nbsp; SOLAR ENERGY &nbsp;·&nbsp; MAINTENANCE &nbsp;·&nbsp; INDUSTRIAL ENGINEERING &nbsp;·&nbsp; ELECTRICAL DESIGN &nbsp;·&nbsp; INSTALLATION &nbsp;·&nbsp; SMART SYSTEMS &nbsp;·&nbsp; SOLAR ENERGY &nbsp;·&nbsp; MAINTENANCE &nbsp;·&nbsp; INDUSTRIAL ENGINEERING &nbsp;·&nbsp;
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-[#060B18]">
          <div className="container mx-auto">
            <div className="text-center mb-16 reveal">
              <div className="font-mono text-[#F5A800] text-sm tracking-widest mb-4">01 — Services</div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Comprehensive Power Solutions</h2>
              <p className="text-[#8A94A6] max-w-2xl mx-auto">From concept to commissioning, we provide end-to-end electrical engineering services tailored to your specific requirements.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: 'ri-pencil-ruler-2-line', title: 'Electrical Design', desc: 'Detailed schematics, load calculations, and compliance planning for new builds and renovations.' },
                { icon: 'ri-tools-line', title: 'Installation & Wiring', desc: 'Safe, certified execution of complex wiring systems for commercial and industrial facilities.' },
                { icon: 'ri-sun-line', title: 'Solar & Renewable', desc: 'Design and deployment of solar PV systems and battery storage for energy independence.' },
                { icon: 'ri-home-gear-line', title: 'Smart Systems', desc: 'Home and building automation, integrating lighting, security, and climate control.' },
                { icon: 'ri-settings-4-line', title: 'Maintenance', desc: 'Preventative maintenance, fault finding, and emergency repairs to minimize downtime.' },
                { icon: 'ri-factory-line', title: 'Industrial Power', desc: 'High-voltage distribution, motor control centers, and heavy machinery integration.' }
              ].map((service, i) => (
                <div key={i} className="bg-[#0A0F1E] border border-[#F5A800]/10 p-8 rounded-sm hover:border-[#F5A800]/50 hover:-translate-y-2 transition-all duration-300 reveal" style={{transitionDelay: `${i * 100}ms`}}>
                  <div className="w-14 h-14 bg-[#F5A800]/10 rounded-full flex items-center justify-center mb-6 text-[#F5A800] text-2xl">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-[#8A94A6] text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise / Why Us */}
        <section id="expertise" className="py-24 px-6 bg-[#0A0F1E] clip-top clip-bottom">
          <div className="container mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 reveal">
              <div className="font-mono text-[#F5A800] text-sm tracking-widest mb-4">02 — Expertise</div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Built on Standards.<br/>Driven by Innovation.</h2>
              <p className="text-[#8A94A6] mb-8 text-lg">We don't just install cables; we engineer resilient power ecosystems. Our team adheres to the highest international safety standards, ensuring your infrastructure is future-proof.</p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-[#F5A800] mt-1"></i>
                  <div>
                    <strong className="text-white block font-heading">Certified Engineers</strong>
                    <span className="text-[#8A94A6] text-sm">Fully licensed professionals with decades of combined experience.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-[#F5A800] mt-1"></i>
                  <div>
                    <strong className="text-white block font-heading">Transparent Pricing</strong>
                    <span className="text-[#8A94A6] text-sm">Detailed, itemized quotes with no hidden costs.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="relative mt-1">
                    <i className="ri-checkbox-circle-fill text-[#F5A800] relative z-10"></i>
                    <span className="pulsing-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></span>
                  </div>
                  <div>
                    <strong className="text-white block font-heading">24/7 Emergency Support</strong>
                    <span className="text-[#8A94A6] text-sm">Rapid response teams ready to resolve critical power failures.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 reveal" style={{transitionDelay: '200ms'}}>
              <div className="bg-[#060B18] p-8 rounded-sm border border-[#F5A800]/10 text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#F5A800] mb-2">150+</div>
                <div className="text-[#8A94A6] text-sm font-mono uppercase tracking-wider">Projects Completed</div>
              </div>
              <div className="bg-[#060B18] p-8 rounded-sm border border-[#F5A800]/10 text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#F5A800] mb-2">10</div>
                <div className="text-[#8A94A6] text-sm font-mono uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="bg-[#060B18] p-8 rounded-sm border border-[#F5A800]/10 text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#F5A800] mb-2">100%</div>
                <div className="text-[#8A94A6] text-sm font-mono uppercase tracking-wider">Safety Record</div>
              </div>
              <div className="bg-[#060B18] p-8 rounded-sm border border-[#F5A800]/10 text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#F5A800] mb-2">24/7</div>
                <div className="text-[#8A94A6] text-sm font-mono uppercase tracking-wider">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="py-24 px-6 bg-[#060B18]">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
              <div>
                <div className="font-mono text-[#F5A800] text-sm tracking-widest mb-4">03 — Projects</div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">Featured Work</h2>
              </div>
              <a href="#" className="text-[#F5A800] hover:text-white transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-wider mt-6 md:mt-0">
                View All Projects <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'ri-building-line', grad: 'linear-gradient(135deg, #0D1A2E, #1A2A40)', cat: 'Commercial', name: 'Grand Tower Office Complex', loc: 'Cotonou, Benin', scope: 'Full Electrical Installation' },
                { icon: 'ri-factory-line', grad: 'linear-gradient(160deg, #0A1520, #162030)', cat: 'Industrial', name: 'SOBEMAP Port Facility', loc: 'Porto-Novo, Benin', scope: 'HV Distribution System' },
                { icon: 'ri-sun-line', grad: 'linear-gradient(120deg, #1A1200, #201800)', cat: 'Renewable', name: '50kWp Solar Microgrid', loc: 'Parakou, Benin', scope: 'Solar PV + Battery Storage' },
                { icon: 'ri-hospital-line', grad: 'linear-gradient(145deg, #0D1828, #0A1420)', cat: 'Healthcare', name: 'Clinique Bénin Medical Centre', loc: 'Cotonou, Benin', scope: 'Critical Power Systems' },
                { icon: 'ri-home-gear-line', grad: 'linear-gradient(130deg, #101A10, #182018)', cat: 'Residential', name: 'Luxury Villa Complex', loc: 'Calavi, Benin', scope: 'Smart Home Electrical' },
                { icon: 'ri-government-line', grad: 'linear-gradient(155deg, #0D1420, #131C2C)', cat: 'Public Sector', name: 'Municipal Street Lighting', loc: 'Abomey-Calavi', scope: 'LED Smart Lighting Network' }
              ].map((proj, i) => (
                <div key={i} className="project-card bg-[#0A0F1E] border border-[#F5A800]/10 rounded-sm overflow-hidden group cursor-pointer reveal" style={{transitionDelay: `${i * 100}ms`}}>
                  <div className="h-48 relative flex items-center justify-center overflow-hidden" style={{background: proj.grad}}>
                    <i className={`${proj.icon} project-icon text-6xl text-white opacity-40 transition-all duration-400 ease-in-out`}></i>
                    <div className="absolute top-4 left-4 bg-[#060B18]/80 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-mono text-[#F5A800] uppercase tracking-wider border border-[#F5A800]/20">
                      {proj.cat}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{proj.name}</h3>
                    <div className="flex items-center gap-2 text-[#8A94A6] text-sm mb-4">
                      <i className="ri-map-pin-line text-[#F5A800]"></i> {proj.loc}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-[#F5A800]/10">
                      <span className="text-xs text-[#8A94A6] bg-[#F5A800]/5 px-2 py-1 rounded-sm">{proj.scope}</span>
                      <span className="text-[#F5A800] text-sm font-bold flex items-center gap-1 group-hover:text-[#00C2FF] transition-colors">
                        Details <i className="ri-arrow-right-line project-arrow transition-transform duration-400"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-28 px-6 bg-[#060B18] process-section">
          <div className="container mx-auto">
            <div className="text-center mb-20 reveal">
              <div className="font-mono text-[#F5A800] text-sm tracking-widest mb-4">04 — Process</div>
              <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-heading font-bold text-white mb-4">From Brief to Energised.</h2>
              <p className="text-[#8A94A6] max-w-2xl mx-auto">A structured, transparent engineering process — every project, every time.</p>
            </div>

            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block process-line"></div>
              
              <div className="flex flex-col md:flex-row justify-between relative z-10 gap-10 md:gap-4">
                {/* Mobile Connecting Line */}
                <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-[repeating-linear-gradient(180deg,var(--color-secondary)_0,var(--color-secondary)_8px,transparent_8px,transparent_16px)] z-0"></div>

                {[
                  { icon: 'ri-file-list-3-line', num: '01', title: 'Discovery & Brief', desc: 'We assess your project scope, site requirements, and goals.' },
                  { icon: 'ri-draft-line', num: '02', title: 'Engineering Design', desc: 'Certified engineers produce compliant schematics and specifications.' },
                  { icon: 'ri-money-euro-circle-line', num: '03', title: 'Quotation & Sign-off', desc: 'Clear, itemised pricing. No surprises, no hidden costs.' },
                  { icon: 'ri-tools-fill', num: '04', title: 'Installation', desc: 'Our certified teams execute with precision and full safety compliance.' },
                  { icon: 'ri-checkbox-circle-line', num: '05', title: 'Testing & Handover', desc: 'Full commissioning, testing, documentation, and client training.' }
                ].map((step, i) => (
                  <div key={i} className="flex flex-row md:flex-col items-center md:items-center gap-6 md:gap-4 reveal relative z-10" style={{transitionDelay: `${i * 120}ms`}}>
                    <div className="flex flex-col items-center">
                      <div className="font-mono text-[#F5A800] text-xs tracking-[0.15em] mb-2 bg-[#060B18] px-2">{step.num}</div>
                      <div className={`w-16 h-16 rounded-full border-[1.5px] border-[#F5A800] flex items-center justify-center bg-[#060B18] ${i === 0 ? 'bg-[#F5A800]/15 shadow-[0_0_20px_rgba(245,168,0,0.3)]' : 'bg-[#F5A800]/5'}`}>
                        <i className={`${step.icon} text-[1.6rem] text-[#F5A800] ${i === 0 ? 'drop-shadow-[0_0_8px_rgba(245,168,0,0.8)]' : ''}`}></i>
                      </div>
                    </div>
                    <div className="md:text-center mt-2 md:mt-0">
                      <h3 className="text-base font-heading font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-[#8A94A6] text-[0.85rem] md:max-w-[160px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact / CTA Section */}
        <section id="contact" className="py-28 px-6 bg-[#0A0F1E] border-t-2 border-[#F5A800]/25">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left Column */}
              <div className="lg:w-[55%] reveal">
                <div className="font-mono text-[#F5A800] text-sm tracking-widest mb-4">05 — Contact</div>
                <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-heading font-bold text-white mb-6 leading-tight">Let's Build Something Powerful.</h2>
                <p className="text-[#8A94A6] text-base leading-[1.8] max-w-[460px] mb-10">
                  Whether you're planning a new installation, need an urgent inspection, or want to explore smart energy solutions — ADELIGHT is ready. Reach out for a free initial consultation.
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4">
                    <i className="ri-map-pin-line text-[#F5A800] text-xl"></i>
                    <span className="text-[#E0E6ED] text-[0.95rem]">Cotonou, Benin — serving all regions</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <i className="ri-phone-line text-[#F5A800] text-xl"></i>
                    <span className="text-[#E0E6ED] text-[0.95rem]">+229 00 00 00 00</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <i className="ri-mail-line text-[#F5A800] text-xl"></i>
                    <span className="text-[#E0E6ED] text-[0.95rem]">contact@adelight.bj</span>
                  </div>
                </div>

                <div className="flex gap-3 mb-12">
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-sm bg-[#F5A800]/10 text-[#F5A800] flex items-center justify-center hover:bg-[#F5A800] hover:text-[#060B18] transition-colors">
                    <i className="ri-linkedin-box-fill text-xl"></i>
                  </a>
                  <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-sm bg-[#F5A800]/10 text-[#F5A800] flex items-center justify-center hover:bg-[#F5A800] hover:text-[#060B18] transition-colors">
                    <i className="ri-facebook-circle-fill text-xl"></i>
                  </a>
                  <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-sm bg-[#F5A800]/10 text-[#F5A800] flex items-center justify-center hover:bg-[#F5A800] hover:text-[#060B18] transition-colors">
                    <i className="ri-whatsapp-line text-xl"></i>
                  </a>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center gap-2">
                    <i className="ri-shield-check-line text-[#F5A800]"></i>
                    <span className="text-[#8A94A6] text-[0.75rem] uppercase tracking-[0.08em]">Certified Engineers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-award-line text-[#F5A800]"></i>
                    <span className="text-[#8A94A6] text-[0.75rem] uppercase tracking-[0.08em]">Fully Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-team-line text-[#F5A800]"></i>
                    <span className="text-[#8A94A6] text-[0.75rem] uppercase tracking-[0.08em]">10-Year Warranty</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:w-[45%] reveal" style={{transitionDelay: '200ms'}}>
                <div className="bg-[#060B18] p-8 rounded-sm border-l-[3px] border-l-[#F5A800] shadow-2xl">
                  <h3 className="text-[1.3rem] font-heading font-bold text-white mb-6">Request a Free Quote</h3>
                  
                  {formSubmitted ? (
                    <div className="py-12 text-center text-[#F5A800] font-heading text-[1.1rem]">
                      ✓ Message received — we'll be in touch within 24 hours.
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <input type="text" id="name" required placeholder="Jean Koffi" />
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input type="email" id="email" required placeholder="jean@company.com" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="sr-only">Phone Number</label>
                        <input type="tel" id="phone" required placeholder="+229 __ __ __ __" />
                      </div>
                      <div>
                        <label htmlFor="projectType" className="sr-only">Project Type</label>
                        <select id="projectType" required className="appearance-none">
                          <option value="" disabled selected>Select Project Type...</option>
                          <option value="Electrical Design">Electrical Design</option>
                          <option value="Installation">Installation</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Solar System">Solar System</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea id="message" rows={5} required placeholder="Briefly describe your project..."></textarea>
                      </div>
                      <button type="submit" className="w-full bg-[#F5A800] text-[#060B18] font-body font-bold text-[0.9rem] uppercase tracking-[0.12em] py-4 rounded-sm hover:bg-[#00C2FF] hover:text-white hover:shadow-[0_0_30px_rgba(0,194,255,0.3)] transition-all duration-300 mt-2">
                        Send My Request →
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="site-footer" className="bg-[#030710] pt-16 pb-8 px-6 border-t border-[#F5A800]/15">
        <div className="container mx-auto">
          {/* Upper Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Col 1 */}
            <div>
              <a href="#" className="flex items-center gap-2 text-2xl font-bold font-heading mb-3">
                <span className="text-[#F5A800]">ADE</span>
                <i className="ri-flashlight-fill text-[#00C2FF]"></i>
                <span className="text-white">LIGHT</span>
              </a>
              <div className="font-body italic text-[0.9rem] text-[#8A94A6] mb-4">Precision. Power. Progress.</div>
              <p className="font-body text-[0.85rem] text-[#8A94A6] leading-[1.7] max-w-xs">
                ADELIGHT is Benin's trusted electrical engineering partner for industrial, commercial, and residential projects.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-heading text-[0.9rem] text-white uppercase tracking-[0.1em] mb-6">Services</h4>
              <ul className="space-y-3">
                {['Electrical Design', 'Installation & Wiring', 'Smart Energy', 'Maintenance', 'Solar Systems', 'Industrial Engineering'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="font-body text-[0.85rem] text-[#8A94A6] hover:text-[#F5A800] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-heading text-[0.9rem] text-white uppercase tracking-[0.1em] mb-6">Company</h4>
              <ul className="space-y-3">
                {['About ADELIGHT', 'Our Projects', 'How We Work', 'Certifications', 'Careers', 'Contact Us'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="font-body text-[0.85rem] text-[#8A94A6] hover:text-[#F5A800] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-heading text-[0.9rem] text-white uppercase tracking-[0.1em] mb-6">Get in Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-[0.6rem]">
                  <i className="ri-map-pin-2-line text-[#F5A800] mt-[2px]"></i>
                  <span className="font-body text-[0.85rem] text-[#8A94A6]">Cotonou, République du Bénin</span>
                </li>
                <li className="flex items-center gap-[0.6rem]">
                  <i className="ri-phone-line text-[#F5A800]"></i>
                  <span className="font-body text-[0.85rem] text-[#8A94A6]">+229 00 00 00 00</span>
                </li>
                <li className="flex items-center gap-[0.6rem]">
                  <i className="ri-mail-send-line text-[#F5A800]"></i>
                  <span className="font-body text-[0.85rem] text-[#8A94A6]">contact@adelight.bj</span>
                </li>
                <li className="flex items-center gap-[0.6rem]">
                  <i className="ri-time-line text-[#F5A800]"></i>
                  <span className="font-body text-[0.85rem] text-[#8A94A6]">Mon–Fri, 8:00 – 18:00</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Lower Footer */}
          <div className="pt-8 border-t border-[#F5A800]/15 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-body text-[0.78rem] text-[#8A94A6]">
              © 2025 ADELIGHT Ingénierie Électrique. All rights reserved.
            </div>
            <div className="flex gap-3">
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-sm bg-[#F5A800]/10 text-[#F5A800] flex items-center justify-center hover:bg-[#F5A800] hover:text-[#060B18] transition-colors">
                <i className="ri-linkedin-box-fill"></i>
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-sm bg-[#F5A800]/10 text-[#F5A800] flex items-center justify-center hover:bg-[#F5A800] hover:text-[#060B18] transition-colors">
                <i className="ri-facebook-circle-fill"></i>
              </a>
              <a href="#" aria-label="WhatsApp" className="w-8 h-8 rounded-sm bg-[#F5A800]/10 text-[#F5A800] flex items-center justify-center hover:bg-[#F5A800] hover:text-[#060B18] transition-colors">
                <i className="ri-whatsapp-line"></i>
              </a>
            </div>
            <div className="font-body text-[0.78rem] text-[#8A94A6] italic">
              Designed for performance. Built with precision.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-sm bg-[#F5A800] text-[#060B18] flex items-center justify-center hover:bg-[#00C2FF] hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <i className="ri-arrow-up-line text-[1.4rem]"></i>
      </button>
    </div>
  );
}
