/**
 * Sindh Shaadi Palace - Home Page JavaScript
 * Pakistani Wedding Hall Booking System
 */

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlider = document.getElementById('hero-slider');
    
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        const dots = heroSlider.querySelectorAll('.hero-dot');
        const prevBtn = document.getElementById('hero-prev');
        const nextBtn = document.getElementById('hero-next');
        
        let currentSlide = 0;
        const slideInterval = 6000; // 6 seconds
        let slideTimer;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }
        
        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
        }
        
        function startSlideTimer() {
            stopSlideTimer(); // Clear any existing timer
            slideTimer = setInterval(nextSlide, slideInterval);
        }
        
        function stopSlideTimer() {
            if (slideTimer) {
                clearInterval(slideTimer);
            }
        }
        
        // Event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startSlideTimer(); // Restart timer after manual navigation
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startSlideTimer(); // Restart timer after manual navigation
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                startSlideTimer(); // Restart timer after manual navigation
            });
        });
        
        // Start the automatic sliding
        startSlideTimer();
        
        // Pause sliding when mouse is over the slider
        heroSlider.addEventListener('mouseenter', stopSlideTimer);
        heroSlider.addEventListener('mouseleave', startSlideTimer);
    }
    
    // Testimonial Slider
    const testimonialSlider = document.getElementById('testimonial-slider');
    
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = testimonialSlider.querySelectorAll('.testimonial-dot');
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');
        
        let currentSlide = 0;
        const slideInterval = 8000; // 8 seconds
        let slideTimer;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }
        
        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
        }
        
        function startSlideTimer() {
            stopSlideTimer(); // Clear any existing timer
            slideTimer = setInterval(nextSlide, slideInterval);
        }
        
        function stopSlideTimer() {
            if (slideTimer) {
                clearInterval(slideTimer);
            }
        }
        
        // Event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startSlideTimer(); // Restart timer after manual navigation
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startSlideTimer(); // Restart timer after manual navigation
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                startSlideTimer(); // Restart timer after manual navigation
            });
        });
        
        // Start the automatic sliding
        startSlideTimer();
        
        // Pause sliding when mouse is over the slider
        testimonialSlider.addEventListener('mouseenter', stopSlideTimer);
        testimonialSlider.addEventListener('mouseleave', startSlideTimer);
    }
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'gallery-lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                const img = document.createElement('img');
                img.src = imgSrc;
                
                // Append elements
                lightboxContent.appendChild(closeBtn);
                lightboxContent.appendChild(img);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);
                
                // Prevent scrolling
                document.body.style.overflow = 'hidden';
                
                // Close lightbox functionality
                closeBtn.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', function(event) {
                    if (event.target === lightbox) {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Animated entrance effects for sections
    const animatedSections = document.querySelectorAll('.fade-in-section');
    
    if (animatedSections.length > 0) {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        animatedSections.forEach(section => {
            observer.observe(section);
        });
    }
});