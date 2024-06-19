    # Extract form data from the request dictionary's 'params' key
    params = request.get('params', {})

    # Extract values from params
    name = params.get('name')
    email = params.get('email')
    category = params.get('category')
    message = params.get('message')

    # Determine the recipient based on the category
    if category == 'Request':
        recipient = 'support@hdt-auto.com'
    else:
        recipient = 'dev.team@hdt-ca.com'

 	# Construct the email details
    sender = email
    email_body = "Name: " + name + "\nEmail: " + email + "\nMessage: " + message

    # Send the email
    system.net.sendEmail(
        smtp="postoffice.bend-all.com:25",
        fromAddr=sender,
        subject="New " + category + " from " + name,
        body=email_body,
        to=[recipient]
    )