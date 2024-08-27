// Event Listener for the Upload Players button
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    console.log('Button clicked!'); // Log when the button is clicked
    if (file) {
        console.log('File selected:', file.name); // Log the name of the file selected
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            console.log('CSV Data:', csvData); // Log the raw CSV data read from the file
            const players = parseCSV(csvData);
            console.log('Parsed Players:', players); // Log the parsed player data
            displayPlayers(players);
        };
        reader.readAsText(file);
    } else {
        console.error('No file selected!'); // Log if no file is selected
    }
});

// Function to parse the CSV data
function parseCSV(data) {
    // Split the data into rows and map them to an array
    const rows = data.split('\n').map(row => row.split(','));
    const headers = rows[0];

    return rows.slice(1).map(row => {
        // Create a player object and fill it based on the headers
        const player = {};
        // Ensure the row has the same number of entries as headers
        if (row.length === headers.length) {
            headers.forEach((header, index) => {
                player[header.trim()] = row[index] ? row[index].trim() : ''; // Check if the cell exists
            });
        } else {
            console.warn('Row skipped due to mismatch in number of columns:', row);
        }
        return player;
    }).filter(player => Object.keys(player).length > 0); // Filter out any empty rows
}

// Function to display players in a table
function displayPlayers(players) {
    const playerDataDiv = document.getElementById('playerData');
    playerDataDiv.innerHTML = ''; // Clear existing data

    // Create a table
    const table = document.createElement('table');
    table.setAttribute('border', '1'); // Add border to table for visibility
    const headerRow = document.createElement('tr');

    // Create table headers
    for (const key in players[0]) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);

    // Populate table rows with player data
    players.forEach(player => {
        const row = document.createElement('tr');
        for (const key in player) {
            const cell = document.createElement('td');
            cell.textContent = player[key]; // Add player data to cell
            row.appendChild(cell);
        }
        table.appendChild(row);
    });

    // Append the table to the player data div
    playerDataDiv.appendChild(table);
}

    // function filter players
    function filterPlayers() {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const table = document.querySelector('#playerData table');
        const rows = table.getElementsByTagName('tr');
    
        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header
            const cells = rows[i].getElementsByTagName('td');
            let found = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].innerText.toLowerCase().includes(input)) {
                    found = true;
                    break;
                }
            }
            rows[i].style.display = found ? '' : 'none'; // Show or hide row
        }
    }

    function generateLineups() {
        const numLineups = document.getElementById('num_lineups').value;
        fetch('/generate_lineups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num_lineups: numLineups }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                displayLineups(data.lineups);
            }
        });
    }

// Event Listener for the Upload Players button
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    console.log('Button clicked!'); // Log when the button is clicked
    if (file) {
        console.log('File selected:', file.name); // Log the name of the file selected
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            console.log('CSV Data:', csvData); // Log the raw CSV data read from the file
            const players = parseCSV(csvData);
            console.log('Parsed Players:', players); // Log the parsed player data
            displayPlayers(players);
        };
        reader.readAsText(file);
    } else {
        console.error('No file selected!'); // Log if no file is selected
    }
});

// Function to parse the CSV data
function parseCSV(data) {
    const rows = data.split('\n').map(row => row.split(','));
    const headers = rows[0];

    return rows.slice(1).map(row => {
        const player = {};
        if (row.length === headers.length) {
            headers.forEach((header, index) => {
                player[header.trim()] = row[index] ? row[index].trim() : '';
            });
        } else {
            console.warn('Row skipped due to mismatch in number of columns:', row);
        }
        return player;
    }).filter(player => Object.keys(player).length > 0);
}

// Function to display players in a table
function displayPlayers(players) {
    const playerDataDiv = document.getElementById('playerData');
    playerDataDiv.innerHTML = '';

    const table = document.createElement('table');
    table.setAttribute('border', '1');
    const headerRow = document.createElement('tr');

    for (const key in players[0]) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);

    players.forEach(player => {
        const row = document.createElement('tr');
        for (const key in player) {
            const cell = document.createElement('td');
            cell.textContent = player[key];
            row.appendChild(cell);
        }
        table.appendChild(row);
    });

    playerDataDiv.appendChild(table);
}

function filterPlayers() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.querySelector('#playerData table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(input)) {
                found = true;
                break;
            }
        }
        rows[i].style.display = found ? '' : 'none';
    }
}

function generateLineups() {
    const numLineups = document.getElementById('num_lineups').value;
    fetch('/generate_lineups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num_lineups: numLineups }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            displayLineups(data.lineups);
        }
    });
}