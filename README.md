# Dynamic Event Ticketing UI

This is the React-based frontend for the Dynamic Event Ticketing System. It provides an interactive 10x10 seat map with real-time dynamic pricing calculation.

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
The most critical part of this UI is the price preview. Since the requirement specifies that the **51st seat sold costs more regardless of seat number**, the frontend logic syncs with the backend's "already booked" count to calculate the preview:

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
```

### 2. Component Architecture
- **Smart/Dumb Pattern**: `App.js` manages global state and API side-effects, while `SeatGrid.js` handles the specialized grid rendering.
- **State Management**: Uses React Hooks (`useState`, `useEffect`, `useMemo`) for efficient rendering and calculation.

---

## 🏃 How to Run the Project

### 1. Prerequisites
- **Node.js**: Version 14.x or higher installed.
- **Backend API**: The Spring Boot backend must be running (default: `http://localhost:8080`).

### 2. Installation
Navigate to the frontend project directory and install the dependencies:

```bash
cd event-ticketing-ui
npm install
```

### 3. Configuration
Verify that the API base URL in `src/services/api.js` matches your backend environment:

```javascript
const API_BASE_URL = "http://localhost:8080/api";
```

### 4. Launching the UI
Start the development server:

```bash
npm start
```

The application will automatically open at `http://localhost:3000`.

---

## 🧪 Testing the Requirements

### Initialization
Click the **"Reset Event"** button. This calls the `/initialize` API to clear the database and start a fresh session with **100 available seats**.

### Order-Based Pricing Test
1. Book **49 seats**.  
2. Select **2 more available seats**.

**Expected Result:**  
The total price should display **$125** ($50 for the 50th seat + $75 for the 51st seat).

### Selection Logic
Verify that:
- Clicking a **BOOKED (red)** seat prevents selection.
- **AVAILABLE (white)** seats toggle to a **SELECTED (blue)** state.

### Concurrency
Open the UI in **two separate browser tabs**. Attempt to book the **same seat in both** to verify that the second attempt returns a **"Seats already taken"** error from the backend.
