import React, { useState, useEffect } from 'react';
import './driver.css';
import { Car, MapPin, Clock, DollarSign, User, Settings, LogOut, Calendar, Navigation, Phone, Map } from 'lucide-react';
import Logbar from './Logout';
import { rideService } from './services/rideService';

function DriverPortal() {
    const [isOnline, setIsOnline] = useState(false);
    const [upcomingRides, setUpcomingRides] = useState([
        {
            id: 1,
            passengerName: "Alice Johnson",
            phone: "+250 788 123 456",
            pickup: "KN 1 Ave, Kigali",
            destination: "KG 7 Ave, Kigali",
            date: "2024-03-20",
            time: "14:30",
            status: "pending",
            fare: 2500
        },
        {
            id: 2,
            passengerName: "Bob Smith",
            phone: "+250 788 789 012",
            pickup: "KG 2 Ave, Kigali",
            destination: "KN 5 Ave, Kigali",
            date: "2024-03-20",
            time: "15:00",
            status: "pending",
            fare: 3000
        }
    ]);
    const [earnings, setEarnings] = useState({
        today: 25000,
        week: 125000,
        month: 450000,
        trips: 12
    });
    const [activeTime, setActiveTime] = useState('2h 30m');
    const [currentLocation, setCurrentLocation] = useState({
        lat: -1.9536,
        lng: 30.0605,
        address: "Kigali, Rwanda"
    });

    
    const driverId = '12345';
    const vehicleInfo = {
        model: "Toyota RAV4 2022",
        plate: "RAA 123A",
        color: "Silver"
    };

    useEffect(() => {
        loadDriverData();
    
        const interval = setInterval(loadDriverData, 30000); 
        
        
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        address: "Updating..." 
                    });
                },
                (error) => console.error('Error getting location:', error),
                { enableHighAccuracy: true }
            );
        }
        
        return () => clearInterval(interval);
    }, []);

    const loadDriverData = async () => {
        try {
            
            const rides = await rideService.getDriverRides(driverId);
            setUpcomingRides(rides);

           
            setEarnings({
                today: 25000,
                week: 125000,
                month: 450000,
                trips: 12
            });
            setActiveTime('2h 30m');
        } catch (error) {
            console.error('Error loading driver data:', error);
        }
    };

    const handleStatusChange = async () => {
        try {
            const newStatus = !isOnline;
            await rideService.updateDriverStatus(driverId, newStatus ? 'online' : 'offline');
            setIsOnline(newStatus);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleRideStatusUpdate = async (rideId, status) => {
        try {
            await rideService.updateRideStatus(rideId, status);
            loadDriverData(); 
        } catch (error) {
            console.error('Error updating ride status:', error);
        }
    };

    return (
        <div className="driver-container">
            <div className="white"><Logbar /></div>
            
          
            <div className="status-section">
                <div className="status-toggle">
                    <button 
                        className={`status-button ${isOnline ? 'online' : 'offline'}`}
                        onClick={handleStatusChange}
                    >
                        {isOnline ? 'Online' : 'Offline'}
                    </button>
                </div>
                <div className="driver-info">
                    <div className="driver-avatar">
                        <User size={40} />
                    </div>
                    <div className="driver-details">
                        <h2>John Doe</h2>
                        <p>Driver ID: #{driverId}</p>
                        <p className="driver-rating">⭐ 4.8 (120 rides)</p>
                        <p className="vehicle-plate">{vehicleInfo.plate}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <DollarSign className="card-icon" />
                    <h3>Today's Earnings</h3>
                    <p className="amount">RWF {earnings.today.toLocaleString()}</p>
                    <p className="sub-text">{earnings.trips} trips completed</p>
                </div>

               
                <div className="dashboard-card">
                    <DollarSign className="card-icon" />
                    <h3>Weekly Earnings</h3>
                    <p className="amount">RWF {earnings.week.toLocaleString()}</p>
                    <p className="sub-text">Last 7 days</p>
                </div>

                
                <div className="dashboard-card">
                    <Clock className="card-icon" />
                    <h3>Active Time</h3>
                    <p className="amount">{activeTime}</p>
                    <p className="sub-text">Today's active time</p>
                </div>

                
                <div className="dashboard-card">
                    <MapPin className="card-icon" />
                    <h3>Current Location</h3>
                    <p className="location">{currentLocation.address}</p>
                    <p className="sub-text">GPS Active</p>
                </div>
            </div>

            
            <div className="rides-section">
                <h2 className="section-title">Upcoming Rides</h2>
                <div className="rides-list">
                    {upcomingRides.map((ride) => (
                        <div key={ride.id} className="ride-card">
                            <div className="ride-header">
                                <div className="passenger-info">
                                    <User size={24} />
                                    <div>
                                        <h3>{ride.passengerName}</h3>
                                        <p className="ride-time">
                                            <Calendar size={16} /> {ride.date} at {ride.time}
                                        </p>
                                    </div>
                                </div>
                                <div className="ride-actions">
                                    <button className="contact-button">
                                        <Phone size={20} />
                                        <span>{ride.phone}</span>
                                    </button>
                                    <button className="navigate-button">
                                        <Navigation size={20} />
                                        <span>Navigate</span>
                                    </button>
                                </div>
                            </div>
                            <div className="ride-details">
                                <div className="location-details">
                                    <div className="pickup">
                                        <div className="location-dot pickup-dot"></div>
                                        <div className="location-info">
                                            <span className="label">Pickup</span>
                                            <p>{ride.pickup}</p>
                                        </div>
                                    </div>
                                    <div className="destination">
                                        <div className="location-dot destination-dot"></div>
                                        <div className="location-info">
                                            <span className="label">Destination</span>
                                            <p>{ride.destination}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ride-fare">
                                    <span className="label">Fare</span>
                                    <p className="amount">RWF {ride.fare.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           
            <div className="quick-actions">
                <button className="action-button">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default DriverPortal; 