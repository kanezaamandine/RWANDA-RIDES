
import Firstbar from './Firstpage.jsx';
import BookingForm from './BookingForm';
import Map from './Map';
import { useNavigate } from 'react-router-dom';
import './home.css';
import React, {useState} from 'react';
import Joyride from 'react-joyride';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Home() {
  const navigate = useNavigate(); 
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    setIsFading(true);
    console.log("Button clicked, preparing to navigate");

    setTimeout(() => {
      navigate('/login'); 
    }, 1500);
  };
  const [runTour, setRunTour] = useState(true);
  const steps = [
    {
      target: '.hero-content h1',
      content: 'Welcome to our Rwanda Rides booking platform!',
    },

    {
      target: '.right-section',
      content: 'And here’s the map to track or choose your location.',
    },

    {
      target: '.get-started-btn',
      content: 'Click here to get started',
    },
    
  
  ];

  return (
    <>
          <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        styles={{
          options: {
            zIndex: 9999,
          },

          spotlight:{
            // backgroundColor: 'black',
            
          }
        }}
      />
      <div className={`app ${isFading ? 'fade-out' : ''}`}>
        <Firstbar />
        <div className="main-content">
          <div className="left-section">
            <div className="hero-content">
              <h1>Get around Rwanda with ease</h1>
              <p>Reliable rides when you need them. Book a car with a tap</p>
            </div>
            <BookingForm  loggedIn={false}/>
            <button className="get-started-btn" onClick={handleClick}>
              Get Started
            </button>
          </div>
          <div className="right-section">
            <Map />
          </div>
        </div>
      </div>
      <ToastContainer />

      
    </>
  );
}

export default Home;
