def doPost(request, session):
    params = request.get('params', {})
    
    banner_id = params.get('id')
    title = params.get('title')
    subtitle = params.get('subtitle')
    image = params.get('image')

    try:
        if banner_id is not None:  # Assuming banner_id is required for editing
            # SQL Server query with positional parameters
            query = "UPDATE banners SET title = ?, subtitle = ?, image = ? WHERE id = ?"
            db_params = [title, subtitle, image, banner_id]
            system.db.runPrepUpdate(query, db_params)
        else:
            raise ValueError('Banner ID is missing')
    
    except Exception as e:
        # Handle exceptions appropriately
		return {'success': False, 'message': 'Failed to upload document.'}