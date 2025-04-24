document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement (Scroll Animation)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .blockquote, .navbar');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial state for animations
    const initAnimations = function() {
        const cards = document.querySelectorAll('.card');
        const quotes = document.querySelectorAll('.blockquote');
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
        });
        
        quotes.forEach(quote => {
            quote.style.opacity = '0';
            quote.style.transform = 'translateY(20px)';
            quote.style.transition = 'all 0.6s ease 0.2s';
        });
    };

    // Smooth scrolling for navigation links
    const smoothScroll = function() {
        const navLinks = document.querySelectorAll('.navbar-nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Active navigation item highlight
    const activeNavHighlight = function() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.navbar-nav');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    };

    // Back to top button
    const backToTop = function() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.classList.add('btn', 'btn-primary', 'back-to-top');
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.bottom = '30px';
        backToTopBtn.style.right = '30px';
        backToTopBtn.style.borderRadius = '50%';
        backToTopBtn.style.width = '50px';
        backToTopBtn.style.height = '50px';
        backToTopBtn.style.display = 'none';
        backToTopBtn.style.zIndex = '99';
        document.body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Testimonials carousel
    const initTestimonials = function() {
        const testimonials = document.querySelectorAll('.blockquote');
        let currentIndex = 0;
        
        if (testimonials.length > 0) {
            setInterval(() => {
                testimonials[currentIndex].style.opacity = '0';
                currentIndex = (currentIndex + 1) % testimonials.length;
                testimonials[currentIndex].style.opacity = '1';
            }, 5000);
        }
    };

    // Initialize all functions
    initAnimations();
    smoothScroll();
    activeNavHighlight();
    backToTop();
    initTestimonials();
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
