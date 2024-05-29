document.addEventListener('DOMContentLoaded', (event) => {
    // Get modal elements
    var modal = document.getElementById('event-modal');
    var btn = document.querySelector('.add-event-button');
    var span = document.getElementsByClassName('event-modal-close')[0];
    var closeModalBtn = document.getElementById('close-event-modal');

    // Show the modal
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Hide the modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Hide the modal when clicking the close button
    closeModalBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Load events from local storage
    function loadEvents() {
        var events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => {
            renderEvent(event);
            checkPassedEvent(event);
        });
    }

    // Save events to local storage
    function saveEvents(events) {
        localStorage.setItem('events', JSON.stringify(events));
    }

    // Render event on webpage
    function renderEvent(event) {
        var newEvent = document.createElement('div');
        newEvent.classList.add('event');
        newEvent.innerHTML = `
            <div class="event-date">
                <div class="date-day">${event.day}</div>
                <div class="date-month">${event.month}</div>
            </div>
            <div class="event-description">${event.description}</div>
        `;
        document.querySelector('.events-list').appendChild(newEvent);
    }

    // Check if event has passed and delete it
    function checkPassedEvent(event) {
        var currentDate = new Date();
        var eventDate = new Date(event.year, event.month - 1, event.day);
        if (currentDate > eventDate) {
            // Remove from webpage
            // Note: You may need to implement this part based on your HTML structure
            // Remove from local storage
            var events = JSON.parse(localStorage.getItem('events')) || [];
            events = events.filter(e => e !== event);
            saveEvents(events);
        }
    }

    // Add event
    document.getElementById('event-form').onsubmit = function(e) {
        e.preventDefault();

        // Get form values
        var day = document.getElementById('event-day').value;
        var month = document.getElementById('event-month').value;
        var description = document.getElementById('event-description').value;

        // Create event object
        var event = {
            day: day,
            month: month,
            description: description
        };

        // Save event to local storage
        var events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        saveEvents(events);

        // Render event on webpage
        renderEvent(event);

        // Clear form and hide modal
        document.getElementById('event-form').reset();
        modal.style.display = 'none';
    }

    // Load events when the page loads
    loadEvents();
});