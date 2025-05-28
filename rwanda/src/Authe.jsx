import React, { useState } from "react";
import "./auth.css";
import Firstbar from "./Firstpage";
import { FaUser as User, FaCar as Car } from 'react-icons/fa';

function Authentication() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailOrPhone.trim() || !username.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }

    console.log('Submitted:', { emailOrPhone, username, password, role });
    setError('');
  };

  return (
    <div className="auth" style={{
      marginBottom: '30px'
    }}>
      <div className="white">
        <Firstbar />
      </div>

      <div className="role-selector">
        <button 
          className={`role-button ${role === 'client' ? 'active' : ''}`}
          onClick={() => setRole('client')}
        >
          <User size={24} />
          <span>Client</span>
        </button>
        <button 
          className={`role-button ${role === 'driver' ? 'active' : ''}`}
          onClick={() => setRole('driver')}
        >
          <Car size={24} />
          <span>Driver</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <p className="whats">What's your phone number or <br /> email?</p>

        <input
          type="text"
          className="enter"
          placeholder="Enter your phone number or email"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />

        <input
          style={{ marginTop: "10px" }}
          type="text"
          className="enter"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={{ marginTop: "10px" }}
          type="password"
          className="enter"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="pass-enter">
          Continue as {role === 'client' ? 'Client' : 'Driver'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <p className="dashed">
        ___________________________ or ____________________________
      </p>

      <button type="button" className="google">Continue with Google</button>
      <button type="button" className="apple">Continue with Apple</button>

      <p className="proceed">
        By proceeding, you consent to get calls, WhatsApp or <br />
        SMS messages, including by automated means from <br />
        Rwanda Rides and its affiliates associated to it.
      </p>
    </div>
  );
}

export default Authentication;
