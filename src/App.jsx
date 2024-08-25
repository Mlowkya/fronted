import React, { useState } from 'react';
import axios from 'axios';



function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const response = await axios.post('http://localhost:5000/bfhl', parsedInput);
            setResponseData(response.data);
            setError(null);
        } catch (err) {
            setError('Invalid JSON or error in processing request');
        }
    };

    const handleSelectChange = (event) => {
        const options = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const renderResponse = () => {
        if (!responseData) return null;

        let filteredResponse = {};
        if (selectedOptions.includes('Numbers')) {
            filteredResponse.numbers = responseData.numbers;
        }
        if (selectedOptions.includes('Alphabets')) {
            filteredResponse.alphabets = responseData.alphabets;
        }
        if (selectedOptions.includes('Highest Lowercase Alphabet')) {
            filteredResponse.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
        }

        return (
            <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        );
    };

    return (
        <div>
            <h1>{responseData ? responseData.roll_number : 'ABCD123'}</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON input here...'
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            
            {responseData && (
                <>
                    <select multiple={true} onChange={handleSelectChange}>
                        <option value="Numbers">Numbers</option>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    {renderResponse()}
                </>
            )}
        </div>
    );
}

export default App;
