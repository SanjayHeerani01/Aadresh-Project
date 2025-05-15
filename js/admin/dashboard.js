/**
 * Sindh Shaadi Palace - Admin Dashboard JavaScript
 * Pakistani Wedding Hall Booking System
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Charts
    initVenueOccupancyChart();
    initRevenueChart();
    
    // Initialize Calendar
    initEventsCalendar();
    
    // Refresh AI Insights when refresh button is clicked
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.classList.add('rotating');
            
            // Simulate refreshing insights
            setTimeout(() => {
                updateAIInsights();
                this.classList.remove('rotating');
            }, 1000);
        });
    }
    
    // Add rotation animation for refresh button
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .rotating {
            animation: rotate 1s linear;
        }
    `;
    document.head.appendChild(style);
    
    // Period buttons for charts
    const periodBtns = document.querySelectorAll('.period-btn');
    if (periodBtns.length > 0) {
        periodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons in the same container
                const container = this.closest('.chart-period');
                container.querySelectorAll('.period-btn').forEach(b => {
                    b.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get chart type and period
                const chartContainer = this.closest('.dashboard-card');
                const period = this.getAttribute('data-period');
                
                // Update chart based on type
                if (chartContainer.querySelector('#venue-occupancy-chart')) {
                    updateVenueOccupancyChart(period);
                } else if (chartContainer.querySelector('#revenue-chart')) {
                    updateRevenueChart(period);
                }
            });
        });
    }
    
    // Calendar navigation
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarMonth = document.getElementById('calendar-month');
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    if (prevMonthBtn && nextMonthBtn && calendarMonth) {
        // Set initial month display
        updateCalendarMonthDisplay();
        
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendarMonthDisplay();
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendarMonthDisplay();
            renderCalendar();
        });
    }
    
    function updateCalendarMonthDisplay() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        calendarMonth.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    // Initialize charts using Chart.js
    function initVenueOccupancyChart() {
        const ctx = document.getElementById('venue-occupancy-chart');
        if (!ctx) return;
        
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Grand Thar Hall',
                data: [70, 65, 75, 80, 90, 95, 85],
                backgroundColor: 'rgba(216, 27, 96, 0.6)',
                borderColor: 'rgba(216, 27, 96, 1)',
                borderWidth: 2
            }, {
                label: 'Sindhu Garden',
                data: [60, 70, 65, 75, 85, 90, 80],
                backgroundColor: 'rgba(30, 58, 138, 0.6)',
                borderColor: 'rgba(30, 58, 138, 1)',
                borderWidth: 2
            }, {
                label: 'Ajrak Banquet',
                data: [50, 60, 55, 65, 75, 85, 70],
                backgroundColor: 'rgba(212, 175, 55, 0.6)',
                borderColor: 'rgba(212, 175, 55, 1)',
                borderWidth: 2
            }, {
                label: 'Ralli Courtyard',
                data: [40, 50, 45, 60, 65, 70, 60],
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2
            }]
        };
        
        window.venueOccupancyChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Occupancy (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
    }
    
    function updateVenueOccupancyChart(period) {
        if (!window.venueOccupancyChart) return;
        
        let labels, datasets;
        
        switch (period) {
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                datasets = [{
                    label: 'Grand Thar Hall',
                    data: [70, 65, 75, 80, 90, 95, 85],
                    backgroundColor: 'rgba(216, 27, 96, 0.6)',
                    borderColor: 'rgba(216, 27, 96, 1)',
                    borderWidth: 2
                }, {
                    label: 'Sindhu Garden',
                    data: [60, 70, 65, 75, 85, 90, 80],
                    backgroundColor: 'rgba(30, 58, 138, 0.6)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 2
                }, {
                    label: 'Ajrak Banquet',
                    data: [50, 60, 55, 65, 75, 85, 70],
                    backgroundColor: 'rgba(212, 175, 55, 0.6)',
                    borderColor: 'rgba(212, 175, 55, 1)',
                    borderWidth: 2
                }, {
                    label: 'Ralli Courtyard',
                    data: [40, 50, 45, 60, 65, 70, 60],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                }];
                break;
            
            case 'month':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                datasets = [{
                    label: 'Grand Thar Hall',
                    data: [75, 82, 88, 93],
                    backgroundColor: 'rgba(216, 27, 96, 0.6)',
                    borderColor: 'rgba(216, 27, 96, 1)',
                    borderWidth: 2
                }, {
                    label: 'Sindhu Garden',
                    data: [70, 75, 82, 85],
                    backgroundColor: 'rgba(30, 58, 138, 0.6)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 2
                }, {
                    label: 'Ajrak Banquet',
                    data: [60, 65, 75, 80],
                    backgroundColor: 'rgba(212, 175, 55, 0.6)',
                    borderColor: 'rgba(212, 175, 55, 1)',
                    borderWidth: 2
                }, {
                    label: 'Ralli Courtyard',
                    data: [50, 55, 65, 70],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                }];
                break;
            
            case 'year':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                datasets = [{
                    label: 'Grand Thar Hall',
                    data: [65, 60, 70, 75, 80, 85, 90, 92, 88, 85, 82, 95],
                    backgroundColor: 'rgba(216, 27, 96, 0.6)',
                    borderColor: 'rgba(216, 27, 96, 1)',
                    borderWidth: 2
                }, {
                    label: 'Sindhu Garden',
                    data: [60, 55, 65, 70, 75, 80, 85, 88, 82, 80, 78, 90],
                    backgroundColor: 'rgba(30, 58, 138, 0.6)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 2
                }, {
                    label: 'Ajrak Banquet',
                    data: [55, 50, 60, 65, 70, 75, 80, 82, 78, 75, 72, 85],
                    backgroundColor: 'rgba(212, 175, 55, 0.6)',
                    borderColor: 'rgba(212, 175, 55, 1)',
                    borderWidth: 2
                }, {
                    label: 'Ralli Courtyard',
                    data: [45, 40, 50, 55, 60, 65, 70, 72, 68, 65, 62, 75],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                }];
                break;
        }
        
        window.venueOccupancyChart.data.labels = labels;
        window.venueOccupancyChart.data.datasets = datasets;
        window.venueOccupancyChart.update();
    }
    
    function initRevenueChart() {
        const ctx = document.getElementById('revenue-chart');
        if (!ctx) return;
        
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Venue Booking',
                data: [350000, 300000, 400000, 450000, 550000, 600000, 500000],
                backgroundColor: 'rgba(216, 27, 96, 0.6)',
                borderColor: 'rgba(216, 27, 96, 1)',
                borderWidth: 2
            }, {
                label: 'Catering',
                data: [150000, 125000, 175000, 200000, 225000, 250000, 225000],
                backgroundColor: 'rgba(30, 58, 138, 0.6)',
                borderColor: 'rgba(30, 58, 138, 1)',
                borderWidth: 2
            }, {
                label: 'Additional Services',
                data: [100000, 90000, 120000, 130000, 150000, 175000, 150000],
                backgroundColor: 'rgba(212, 175, 55, 0.6)',
                borderColor: 'rgba(212, 175, 55, 1)',
                borderWidth: 2
            }]
        };
        
        window.revenueChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Revenue (PKR)'
                        },
                        ticks: {
                            callback: function(value) {
                                return (value / 1000) + 'K';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
    }
    
    function updateRevenueChart(period) {
        if (!window.revenueChart) return;
        
        let labels, datasets;
        
        switch (period) {
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                datasets = [{
                    label: 'Venue Booking',
                    data: [350000, 300000, 400000, 450000, 550000, 600000, 500000],
                    backgroundColor: 'rgba(216, 27, 96, 0.6)',
                    borderColor: 'rgba(216, 27, 96, 1)',
                    borderWidth: 2
                }, {
                    label: 'Catering',
                    data: [150000, 125000, 175000, 200000, 225000, 250000, 225000],
                    backgroundColor: 'rgba(30, 58, 138, 0.6)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 2
                }, {
                    label: 'Additional Services',
                    data: [100000, 90000, 120000, 130000, 150000, 175000, 150000],
                    backgroundColor: 'rgba(212, 175, 55, 0.6)',
                    borderColor: 'rgba(212, 175, 55, 1)',
                    borderWidth: 2
                }];
                break;
            
            case 'month':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                datasets = [{
                    label: 'Venue Booking',
                    data: [2500000, 2800000, 3100000, 3400000],
                    backgroundColor: 'rgba(216, 27, 96, 0.6)',
                    borderColor: 'rgba(216, 27, 96, 1)',
                    borderWidth: 2
                }, {
                    label: 'Catering',
                    data: [1200000, 1350000, 1500000, 1650000],
                    backgroundColor: 'rgba(30, 58, 138, 0.6)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 2
                }, {
                    label: 'Additional Services',
                    data: [800000, 900000, 1000000, 1100000],
                    backgroundColor: 'rgba(212, 175, 55, 0.6)',
                    borderColor: 'rgba(212, 175, 55, 1)',
                    borderWidth: 2
                }];
                break;
            
            case 'year':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                datasets = [{
                    label: 'Venue Booking',
                    data: [8000000, 7500000, 9000000, 10000000, 11000000, 12000000, 13000000, 12500000, 11500000, 10500000, 9500000, 14000000],
                    backgroundColor: 'rgba(216, 27, 96, 0.6)',
                    borderColor: 'rgba(216, 27, 96, 1)',
                    borderWidth: 2
                }, {
                    label: 'Catering',
                    data: [3500000, 3200000, 4000000, 4500000, 5000000, 5500000, 6000000, 5700000, 5200000, 4800000, 4200000, 6500000],
                    backgroundColor: 'rgba(30, 58, 138, 0.6)',
                    borderColor: 'rgba(30, 58, 138, 1)',
                    borderWidth: 2
                }, {
                    label: 'Additional Services',
                    data: [2500000, 2300000, 3000000, 3300000, 3600000, 3900000, 4200000, 4000000, 3700000, 3400000, 3100000, 4500000],
                    backgroundColor: 'rgba(212, 175, 55, 0.6)',
                    borderColor: 'rgba(212, 175, 55, 1)',
                    borderWidth: 2
                }];
                break;
        }
        
        window.revenueChart.data.labels = labels;
        window.revenueChart.data.datasets = datasets;
        window.revenueChart.update();
    }
    
    // Events Calendar
    function initEventsCalendar() {
        renderCalendar();
    }
    
    function renderCalendar() {
        const calendarContainer = document.getElementById('events-calendar');
        if (!calendarContainer) return;
        
        // Get the first day of the month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        
        // Get the number of days in the month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Sample events data (in a real app, this would come from the database)
        const events = [
            { date: 5, type: 'wedding', title: 'Khan Wedding', venue: 'Grand Thar Hall' },
            { date: 8, type: 'reception', title: 'Ahmed Reception', venue: 'Grand Thar Hall' },
            { date: 12, type: 'mehndi', title: 'Soomro Mehndi', venue: 'Sindhu Garden' },
            { date: 15, type: 'engagement', title: 'Malik Engagement', venue: 'Ajrak Banquet' },
            { date: 18, type: 'wedding', title: 'Bhutto Wedding', venue: 'Grand Thar Hall' },
            { date: 18, type: 'mehndi', title: 'Shah Mehndi', venue: 'Sindhu Garden' },
            { date: 22, type: 'reception', title: 'Rajput Reception', venue: 'Grand Thar Hall' },
            { date: 25, type: 'engagement', title: 'Khoso Engagement', venue: 'Ralli Courtyard' },
            { date: 28, type: 'wedding', title: 'Baloch Wedding', venue: 'Grand Thar Hall' }
        ];
        
        // Create calendar HTML
        let calendarHTML = `
            <div class="calendar-header">
                <div class="calendar-weekday">Sun</div>
                <div class="calendar-weekday">Mon</div>
                <div class="calendar-weekday">Tue</div>
                <div class="calendar-weekday">Wed</div>
                <div class="calendar-weekday">Thu</div>
                <div class="calendar-weekday">Fri</div>
                <div class="calendar-weekday">Sat</div>
            </div>
            <div class="calendar-body">
        `;
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += `<div class="calendar-day empty"></div>`;
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            // Check if there are events on this day
            const dayEvents = events.filter(event => event.date === day);
            
            calendarHTML += `<div class="calendar-day${dayEvents.length > 0 ? ' has-events' : ''}">
                <div class="day-number">${day}</div>`;
            
            // Add events for this day
            if (dayEvents.length > 0) {
                calendarHTML += `<div class="day-events">`;
                
                dayEvents.forEach(event => {
                    calendarHTML += `
                        <div class="calendar-event ${event.type}">
                            <span class="event-title">${event.title}</span>
                            <span class="event-venue">${event.venue}</span>
                        </div>
                    `;
                });
                
                calendarHTML += `</div>`;
            }
            
            calendarHTML += `</div>`;
        }
        
        // Add empty cells for days after the last day of the month to complete the grid
        const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
        for (let i = firstDay + daysInMonth; i < totalCells; i++) {
            calendarHTML += `<div class="calendar-day empty"></div>`;
        }
        
        calendarHTML += `</div>`;
        
        // Set the calendar HTML
        calendarContainer.innerHTML = calendarHTML;
        
        // Add styles for the calendar
        const style = document.createElement('style');
        style.textContent = `
            .calendar-header {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                border-bottom: 1px solid var(--gray-200);
            }
            
            .calendar-weekday {
                padding: var(--spacing-2);
                text-align: center;
                font-weight: 600;
                color: var(--gray-700);
            }
            
            .calendar-body {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-auto-rows: minmax(100px, auto);
            }
            
            .calendar-day {
                border: 1px solid var(--gray-200);
                padding: var(--spacing-2);
                position: relative;
                min-height: 100px;
            }
            
            .calendar-day.empty {
                background-color: var(--gray-50);
            }
            
            .calendar-day.has-events {
                background-color: var(--gray-50);
            }
            
            .day-number {
                font-weight: 600;
                margin-bottom: var(--spacing-1);
            }
            
            .day-events {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            
            .calendar-event {
                padding: 2px 4px;
                border-radius: 3px;
                font-size: 0.75rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            
            .calendar-event.wedding {
                background-color: var(--primary-light);
                color: var(--primary-dark);
            }
            
            .calendar-event.reception {
                background-color: var(--secondary-light);
                color: var(--white);
            }
            
            .calendar-event.mehndi {
                background-color: var(--accent-light);
                color: var(--accent-dark);
            }
            
            .calendar-event.engagement {
                background-color: var(--success-light);
                color: var(--success-dark);
            }
            
            .calendar-event.other {
                background-color: var(--gray-300);
                color: var(--gray-700);
            }
            
            .event-title {
                font-weight: 600;
                margin-right: 5px;
            }
            
            .event-venue {
                font-size: 0.7rem;
                opacity: 0.8;
            }
            
            @media (max-width: 992px) {
                .calendar-day {
                    min-height: 80px;
                }
            }
            
            @media (max-width: 768px) {
                .event-venue {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Update AI Insights
    function updateAIInsights() {
        const aiInsights = [
            {
                type: 'warning',
                title: 'Potential Double Booking Risk',
                content: 'Two events scheduled on June 23rd have similar guest counts but only one catering team available. Consider adjusting staffing.',
                action: 'Review Schedule'
            },
            {
                type: 'info',
                title: 'Seasonal Booking Trend',
                content: 'Nikah ceremonies are showing a 20% increase for July compared to previous year. Consider creating a special Nikah package.',
                action: 'View Analytics'
            },
            {
                type: 'success',
                title: 'Menu Optimization Opportunity',
                content: 'Adding premium non-alcoholic beverages to the Mehndi packages could increase revenue by approximately 12%.',
                action: 'See Recommendation'
            },
            {
                type: 'danger',
                title: 'Maintenance Alert',
                content: 'Air conditioning system in Grand Thar Hall is showing signs of reduced efficiency. Preventive maintenance recommended.',
                action: 'Schedule Maintenance'
            }
        ];
        
        const aiInsightsContainer = document.querySelector('.ai-insights .card-body');
        if (!aiInsightsContainer) return;
        
        let insightsHTML = '';
        
        // Randomly reorder insights to give the appearance of fresh data
        aiInsights.sort(() => Math.random() - 0.5);
        
        aiInsights.forEach(insight => {
            insightsHTML += `
                <div class="ai-insight-item">
                    <div class="insight-icon ${insight.type}">
                        <i class="fas ${getIconForInsightType(insight.type)}"></i>
                    </div>
                    <div class="insight-content">
                        <h4>${insight.title}</h4>
                        <p>${insight.content}</p>
                        <a href="#" class="insight-action">${insight.action}</a>
                    </div>
                </div>
            `;
        });
        
        // Replace insights
        aiInsightsContainer.innerHTML = insightsHTML;
    }
    
    function getIconForInsightType(type) {
        switch (type) {
            case 'warning':
                return 'fa-exclamation-triangle';
            case 'info':
                return 'fa-chart-line';
            case 'success':
                return 'fa-lightbulb';
            case 'danger':
                return 'fa-tasks';
            default:
                return 'fa-info-circle';
        }
    }
});