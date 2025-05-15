/**
 * Sindh Shaadi Palace - Main JavaScript
 * Pakistani Wedding Hall Booking System
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Fixed Header on Scroll
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('header-fixed');
            } else {
                header.classList.remove('header-fixed');
            }
        });
    }
    
    // Initialize any modals
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Initialize number counters for stat animations
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count'));
                    let current = 0;
                    const increment = Math.ceil(count / 50);
                    const duration = 1500;
                    const stepTime = Math.floor(duration / (count / increment));
                    
                    const counter = setInterval(function() {
                        current += increment;
                        
                        if (current >= count) {
                            target.textContent = count;
                            clearInterval(counter);
                        } else {
                            target.textContent = current;
                        }
                    }, stepTime);
                    
                    observer.unobserve(target);
                }
            });
        }, options);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // Initialize parallax effect for sections with .bg-parallax class
    const parallaxSections = document.querySelectorAll('.bg-parallax');
    
    if (parallaxSections.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxSections.forEach(section => {
                const distance = window.scrollY;
                const speed = section.getAttribute('data-speed') || 0.5;
                
                section.style.backgroundPosition = `50% ${distance * speed}px`;
            });
        });
    }
    
    // Initialize FAQ accordions
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                
                faqItem.classList.toggle('active');
            });
        });
    }
    
    // AI Assistant Toggle
    const aiToggle = document.getElementById('ai-toggle');
    const aiClose = document.getElementById('ai-close');
    const aiChatContainer = document.getElementById('ai-chat-container');
    
    if (aiToggle && aiChatContainer) {
        aiToggle.addEventListener('click', function() {
            aiChatContainer.classList.add('active');
        });
    }
    
    if (aiClose && aiChatContainer) {
        aiClose.addEventListener('click', function() {
            aiChatContainer.classList.remove('active');
        });
    }
    
    // Notification dropdown toggle
    const headerNotification = document.querySelector('.header-notification');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (headerNotification && notificationDropdown) {
        headerNotification.addEventListener('click', function(event) {
            event.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(event) {
            if (!headerNotification.contains(event.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }
    
    // Admin sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const adminSidebar = document.getElementById('admin-sidebar');
    
    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('active');
        });
    }
});