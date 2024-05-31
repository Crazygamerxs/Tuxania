def doGet(request, session):
	# Import necessary modules
	#import system.db
	#import system.util
	# Query to retrieve data from the database
	   # Replace 'my_table' with your table name
	data = system.db.runNamedQuery('get_event')
	
	# Convert the dataset to a list of dictionaries
	rows = []
	headers = data.getColumnNames()
    for row in range(data.getRowCount()):
        row_dict = {headers[i]: data.getValueAt(row, i) for i in range(len(headers))}
        rows.append(row_dict)
	
	# Generate HTML table
    html = """
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Database Data</title>
	    <style>
	        table {{
	            width: 100%;
	            border-collapse: collapse;
	        }}
	        th, td {{
	            border: 1px solid black;
	            padding: 8px;
	            text-align: left;
	        }}
	        th {{
	            background-color: #f2f2f2;
	        }}
	    </style>
	</head>
	<body>
	    <h1>Data from Database</h1>
	    <table>
	        <thead>
	            <tr>
	"""
	
	# Add table headers
	if rows:
	    for header in headers:
	        html += "<th>{}</th>".format(header)
	
	html += """
	            </tr>
	        </thead>
	        <tbody>
	"""
	
	# Add table rows
	for row in rows:
	    html += "<tr>"
	    for value in row.values():
	        html += "<td>{}</td>".format(value)
	    html += "</tr>"
	
	html += """
	        </tbody>
	    </table>
	</body>
	</html>
	"""
	
	# Return the generated HTML content
	return {'html': html}