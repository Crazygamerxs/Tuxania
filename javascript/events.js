document.addEventListener('DOMContentLoaded', (event) => {
    var modal = document.getElementById('event-modal');
    var btn = document.querySelector('.add-event-button');
    var span = document.getElementsByClassName('event-modal-close')[0];
    var closeModalBtn = document.getElementById('close-event-modal');
    var authPopup = document.getElementById('auth-popup');

    console.log("DOM fully loaded and parsed.");

    function showAuthPopup(message) {
        authPopup.textContent = message;
        authPopup.style.display = 'block';
        setTimeout(() => {
            authPopup.style.display = 'none';
        }, 3000);
    }

    btn.onclick = async function() {
        console.log("Add Event button clicked.");
        try {
            const response = await fetch('/system/webdev/Tuxania/Python_Scripts/authentication_events', {
                method: 'GET'
            });

            if (response.ok) {
                console.log("Authentication successful.");
                modal.style.display = 'block';
            } else if (response.status === 401) {
                alert('Authorization failed. Please check your credentials and try again.');
            } else if (response.status === 403) {
                showAuthPopup('You are not authorized to add events');
            } else {
                console.error('Failed to trigger Python resource with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    closeModalBtn.onclick = function() {
        modal.style.display = 'none';
    }

    document.getElementById('event-form').onsubmit = async function(e) {
        e.preventDefault();
        console.log("Event form submitted.");

        // Get form values
        var date = document.getElementById('event-date').value;
        var description = document.getElementById('event-description').value;

        try {
            await fetch(`/system/webdev/Tuxania/Python_Scripts/save_event?date=${encodeURIComponent(date)}&description=${encodeURIComponent(description)}`, {
                method: 'POST'
            });
                      
            renderEvent({ 'event_date': date, 'event_description': description });
                      
            document.getElementById('event-form').reset();
            modal.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function renderEvent(event) {
        var newEvent = document.createElement('div');
        newEvent.classList.add('event');

        var eventDate = new Date(event.event_date);
        var day = eventDate.getDate();
        var month = eventDate.toLocaleString('default', { month: 'short' });
        var year = eventDate.getFullYear();

        newEvent.innerHTML = `
            <div class="event-date">
                <div class="date-day">${day}</div>
                <div class="date-month">${month}</div>
                <div class="date-year">${year}</div>
            </div>
            <div class="event-description">${event.event_description}</div>
        `;
        document.querySelector('.events-list').appendChild(newEvent);
    }

    fetch('/system/webdev/Tuxania/Python_Scripts/get_event')
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                renderEvent(event);
            });
        })
        .catch(error => console.error('Error fetching events:', error));
});
