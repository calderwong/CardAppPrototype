# Card Management App Prototype

**[➡️ View Live Demo Here ⬅️](https://calderwong.github.io/CardAppPrototype/)**

## Overview

This project is a functional prototype of a modern Card Management web application. It allows users to view their different types of cards (Credit, Debit, Virtual), manage card details, track transactions, handle payments (for credit cards), manage rewards, and configure card security settings. The goal is to simulate a realistic user experience for managing financial cards within a single interface.

This application is built primarily for demonstration and development purposes, utilizing mock data to simulate backend interactions.

## Features

*   **Dashboard:** Displays an overview of all linked cards (Credit, Debit, Virtual).
*   **Card Detail Page:**
    *   View detailed card information (Number, CVV, Expiry - with reveal/copy functionality).
    *   See current balance, credit limit/available credit (for Credit Cards).
    *   View recent transaction history with filtering/sorting.
    *   **Payment Management (Credit Cards):**
        *   View payment due dates and minimum/statement balances.
        *   Schedule one-time payments (Minimum, Statement, Custom Amount).
        *   Set up and manage AutoPay (Minimum or Statement Balance) linked to a bank account.
        *   View payment history.
    *   **Rewards Management:**
        *   View current rewards balance.
        *   Withdraw rewards balance to a linked bank account.
        *   View rewards withdrawal history.
    *   **Security & Controls:**
        *   Lock/Unlock card instantly.
        *   Freeze/Unfreeze specific transaction types (Online, ATM).
        *   Report card lost or stolen.
        *   Manage travel notifications.
*   **Responsive Design:** Adapts to different screen sizes (Desktop, Mobile).
*   **Mock Data:** Uses predefined data for cards, transactions, and bank accounts, eliminating the need for a backend setup for demo purposes.

## Tech Stack

*   **Frontend Framework:** [React](https://reactjs.org/) (v18+)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
*   **Icons:** [Heroicons](https://heroicons.com/)
*   **Language:** JavaScript (ES6+)
*   **Package Manager:** [npm](https://www.npmjs.com/)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended, includes npm)
*   Git (Optional, for cloning if not already done)

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd CardAppExample
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd c:\Users\cjwon\CardAppExample 
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

1.  **Start the Vite development server:**
    ```bash
    npm run dev
    ```
2.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port specified in the console output).

The application should now be running in development mode with hot module replacement enabled.

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run preview`: Serves the production build locally.

## Project Structure (Simplified)

```
c:/Users/cjwon/CardAppExample/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, etc.
│   ├── components/     # Reusable UI components (e.g., Button, Modal, Card)
│   ├── context/        # React Context (e.g., CardContext)
│   ├── data/           # Mock data (e.g., mockCards.js, mockBankAccounts.js)
│   ├── hooks/          # Custom React Hooks
│   ├── pages/          # Page-level components (e.g., DashboardPage, CardDetailPage)
│   ├── styles/         # Global styles (index.css, tailwind config)
│   ├── utils/          # Utility functions (e.g., formatting)
│   ├── App.jsx         # Main application component with routing
│   └── main.jsx        # Application entry point
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore rules
├── index.html          # HTML entry point for Vite
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Locked dependency versions
├── postcss.config.js   # PostCSS configuration
├── README.md           # This file
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration

## Contributing

This is currently a development prototype. Contributions are not open at this time.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details (if one exists) or refer to the standard MIT License text below:

```
MIT License

Copyright (c) 2025 Calder ("CJ") Wong / Hapa.ai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
