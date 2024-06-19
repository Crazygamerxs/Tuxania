def doPost(request, session):
	params = request.get('params', {})
#	logger = system.util.getLogger('request')
#	logger.info("Request content: %s" % request)
	
	title = params.get('title')
	subtitle = params.get('subtitle')
	detail = params.get('detail')
	image = params.get('image')

	# Log the retrieved data
#	logger.info("Title: %s" % title)
#	logger.info("Subtitle: %s" % subtitle)
#	logger.info("Detail: %s" % detail)
#	logger.info("Image: %s" % image)
		
	db_params = {
	    'title': title,
	    'subtitle': subtitle,
	    'detail': detail,
	    'image': image
	}
	    
	system.db.runNamedQuery('save_banner', db_params)