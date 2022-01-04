import React, {useState} from 'react'

const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password: ""})

    const handleSubmit = async (e) => {
        e.preventDefault();   // preventing page reloading while adding note
        // API Call
        const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNmE0N2U2MzBhYzgwODJhZTc3NWEwIn0sImlhdCI6MTY0MDQwODE5MH0.YEKlfd6YvgdKWkIoSdVCJf6M0F9KxFrFUyg4ZbsqqcI",
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = response.json();
        console.log(json);
    }
    const handleChange = (e) =>
    {
        setCredentials({...credentials, [e.target.name]: e.target.value})   
    }
    return (
        <div>
            <form onSubmit ={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={handleChange} value={credentials.email} name="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} name="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
