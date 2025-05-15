/**
 * Sindh Shaadi Palace - Booking Page JavaScript
 * Pakistani Wedding Hall Booking System
 */

document.addEventListener('DOMContentLoaded', function() {
    // Booking Form Elements
    const bookingForm = document.getElementById('booking-form');
    const bookingSteps = document.querySelectorAll('.booking-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const confirmButton = document.getElementById('confirm-booking');
    const successModal = document.getElementById('booking-success-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Form Inputs and Elements
    const eventDate = document.getElementById('event-date');
    const eventType = document.getElementById('event-type');
    const eventGuests = document.getElementById('event-guests');
    const eventTime = document.getElementById('event-time');
    const eventBudget = document.getElementById('event-budget');
    const budgetValue = document.getElementById('budget-value');
    const venueOptions = document.querySelectorAll('.venue-option');
    const packageSelects = document.querySelectorAll('.package-select');
    const serviceCheckboxes = document.querySelectorAll('input[name="services[]"]');
    
    // Summary Elements
    const summaryDetails = document.querySelector('.summary-details');
    const summaryEmpty = document.querySelector('.summary-empty');
    const summaryDate = document.getElementById('summary-date');
    const summaryEventType = document.getElementById('summary-event-type');
    const summaryGuests = document.getElementById('summary-guests');
    const summaryVenue = document.getElementById('summary-venue');
    const summaryPackage = document.getElementById('summary-package');
    const summaryServicesList = document.getElementById('summary-services-list');
    const summaryTotal = document.getElementById('summary-total');
    const depositAmount = document.getElementById('deposit-amount');
    const aiRecommendation = document.getElementById('ai-recommendation-text');
    const bookingReference = document.getElementById('booking-reference');
    
    // Set minimum date to tomorrow
    if (eventDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        eventDate.setAttribute('min', tomorrowFormatted);
    }
    
    // Budget slider
    if (eventBudget && budgetValue) {
        eventBudget.addEventListener('input', function() {
            const formattedValue = Number(this.value).toLocaleString('en-PK');
            budgetValue.textContent = `PKR ${formattedValue}`;
        });
    }
    
    // Navigation between steps
    if (nextButtons.length > 0) {
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = parseInt(this.closest('.booking-step').getAttribute('id').split('-')[2]);
                const nextStep = parseInt(this.getAttribute('data-next'));
                
                // Validate current step before proceeding
                if (validateStep(currentStep)) {
                    goToStep(nextStep);
                    updateSummary();
                }
            });
        });
    }
    
    if (prevButtons.length > 0) {
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const prevStep = parseInt(this.getAttribute('data-prev'));
                goToStep(prevStep);
            });
        });
    }
    
    // Step validation
    function validateStep(stepNumber) {
        switch (stepNumber) {
            case 1:
                // Validate event details
                if (!eventDate.value) {
                    showError(eventDate, 'Please select an event date');
                    return false;
                }
                
                if (!eventType.value) {
                    showError(eventType, 'Please select an event type');
                    return false;
                }
                
                if (!eventGuests.value || eventGuests.value < 50) {
                    showError(eventGuests, 'Please enter the number of guests (minimum 50)');
                    return false;
                }
                
                if (!eventTime.value) {
                    showError(eventTime, 'Please select an event time');
                    return false;
                }
                
                // Check if date is in the past
                const selectedDate = new Date(eventDate.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    showError(eventDate, 'Please select a future date');
                    return false;
                }
                
                // Filter venues based on guest count
                filterVenuesByGuestCount(eventGuests.value);
                
                return true;
            
            case 2:
                // Validate venue selection
                const selectedVenue = document.querySelector('input[name="venue"]:checked');
                const selectedPackage = getSelectedPackage();
                
                if (!selectedVenue) {
                    alert('Please select a venue');
                    return false;
                }
                
                if (!selectedPackage) {
                    alert('Please select a package for the venue');
                    return false;
                }
                
                return true;
                
            case 3:
                // Services step - no mandatory validation
                return true;
                
            case 4:
                // Validate personal details
                const firstName = document.getElementById('first-name');
                const lastName = document.getElementById('last-name');
                const email = document.getElementById('email');
                const phone = document.getElementById('phone');
                const city = document.getElementById('city');
                const termsAgree = document.getElementById('terms-agree');
                
                if (!firstName.value) {
                    showError(firstName, 'Please enter your first name');
                    return false;
                }
                
                if (!lastName.value) {
                    showError(lastName, 'Please enter your last name');
                    return false;
                }
                
                if (!email.value || !isValidEmail(email.value)) {
                    showError(email, 'Please enter a valid email address');
                    return false;
                }
                
                if (!phone.value || !isValidPhone(phone.value)) {
                    showError(phone, 'Please enter a valid phone number');
                    return false;
                }
                
                if (!city.value) {
                    showError(city, 'Please enter your city');
                    return false;
                }
                
                if (!termsAgree.checked) {
                    alert('Please agree to the Terms & Conditions');
                    return false;
                }
                
                return true;
                
            default:
                return true;
        }
    }
    
    // Helper function for validation errors
    function showError(field, message) {
        field.classList.add('error');
        alert(message);
        
        field.addEventListener('input', function() {
            field.classList.remove('error');
        }, { once: true });
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Phone validation
    function isValidPhone(phone) {
        // Allow Pakistani format (e.g., +92 333 1234567)
        const re = /^(\+92|92|0)?\d{3}[ ]?\d{7,8}$/;
        return re.test(String(phone));
    }
    
    // Navigate to specific step
    function goToStep(stepNumber) {
        // Hide all steps
        bookingSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show the target step
        const targetStep = document.getElementById(`booking-step-${stepNumber}`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
        
        // Update progress indicators
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            
            if (stepNum <= stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Scroll to top of form
        window.scrollTo({
            top: document.querySelector('.booking-form-container').offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Filter venues based on guest count
    function filterVenuesByGuestCount(guestCount) {
        let hasAvailableVenue = false;
        
        venueOptions.forEach(venue => {
            const minGuests = parseInt(venue.getAttribute('data-min-guests'));
            const maxGuests = parseInt(venue.getAttribute('data-max-guests'));
            
            if (guestCount >= minGuests && guestCount <= maxGuests) {
                venue.style.display = 'grid';
                hasAvailableVenue = true;
            } else {
                venue.style.display = 'none';
                // Uncheck the venue if it was selected but is now filtered out
                const venueRadio = venue.querySelector('input[type="radio"]');
                if (venueRadio && venueRadio.checked) {
                    venueRadio.checked = false;
                }
            }
        });
        
        // Show/hide unavailable message
        const venueUnavailable = document.querySelector('.venue-unavailable');
        const venuesAvailability = document.querySelector('.venues-availability');
        
        if (!hasAvailableVenue) {
            venueUnavailable.style.display = 'block';
            venuesAvailability.style.display = 'none';
        } else {
            venueUnavailable.style.display = 'none';
            venuesAvailability.style.display = 'block';
        }
    }
    
    // Get selected package for venue
    function getSelectedPackage() {
        const selectedVenue = document.querySelector('input[name="venue"]:checked');
        
        if (selectedVenue) {
            const venueId = selectedVenue.value;
            const packageSelect = document.querySelector(`.package-select[data-venue="${venueId}"]`);
            
            if (packageSelect && packageSelect.value) {
                return {
                    packageId: packageSelect.value,
                    packageName: packageSelect.options[packageSelect.selectedIndex].text,
                    packagePrice: parseInt(packageSelect.options[packageSelect.selectedIndex].getAttribute('data-price')),
                    venueId: venueId,
                    venueName: selectedVenue.closest('.venue-option').querySelector('h4').textContent
                };
            }
        }
        
        return null;
    }
    
    // Update summary panel
    function updateSummary() {
        // Get selected values
        const selectedDate = eventDate.value ? new Date(eventDate.value) : null;
        const selectedEventType = eventType.value ? eventType.options[eventType.selectedIndex].text : '';
        const selectedGuests = eventGuests.value || '';
        const packageInfo = getSelectedPackage();
        
        // Get selected services
        const selectedServices = [];
        let servicesTotal = 0;
        
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const serviceLabel = checkbox.parentElement.querySelector('label').textContent;
                const servicePrice = parseInt(checkbox.getAttribute('data-price'));
                
                selectedServices.push({
                    name: serviceLabel,
                    price: servicePrice
                });
                
                servicesTotal += servicePrice;
            }
        });
        
        // Update summary elements
        if (selectedDate || selectedEventType || selectedGuests || packageInfo || selectedServices.length > 0) {
            summaryEmpty.style.display = 'none';
            summaryDetails.style.display = 'block';
            
            if (selectedDate) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                summaryDate.textContent = selectedDate.toLocaleDateString('en-US', options);
            } else {
                summaryDate.textContent = '--';
            }
            
            summaryEventType.textContent = selectedEventType || '--';
            summaryGuests.textContent = selectedGuests ? `${selectedGuests} guests` : '--';
            
            if (packageInfo) {
                summaryVenue.textContent = packageInfo.venueName || '--';
                summaryPackage.textContent = packageInfo.packageName || '--';
            } else {
                summaryVenue.textContent = '--';
                summaryPackage.textContent = '--';
            }
            
            // Update services list
            if (selectedServices.length > 0) {
                let servicesHTML = '';
                
                selectedServices.forEach(service => {
                    servicesHTML += `<li>${service.name} - PKR ${service.price.toLocaleString('en-PK')}</li>`;
                });
                
                summaryServicesList.innerHTML = servicesHTML;
            } else {
                summaryServicesList.innerHTML = '<li>None selected</li>';
            }
            
            // Calculate total
            let total = 0;
            
            if (packageInfo) {
                total += packageInfo.packagePrice;
            }
            
            total += servicesTotal;
            
            summaryTotal.textContent = `PKR ${total.toLocaleString('en-PK')}`;
            
            // Update deposit amount (30%)
            const deposit = Math.round(total * 0.3);
            depositAmount.textContent = `PKR ${deposit.toLocaleString('en-PK')}`;
            
            // Generate AI recommendations
            generateAIRecommendation(selectedEventType, packageInfo, selectedServices, selectedGuests);
        } else {
            summaryEmpty.style.display = 'block';
            summaryDetails.style.display = 'none';
        }
    }
    
    // Generate AI recommendations
    function generateAIRecommendation(eventType, packageInfo, services, guestCount) {
        let recommendation = '';
        
        // Base recommendation on event type
        switch (eventType) {
            case 'Wedding Ceremony':
                recommendation = 'For wedding ceremonies, consider adding our Premium Floral Décor and Traditional Live Music for an authentic Sindhi atmosphere.';
                break;
            case 'Wedding Reception':
                recommendation = 'Our data shows that reception events benefit greatly from the Premium Photo & Video package to capture all the special moments.';
                break;
            case 'Mehndi Ceremony':
                recommendation = 'For Mehndi events, Cultural Dance Performances add vibrant entertainment that guests always enjoy.';
                break;
            case 'Engagement':
                recommendation = 'Engagements have a more intimate feel with our Traditional Sindhi Menu and ambient lighting options.';
                break;
            default:
                recommendation = 'Based on your selections, we recommend enhancing your event with our cultural entertainment options.';
        }
        
        // Add venue-specific suggestions
        if (packageInfo) {
            if (packageInfo.venueId === 'thar-hall') {
                recommendation += ' The Grand Thar Hall looks magnificent with our Premium Floral Décor service.';
            } else if (packageInfo.venueId === 'sindhu-garden') {
                recommendation += ' Consider adding our lighting package to enhance the natural beauty of Sindhu Garden in the evening.';
            } else if (packageInfo.venueId === 'ajrak-banquet') {
                recommendation += ' The Ajrak Banquet pairs wonderfully with our Traditional Sindhi Menu.';
            } else if (packageInfo.venueId === 'ralli-courtyard') {
                recommendation += ' For the intimate Ralli Courtyard, our Traditional Live Music creates the perfect ambiance.';
            }
        }
        
        // Guest count specific recommendations
        if (guestCount > 300) {
            recommendation += ' For larger gatherings, our Guest Shuttle Service helps ensure everyone arrives comfortably and on time.';
        } else if (guestCount < 100) {
            recommendation += ' For your intimate gathering, the Personal AI Wedding Assistant can help coordinate all the little details.';
        }
        
        // Budget optimization suggestions
        const selectedServiceTypes = services.map(s => s.name);
        
        if (!selectedServiceTypes.includes('Photography')) {
            recommendation += ' Don\'t forget to capture your special memories with one of our photography packages.';
        }
        
        if (!selectedServiceTypes.includes('Catering')) {
            recommendation += ' Our authentic Sindhi catering options receive excellent reviews from guests.';
        }
        
        aiRecommendation.textContent = recommendation;
    }
    
    // Package selection event listeners
    packageSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Check the radio button for this venue when a package is selected
            const venueId = this.getAttribute('data-venue');
            const radioButton = document.querySelector(`input[value="${venueId}"]`);
            
            if (radioButton) {
                radioButton.checked = true;
            }
            
            updateSummary();
        });
    });
    
    // Service checkbox event listeners
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSummary);
    });
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Final validation
            if (validateStep(4)) {
                // Generate booking reference
                const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                const today = new Date();
                const year = today.getFullYear();
                bookingReference.textContent = `SSP-${year}-${randomNum}`;
                
                // Show success modal
                successModal.style.display = 'block';
                
                // Simulate sending data to server
                console.log('Booking submitted:', collectFormData());
            }
        });
    }
    
    // Collect all form data for submission
    function collectFormData() {
        const formData = {
            eventDetails: {
                date: eventDate.value,
                type: eventType.value,
                guests: eventGuests.value,
                time: eventTime.value,
                budget: eventBudget.value,
                notes: document.getElementById('event-notes').value
            },
            venue: {
                id: document.querySelector('input[name="venue"]:checked')?.value,
                package: getSelectedPackage()?.packageId
            },
            services: Array.from(serviceCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value),
            specialRequests: document.getElementById('service-special-requests').value,
            personalDetails: {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postal-code').value,
                partnerInfo: {
                    firstName: document.getElementById('partner-first-name').value,
                    lastName: document.getElementById('partner-last-name').value,
                    email: document.getElementById('partner-email').value,
                    phone: document.getElementById('partner-phone').value
                },
                hearAbout: document.getElementById('hear-about').value
            },
            paymentMethod: document.querySelector('input[name="payment-method"]:checked')?.value,
            termsAgreed: document.getElementById('terms-agree').checked,
            bookingReference: bookingReference.textContent,
            timestamp: new Date().toISOString()
        };
        
        return formData;
    }
    
    // Close success modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Handle "modify search" button click
    const modifySearchBtn = document.getElementById('modify-search');
    
    if (modifySearchBtn) {
        modifySearchBtn.addEventListener('click', function() {
            goToStep(1);
        });
    }
    
    // Download confirmation button
    const downloadConfirmation = document.getElementById('download-confirmation');
    
    if (downloadConfirmation) {
        downloadConfirmation.addEventListener('click', function() {
            // In a real application, this would generate a PDF with booking details
            // For this demo, we'll just alert the user
            alert('In a complete implementation, this would download a PDF confirmation of your booking.');
        });
    }
    
    // Pre-fill form if venue is specified in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const venueParam = urlParams.get('venue');
    
    if (venueParam) {
        setTimeout(function() {
            const venueRadio = document.querySelector(`input[value="${venueParam}"]`);
            
            if (venueRadio) {
                // Select the venue
                venueRadio.checked = true;
                
                // Focus on the venue package dropdown
                const packageSelect = document.querySelector(`.package-select[data-venue="${venueParam}"]`);
                
                if (packageSelect) {
                    packageSelect.focus();
                }
                
                // If we're on step 1, auto-proceed to step 2
                const currentStep = document.querySelector('.booking-step.active');
                if (currentStep.id === 'booking-step-1') {
                    // Wait for user to fill in required fields in step 1
                }
            }
        }, 1000);
    }
    
    // Initialize form with defaults
    updateSummary();
});