import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);

  useEffect(() => {
    const existingUsername = localStorage.getItem('username');
    if (existingUsername) {
      alert("You are already signed in");
      window.location.href = '/A_profile';
    }
  }, []);


  // => work 
  const checkUsername = async () => {
    try {
      const response = await axios.post('/A_signup/checkUsername', { username });
      setUsernameExists(response.data.usernameExists);
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };



  const handleSignUp = async () => {
    if (password === confirmPassword && !usernameExists) {
      try {
        
        console.log("Username:", username);
        console.log("Password:", password);
        
        // Sign-up 
        await axios.post('/A_signup/save', { username, password });
        await axios.post('/audience/save/un', { username }); // Save username to audience models
        alert('Sign-up successful!');
        
        
        localStorage.setItem('username', username);//session =>username
        localStorage.setItem('userType', "audience")
        window.location.href = '/A_profile';

      } catch (error) {
        setError('Error in sign-up. Please try again.');
      }
    } else if (usernameExists) {
      setError('Username already exists. Please choose a different one.');
    } else {
      setError('Passwords do not match');
    }
  };



  return (
    
   <div className="container d-flex justify-content-center align-items-center vh-100">
 
 <div style={{ maxWidth: '500px', maxHeight: '700px', width: '100%', overflow: 'auto', }}>
  <div className="card p-4">
    <h2 className="text-center mb-4" style={{ color: '#000000' }}  >Sign Up Page</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={checkUsername}
        />
        {usernameExists && <p className="text-danger mt-2">Username already exists</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button type="button" className="btn btn-primary" onClick={handleSignUp}>
        Sign Up
      </button>
    </form>
    </div>
  </div>
</div>

  );
};

export default SignUp;

