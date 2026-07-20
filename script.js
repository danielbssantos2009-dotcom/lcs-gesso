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
                
                // If it's a stat item, trigger number animation
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    animateValue(statNumber);
                }
                
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
    
    // Number animation function
    function animateValue(obj) {
        const target = parseInt(obj.getAttribute('data-target'));
        const suffix = obj.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            obj.innerHTML = Math.floor(easeProgress * target) + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = target + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Masterpiece Gallery Interactions
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        const activateCard = () => {
            galleryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        };
        
        card.addEventListener('mouseenter', activateCard);
        card.addEventListener('click', activateCard);
    });
});
