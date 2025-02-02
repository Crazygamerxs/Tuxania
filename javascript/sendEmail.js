document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').onsubmit = async function(e) {
        e.preventDefault();
        console.log("Contact form submitted.");

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var category = document.getElementById('category').value;
        var message = document.getElementById('message').value;

        // Email validation
        var emailPattern = /^[a-zA-Z0-9._%+-]+@hdt-ca\.com$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            await fetch(`/system/webdev/Tuxania/Python_Scripts/sendEmail?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&category=${encodeURIComponent(category)}&message=${encodeURIComponent(message)}`, {
                method: 'POST'
            });

            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message.');
        }
    }
});