def doDelete(request, session):
    #logger = system.util.getLogger('delete_event')
    
    # Get the event ID from the request parameters
    params = request.get('params', {})
    event_id = params.get('id')

    if not event_id:
        return {'error': 'Event ID is required'}, 400

    try:
        # Log the event ID to check its value
        #logger.info("Event ID: %s" % event_id)

        # Run the named query to delete the event
        db_params = {'id': int(event_id)}  # Ensure event_id is an integer
        system.db.runNamedQuery('event/delete_event', db_params)
        #return {'message': 'Event deleted successfully'}, 200
    except Exception as e:
        #logger.error("Error deleting event: %s" % str(e))
        return {'error': 'Failed to delete event'}, 500