/* ============================================================
   SCP-173 AI Behaviour — Assessment Submission
   Scroll animations & navigation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Scroll-triggered fade-in ----
    const fadeTargets = document.querySelectorAll(
        '.overview-card, .arch-branch, .service-card, .video-card, ' +
        '.step, .config-table-wrap, .rationale-box, .audio-layer, ' +
        '.kill-path, .camera-type, .state-card, .bb-keys, ' +
        '.how-it-works, .arch-base-class, .section-label, ' +
        '.section-title, .section-desc, .hero-meta'
    );

    fadeTargets.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach(el => observer.observe(el));

    // ---- Active nav link highlighting ----
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = '#d4a843';
                link.style.background = 'rgba(212, 168, 67, 0.1)';
            }
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // ---- Staggered fade-in for grid children ----
    const grids = document.querySelectorAll(
        '.overview-grid, .step-grid, .states-grid, .bb-grid, .audio-layers'
    );

    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, i) => {
                    child.style.transitionDelay = `${i * 0.08}s`;
                });
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    grids.forEach(grid => gridObserver.observe(grid));
});
