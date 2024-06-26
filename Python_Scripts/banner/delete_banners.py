def doPost(request, session):
    params = request.get('params', {})
    
    banner_id = params.get('id')
    
    db_params = {
        'id': banner_id
    }
    system.db.runNamedQuery('banner/delete_banner', db_params)