# Assignment Projects

This repository contains two main projects:

## 1. Aadhaar Card Verification System

A Next.js application for Aadhaar card verification with PAN card integration. The system provides secure verification of Aadhaar and PAN cards with OTP authentication.

[Go to Aadhaar Card Project](./Addhar_card)

### Key Features

- Aadhaar card verification
- PAN card verification
- OTP verification
- Docker containerization
- PostgreSQL database

### Tech Stack

- Next.js with TypeScript
- Tailwind CSS
- PostgreSQL with Prisma
- Docker

## 2. Yield Management System

A React-based application for managing and displaying reservations and yield data.

[Go to Yield Project](./Yield)

### Key Features

- Reservation management
- Interactive UI components
- Modern React practices

### Tech Stack

- React.js
- CSS
- Testing with Jest and React Testing Library

## Getting Started

Each project has its own README with detailed setup instructions. Please navigate to the respective project directories for more information.

## Repository Structure

```
├── Addhar_card/          # Aadhaar verification system
├── Yield/                # Yield management system
└── README.md            # This file
```

2. Yield Management

# Yield Management System

A React-based application for managing and displaying reservations.

## Features

- Reservation management interface
- Interactive reservation cards
- Responsive design
- List view of all reservations

## Tech Stack

- **Frontend Framework**: React.js (v19.1.0)
- **Testing**: Jest and React Testing Library
- **Styling**: CSS
- **Build Tool**: Create React App

## Project Structure

```
src/
├── Components/           # React components
│   ├── ReservationCard.js  # Individual reservation display
│   └── ReservationsList.js # List of all reservations
├── App.js               # Main application component
├── App.css             # Application styles
└── index.js           # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Yield
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Testing

The project uses Jest and React Testing Library for testing. Run the tests with:

```bash
npm test
```

## Components

### ReservationCard

- Displays individual reservation details
- Handles user interactions
- Responsive design for various screen sizes

### ReservationsList

- Manages the list of all reservations
- Implements sorting and filtering
- Handles data loading states

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
