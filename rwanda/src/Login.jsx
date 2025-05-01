
import React, {useState, useEffect} from 'react';
import carImage from './pic.png';
import "./login.css";
import {Car} from'lucide-react';
import { useNavigate } from 'react-router-dom';
import { delay } from 'framer-motion';
import CookieConsent from './cookie';
import { toast } from 'react-toastify';





function Login() {
  
  const style = {
    borderRadius: '5px',
    width: '100%', 
    height: '400px', 
    objectFit: 'cover', 
    opacity: '0.8', 
    transition: 'transform 0.3s ease', 
    
  };

  
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: '5px',
    


  };

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100); 
  }, []);


  
   const navigate = useNavigate(); 
   const acceptClick = () => {
     console.log("Login button clicked, wait it is pending");
 
     setTimeout(() => {
       navigate('/auth'); 
     }, 1000);
   };
  
   const signClick = () => {
    console.log("Signup button clicked, wait it is pending");

    setTimeout(() => {
      navigate('/authe'); 
    }, 1000);
  };
 

  return (
    <>
    <body>
    <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '5px', overflow: 'hidden' }}
    className={`login-container ${fadeIn ? 'fade-in' : ''}`}>
    
    <div style={overlayStyle} className='div' >
    </div>
    <img src={carImage} alt="Car" style={style} className='image' />
   
  </div>

  
  <p style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }} className='h1'>Rwanda Rides available in cities across Rwanda</p> 
  <p className='sub-h1'>Rwanda Rides is the first ride-sharing platform designed specifically for   </p>  
  <p className='sub-h'>Rwanda's unique transport landscape!</p>
  <button className='log' onClick={acceptClick}>Login</button>
  <button className='sign' onClick={signClick}>Signup</button>
  <CookieConsent/>
  
  
    </body>
   
 
  </>
    
  );
}

export default Login;

