import React, { useState } from "react";
import { FaCarSide,  FaRegClock, FaCreditCard } from "react-icons/fa";
import './BookRide.css';


const rideOptions = [
  {
    type: "Economy",
    desc: "Affordable daily rides",
    price: "2,500 RWF",
    eta: "3 min away",
  },
  {
    type: "Comfort",
    desc: "More legroom, newer",
    price: "4,000 RWF",
    eta: "5 min away",
  },
  {
    type: "Premium",
    desc: "Luxury vehicles with top drivers",
    price: "6,500 RWF",
    eta: "7 min away",
  },
];

const streetSuggestions = [
  "KN 1 Ave", "KN 3 Rd", "KG 7 Ave", "KG 11 Ave", "KN 5 Rd", "KN 8 St", "KG 17 Ave", "KN 12 Ave"
];

const districts = [
  "Gasabo", "Kicukiro", "Nyarugenge", "Huye", "Musanze", "Rubavu", "Muhanga"
];

const sectorsByDistrict = {
  Gasabo: ["Kimironko", "Remera", "Kacyiru", "Nyarutarama", "Ndera", "Kimihurura", "Rutunga", "Bumbogo", "Nduba", "Gatsata", "Kinyinya", "Gisozi", "Jabana"],
  Kicukiro: ["Kagarama", "Nyarugunga", "Gatenga", "Gikondo", "Kicukiro", "Kanombe", "Niboye", "Niboyi", "Muko"],
  Nyarugenge: ["Nyamirambo", "Kigali", "Gitega", "Kimisagara", "Rwezamenyo", "Nyakabanda", "Nyarugenge"],
  Huye: ["Ngoma", "Tumba", "Mukura", " Gishamvu", "Karama", "Maramba", "Maraba", "Ruhashya", "Rusatira", "Rwaniro", "Simbi", "Tumba"],
  Musanze: ["Muhoza", "Cyuve", "Kinigi", "Remera", "Muko", "Rwaza", "Gacaca", "Kimonyi", "Nyange", "Musanze", "Shingiro"],
  Rubavu: ["Gisenyi", "Nyamyumba", "Kanama", "Kanzenze", "Nyundo", "Busasamana", "Mudende", "Nyakiriba"],
  Muhanga: ["Shyogwe", "Nyamabuye", "Cyeza", "Rugendabari", "Nyabinoni", "Mugombwa", "Rwamira", "Bushenera", "Gishyirwe"]
};

