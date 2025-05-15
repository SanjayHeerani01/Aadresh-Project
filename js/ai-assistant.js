/**
 * Sindh Shaadi Palace - AI Assistant JavaScript
 * Pakistani Wedding Hall Booking System
 */

document.addEventListener('DOMContentLoaded', function() {
    // AI Assistant Elements
    const aiToggle = document.getElementById('ai-toggle');
    const aiClose = document.getElementById('ai-close');
    const aiChatContainer = document.getElementById('ai-chat-container');
    const aiMessages = document.getElementById('ai-chat-messages');
    const aiInput = document.getElementById('ai-input');
    const aiSend = document.getElementById('ai-send');
    
    // AI Knowledge Base
    const aiKnowledge = {
        venues: {
            'thar hall': {
                name: 'Grand Thar Hall',
                capacity: '300-500 guests',
                features: ['Luxurious interiors with Sindhi cultural motifs', 'Advanced climate control', 'State-of-the-art audiovisual equipment', 'Spacious dance floor and elevated stage', 'Dedicated bridal suite'],
                bestFor: ['Wedding ceremonies', 'Wedding receptions', 'Large corporate events'],
                pricing: 'Packages start from PKR 350,000'
            },
            'sindhu garden': {
                name: 'Sindhu Garden',
                capacity: '150-300 guests',
                features: ['Beautiful open-air celebration space', 'Lush greenery and water features', 'Elegant pathways and seating areas', 'Customizable lighting arrangements', 'Backup facilities for weather changes'],
                bestFor: ['Mehndi ceremonies', 'Daytime events', 'Evening celebrations under the stars'],
                pricing: 'Packages start from PKR 250,000'
            },
            'ajrak banquet': {
                name: 'Ajrak Banquet',
                capacity: '100-200 guests',
                features: ['Intimate elegant space', 'Traditional Sindhi Ajrak-inspired patterns', 'Excellent acoustics', 'Elegant stage and seating', 'High-speed Wi-Fi'],
                bestFor: ['Engagement ceremonies', 'Intimate weddings', 'Medium-sized receptions'],
                pricing: 'Packages start from PKR 200,000'
            },
            'ralli courtyard': {
                name: 'Ralli Courtyard',
                capacity: '50-100 guests',
                features: ['Charming courtyard with traditional haveli-style architecture', 'Colorful Ralli-inspired decorations', 'Intimate seating arrangements', 'Ambient lighting with traditional lanterns'],
                bestFor: ['Nikah ceremonies', 'Small family gatherings', 'Pre-wedding events'],
                pricing: 'Packages start from PKR 150,000'
            }
        },
        services: {
            'catering': {
                options: ['Traditional Sindhi Menu (PKR 85,000)', 'Multi-Cuisine Menu (PKR 100,000)', 'Premium Gourmet Menu (PKR 125,000)'],
                description: 'Our in-house catering team specializes in authentic Sindhi cuisine along with a variety of other regional and international options.'
            },
            'decoration': {
                options: ['Standard Cultural Décor (PKR 50,000)', 'Premium Floral Décor (PKR 95,000)', 'Luxury Custom Theme (PKR 150,000)'],
                description: 'Our decorations feature traditional Sindhi elements with modern elegance, customized to your preferences.'
            },
            'photography': {
                options: ['Basic Photography Package (PKR 40,000)', 'Premium Photo & Video (PKR 75,000)', 'Aerial Drone Coverage (PKR 25,000 add-on)'],
                description: 'Capture your special moments with our professional photography and videography services.'
            },
            'entertainment': {
                options: ['DJ & Sound System (PKR 35,000)', 'Traditional Live Music (PKR 60,000)', 'Cultural Dance Performance (PKR 45,000)'],
                description: 'Enhance your celebration with music and performances that blend tradition with modern entertainment.'
            }
        },
        faq: {
            'booking process': 'Our booking process is simple: 1) Select your preferred date and venue, 2) Choose your package and services, 3) Provide your personal details, 4) Pay a 30% deposit to secure your booking.',
            'cancellation policy': 'Cancellations made 60+ days before the event receive a 90% refund. Cancellations 30-60 days before receive a 50% refund. Cancellations less than 30 days before the event are non-refundable.',
            'outside vendors': 'Yes, you may bring outside vendors for specific services, though we have preferred vendor lists. Additional fees may apply for outside catering.',
            'payment options': 'We accept payments via bank transfer, credit/debit cards, and cash. A 30% deposit is required to secure your booking, with the balance due one month before the event.',
            'weather backup': 'For outdoor venues, we provide backup indoor options in case of inclement weather at no additional cost.',
            'parking': 'All our venues offer free parking for guests. Valet parking service is available with our premium packages.'
        },
        cultural: {
            'mehndi': 'The Mehndi ceremony is a colorful pre-wedding celebration where the bride gets intricate henna designs applied to her hands and feet. Our Sindhu Garden is particularly popular for these events.',
            'baraat': 'The Baraat is the groom's wedding procession. Our venues offer spacious entrances and dedicated areas to welcome the Baraat with traditional music and festivities.',
            'nikah': 'The Nikah is the Islamic marriage ceremony. Our Ralli Courtyard offers an intimate setting perfect for this sacred occasion.',
            'walima': 'The Walima is the reception hosted by the groom's family after the wedding. Our Grand Thar Hall is ideal for these grand celebrations.'
        }
    };
    
    // Common phrases to identify user intent
    const intentPatterns = {
        greetings: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'],
        venues: ['venue', 'hall', 'location', 'place', 'facility', 'thar', 'sindhu', 'ajrak', 'ralli'],
        booking: ['book', 'reserve', 'booking', 'reservation', 'available', 'availability', 'date', 'schedule'],
        pricing: ['price', 'cost', 'fee', 'rate', 'package', 'budget', 'expensive', 'affordable', 'cheap'],
        services: ['service', 'catering', 'food', 'decoration', 'decor', 'photography', 'video', 'entertainment', 'music'],
        contact: ['contact', 'phone', 'email', 'call', 'reach', 'talk', 'manager'],
        cultural: ['culture', 'tradition', 'sindhi', 'pakistani', 'mehndi', 'baraat', 'nikah', 'walima', 'ceremony'],
        cancellation: ['cancel', 'refund', 'cancellation', 'reschedule', 'postpone'],
        thanks: ['thank', 'thanks', 'appreciate', 'grateful']
    };
    
    // Initialize AI Assistant
    function initAI() {
        if (aiToggle && aiChatContainer) {
            aiToggle.addEventListener('click', function() {
                aiChatContainer.classList.add('active');
                
                // Scroll to bottom of messages
                aiMessages.scrollTop = aiMessages.scrollHeight;
                
                // Focus input field
                setTimeout(() => {
                    aiInput.focus();
                }, 300);
            });
        }
        
        if (aiClose && aiChatContainer) {
            aiClose.addEventListener('click', function() {
                aiChatContainer.classList.remove('active');
            });
        }
        
        // Send message on enter key
        if (aiInput) {
            aiInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // Send message on button click
        if (aiSend) {
            aiSend.addEventListener('click', sendMessage);
        }
    }
    
    // Send user message to AI
    function sendMessage() {
        const message = aiInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input field
            aiInput.value = '';
            
            // Process the message and generate response
            setTimeout(() => {
                const response = generateResponse(message);
                addMessage(response, 'ai');
            }, 500 + Math.random() * 1000); // Random delay for realistic effect
        }
    }
    
    // Add message to chat display
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === 'user' ? 'ai-message user-message' : 'ai-message';
        
        const contentElement = document.createElement('div');
        contentElement.className = 'ai-message-content';
        
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = message;
        
        contentElement.appendChild(paragraphElement);
        messageElement.appendChild(contentElement);
        
        aiMessages.appendChild(messageElement);
        
        // Scroll to bottom of messages
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
    
    // Generate AI response based on user message
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for specific venue information
        for (const venueKey in aiKnowledge.venues) {
            if (message.includes(venueKey)) {
                const venue = aiKnowledge.venues[venueKey];
                return `${venue.name} can accommodate ${venue.capacity} and is perfect for ${venue.bestFor.join(', ')}. Features include ${venue.features.slice(0, 3).join(', ')}. ${venue.pricing}.`;
            }
        }
        
        // Check for specific service information
        for (const serviceKey in aiKnowledge.services) {
            if (message.includes(serviceKey)) {
                const service = aiKnowledge.services[serviceKey];
                return `Our ${serviceKey} services include options like ${service.options.join(', ')}. ${service.description}`;
            }
        }
        
        // Check for specific cultural information
        for (const culturalKey in aiKnowledge.cultural) {
            if (message.includes(culturalKey)) {
                return aiKnowledge.cultural[culturalKey];
            }
        }
        
        // Check for specific FAQ
        for (const faqKey in aiKnowledge.faq) {
            if (message.includes(faqKey)) {
                return aiKnowledge.faq[faqKey];
            }
        }
        
        // Check for general intent
        for (const intent in intentPatterns) {
            if (intentPatterns[intent].some(keyword => message.includes(keyword))) {
                switch (intent) {
                    case 'greetings':
                        return "Hello! I'm your AI wedding planning assistant. How can I help you with your wedding or event at Sindh Shaadi Palace?";
                    
                    case 'venues':
                        return "We have four beautiful venues: Grand Thar Hall (300-500 guests), Sindhu Garden (150-300 guests), Ajrak Banquet (100-200 guests), and Ralli Courtyard (50-100 guests). Which one would you like to know more about?";
                    
                    case 'booking':
                        return "To book a venue, you can use our online booking form, call us at +92 22 1234567, or visit our location. Would you like me to guide you through the booking process?";
                    
                    case 'pricing':
                        return "Our packages start from PKR 150,000 for smaller gatherings at Ralli Courtyard to PKR 750,000 for grand celebrations at Thar Hall. Prices vary based on venue, date, guest count, and selected services. Would you like pricing for a specific venue?";
                    
                    case 'services':
                        return "We offer a range of services including catering with traditional Sindhi cuisine, decorations, photography and videography, entertainment options, transportation, and AI-powered planning assistance. Which service are you interested in?";
                    
                    case 'contact':
                        return "You can reach us at +92 22 1234567, email us at info@sindhshaadi.com, or visit us at Cultural Road, Hyderabad, Sindh, Pakistan. Our office hours are 9:00 AM to 9:00 PM, seven days a week.";
                    
                    case 'cultural':
                        return "We specialize in traditional Sindhi wedding celebrations including Mehndi, Baraat, Nikah, and Walima ceremonies. Our venues are designed to honor cultural traditions while offering modern amenities. Would you like details about a specific ceremony?";
                    
                    case 'cancellation':
                        return "Our cancellation policy provides a 90% refund for cancellations made 60+ days before the event, 50% refund for 30-60 days before, and no refund for less than 30 days before the event. For rescheduling, please contact our event coordinators.";
                    
                    case 'thanks':
                        return "You're very welcome! If you have any other questions about planning your event at Sindh Shaadi Palace, I'm here to help. Would you like information about anything else?";
                }
            }
        }
        
        // Default response if no patterns match
        return "I'm here to help with your wedding planning at Sindh Shaadi Palace. You can ask me about our venues, services, pricing, booking process, or cultural wedding ceremonies. How can I assist you today?";
    }
    
    // Initialize AI Assistant
    initAI();
});