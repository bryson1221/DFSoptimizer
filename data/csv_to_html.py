import csv

def csv_to_html(csv_file_path, html_file_path):
    with open(csv_file_path, mode='r') as csv_file:
        csv_reader = csv.reader(csv_file)
        headers = next(csv_reader)

        with open(html_file_path, mode='w') as html_file:
            # Write the HTML header with DataTables links
            html_file.write('<html><head><title>CSV to HTML</title>')
            html_file.write('<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.css"/>')
            html_file.write('<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>')
            html_file.write('<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>')
            html_file.write('''<script>
                $(document).ready(function() {
                    $('#myTable').DataTable(); 
                });
            </script>''')
            html_file.write('</head><body>')
            html_file.write('<table id="myTable" border="1"><thead><tr>')
            for header in headers:
                html_file.write(f'<th>{header}</th>')
            html_file.write('</tr></thead><tbody>')

            for row in csv_reader:
                html_file.write('<tr>')
                for column in row:
                    html_file.write(f'<td>{column}</td>')
                html_file.write('</tr>')
            html_file.write('</tbody></table></body></html>')

if __name__ == '__main__':
    # Replace with the path to your CSV file
    csv_to_html(r'C:\Users\bryso\OneDrive\Desktop\dfs-optimizer\data\players.csv', 'output.html')
    print("Script executed successfully, output available in output.html.")