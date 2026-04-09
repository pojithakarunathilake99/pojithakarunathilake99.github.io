document.addEventListener('DOMContentLoaded', function () {

    // Typed.js
    if (document.querySelector('.typed')) {
        new Typed('.typed', {
            strings: document.querySelector('.typed').getAttribute('data-typed-items').split(','),
            typeSpeed: 90,
            backSpeed: 45,
            backDelay: 2000,
            loop: true
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 75, behavior: 'smooth' });
                // Close mobile nav if open
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse.classList.contains('show')) {
                    navCollapse.classList.remove('show');
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active nav link
        const scrollPos = window.scrollY;
        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < bottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Scroll-in animations
    const animatedEls = document.querySelectorAll(
        '.tutor-card, .guidance-card, .project-card, .expertise-card, .stat-pill'
    );
    animatedEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    function animateOnScroll() {
        animatedEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
