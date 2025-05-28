import React, { useState, useEffect } from 'react';
import './rideTracking.css';
import { MapPin, Clock, Car, User, CreditCard, Navigation, Phone, Wallet } from 'lucide-react';
import Logbar from './Logbar';


function RideTracking() {
    const [rideDetails, setRideDetails] = useState({
        driver: {
            name: "John Doe",
            phone: "+250 788 123 456",
            rating: 4.8,
            car: "Toyota RAV4 2022",
            license: "RAA 123A",
            photo: null
        },
        ride: {
            pickup: "KN 1 Ave, Kigali",
            destination: "KG 7 Ave, Kigali",
            status: "arriving", 
            estimatedArrival: "5 mins",
            distance: "2.5 km",
            price: "RWF 2,500",
            paymentMethod: "Cash"
        },
        location: {
            driverLat: -1.9536,
            driverLng: 30.0605,
            pickupLat: -1.9536,
            pickupLng: 30.0605
        }
    });

    const [wallet, setWallet] = useState({
        balance: 15000,
        recentTransactions: [
            { id: 1, amount: -2500, description: "Ride payment", date: "2024-03-20" },
            { id: 2, amount: 5000, description: "Wallet top-up", date: "2024-03-19" }
        ]
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setRideDetails(prev => ({
                ...prev,
                ride: {
                    ...prev.ride,
                    estimatedArrival: Math.max(0, parseInt(prev.ride.estimatedArrival) - 1) + " mins"
                }
            }));
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="tracking-container">
            

                <div style ={{ position:'relative', top:'-10px', width:'100%'}}>
        <Logbar />
      </div>
            <div className="tracking-section">
                <div className="status-banner">
                    <div className="status-indicator">
                        <div className={`status-dot ${rideDetails.ride.status}`}></div>
                        <span className="status-text">
                            {rideDetails.ride.status === 'arriving' ? 'Driver is arriving' : 
                             rideDetails.ride.status === 'in_progress' ? 'On the way' : 'Ride completed'}
                        </span>
                    </div>
                    <div className="arrival-time">
                        <Clock size={20} />
                        <span>Arriving in {rideDetails.ride.estimatedArrival}</span>
                    </div>
                </div>

                
                <div className="driver-card">
                    <div className="driver-profile">
                        <div className="driver-avatar">
                            <User size={40} />
                        </div>
                        <div className="driver-details">
                            <h3>{rideDetails.driver.name}</h3>
                            <div className="driver-rating">⭐ {rideDetails.driver.rating}</div>
                            <div className="car-info">
                                <Car size={16} />
                                <span>{rideDetails.driver.car} • {rideDetails.driver.license}</span>
                            </div>
                        </div>
                    </div>
                    <div className="driver-actions">
                        <button className="action-button call">
                            <Phone size={20} />
                            <span>Call</span>
                        </button>
                        <button className="action-button message">
                            <Navigation size={20} />
                            <span>Message</span>
                        </button>
                    </div>
                </div>

                
                <div className="ride-details-card">
                    <div className="location-details">
                        <div className="pickup">
                            <div className="location-dot pickup-dot"></div>
                            <div className="location-info">
                                <span className="label">Pickup</span>
                                <span className="address">{rideDetails.ride.pickup}</span>
                            </div>
                        </div>
                        <div className="route-line"></div>
                        <div className="destination">
                            <div className="location-dot destination-dot"></div>
                            <div className="location-info">
                                <span className="label">Destination</span>
                                <span className="address">{rideDetails.ride.destination}</span>
                            </div>
                        </div>
                    </div>
                    <div className="ride-info">
                        <div className="info-item">
                            <span className="label">Distance</span>
                            <span className="value">{rideDetails.ride.distance}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Payment Method</span>
                            <span className="value">{rideDetails.ride.paymentMethod}</span>
                        </div>
                        <div className="info-item total">
                            <span className="label">Total</span>
                            <span className="value">{rideDetails.ride.price}</span>
                        </div>
                    </div>
                </div>

                
                <div className="wallet-section">
                    <div className="wallet-header">
                        <Wallet size={24} />
                        <h3>Your Wallet</h3>
                    </div>
                    <div className="wallet-balance">
                        <span className="balance-label">Available Balance</span>
                        <span className="balance-amount">RWF {wallet.balance.toLocaleString()}</span>
                    </div>
                    <div className="recent-transactions">
                        <h4>Recent Transactions</h4>
                        {wallet.recentTransactions.map(transaction => (
                            <div key={transaction.id} className="transaction-item">
                                <div className="transaction-info">
                                    <span className="description">{transaction.description}</span>
                                    <span className="date">{transaction.date}</span>
                                </div>
                                <span className={`amount ${transaction.amount > 0 ? 'credit' : 'debit'}`}>
                                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} RWF
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RideTracking; 