// JavaScript will be added as needed

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-container');
    const content = document.querySelector('.content');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Loader functionality
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease-out';

        setTimeout(() => {
            loader.style.display = 'none';
            content.classList.remove('hidden');
            content.classList.add('visible');
        }, 500);
    }, 2000);

    // Menu functionality
    if (menuBtn && navLinks) {
        let menuOpen = false;
        menuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            menuBtn.classList.toggle('open', menuOpen);
            navLinks.classList.toggle('active', menuOpen);
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('active');
                menuOpen = false;
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate hero text elements
    const animatedTexts = document.querySelectorAll('.animate-text');
    
    setTimeout(() => {
        animatedTexts.forEach(text => {
            text.classList.add('visible');
        });
    }, 2000); // This timing matches with the loader transition

    // Service cards animation on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Hero section animations
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger children animations
                const elements = entry.target.children;
                Array.from(elements).forEach((el, index) => {
                    setTimeout(() => {
                        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroObserver.observe(heroContent);
    }

    // About section animations
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slide in from sides effect
                const leftContent = entry.target.querySelector('.about-text-content');
                const rightContent = entry.target.querySelector('.stats-container');
                
                if (leftContent) {
                    leftContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    leftContent.style.opacity = '1';
                    leftContent.style.transform = 'translateX(0)';
                }
                
                if (rightContent) {
                    rightContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    rightContent.style.opacity = '1';
                    rightContent.style.transform = 'translateX(0)';
                }
                
                // Animate stats with delay
                const stats = entry.target.querySelectorAll('.stat-item');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, 500 + (index * 150));
                });
                
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Parallax effect
    window.addEventListener('scroll', () => {
        const aboutBg = document.querySelector('.about-bg');
        if (aboutBg) {
            const scrolled = window.pageYOffset;
            aboutBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add your form submission logic here
            const formData = new FormData(contactForm);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Example success animation
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = '#00b894';
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = '#0984e3';
            }, 3000);
        });
    }

    // Initialize map (using Google Maps as an example)
    function initMap() {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const map = new google.maps.Map(mapElement, {
                center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
                zoom: 15,
                styles: [
                    // Add custom map styles here
                ]
            });
            
            new google.maps.Marker({
                position: { lat: 40.7128, lng: -74.0060 },
                map: map,
                title: "20L Media"
            });
        }
    }

    // Load Google Maps API (you'll need to add your API key)
    if (document.getElementById('map')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    // Contact section scroll animations
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                const title = entry.target.querySelector('.section-title');
                if (title) {
                    title.style.animation = 'slideUpFade 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }

                // Animate info items with stagger
                const infoItems = entry.target.querySelectorAll('.info-item');
                infoItems.forEach((item, index) => {
                    item.style.animation = `slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s forwards`;
                });

                // Animate map container
                const mapContainer = entry.target.querySelector('.map-container');
                if (mapContainer) {
                    mapContainer.style.animation = 'slideUpFade 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards';
                }

                // Animate contact form
                const contactForm = entry.target.querySelector('.contact-form');
                if (contactForm) {
                    contactForm.style.animation = 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards';
                }

                // Animate form groups with stagger
                const formGroups = entry.target.querySelectorAll('.form-group');
                formGroups.forEach((group, index) => {
                    group.style.animation = `slideUpFade 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + (index * 0.1)}s forwards`;
                });
            }
        });
    }, { threshold: 0.2 });

    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // Add hover animations for info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add input focus animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-5px)';
            input.parentElement.style.transition = 'transform 0.3s ease';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Footer animations
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const footerSections = entry.target.querySelectorAll('.footer-section');
                footerSections.forEach((section, index) => {
                    section.style.animation = `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s forwards`;
                });
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const footer = document.querySelector('.footer');
    if (footer) {
        footerObserver.observe(footer);
    }

    // Smooth scrolling and active state for navigation
    const sections = document.querySelectorAll('section');

    // Update the navigation scroll animation
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});