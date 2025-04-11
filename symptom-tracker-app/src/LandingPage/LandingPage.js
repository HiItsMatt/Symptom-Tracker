import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart from react-chartjs-2
import "chart.js/auto"; // Import chart.js for auto-registration
import './LandingPage.css';

const LandingPage = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [newSymptom, setNewSymptom] = useState("");
    const [showHistory, setShowHistory] = useState(false); // State to toggle between views
    const [chartData, setChartData] = useState({}); // State to store chart data

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("symptomTracker")) || {};
        const mostRecentDate = Object.keys(savedData).sort().pop(); // Get the most recent date key

        if (mostRecentDate && savedData[mostRecentDate]) {
            setSymptoms(savedData[mostRecentDate]); // Load the most recent symptoms
        }
        
        window.insertFakeData = () => {
            const fakeData = {
                "2025-04-10": [
                    { name: "Anxiety", severity: "3" },
                    { name: "Depression", severity: "3" },
                    { name: "Suicidal Thoughts", severity: "1" },
                    { name: "Insomnia", severity: "2" },
                    { name: "Low Appetite", severity: "6" },
                    { name: "Low Mood", severity: "2" },
                    { name: "Low Motivation", severity: "1" },
                    { name: "Stress", severity: "3" },
                    { name: "Emotional Disregulation", severity: "5" }
                ]
            };
    
            // Save the fake data to localStorage
            localStorage.setItem("symptomTracker", JSON.stringify(fakeData));
            console.log("Fake data inserted into localStorage:", fakeData);
        };
        
    }, []);

    

    const addSymptom = () => {
        if (newSymptom.trim() !== "") {
            setSymptoms([...symptoms, { name: newSymptom, severity: "Mild" }]);
            setNewSymptom(""); // Clear the input field
        }
    };

    const updateSeverity = (index, severity) => {
        const updatedSymptoms = [...symptoms];
        updatedSymptoms[index].severity = severity;
        setSymptoms(updatedSymptoms);
    };

    const deleteSymptom = (index) => {
        const updatedSymptoms = symptoms.filter((_, i) => i !== index);
        setSymptoms(updatedSymptoms);
    };

    const saveSymptoms = () => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const savedData = JSON.parse(localStorage.getItem("symptomTracker")) || {};

        // Overwrite today's symptoms in the saved data
        savedData[today] = symptoms;

        // Save the updated data back to localStorage
        localStorage.setItem("symptomTracker", JSON.stringify(savedData));

        console.log("Saved Symptoms:", savedData);
        alert("Symptoms saved successfully!");
    };

    const showHistoryView = () => {
        const savedData = JSON.parse(localStorage.getItem("symptomTracker")) || {};
        const labels = Object.keys(savedData).sort(); // Dates
        const datasets = [];
    
        // Create a dataset for each symptom
        const symptomMap = {};
        labels.forEach((date) => {
            savedData[date].forEach((symptom) => {
                if (!symptomMap[symptom.name]) {
                    symptomMap[symptom.name] = {}; // Use an object to map dates to severity
                }
    
                // Map severity to numeric values
                const severityValue =
                    symptom.severity === "Mild" ? 1 :
                    symptom.severity === "Moderate" ? 2 :
                    symptom.severity === "Severe" ? 3 :
                    parseInt(symptom.severity, 10); // Handle numeric severity values (e.g., 1-10)
    
                symptomMap[symptom.name][date] = severityValue;
            });
        });
    
        for (const [symptomName, dateMap] of Object.entries(symptomMap)) {
            const data = labels.map((date) => dateMap[date] || null); // Ensure alignment with labels
            datasets.push({
                label: symptomName,
                data,
                borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
                backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light blue fill
                borderWidth: 2,
                tension: 0.4, // Smooth curves
            });
        }
    
        setChartData({
            labels,
            datasets,
        });
    
        setShowHistory(true); // Switch to history view
    };

    const graphOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'white', // Legend text color
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide vertical grid lines
                },
                ticks: {
                    color: 'white', // X-axis label color
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // Light grid lines
                },
                ticks: {
                    color: 'white', // Y-axis label color
                    stepSize: 1, // Ensure severity levels are evenly spaced
                },
                min: 0,
                max: 10, // Severity levels range from 1 to 3
            },
        },
    };

    return (
        <div className="landing-page">
            <div className="content-box">
                <div className="content-box-header">
                    <h1>Daily Symptoms</h1>
                </div>
                {!showHistory ? (
                    <>
                        <div className="symptom-list">
                            <ul>
                                {symptoms.map((symptom, index) => (
                                    <li key={index} className="symptom-item">
                                        <span>{symptom.name}</span>
                                        <select
                                            value={symptom.severity}
                                            onChange={(e) => updateSeverity(index, e.target.value)}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteSymptom(index)}
                                        >
                                            X
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="add-symptom">
                            <input
                                type="text"
                                placeholder="Enter a symptom"
                                value={newSymptom}
                                onChange={(e) => setNewSymptom(e.target.value)}
                            />
                            <button onClick={addSymptom}>Add Symptom</button>
                        </div>
                        <div className="buttons">
                            <button className="save-button" onClick={saveSymptoms}>Save</button>
                            <button className="history-button" onClick={showHistoryView}>History</button>
                        </div>
                    </>
                ) : (
                    <div className="history-view">
                        <button className="back-button" onClick={() => setShowHistory(false)}>
                            Back
                        </button>
                        <Line data={chartData} options={graphOptions}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;