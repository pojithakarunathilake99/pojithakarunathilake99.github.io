document.addEventListener('DOMContentLoaded', function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typing effect
    const typed = document.querySelector('.typed');
    if (typed) {
        const words = typed.dataset.words.split('|');
        if (reduceMotion) {
            typed.textContent = words[0];
        } else {
            let w = 0, i = 0, deleting = false;
            (function tick() {
                const word = words[w];
                i += deleting ? -1 : 1;
                typed.textContent = word.slice(0, i);
                let delay = deleting ? 40 : 85;
                if (!deleting && i === word.length) { deleting = true; delay = 1800; }
                else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
                setTimeout(tick, delay);
            })();
        }
    }

    // Mobile menu
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    function setMenu(open) {
        links.classList.toggle('open', open);
        nav.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

    // Navbar background on scroll
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active nav link
    const navLinks = links.querySelectorAll('a[href^="#"]');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

    // Reveal on scroll
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
