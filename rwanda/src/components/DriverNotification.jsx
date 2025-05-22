import React, { useState, useEffect } from 'react';
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa';
import './DriverNotification.css';

const DriverNotification = ({ driverId }) => {
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);

    // Simulate receiving a notification (in real app, this would come from backend)
    useEffect(() => {
        // This would be replaced with actual WebSocket or real-time connection
        const mockNotification = {
            id: Date.now(),
            type: 'ride_request',
            message: 'New ride request from organization',
            rideDetails: {
                pickup: 'Kigali International Airport',
                destination: 'Kigali Convention Centre',
                fare: 'RWF 5,000',
                passenger: 'John Doe',
                time: new Date().toLocaleTimeString()
            },
            timestamp: new Date()
        };

        // Simulate receiving a notification after 5 seconds
        const timer = setTimeout(() => {
            setNotifications(prev => [...prev, mockNotification]);
            setCurrentRequest(mockNotification);
            setShowNotification(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = async (notificationId) => {
        try {
            // Here you would make an API call to accept the ride
            console.log('Accepting ride request:', notificationId);
            
            // Update notifications list
            setNotifications(prev => 
                prev.filter(notif => notif.id !== notificationId)
            );
            setShowNotification(false);
            setCurrentRequest(null);
            
            // Show success message
            alert('Ride request accepted successfully!');
        } catch (error) {
            console.error('Error accepting ride:', error);
            alert('Failed to accept ride request. Please try again.');
        }
    };

    const handleDecline = async (notificationId) => {
        try {
            // Here you would make an API call to decline the ride
            console.log('Declining ride request:', notificationId);
            
            // Update notifications list
            setNotifications(prev => 
                prev.filter(notif => notif.id !== notificationId)
            );
            setShowNotification(false);
            setCurrentRequest(null);
            
            // Show success message
            alert('Ride request declined.');
        } catch (error) {
            console.error('Error declining ride:', error);
            alert('Failed to decline ride request. Please try again.');
        }
    };

    return (
        <div className="driver-notification-container">
            {showNotification && currentRequest && (
                <div className="notification-popup">
                    <div className="notification-header">
                        <FaBell className="notification-icon" />
                        <h3>New Ride Request</h3>
                    </div>
                    
                    <div className="notification-content">
                        <div className="ride-details">
                            <p><strong>Pickup:</strong> {currentRequest.rideDetails.pickup}</p>
                            <p><strong>Destination:</strong> {currentRequest.rideDetails.destination}</p>
                            <p><strong>Fare:</strong> {currentRequest.rideDetails.fare}</p>
                            <p><strong>Passenger:</strong> {currentRequest.rideDetails.passenger}</p>
                            <p><strong>Time:</strong> {currentRequest.rideDetails.time}</p>
                        </div>
                        
                        <div className="notification-actions">
                            <button 
                                className="accept-btn"
                                onClick={() => handleAccept(currentRequest.id)}
                            >
                                <FaCheck /> Accept
                            </button>
                            <button 
                                className="decline-btn"
                                onClick={() => handleDecline(currentRequest.id)}
                            >
                                <FaTimes /> Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverNotification; 