export default function BookRide() {
  const [selectedRide, setSelectedRide] = useState(0);
  const [payment, setPayment] = useState("Cash");
  const [when, setWhen] = useState("Now");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
     
      <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '2rem', padding: '2rem 0', fontFamily: 'inherit' }}>
        Book Your Ride In Rwanda
      </div>
      <div className="main-content-container" style={{ 
        display: 'flex', 
        gap: '2rem', 
        justifyContent: 'center', 
        flex: 1,
        padding: '0 2rem'
      }}>
      
        <div
          className="trip-details-card"
          style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '2.5rem',
            width: '440px',
            minWidth: '340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Trip details</h2>
      
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 600, color: '#555', marginBottom: '0.3rem', display: 'block' }}>Select city</label>
            <select style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '0.7rem', fontSize: '1rem', marginTop: '0.2rem' }}>
              <option>Select a Province</option>
              <option>Kigali</option>
              <option>Western</option>
              <option>Eastern</option>
              <option>Northern</option>
              <option>Southern</option>
              
            </select>
          </div>
          
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 600, color: '#555', marginBottom: '0.3rem', display: 'block' }}>District</label>
            <select
              style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '0.7rem', fontSize: '1rem', marginTop: '0.2rem' }}
              value={district}
              onChange={e => {
                setDistrict(e.target.value);
                setSector("");
              }}
            >
              <option value="">Select a District</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 600, color: '#555', marginBottom: '0.3rem', display: 'block' }}>Sector</label>
            <select
              style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '0.7rem', fontSize: '1rem', marginTop: '0.2rem' }}
              value={sector}
              onChange={e => setSector(e.target.value)}
              disabled={!district}
            >
              <option value="">Select a Sector</option>
              {district && sectorsByDistrict[district].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
            <label style={{ fontWeight: 600, color: '#222', marginBottom: '0.3rem', display: 'block' }}>
              <span style={{ marginRight: '0.5rem' }}>⚫</span>
              Pickup location
            </label>
            <input
              type="text"
              placeholder=" 📍 Enter pickup location"
              style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', marginTop: '0.2rem' }}
              value={pickup}
              onChange={e => {
                setPickup(e.target.value);
                setPickupSuggestions(
                  streetSuggestions.filter(street =>
                    street.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value
                  )
                );
              }}
              onBlur={() => setTimeout(() => setPickupSuggestions([]), 100)} 
            />
            {pickupSuggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '0 0 8px 8px',
                zIndex: 10
              }}>
                {pickupSuggestions.map(street => (
                  <div
                    key={street}
                    style={{ padding: '0.5rem', cursor: 'pointer' }}
                    onMouseDown={() => {
                      setPickup(street);
                      setPickupSuggestions([]);
                    }}
                  >
                    {street}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
            <label style={{ fontWeight: 600, color: '#222', marginBottom: '0.3rem', display: 'block' }}>
              <span style={{ marginRight: '0.5rem' }}>⚫</span>
              Destination
            </label>
            <input
              type="text"
              placeholder=" 🔄 Enter destination"
              style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', marginTop: '0.2rem' }}
              value={destination}
              onChange={e => {
                setDestination(e.target.value);
                setDestinationSuggestions(
                  streetSuggestions.filter(street =>
                    street.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value
                  )
                );
              }}
              onBlur={() => setTimeout(() => setDestinationSuggestions([]), 100)}
            />
            {destinationSuggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '0 0 8px 8px',
                zIndex: 10
              }}>
                {destinationSuggestions.map(street => (
                  <div
                    key={street}
                    style={{ padding: '0.5rem', cursor: 'pointer' }}
                    onMouseDown={() => {
                      setDestination(street);
                      setDestinationSuggestions([]);
                    }}
                  >
                    {street}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 600, color: '#555', marginBottom: '0.3rem', display: 'block' }}>When</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  border: when === 'Now' ? '2px solid #000' : '1px solid #ddd',
                  background: when === 'Now' ? '#f3f4f6' : '#fff',
                  borderRadius: '8px',
                  padding: '0.7rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => setWhen('Now')}
              >
                <FaRegClock /> Now
              </button>
              <button
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  border: when === 'Schedule' ? '2px solid #000' : '1px solid #ddd',
                  background: when === 'Schedule' ? '#f3f4f6' : '#fff',
                  borderRadius: '8px',
                  padding: '0.7rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => setWhen('Schedule')}
              >
                <FaRegClock /> Schedule
              </button>
            </div>
            {when === 'Schedule' && (
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={e => setScheduledTime(e.target.value)}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.7rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            )}
          </div>
          
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontWeight: 600, color: '#555', marginBottom: '0.3rem', display: 'block' }}>Payment method</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                style={{
                  flex: 1,
                  border: payment === 'Cash' ? '2px solid #000' : '1px solid #ddd',
                  background: payment === 'Cash' ? '#000' : '#fff',
                  color: payment === 'Cash' ? '#fff' : '#222',
                  borderRadius: '8px',
                  padding: '0.7rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => setPayment('Cash')}
              >
                Cash
              </button>
              <button
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  border: payment === 'Card' ? '2px solid #000' : '1px solid #ddd',
                  background: payment === 'Card' ? 'linear-gradient(to right, #000, #444)' : '#fff',
                  color: payment === 'Card' ? '#fff' : '#222',
                  borderRadius: '8px',
                  padding: '0.7rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                onClick={() => setPayment('Card')}
              >
                <FaCreditCard /> Card
              </button>
            </div>
          </div>
        </div>

        {/* Choose a Ride Card */}
        <div
          className="choose-ride-card"
          style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '1.2rem 2rem 2rem 2rem',
            width: '420px',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Choose a Ride</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {rideOptions.map((ride, idx) => (
              <div
                key={ride.type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: idx === selectedRide ? '2px solid #000' : '1px solid #ddd',
                  background: idx === selectedRide ? '#f9fafb' : '#fff',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'border 0.2s, background 0.2s',
                }}
                onClick={() => setSelectedRide(idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <FaCarSide style={{ fontSize: '2rem' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>{ride.type}</div>
                    <div style={{ color: '#666', fontSize: '1rem' }}>{ride.desc}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{ride.price}</div>
                  <div style={{ color: '#aaa', fontSize: '1rem' }}>{ride.eta}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            style={{
              marginTop: '1.5rem',
              width: '100%',
              background: '#000',
              color: '#fff',
              padding: '1.25rem',
              borderRadius: '0.9rem',
              fontSize: '1.2rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.9rem',
            }}
          >
            <FaCarSide style={{ fontSize: '1.4rem' }} /> Request your Ride
          </button>
        </div>
      </div>
    </div>
  );
}
