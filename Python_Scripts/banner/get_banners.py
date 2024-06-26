def doGet(request, session):
	try:
	    # Query to retrieve banner data from the database
	    data = system.db.runNamedQuery('banner/get_banner')
	    
	    # Convert the dataset to a list of dictionaries
	    rows = []
	    headers = data.getColumnNames()
	    for row in range(data.getRowCount()):
	        row_dict = {headers[i]: data.getValueAt(row, i) for i in range(len(headers))}
	        rows.append(row_dict)
	    
	    # Return the data as JSON with a 'json' key
	    return {'json': rows}
	except Exception as e:
	    # Handle exceptions gracefully
	    return {'error': str(e)}  # Return an error message if something goes wrong