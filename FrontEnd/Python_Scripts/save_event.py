def doPost(request, session):
	# Push the error text to the logger
	logger = system.util.getLogger('request')
	
	# Log the content of the request dictionary
	logger.info("Request content: %s" % request)
	
	# Extract form data from the request dictionary's 'params' key
	params = request.get('params', {})
	
	# Extract values from params
	day = params.get('day')
	month = params.get('month')
	description = params.get('description')
	
	# Log the retrieved data
	logger.info("Event Day: %s" % day)
	logger.info("Event Month: %s" % month)
	logger.info("Event Description: %s" % description)
	
	# Insert data into the database
	db_params = {'Day': day, 'Month': month, 'Description': description}
	system.db.runNamedQuery('save_event', db_params)