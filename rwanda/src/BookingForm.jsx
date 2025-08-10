import React from 'react';
import { Car } from 'lucide-react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const BookingForm = () => {
  const handleInputClick = () => {
    toast.info('⚠️ Please login or sign up first. Click "Get Started" to continue.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <div className="booking-form">
      <div className="form-group">
        <label>
          <span className="location-icon">⚫</span>
          Pickup Location
        </label>
        <input type="text" placeholder=" 📍 Enter pickup location" onClick={handleInputClick} />
      </div>

      <div className="form-group">
        <label>
          <span className="destination-icon">⚫</span>
          Destination
        </label>
        <input type="text" placeholder=" 🔄 Enter destination" onClick={handleInputClick}/>
      </div>

      <button className="request-ride-btn" onClick={handleInputClick}>
        <Car />
        Request a Ride
        <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default BookingForm;


