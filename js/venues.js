/**
 * Sindh Shaadi Palace - Venues Page JavaScript
 * Pakistani Wedding Hall Booking System
 */

document.addEventListener('DOMContentLoaded', function() {
    // Venue Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const venueItems = document.querySelectorAll('.venue-item');
    
    if (filterBtns.length > 0 && venueItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Toggle active class
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter venues
                venueItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const itemTypes = item.getAttribute('data-type').split(' ');
                        
                        if (itemTypes.includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Virtual Tour Modal
    const tourBtns = document.querySelectorAll('.venue-tour-btn');
    const tourModal = document.getElementById('virtual-tour-modal');
    const tourContent = document.querySelector('.tour-content');
    const tourLoading = document.querySelector('.tour-loading');
    const modalClose = document.querySelector('.modal-close');
    
    if (tourBtns.length > 0 && tourModal) {
        tourBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get venue ID
                const venueId = this.getAttribute('data-venue');
                
                // Show modal and loading state
                tourModal.style.display = 'block';
                tourLoading.style.display = 'block';
                tourContent.style.display = 'none';
                
                // Simulate loading virtual tour (in a real application, this would load actual content)
                setTimeout(function() {
                    // Hide loading state
                    tourLoading.style.display = 'none';
                    tourContent.style.display = 'block';
                    
                    // Set tour content based on venue ID
                    switch (venueId) {
                        case 'thar-hall':
                            tourContent.innerHTML = `
                                <div class="virtual-tour-placeholder">
                                    <h3>Grand Thar Hall Virtual Tour</h3>
                                    <p>This is a placeholder for the 360° virtual tour of our Grand Thar Hall.</p>
                                    <div class="tour-gallery">
                                        <img src="https://images.pexels.com/photos/2291462/pexels-photo-2291462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Grand Thar Hall">
                                        <img src="https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Grand Thar Hall Decor">
                                        <img src="https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Grand Thar Hall Stage">
                                    </div>
                                    <p>In a complete implementation, this would be a fully interactive 360° virtual tour.</p>
                                </div>
                            `;
                            break;
                        case 'sindhu-garden':
                            tourContent.innerHTML = `
                                <div class="virtual-tour-placeholder">
                                    <h3>Sindhu Garden Virtual Tour</h3>
                                    <p>This is a placeholder for the 360° virtual tour of our Sindhu Garden venue.</p>
                                    <div class="tour-gallery">
                                        <img src="https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sindhu Garden">
                                        <img src="https://images.pexels.com/photos/2407068/pexels-photo-2407068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sindhu Garden Setup">
                                        <img src="https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sindhu Garden Night">
                                    </div>
                                    <p>In a complete implementation, this would be a fully interactive 360° virtual tour.</p>
                                </div>
                            `;
                            break;
                        case 'ajrak-banquet':
                            tourContent.innerHTML = `
                                <div class="virtual-tour-placeholder">
                                    <h3>Ajrak Banquet Virtual Tour</h3>
                                    <p>This is a placeholder for the 360° virtual tour of our Ajrak Banquet hall.</p>
                                    <div class="tour-gallery">
                                        <img src="https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ajrak Banquet">
                                        <img src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ajrak Banquet Decor">
                                        <img src="https://images.pexels.com/photos/3316918/pexels-photo-3316918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ajrak Banquet Setup">
                                    </div>
                                    <p>In a complete implementation, this would be a fully interactive 360° virtual tour.</p>
                                </div>
                            `;
                            break;
                        case 'ralli-courtyard':
                            tourContent.innerHTML = `
                                <div class="virtual-tour-placeholder">
                                    <h3>Ralli Courtyard Virtual Tour</h3>
                                    <p>This is a placeholder for the 360° virtual tour of our Ralli Courtyard venue.</p>
                                    <div class="tour-gallery">
                                        <img src="https://images.pexels.com/photos/632520/pexels-photo-632520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ralli Courtyard">
                                        <img src="https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ralli Courtyard Setup">
                                        <img src="https://images.pexels.com/photos/3462564/pexels-photo-3462564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Ralli Courtyard Night">
                                    </div>
                                    <p>In a complete implementation, this would be a fully interactive 360° virtual tour.</p>
                                </div>
                            `;
                            break;
                        default:
                            tourContent.innerHTML = `<p>Virtual tour not available.</p>`;
                    }
                    
                    // Add styles for the placeholder tour
                    const style = document.createElement('style');
                    style.textContent = `
                        .virtual-tour-placeholder {
                            padding: 20px;
                            text-align: center;
                        }
                        .tour-gallery {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 10px;
                            margin: 20px 0;
                        }
                        .tour-gallery img {
                            width: 100%;
                            height: 200px;
                            object-fit: cover;
                            border-radius: 8px;
                            transition: transform 0.3s ease;
                        }
                        .tour-gallery img:hover {
                            transform: scale(1.05);
                        }
                        @media (max-width: 768px) {
                            .tour-gallery {
                                grid-template-columns: 1fr;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                    
                }, 1500); // Simulate 1.5s loading time
            });
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                tourModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === tourModal) {
                tourModal.style.display = 'none';
            }
        });
    }
    
    // Animated scroll to venue sections
    const venueLinks = document.querySelectorAll('a[href^="#"]');
    
    if (venueLinks.length > 0) {
        venueLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only apply to links pointing to venue sections
                if (this.hash.startsWith('#venue-') || this.hash === '#venues-listing') {
                    e.preventDefault();
                    
                    const targetId = this.hash.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Account for fixed header
                        const headerOffset = 100;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Parse URL parameters to pre-select venue if coming from another page
    const urlParams = new URLSearchParams(window.location.search);
    const venueParam = urlParams.get('venue');
    
    if (venueParam) {
        const targetVenue = document.getElementById(venueParam);
        
        if (targetVenue) {
            // Scroll to the venue after a short delay to ensure page is loaded
            setTimeout(function() {
                const headerOffset = 100;
                const elementPosition = targetVenue.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add highlight class to draw attention
                targetVenue.classList.add('highlight-venue');
                
                // Remove highlight after 2 seconds
                setTimeout(function() {
                    targetVenue.classList.remove('highlight-venue');
                }, 2000);
            }, 500);
        }
    }
});