/* ========================================
   ForgeYourParents - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimations();
    initParallaxBackground();
    initTerminalAnimation();
    initCarouselDuplication();
    initSmoothScroll();
    initHeaderScroll();
});

/* ========================================
   FADE-IN ANIMATIONS (Intersection Observer)
   ======================================== */
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
}

/* ========================================
   PARALLAX BACKGROUND
   ======================================== */
function initParallaxBackground() {
    const gridBackgrounds = document.querySelectorAll('.grid-background');

    if (!gridBackgrounds.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                gridBackgrounds.forEach(grid => {
                    const parallaxSpeed = 0.1;
                    grid.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ========================================
   TERMINAL ANIMATION
   ======================================== */
function initTerminalAnimation() {
    const terminal = document.querySelector('.terminal');

    if (!terminal) return;

    const observerOptions = {
        threshold: 0.5
    };

    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lines = entry.target.querySelectorAll('.terminal-line');
                lines.forEach((line, index) => {
                    line.style.animationDelay = `${0.5 + index * 0.5}s`;
                });
                terminalObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    terminalObserver.observe(terminal);
}

/* ========================================
   CAROUSEL DUPLICATION (Infinite Scroll)
   ======================================== */
function initCarouselDuplication() {
    const carouselTrack = document.querySelector('.carousel-track');

    if (!carouselTrack) return;

    // Duplicate the content for seamless infinite scroll
    const items = carouselTrack.innerHTML;
    carouselTrack.innerHTML = items + items;
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   HEADER SCROLL EFFECT
   ======================================== */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                } else {
                    header.style.boxShadow = 'none';
                }
                lastScrollY = window.scrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ========================================
   LOTTIE INITIALIZATION (if using lottie-web)
   ======================================== */
function initLottieAnimations() {
    // Hero animation
    const heroLottie = document.getElementById('hero-lottie');
    if (heroLottie && typeof lottie !== 'undefined') {
        lottie.loadAnimation({
            container: heroLottie,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/lottie/hero-connection.json'
        });
    }

    // Shield animation
    const shieldLottie = document.getElementById('shield-lottie');
    if (shieldLottie && typeof lottie !== 'undefined') {
        lottie.loadAnimation({
            container: shieldLottie,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/lottie/shield-scan.json'
        });
    }
}

/* ========================================
   PRICING CARD HOVER EFFECT
   ======================================== */
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

/* ========================================
   TESTIMONIAL CAROUSEL MOMENTUM
   ======================================== */
function initMomentumCarousel() {
    const container = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');

    if (!container || !track) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let rafId = null;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        cancelAnimationFrame(rafId);
        track.style.animationPlayState = 'paused';
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
        // Resume animation after drag
        setTimeout(() => {
            track.style.animationPlayState = 'running';
        }, 2000);
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}
