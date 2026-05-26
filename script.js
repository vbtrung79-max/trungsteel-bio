// ================================
// TRUNGSTEEL AI — LANDING PAGE JS
// Animations, FAQ, Navbar, Stats
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initFAQ();
    initCountUp();
    initParticles();
    initFormSubmit();
});

// --- NAVBAR SCROLL ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '20px 24px';
            navLinks.style.background = 'rgba(10,10,26,0.95)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.borderBottom = '1px solid var(--border)';
            navLinks.style.gap = '16px';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                // Close mobile menu
                if (window.innerWidth < 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// --- FAQ ACCORDION ---
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = '0';
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// --- COUNT UP ANIMATION ---
function initCountUp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCount(el, 0, target, 1500);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        observer.observe(el);
    });
}

function animateCount(el, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * eased);
        
        el.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// --- PARTICLES ---
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(108, 92, 231, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
        container.appendChild(particle);
    }
}

// --- FORM SUBMIT ---
function initFormSubmit() {
    const form = document.getElementById('cta-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const business = document.getElementById('form-business').value.trim();
        
        if (!name || !phone) {
            alert('Vui lòng nhập đầy đủ họ tên và số điện thoại!');
            return;
        }
        
        // Animate button
        submitBtn.innerHTML = '<span>✅ Đã gửi thành công!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #00D2FF, #6C5CE7)';
        submitBtn.disabled = true;
        
        // Show success message
        setTimeout(() => {
            const msg = document.createElement('div');
            msg.style.cssText = `
                margin-top: 20px;
                padding: 16px 24px;
                background: rgba(0, 210, 255, 0.1);
                border: 1px solid rgba(0, 210, 255, 0.3);
                border-radius: 12px;
                color: #00D2FF;
                font-size: 0.95rem;
                text-align: center;
            `;
            msg.textContent = `Cảm ơn ${name}! Anh Trung sẽ liên hệ bạn qua số ${phone} trong 24h tới. 🚀`;
            form.appendChild(msg);
        }, 500);
    });
}
