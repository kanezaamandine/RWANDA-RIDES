import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './organization.css';
import Logbar from './Logbar';
import { 
    Map, Users, Car, Clock, DollarSign, Search, Filter, Send, 
    Phone, Navigation, RefreshCw, Download, History, BarChart2,
    AlertCircle, Star, Shield, Settings, MessageSquare, Bell,
    Moon,Sun
    
} from 'lucide-react';


function OrganizationPortal() {
    const [theme, setTheme] = useState('light');
    const [activeDrivers, setActiveDrivers] = useState([
        {
            id: "DRV001",
            name: "John Mukasa",
            status: "online",
            vehicleModel: "Toyota RAV4 2022",
            vehiclePlate: "RAA 123A",
            currentLocation: "KN 1 Ave, Kigali",
            rating: 4.8,
            completedTrips: 156,
            todayEarnings: 45000,
            avgResponseTime: "2.5",
            acceptanceRate: 95,
            distance: 2.3,
            lastActive: "2 mins ago",
            phoneNumber: "+250 788 123 456",
            documents: {
                license: "Valid",
                insurance: "Valid",
                vehicleInspection: "Valid"
            },
            performance: {
                onTimeRate: 98,
                cancellationRate: 2,
                customerRating: 4.8
            }
        },
        {
            id: "DRV002",
            name: "Sarah Uwera",
            status: "busy",
            vehicleModel: "Honda CR-V 2021",
            vehiclePlate: "RAA 456B",
            currentLocation: "KG 7 Ave, Kigali",
            rating: 4.9,
            completedTrips: 203,
            todayEarnings: 38000,
            avgResponseTime: "1.8",
            acceptanceRate: 98,
            distance: 4.5
        },
        {
            id: "DRV003",
            name: "Peter Niyonsenga",
            status: "online",
            vehicleModel: "Toyota Corolla 2023",
            vehiclePlate: "RAA 789C",
            currentLocation: "KN 4 Ave, Kigali",
            rating: 4.7,
            completedTrips: 89,
            todayEarnings: 32000,
            avgResponseTime: "3.2",
            acceptanceRate: 92,
            distance: 1.8
        },
        {
            id: "DRV004",
            name: "Marie Uwimana",
            status: "offline",
            vehicleModel: "Suzuki Vitara 2022",
            vehiclePlate: "RAA 321D",
            currentLocation: "KG 2 Ave, Kigali",
            rating: 4.6,
            completedTrips: 134,
            todayEarnings: 0,
            avgResponseTime: "2.9",
            acceptanceRate: 94,
            distance: 3.7
        }
    ]);

    const [pendingRides, setPendingRides] = useState([
        {
            id: "RIDE001",
            status: "pending",
            requestTime: "14:30",
            pickup: "KN 1 Ave, Kigali",
            destination: "KG 7 Ave, Kigali",
            distance: 4.2,
            estimatedDuration: 15,
            fare: 2500,
            passengerName: "Alice Johnson",
            passengerPhone: "+250 788 123 456",
            paymentMethod: "Cash",
            specialInstructions: "Extra luggage",
            priority: "High",
            surgeMultiplier: 1.2
        },
        {
            id: "RIDE002",
            status: "assigned",
            requestTime: "14:35",
            pickup: "KG 2 Ave, Kigali",
            destination: "KN 5 Ave, Kigali",
            distance: 3.8,
            estimatedDuration: 12,
            fare: 2200,
            passengerName: "Bob Smith",
            passengerPhone: "+250 788 789 012"
        },
        {
            id: "RIDE003",
            status: "pending",
            requestTime: "14:40",
            pickup: "KN 3 Ave, Kigali",
            destination: "KG 4 Ave, Kigali",
            distance: 2.5,
            estimatedDuration: 8,
            fare: 1800,
            passengerName: "Carol Uwase",
            passengerPhone: "+250 788 345 678"
        }
    ]);

    const [selectedDriver, setSelectedDriver] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showDriverDetails, setShowDriverDetails] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [notifications, setNotifications] = useState([]);

    
    const [analyticsData, setAnalyticsData] = useState({
        dailyRides: 156,
        activeDrivers: 45,
        totalRevenue: 1250000,
        averageRating: 4.7,
        peakHours: ["8:00", "17:00"],
        popularRoutes: [
            { from: "Airport", to: "City Center", count: 45 },
            { from: "City Center", to: "Convention Center", count: 32 }
        ]
    });

    useEffect(() => {
        loadActiveDrivers();
        loadPendingRides();
        const interval = setInterval(() => {
            loadActiveDrivers();
            loadPendingRides();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const loadActiveDrivers = async () => {
        try {
            const drivers = await rideService.getActiveDrivers();
            setActiveDrivers(drivers);
        } catch (error) {
            console.error('Error loading active drivers:', error);
        }
    };

    const loadPendingRides = async () => {
        try {
            const rides = await rideService.getPendingRides();
            setPendingRides(rides);
        } catch (error) {
            console.error('Error loading pending rides:', error);
        }
    };

    const handleAssignRide = async (rideId, driverId) => {
        try {
            await rideService.assignRideToDriver(rideId, driverId);
            loadPendingRides();
            sendDriverNotification(driverId, {
                type: 'new_ride',
                message: 'New ride assigned to you',
                rideId: rideId
            });
        } catch (error) {
            console.error('Error assigning ride:', error);
        }
    };

    const sendDriverNotification = (driverId, notification) => {
        console.log('Sending notification to driver:', driverId, notification);
    };

    const handleDriverSelect = (driver) => {
        setSelectedDriver(driver);
        setShowDriverDetails(true);
    };

    const filteredDrivers = activeDrivers.filter(driver => {
        const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            driver.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || driver.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const onlineCount = activeDrivers.filter(d => d.status === 'online').length;
    const busyCount = activeDrivers.filter(d => d.status === 'busy').length;
    const offlineCount = activeDrivers.filter(d => d.status === 'offline').length;

    return (
        <div className="org-container">
            <div style ={{ position:'relative', top:'-10px', width:'100%'}}>
        <Logbar />
      </div>
            <div className="org-header">
                <div className="org-header-top">
                    <h1>Driver Management Portal</h1>
                    <div className="org-header-actions">
                        <button className="org-action-btn" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <button className="org-action-btn">
                            <Bell size={20} />
                            <span className="notification-badge">3</span>
                        </button>
                        <button className="org-action-btn">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>
                
                <div className="org-dashboard-stats">
                    <div className="stat-card">
                        <Users className="stat-icon" />
                        <div>
                            <div className="stat-label">Active Drivers</div>
                            <div className="stat-value">{onlineCount}</div>
                            <div className="stat-trend positive">+5% from yesterday</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Car className="stat-icon" />
                        <div>
                            <div className="stat-label">On Trip</div>
                            <div className="stat-value">{busyCount}</div>
                            <div className="stat-trend">Current</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Clock className="stat-icon" />
                        <div>
                            <div className="stat-label">Pending Rides</div>
                            <div className="stat-value">{pendingRides.length}</div>
                            <div className="stat-trend">Needs attention</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <DollarSign className="stat-icon" />
                        <div>
                            <div className="stat-label">Today's Revenue</div>
                            <div className="stat-value">RWF {analyticsData.totalRevenue.toLocaleString()}</div>
                            <div className="stat-trend positive">+12% from yesterday</div>
                        </div>
                    </div>
                </div>
            </div>

    
            <div className="org-main-grid">
                <section className="org-col">
                    <div className="org-section-header">
                        <h2>Active Drivers</h2>
                        <div className="org-driver-filters">
                            <div className="search-box">
                                <Search size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search drivers..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select 
                                className="org-driver-filter"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Drivers</option>
                                <option value="online">Active</option>
                                <option value="busy">On Trip</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
                    </div>

                    <div className="org-driver-table">
                        <div className="org-driver-table-header">
                            <span>Status</span>
                            <span>Name</span>
                            <span>Plaque</span>
                            <span>Car</span>
                            <span>Location</span>
                            <span>Rating</span>
                            <span>Trips</span>
                            <span>Earnings</span>
                            <span>Actions</span>
                        </div>
                        {filteredDrivers.map(driver => (
                            <div 
                                className="org-driver-table-row" 
                                key={driver.id}
                                onClick={() => handleDriverSelect(driver)}
                            >
                                <span className={`org-driver-status-dot ${driver.status}`}></span>
                                <span className="org-driver-table-name" title={driver.name}>
                                    {driver.name}
                                    <div className="driver-details">
                                        <span className="driver-phone">{driver.phoneNumber}</span>
                                        <span className="driver-rating">⭐ {driver.rating}</span>
                                    </div>
                                </span>
                                <span className="org-driver-table-plate" title={driver.vehiclePlate}>
                                    {driver.vehiclePlate}
                                </span>
                                <span className="org-driver-table-car" title={driver.vehicleModel}>
                                    {driver.vehicleModel.split(' ')[0]}
                                </span>
                                <span className="org-driver-table-location" title={driver.currentLocation}>
                                    {driver.currentLocation}
                                    <div className="location-details">
                                        <span className="last-active">{driver.lastActive}</span>
                                    </div>
                                </span>
                                <span className="rating-cell">
                                    ⭐ {driver.rating}
                                    <div className="rating-details">
                                        <span>Last 30 days</span>
                                    </div>
                                </span>
                                <span className="trips-cell">
                                    {driver.completedTrips}
                                    <div className="trips-details">
                                        <span>Today: {Math.floor(driver.completedTrips / 30)}</span>
                                    </div>
                                </span>
                                <span className="earnings-cell">
                                    RWF {driver.todayEarnings.toLocaleString()}
                                    <div className="earnings-details">
                                        <span>Today's earnings</span>
                                    </div>
                                </span>
                                <span className="actions-cell">
                                    <button className="action-btn" title="Message">
                                        <MessageSquare size={16} />
                                    </button>
                                    <button className="action-btn" title="View Details">
                                        <Navigation size={16} />
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

            
                <section className="org-col">
                    <div className="org-section-header">
                        <h2>Pending Ride Requests</h2>
                        <div className="org-ride-filters">
                            <select className="org-ride-filter">
                                <option value="all">All Requests</option>
                                <option value="urgent">Urgent</option>
                                <option value="scheduled">Scheduled</option>
                            </select>
                        </div>
                    </div>

                    <div className="org-card-list">
                        {pendingRides.map(ride => (
                            <div className="org-ride-card" key={ride.id}>
                                <div className="org-ride-main">
                                    <div>
                                        <div className="org-ride-id">Ride #{ride.id}</div>
                                        <div className="org-ride-time">Requested: {ride.requestTime}</div>
                                    </div>
                                    <div className={`org-ride-status-badge ${ride.status}`}>
                                        {ride.status}
                                        {ride.priority === 'High' && (
                                            <AlertCircle size={14} className="priority-indicator" />
                                        )}
                                    </div>
                                </div>

                                <div className="org-ride-locations">
                                    <div className="location-row">
                                        <span className="location-dot pickup"></span>
                                        <div>
                                            <div className="org-ride-label">Pickup</div>
                                            <div className="location-text">{ride.pickup}</div>
                                        </div>
                                    </div>
                                    <div className="location-row">
                                        <span className="location-dot destination"></span>
                                        <div>
                                            <div className="org-ride-label">Destination</div>
                                            <div className="location-text">{ride.destination}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="org-ride-stats-row">
                                    <div className="stat-item">
                                        <Navigation size={14} />
                                        <span>{ride.distance} km</span>
                                    </div>
                                    <div className="stat-item">
                                        <Clock size={14} />
                                        <span>{ride.estimatedDuration} min</span>
                                    </div>
                                    <div className="stat-item">
                                        <DollarSign size={14} />
                                        <span>RWF {ride.fare.toLocaleString()}</span>
                                        {ride.surgeMultiplier > 1 && (
                                            <span className="surge-badge">x{ride.surgeMultiplier}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="org-ride-passenger">
                                    <div className="passenger-info">
                                        <div className="passenger-name">{ride.passengerName}</div>
                                        <div className="passenger-phone">
                                            <Phone size={14} />
                                            {ride.passengerPhone}
                                        </div>
                                    </div>
                                    <div className="payment-info">
                                        <span className="payment-method">{ride.paymentMethod}</span>
                                    </div>
                                </div>

                                {ride.specialInstructions && (
                                    <div className="org-ride-instructions">
                                        <AlertCircle size={14} />
                                        <span>{ride.specialInstructions}</span>
                                    </div>
                                )}

                                <div className="org-ride-actions-row">
                                    <select className="org-driver-select">
                                        <option>Assign Driver</option>
                                        {activeDrivers
                                            .filter(d => d.status === 'online')
                                            .map(driver => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.name} - {driver.vehiclePlate}
                                                </option>
                                            ))}
                                    </select>
                                    <button 
                                        className="org-send-btn"
                                        onClick={() => handleAssignRide(ride.id, selectedDriver?.id)}
                                    >
                                        <Send size={16} /> Send Request
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {showDriverDetails && selectedDriver && (
                <div className="driver-details-modal">
                </div>
            )}
        </div>
    );
}

export default OrganizationPortal; 