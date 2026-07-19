document.addEventListener('DOMContentLoaded', () => {
    // Video fade on scroll
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            // Fades from 1 to 0 as you scroll down the height of the screen
            let scrollY = window.scrollY;
            let height = window.innerHeight;
            let opacity = 1 - (scrollY / (height * 0.8));
            if (opacity < 0) opacity = 0;
            if (opacity > 1) opacity = 1;
            heroVideo.style.opacity = opacity;
        });
    }

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
