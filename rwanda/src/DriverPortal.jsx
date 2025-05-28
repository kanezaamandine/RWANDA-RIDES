import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { Car, MapPin, Clock, DollarSign, User, Settings, LogOut, Calendar, Navigation, Phone, Map, Bell } from 'lucide-react';
import Navbar from './Navbar';


function DriverPortal() {
    const navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(false);
    const [recentRides, setRecentRides] = useState([
        {
            id: 1,
            passengerName: "Alice Johnson",
            phone: "+250 788 123 456",
            pickup: "KN 1 Ave, Kigali",
            destination: "KG 7 Ave, Kigali",
            completedAt: "2024-03-20 14:30",
            status: "completed",
            fare: 2500,
            rating: 5
        },
        {
            id: 2,
            passengerName: "Bob Smith",
            phone: "+250 788 789 012",
            pickup: "KG 2 Ave, Kigali",
            destination: "KN 5 Ave, Kigali",
            completedAt: "2024-03-20 13:15",
            status: "completed",
            fare: 3000,
            rating: 4
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
    const [rideRequests, setRideRequests] = useState([
        {
            id: 3,
            passengerName: "Sarah Wilson",
            phone: "+250 788 345 678",
            pickup: "KG 11 Ave, Kigali",
            destination: "KN 8 St, Kigali",
            fare: 3500,
            distance: "2.5 km",
            time: "5 min"
        }
    ]);
    const [driverInfo, setDriverInfo] = useState(null);

    const driverId = '12345';
    const vehicleInfo = {
        model: "Toyota RAV4 2022",
        plate: "RAA 123A",
        color: "Silver"
    };

    useEffect(() => {
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (!userInfo.isAuthenticated || userInfo.role !== 'driver') {
            navigate('/auth');
            return;
        }
        setDriverInfo(userInfo);
    }, [navigate]);

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
            setRecentRides(rides);

           
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

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/auth');
    };

    return (
        <div className="auth">
            <div className="white">
                <Navbar />
            </div>
            
            <div className="driver-dashboard">
                <div className="status-section">
                    <button 
                        className={`status-button ${isOnline ? 'online' : 'offline'}`}
                        onClick={() => setIsOnline(!isOnline)}
                    >
                        {isOnline ? 'Online' : 'Offline'}
                    </button>
                </div>

                <div className="driver-info">
                    <h2>Welcome, {driverInfo?.name || 'Driver'}</h2>
                    <p>Phone: {driverInfo?.phone}</p>
                </div>

                <div className="action-buttons">
                    <button className="action-button">
                        <Car size={24} />
                        <span>My Rides</span>
                    </button>
                    <button className="action-button">
                        <Map size={24} />
                        <span>Navigation</span>
                    </button>
                    <button className="action-button">
                        <Bell size={24} />
                        <span>Notifications</span>
                    </button>
                    <button className="action-button" onClick={handleLogout}>
                        <LogOut size={24} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DriverPortal; 