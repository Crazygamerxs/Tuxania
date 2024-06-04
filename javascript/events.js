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

    // Render event on webpage
    function renderEvent(event) {
        var newEvent = document.createElement('div');
        newEvent.classList.add('event');
        newEvent.innerHTML = `
            <div class="event-date">
                <div class="date-day">${event['Event Day']}</div>
                <div class="date-month">${event['Event Month']}</div>
            </div>
            <div class="event-description">${event['Event Description']}</div>
        `;
        document.querySelector('.events-list').appendChild(newEvent);
    }

    // Add event
       document.getElementById('event-form').onsubmit = async function(e) {
           e.preventDefault();
   
           // Get form values
           var day = document.getElementById('event-day').value;
           var month = document.getElementById('event-month').value;
           var description = document.getElementById('event-description').value;
   
           try {
              // Send day and month data to the server in a single fetch request
                   await fetch(`/system/webdev/Tuxania/templates/save_event?day=${encodeURIComponent(day)}&month=${encodeURIComponent(month)}&description=${encodeURIComponent(description)}`, {
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
               renderEvent({ 'Event Day': day, 'Event Month': month, 'Event Description': description });
   
               // Clear form and hide modal
               document.getElementById('event-form').reset();
               modal.style.display = 'none';
   
           } catch (error) {
               console.error('Error:', error);
           }
       }


   // Load events from the database
        fetch('/system/webdev/Tuxania/templates/get_event')
            .then(response => response.json())
            .then(data => {
                let eventsHTML = '';
                data.forEach(event => {
                    eventsHTML += `
                    <div class="event" style="margin-top: 10px;">
                        <div class="event-date">
                            <div class="date-day">${event['Event Date']}</div>
                            <div class="date-month">${event['Event Month']}</div>
                        </div>
                        <div class="event-description">${event['Event Description']}</div>
                    </div>`;
                });
                document.getElementById('events-list').innerHTML = eventsHTML;
            })
            .catch(error => console.error('Error fetching events:', error));
    });
