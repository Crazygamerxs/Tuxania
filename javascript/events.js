document.addEventListener('DOMContentLoaded', (event) => {
    var modal = document.getElementById('event-modal');
    var btn = document.querySelector('.add-event-button');
    var span = document.getElementsByClassName('event-modal-close')[0];
    var closeModalBtn = document.getElementById('close-event-modal');
    var authPopup = document.getElementById('auth-popup');

    function showAuthPopup(message) {
        authPopup.textContent = message;
        authPopup.style.display = 'block';
        setTimeout(() => {
            authPopup.style.display = 'none';
        }, 3000);
    }

    btn.onclick = async function() {
        try {
            const response = await fetch('/system/webdev/Tuxania/Python_Scripts/authentication_events', {
                method: 'GET'
            });

            if (response.ok) {
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

    function renderEvent(event) {
        var newEvent = document.createElement('div');
        newEvent.classList.add('event');
    
        newEvent.innerHTML = `
            <div class="event-date">
                <div class="date-day">${event.event_day}</div>
                <div class="date-month">${event.event_month}</div>
            </div>
            <div class="event-description">${event.event_description}</div>
        `;
        document.querySelector('.events-list').appendChild(newEvent);
    }


   document.getElementById('event-form').onsubmit = async function(e) {
               e.preventDefault();
    
               // Get form values
               var day = document.getElementById('event-day').value;
               var month = document.getElementById('event-month').value;
               var description = document.getElementById('event-description').value;
    
               try {
                  // Send day and month data to the server in a single fetch request
                       await fetch(`/system/webdev/Tuxania/Python_Scripts/save_event?day=${encodeURIComponent(day)}&month=${encodeURIComponent(month)}&description=${encodeURIComponent(description)}`, {
                      method: 'POST'
                  });


                // Send month data to the server
                      //               await fetch('/system/webdev/Tuxania/templates/save_event?field=month&value=' + encodeURIComponent(month), {
                      //                   method: 'POST'
                      //               });
                      
                                     // Send description data to the server
                      //               await fetch('/system/webdev/Tuxania/templates/save_event?field=description&value=' + encodeURIComponent(description), {
                      //                   method: 'POST'
                      //               });
                      
                                     // If all requests are successful, render the event
                                     renderEvent({ 'event_day': day, 'event_month': month, 'event_description': description });
                      
                                     // Clear form and hide modal
                                     document.getElementById('event-form').reset();
                                     modal.style.display = 'none';
                      
                                 } catch (error) {
                                     console.error('Error:', error);
                                 }
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
