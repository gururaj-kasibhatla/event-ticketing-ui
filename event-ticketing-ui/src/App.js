import React, { useState, useEffect, useMemo } from 'react';
import { getSeats, bookSeats, initializeEvent } from './services/api';
import './App.css';

function App() {
  const [seats, setSeats] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await getSeats();
      setSeats(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to fetch seats", err);
    }
  };

  const totalPrice = useMemo(() => {
    const alreadyBookedCount = seats.filter(s => s.status === 'BOOKED').length;
    let total = 0;

    selectedIds.forEach((_, index) => {
      const currentOrder = alreadyBookedCount + index + 1;
      if (currentOrder <= 50) total += 50;
      else if (currentOrder <= 80) total += 75;
      else total += 100;
    });
    return total;
  }, [selectedIds, seats]);

  const toggleSeat = (id, status) => {
    if (status === "BOOKED") return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleBooking = async () => {
    if (!userName || selectedIds.length === 0) {
      alert("Please enter your name and select at least one seat.");
      return;
    }
    setLoading(true);
    try {
      await bookSeats({ userName, seatIds: selectedIds });
      alert(`Booking Successful! Total: $${totalPrice}`);
      setSelectedIds([]);
      fetchSeats();
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed.");
      fetchSeats();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Dynamic Event Ticketing</h1>
      
      <div className="booking-panel">
        <input 
          type="text"
          placeholder="Enter Name" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
        />
        <div className="price-display">
          Total Price: <strong>${totalPrice}</strong>
        </div>
        <button className="buy-btn" onClick={handleBooking} disabled={loading || selectedIds.length === 0}>
          {loading ? "Processing..." : `Buy ${selectedIds.length} Tickets`}
        </button>
        <button className="reset-btn" onClick={() => initializeEvent().then(fetchSeats)}>
          Reset Event
        </button>
      </div>

      <div className="legend">
        <span className="dot available"></span> Available
        <span className="dot selected"></span> Selected
        <span className="dot booked"></span> Booked
      </div>

      <div className="grid-container">
        {seats.length > 0 ? (
          seats.map(seat => (
            <div 
              key={seat.id}
              className={`seat ${seat.status} ${selectedIds.includes(seat.id) ? 'SELECTED' : ''}`}
              onClick={() => toggleSeat(seat.id, seat.status)}
            >
              {seat.id}
            </div>
          ))
        ) : (
          <div className="no-data">No seats available. Click Reset Event to initialize.</div>
        )}
      </div>
    </div>
  );
}

export default App;