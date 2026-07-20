document.addEventListener('DOMContentLoaded', () => {
    // Video fade on scroll
    const heroSection = document.querySelector('.hero-video-section');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        // Navbar glassmorphism effect
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Hero fade on scroll
        if (heroSection) {
            let height = window.innerHeight;
            
            // Fade starts at 60% of viewport height and ends at 95%
            let startFade = height * 0.6;
            let endFade = height * 0.95;
            
            let opacity = 1;
            if (scrollY > startFade) {
                opacity = 1 - ((scrollY - startFade) / (endFade - startFade));
            }
            
            if (opacity < 0) opacity = 0;
            if (opacity > 1) opacity = 1;
            
            heroSection.style.opacity = opacity;
        }
    });

    // Intersection Observer for fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
});
