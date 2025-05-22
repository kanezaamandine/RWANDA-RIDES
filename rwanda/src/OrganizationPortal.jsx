import React, { useState, useEffect } from 'react';
import './organization.css';
import { Map, Users, Car, Clock, DollarSign, Search, Filter, Send, Phone, Navigation, RefreshCw, Download, History } from 'lucide-react';
import Logbar from './Logout';
import { rideService } from './services/rideService';

function OrganizationPortal() {
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
            distance: 2.3
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
            passengerPhone: "+250 788 123 456"
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

    useEffect(() => {
        loadActiveDrivers();
        loadPendingRides();
        const interval = setInterval(() => {
            loadActiveDrivers();
            loadPendingRides();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

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
        } catch (error) {
            console.error('Error assigning ride:', error);
        }
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
            <div className="white"><Logbar /></div>
            <div className="org-header">
                <h1>Driver Management Portal</h1>
                <div className="org-dashboard-stats">
                    <div className="stat-card">
                        <Users className="stat-icon" />
                        <div>
                            <div className="stat-label">Active Drivers</div>
                            <div className="stat-value">{onlineCount}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Car className="stat-icon" />
                        <div>
                            <div className="stat-label">On Trip</div>
                            <div className="stat-value">{busyCount}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Clock className="stat-icon" />
                        <div>
                            <div className="stat-label">Pending Rides</div>
                            <div className="stat-value">{pendingRides.length}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="org-main-grid">
                <section className="org-col">
                    <div className="org-driver-table">
                        <div className="org-driver-table-header">
                            <span>Status</span>
                            <span>Name</span>
                            <span>Car</span>
                            <span>Location</span>
                            <span>Rating</span>
                            <span>Trips</span>
                            <span>Earnings</span>
                        </div>
                        {activeDrivers.map(driver => (
                            <div className="org-driver-table-row" key={driver.id}>
                                <span className={`org-driver-status-dot ${driver.status}`}></span>
                                <span className="org-driver-table-name" title={driver.name}>{driver.name}</span>
                                <span className="org-driver-table-car" title={driver.vehicleModel + ' ' + driver.vehiclePlate}>{driver.vehicleModel.split(' ')[0]} {driver.vehiclePlate}</span>
                                <span className="org-driver-table-location" title={driver.currentLocation}>{driver.currentLocation}</span>
                                <span>⭐ {driver.rating}</span>
                                <span>{driver.completedTrips}</span>
                                <span>RWF {driver.todayEarnings.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <h2 className="org-section-title">Active Drivers</h2>
                    <div className="org-info-box">
                        Select a driver to view more details or manage their status.<br/>
                        You can also filter, search, or take actions on drivers here.
                    </div>
                </section>
                <section className="org-col">
                    <h2 className="org-section-title">Pending Ride Requests</h2>
                    <div className="org-card-list">
                        {pendingRides.map(ride => (
                            <div className="org-ride-card" key={ride.id}>
                                <div className="org-ride-main">
                                    <div>
                                        <div className="org-ride-id">Ride #{ride.id}</div>
                                        <div className="org-ride-time">Requested: {ride.requestTime}</div>
                                    </div>
                                    <div className={`org-ride-status-badge ${ride.status}`}>{ride.status}</div>
                                </div>
                                <div className="org-ride-locations">
                                    <div><span className="org-ride-label">Pickup:</span> {ride.pickup}</div>
                                    <div><span className="org-ride-label">Destination:</span> {ride.destination}</div>
                                </div>
                                <div className="org-ride-stats-row">
                                    <div>Distance: {ride.distance} km</div>
                                    <div>Est: {ride.estimatedDuration} min</div>
                                    <div><DollarSign size={14} style={{verticalAlign:'middle'}} /> RWF {ride.fare.toLocaleString()}</div>
                                </div>
                                <div className="org-ride-passenger">Passenger: {ride.passengerName}</div>
                                <div className="org-ride-actions-row">
                                    <select className="org-driver-select">
                                        <option>Assign Driver</option>
                                        {activeDrivers.map(driver => (
                                            <option key={driver.id}>{driver.name} - {driver.vehiclePlate}</option>
                                        ))}
                                    </select>
                                    <button className="org-send-btn"><Send size={16} /> Send Request</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default OrganizationPortal; 