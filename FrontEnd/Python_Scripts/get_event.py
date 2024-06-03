def doGet(request, session):
    # Query to retrieve data from the database
    data = system.db.runNamedQuery('get_event')
    
    # Convert the dataset to a list of dictionaries
    rows = []
    headers = data.getColumnNames()
    for row in range(data.getRowCount()):
        row_dict = {headers[i]: data.getValueAt(row, i) for i in range(len(headers))}
        rows.append(row_dict)
    
    # Return the data as JSON
    return {'json': rows}