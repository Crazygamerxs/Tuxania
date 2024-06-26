    params = request.get('params', {})

    title = params.get('title')
    subtitle = params.get('subtitle')
    image = params.get('image')


    db_params = {
        'title': title,
        'subtitle': subtitle,
        'image': image
    }
        
    system.db.runNamedQuery('banner/save_banner', db_params)