import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: '',
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/employees');
            setEmployees(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/employees', formData);
            setEmployees([...employees, response.data]);
            setFormData({
                name: '',
                position: '',
                department: '',
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="App">
            <h1>Employee Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Position"
                    required
                />
                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department"
                    required
                />
                <button type="submit">Add Employee</button>
            </form>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {employee.name} - {employee.position} - {employee.department}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
