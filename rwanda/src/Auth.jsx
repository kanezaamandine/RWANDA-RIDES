import React, { useState } from "react";
import "./auth.css";
import Firstbar from "./Firstpage";
import { ToastContainer, toast } from 'react-toastify';
import { User, Car } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

function Authorization() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('client'); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailOrPhone.trim() || !password.trim()) {
      setError('');
      return;
    }

   
    if (role === 'driver') {
      if (emailOrPhone === "+250788123456" && password === "driver123") {
        localStorage.setItem('userInfo', JSON.stringify({
          id: '12345',
          name: 'John Doe',
          phone: emailOrPhone,
          role: 'driver',
          isAuthenticated: true
        }));
        window.location.href = '/driver-portal';
      } else {
        setError('Invalid driver credentials');
      }
    } else {
      if (emailOrPhone === "+250788789012" && password === "client123") {
        localStorage.setItem('userInfo', JSON.stringify({
          id: '67890',
          name: 'Alice Johnson',
          phone: emailOrPhone,
          role: 'client',
          isAuthenticated: true
        }));
        window.location.href = '/book-ride';
      } else {
        setError('Invalid client credentials');
      }
    }

    console.log('Submitted:', { emailOrPhone, password, role });
    setError('');
  };

  return (
    <div className="auth">
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
          required
        />

        <input
          type="password"
          className="enterpas"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="pass-enter">
          Continue as {role === 'client' ? 'Client' : 'Driver'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>

      <p className="dashed">___________________________ or ____________________________</p>

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

export default Authorization;
