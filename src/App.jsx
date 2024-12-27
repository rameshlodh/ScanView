import React, { useEffect, useState } from 'react';
import './App.css';  // Import the CSS file for styling

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the local JSON file
    fetch('/dockle.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error loading dockle.json:', error));
  }, []);

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1 className="header">Dockle JSON Data</h1>
      <div className="summary">
        <h2>Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.summary).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="details">
        <h2>Details</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Level</th>
              <th>Alerts</th>
            </tr>
          </thead>
          <tbody>
            {data.details.map((item) => (
              <tr key={item.code}>
                <td>{item.code}</td>
                <td>{item.title}</td>
                <td>{item.level}</td>
                <td>
                  <ul>
                    {item.alerts.map((alert, index) => (
                      <li key={index}>{alert}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
