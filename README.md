# Dynamic Event Ticketing UI

This is the React-based frontend for the Event Ticketing System. it provides an interactive 10x10 seat map with real-time dynamic pricing calculation.

## 🚀 Key Features
- **Interactive 10x10 Grid**: Responsive seat map built with CSS Grid.
- **Dynamic Price Preview**: Instantly calculates the total cost based on the current booking sequence (Tier 1: $50, Tier 2: $75, Tier 3: $100).
- **Multi-Seat Selection**: Users can select/deselect multiple available seats before confirming.
- **Visual Feedback**: Distinct styling for `AVAILABLE`, `SELECTED`, and `BOOKED` states.

## 🛠 Tech Stack
- **Framework**: React.js
- **Styling**: CSS3 (Grid & Flexbox)
- **API Client**: Axios

---

## 🏗 Frontend Logic Highlights

### 1. The Pricing Algorithm
The most critical part of this UI is the price preview. Since the requirement specifies that the **51st seat sold costs more regardless of seat number**, the frontend logic syncs with the backend's "already booked" count:

```javascript
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
