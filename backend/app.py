from flask import Flask, request, jsonify
from app import generate_valid_lineup  # Ensure this is the correct import for your lineup generation function

app = Flask(__name__)

@app.route('/generate_lineups', methods=['POST'])
def generate_lineups():
    data = request.json
    num_lineups = int(data.get('num_lineups', 1))  # Default to 1 lineup if not specified
    lineups = []

    for _ in range(num_lineups):
        lineup = generate_valid_lineup(data)  # Call your lineup generation logic
        if lineup:
            lineups.append(lineup)
    
    if not lineups:
        return jsonify({"error": "Unable to generate valid lineups."}), 400

    return jsonify(lineups=lineups)

if __name__ == '__main__':
    app.run(debug=True)