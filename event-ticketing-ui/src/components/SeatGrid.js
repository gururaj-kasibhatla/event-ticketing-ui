import React from 'react';

const SeatGrid = ({ seats, selectedIds, onToggleSeat }) => {
  return (
    <div className="grid-container">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`seat ${seat.status} ${
            selectedIds.includes(seat.id) ? 'SELECTED' : ''
          }`}
          onClick={() => onToggleSeat(seat.id, seat.status)}
        >
          {seat.id}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;