import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "" });
    let navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();   // preventing page reloading while adding note
        // API Call
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5500/api/auth/createuser", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            // save the auth token
            localStorage.setItem('token', json.authtoken); 
            // once the auth token is verified, history.push will redireect you to the home page
            navigate("/");
        }
        else
        {
            alert("Invalid Credentials")
        }
    }
    const handleChange = (e) =>
    {
        setCredentials({...credentials, [e.target.name]: e.target.value})   
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} id="name" aria-describedby="emailHelp" placeholder="Enter your name"/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange}  id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} id="password" minLength={5} required placeholder="Password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={handleChange} id="cpassword" placeholder="Re-enter password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
