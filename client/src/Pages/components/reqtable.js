import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function ReqTable() {
  const [data, setData] = useState([]);

  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/requisitions')
      .then(response => response.json())
      .then(
        data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getData = async (value) => {
    let urlWithParameters = 'http://localhost:5001/api/requisitions';
    if(value!==''){
        // Construct the URL with parameters
        urlWithParameters += `/user?id=${encodeURIComponent(value)}`;
    }
    // Make the fetch call
    fetch(urlWithParameters, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the API response data
        setData(data);
      })
      .catch(error => {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
      });
  };
  useEffect(() => {
        const fetchData = async () => {


        let apiUrl = 'http://localhost:5001/api/requisitions';
        if (filterValue) {
        apiUrl += `/status?status=${encodeURIComponent(filterValue)}`;
        }

        try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        } catch (error) {
        console.error('Fetch error:', error);
        }
        };
        fetchData();
    }, [filterValue]);


    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
      };

  return (
    <>
      <input id='searchval' placeholder='Search value here'></input>
      <button onClick={() => getData(document.getElementById('searchval').value)}>Search</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>Component Name</th>
            {/* Add more table headers based on your API response */}
            <th>Quantidade</th>
            <th>
            <div className="mb-3">
                <label htmlFor="filterSelect" className="form-label">
                    STATUS
                </label>
                <select
                className="form-select"
                id="filterSelect"
                value={filterValue}
                onChange={handleFilterChange}
                >
                <option value="">Filtrar por estado</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                {/* Add more filter options as needed */}
                </select>
            </div>
            </th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.user_name}</td>
              <td>{item.user_email}</td>
              <td>{item.name}</td>
              {/* Render other columns based on your API response */}
              <td>{item.quantity}</td>
              <td>{item.status}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}


export default ReqTable;