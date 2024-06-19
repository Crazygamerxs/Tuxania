def doGet(request, session):
    banner_id = request.get('params', {}).get('id')
    
    db_params = {'id': banner_id}
    banner = system.db.runNamedQuery('get_banner_byID', db_params)
    
    if banner:
        return banner[0]
    else:
        return {'error': 'Banner not found'}