import './style.css'
import { portfolioData } from './portfolioData'
import { getReadmeImage } from './githubUtils'

const renderApp = () => {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  app.innerHTML = `
    <nav>
      <div class="logo">${portfolioData.name}</div>
      <div class="nav-links">
        <a href="#about">Yaklaşımım</a>
        <a href="#projects">Projeler</a>
        <a href="#contact">İletişim</a>
      </div>
    </nav>

    <main>
      <section class="hero fade-in">
        <div style="font-size: 0.9rem; font-weight: 500; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem;">
          ${portfolioData.title.toUpperCase()}
        </div>
        <h1>Dijital dünyada <br>anlamlı izler bırakıyorum.</h1>
        <p>${portfolioData.tagline}</p>
        <div style="font-weight: 600; font-size: 0.85rem; margin-top: 1rem;">
          <span style="color: #27ae60;">●</span> ${portfolioData.status}
        </div>
      </section>

      <section id="projects" class="fade-in">
        <h2>Seçili Projeler</h2>
        <div class="projects-grid">
          ${portfolioData.projects.map(p => `
            <a href="${p.link || (p.githubRepo ? `https://github.com/${p.githubRepo}` : '#')}" target="_blank" class="project-card" ${p.githubRepo ? `data-repo="${p.githubRepo}"` : ''}>
              <div class="project-image-container">
                <div class="project-image-placeholder"></div>
              </div>
              <h3>${p.title}</h3>
              <p>${p.description}</p>
            </a>
          `).join('')}
        </div>
      </section>

      <section id="about" class="fade-in">
        <h2>Yetenek & Yaklaşım</h2>
        <div class="skills-container" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          ${portfolioData.skills.map(s => `
            <div class="skill-item">
              <h4>${s.category}</h4>
              <ul class="skill-list">
                ${s.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>

      <section id="contact" class="fade-in">
        <h2>Bir projeniz mi var?</h2>
        <a href="mailto:${portfolioData.contact.email}" class="contact-link">Hadi Konuşalım.</a>
        <div style="margin-top: 4rem; display: flex; gap: 2rem;">
          ${portfolioData.contact.social.map(s => `
            <a href="${s.url}" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem;">${s.name}</a>
          `).join('')}
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; ${new Date().getFullYear()} ${portfolioData.name}. All rights reserved.</p>
    </footer>
  `;

  setupAnimations();
  loadProjectImages();
};

const loadProjectImages = async () => {
  const cards = document.querySelectorAll('.project-card[data-repo]');
  for (const card of cards) {
    const repo = card.getAttribute('data-repo');
    if (repo) {
      // Fetch in parallel essentially, but we loop. 
      // For better UX, maybe valid to do one by one or Promise.all if needed, 
      // but loop is safer to not hammer API if logic changes to more complex calls.
      // Actually, let's just call it and handle the promise result.
      getReadmeImage(repo).then(imageUrl => {
        if (imageUrl) {
          const container = card.querySelector('.project-image-container');
          if (container) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Project Screenshot';
            img.onload = () => img.classList.add('loaded');
            container.appendChild(img);
          }
        }
      });
    }
  }
};



const setupAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
  });

  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId as string);

      if (targetElement) {
        window.scrollTo({
          top: (targetElement as HTMLElement).offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
};

renderApp();
