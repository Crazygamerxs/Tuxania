// Initialize authenticated variable with the value from sessionStorage, if available
var authenticated = sessionStorage.getItem('authenticated') === 'true';

document.addEventListener('DOMContentLoaded', (event) => {
    var modal = document.getElementById('event-modal');
    var btn = document.querySelector('.add-event-button');
    var span = document.getElementsByClassName('event-modal-close')[0];
    var closeModalBtn = document.getElementById('close-event-modal');
    var authPopup = document.getElementById('auth-popup');

    //console.log("DOM fully loaded and parsed.");

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
            const response = await fetch('/system/webdev/Tuxania/Python_Scripts/events/authentication_events', {
                method: 'GET'
            });

            if (response.ok) {
                console.log("Authentication successful.");
                authenticated = true; // Update authentication status
                sessionStorage.setItem('authenticated', 'true'); // Store authentication status in sessionStorage
                modal.style.display = 'block';
                console.log(authenticated);
            } else if (response.status === 401) {
                alert('Authorization failed. Please check your credentials and try again.');
            } else if (response.status === 403) {
                showAuthPopup('You are not an admin');
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
    
        var date = document.getElementById('event-date').value;
        var description = document.getElementById('event-description').value;
    
        try {
            await fetch(`/system/webdev/Tuxania/Python_Scripts/events/save_event?date=${encodeURIComponent(date)}&description=${encodeURIComponent(description)}`, {
                method: 'POST'
            });
    
            renderEvent({ 'event_date': date, 'event_description': description });
    
            document.getElementById('event-form').reset();
            modal.style.display = 'none';
            // Reload the page
            location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }


  function renderEvent(event) {
        var newEvent = document.createElement('div');
        newEvent.classList.add('event');
        newEvent.setAttribute('data-id', event.id); // Use data-id attribute for easy removal
    
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
        
        // Create the trash icon element
        if (authenticated) {
            var trashIcon = document.createElement('img');
            trashIcon.src = "../Images/trash-icon.png";
            trashIcon.alt = "Trash Icon";
            trashIcon.classList.add('event-trash-icon');
            trashIcon.onclick = function() {
                deleteEvent(event.id);
            };
            newEvent.appendChild(trashIcon);
        }
        
        document.querySelector('.events-list').appendChild(newEvent);
    }


    async function deleteEvent(eventId) {
        try {
            const response = await fetch(`/system/webdev/Tuxania/Python_Scripts/events/delete_event?id=${eventId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log("Event deleted successfully.");
                // Remove the event from the DOM
                document.querySelector(`.event[data-id="${eventId}"]`).remove();
            } else {
                console.error('Failed to delete event with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetch('/system/webdev/Tuxania/Python_Scripts/events/get_event')
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                renderEvent(event);
            });
        })
        .catch(error => console.error('Error fetching events:', error));
});

window.deleteEvent = async function(eventId) {
    try {
        const url = `/system/webdev/Tuxania/Python_Scripts/events/delete_event?id=${eventId}`;
        console.log("Sending DELETE request to URL:", url);
        
        await fetch(url, {
            method: 'DELETE'
        });

        console.log("Event deleted successfully.");
        // Remove the event from the DOM
        document.querySelector(`.event[data-id="${eventId}"]`).remove();

    } catch (error) {
        console.error('Error:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
  const addEventBtn = document.getElementById('addEventBtn');
  
  // Check authentication status from sessionStorage
  const authenticated = sessionStorage.getItem('authenticated') === 'true';
  
  if (authenticated) {
    addEventBtn.style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('.login-btn');
  const authPopup = document.getElementById('auth-popup');
  let loginAttempts = 0;

  loginBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/system/webdev/Tuxania/Python_Scripts/events/authentication_events', {
        method: 'GET'
      });

      if (response.ok) {
                      console.log("Authentication successful.");
                      authenticated = true; // Update authentication status
                      sessionStorage.setItem('authenticated', 'true'); // Store authentication status in sessionStorage
                      modal.style.display = 'block';
                      console.log(authenticated);
                  } else if (response.status === 401) {
                      alert('Authorization failed. Please check your credentials and try again.');
                  } else if (response.status === 403) {
                      showAuthPopup('You are not an admin');
                  } else {
                      console.error('Failed to trigger Python resource with status:', response.status);
                  }
              } catch (error) {
                  console.error('Error:', error);
              }
  });

  function showAuthPopup(message) {
    authPopup.textContent = message;
    authPopup.style.display = 'block';
    setTimeout(() => {
      authPopup.style.display = 'none';
    }, 3000); // Hide after 3 seconds
  }
});









