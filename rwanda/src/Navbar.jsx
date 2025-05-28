import React from 'react';
import { Car } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import BookRide from './BookTicket';


const Navbar = () => {
  const navigate = useNavigate();

  const acceptClick = () => {
    const loadingToastId = toast.loading("Loading... Please wait ", {
      position: "top-center",
      theme: "colored",
    });

    setTimeout(() => {
      toast.update(loadingToastId, {
        render: "Redirecting to Login Page!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate('/auth');
    }, 5000); 
  };

  const signClick = () => {
    const loadingToastId = toast.loading("Preparing signup... ✍️", {
      position: "top-center",
      theme: "colored",
    });

    setTimeout(() => {
      toast.update(loadingToastId, {
        render: "Redirecting to Sign Up Page!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate('/authe');
    }, 2000); 
  };

  const AboutClick = () => {

    const loadingToastId = toast.loading("preparing the page... wait a moment!!", {
      position: 'top-center',
      theme: 'light',
    });

    setTimeout (() => {
      toast.update(loadingToastId, {
        render:"Redirecting you to about page!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate('/about');
    }, 2000);
  };

  const ContactClick = () => {

    const loadingToastId = toast.loading("preparing the page... 5 sec!!!", {
      position: 'top-center',
      theme: 'light',
    });

    setTimeout (() => {
      toast.update( loadingToastId, {

        render:"contact page loading",
        type: "success",
        isLoading: false,
        autoClose: 5000,

      });
      navigate('/contact');
    }, 2000);
  }
  

  return (
    <nav className="navbar">
      <div className="logo">
        <Car />
        <span className='rides'>Rwanda Rides</span>
      </div>
      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/book" >Book a Ride</Link>
        <a href="/about" onClick={AboutClick}>About</a>
        <Link to="/contact" onClick={ContactClick}>Contact</Link>
      </div>
      <div className="auth-buttons">
        <button className="login-btn" onClick={acceptClick}>Login</button>
        <button className="signup-btn" onClick={signClick}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;

