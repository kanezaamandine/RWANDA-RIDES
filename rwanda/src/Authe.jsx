import React, { useState } from "react";
import "./auth.css";
import Navbar from "./Navbar";

function Authentication() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailOrPhone.trim() ) {
      setError('All fields are required');
      return;
    }

    console.log('Submitted:', { emailOrPhone});
    setError('');
  };

  return (
    <div className="auth">
      <div className="white">
        <Navbar />
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

      <input style={{marginTop:"10px"}}
          type="text"
          className="enter"
          placeholder="Enter your username"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          
        />

         <input style={{marginTop:"10px"}}
          type="text"
          className="enter"
          placeholder="Enter your password"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          
        />

        <button type="submit" className="pass-enter">Continue</button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
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

export default Authentication;