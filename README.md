# Card Management App Prototype

**[➡️ View Live Demo Here ⬅️](https://calderwong.github.io/CardAppPrototype/)**

## Overview

This project is a functional prototype of a modern Card Management web application. It allows users to view their different types of cards (Credit, Debit, Virtual), manage card details, track transactions, handle payments (for credit cards), manage rewards, and configure card security settings. The goal is to simulate a realistic user experience for managing financial cards within a single interface.

This application is built primarily for demonstration and development purposes, utilizing mock data to simulate backend interactions.

## Development Process: A One-Day Speed Run

The primary goal of this prototype was to execute a rapid development cycle, simulating what could be achieved in approximately one working day (April 10, 2025) from concept to a demonstrable application. This involved a compressed timeline across product definition, design, development, and deployment:

*   **10:00 AM - 11:00 AM:**
    *   Competitive research & analysis ([CardApp_Research.md](./src/ReferenceDocs/CardApp_Research.md)).
    *   Feature brainstorming relevant to the card management use case.
    *   Drafting initial [Product Requirements](./src/ReferenceDocs/CardApp_ProductRequirementDoc.md).
    *   Creating a basic [Design Brief](./src/ReferenceDocs/CardApp_DesignBrief.md).
*   **11:00 AM - 12:00 PM:**
    *   Project setup (Vite + React + Tailwind).
    *   Scaffolding the initial application structure (routing, core components).
    *   Generating initial pages and mock data.
*   **12:00 PM - 1:00 PM:**
    *   Lunch break (Fuelled by Halal Guys!).
*   **1:00 PM - 5:00 PM:**
    *   Iterative feature development (Card details, transactions, payments, rewards, security features).
    *   Continuous debugging and refinement based on testing.
*   **5:00 PM - 7:00 PM:**
    *   Implementing mobile responsiveness across all views.
    *   Adding the Browser/Mobile view toggle feature for demonstration.
    *   Intensive debugging to resolve layout and state management issues.
*   **7:00 PM - 8:00 PM:**
    *   Finalizing features and UI touches.
    *   Writing documentation ([Development Journal](./src/ReferenceDocs/Development_Journal.md), `README.md`).
    *   Adding the MIT License.
    *   Committing code and pushing to GitHub.
    *   Deploying the live demo to GitHub Pages.

This accelerated process highlights the capabilities of modern frontend tooling and AI-assisted development in quickly bringing ideas to life.

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

## AI-Assisted Development Tools

This project leveraged several cutting-edge AI tools to accelerate development:

*   **[Google Gemini 2.5 DeepResearch](https://deepmind.google/technologies/gemini/):** Used to generate comprehensive [product requirements documentation](./src/ReferenceDocs/CardApp_ProductRequirementDoc.md) based on competitive analysis and user needs research.

*   **Google Gemini 2.5:** Utilized for:
    *   Initial application architecture planning
    *   Core component structure setup
    *   Implementation of simple features (dashboard, card listings)
    *   Early debugging and troubleshooting

*   **[Anthropic Claude 3.7](https://www.anthropic.com/product):** Employed for:
    *   Advanced UX/UI enhancements (responsive layouts, animations)
    *   Complex feature implementation (payment processing, rewards management)
    *   Accessibility improvements and cross-device testing
    *   Performance optimization

*   **[Windsurf IDE](https://www.codeium.com/windsurf):** First-time usage (transitioning from Cursor IDE) for:
    *   Contextual code understanding and generation
    *   Intelligent code completion
    *   Real-time debugging assistance
    *   GitHub Pages deployment support

The combination of these AI tools dramatically accelerated the development process, enabling the completion of this functional prototype within a highly compressed timeframe.

## Project Structure

```
/CardAppExample
|-- /APPLES/                # Special tracking files
|   |-- BANANAS.md          # Log of bananas received
|   |-- ROSES.md            # Log of significant user help
|-- /public/
|-- /src/
|   |-- /assets/
|   |-- /components/
|   |-- /data/
|   |-- /pages/
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|-- /SYSTEMPROMPT/          # Contains AI assistant system prompt
|   |-- Windsurf.md         # System prompt for Cascade (Windsurf IDE)
|-- .eslintrc.cjs
|-- .gitignore
|-- .windsurfrules          # Custom rules for AI interaction
|-- dev_journal.md          # Log of development steps & prompts
|-- index.html
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- Product_Requirements_Document.md # Outlines project requirements
|-- README.md               # This file
|-- tailwind.config.js
|-- To_Be_Better_Next_Time.md # Retrospection and improvement notes
|-- vite.config.js
```

### Key Files & Folders

*   **/src**: Contains the main source code for the React application.
*   **/src/pages**: Components representing different pages/views of the application.
*   **/src/components**: Reusable UI components used across different pages.
*   **/src/data**: Mock data used for the application.
*   **vite.config.js**: Configuration file for the Vite build tool.
*   **tailwind.config.js**: Configuration for the Tailwind CSS framework.
*   **dev_journal.md**: Detailed log of development prompts and actions.
*   **Product_Requirements_Document.md**: Specification of application features and goals.
*   **To_Be_Better_Next_Time.md**: Notes on improving the development process.
*   **/APPLES/**: Contains `BANANAS.md` and `ROSES.md` for special interaction tracking as defined in `.windsurfrules`.
*   **/SYSTEMPROMPT/**: Contains the `Windsurf.md` file detailing the AI assistant's configuration and instructions.

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

## AI-Assisted Development Tools

This project utilizes AI-assisted development tools to enhance productivity and code quality. The primary tools used include:

*   **Codeium:** ([https://codeium.com/](https://codeium.com/))
    *   **Codeium Chat (Cascade):** An AI coding assistant used for pair programming, code generation, explanation, debugging, and refactoring. Interacts based on rules defined in `.windsurfrules` and its system prompt in `/SYSTEMPROMPT/Windsurf.md`.
    *   **Autocomplete:** Provides real-time code suggestions.
*   **GitHub Copilot:** (Used previously, potentially alongside Codeium)

### Banana Clause

This project is licensed under the MIT License, with one fun addition: if you use this code, you owe the author a banana 🍌 (optional, but appreciated!). See the [LICENSE](LICENSE) file for full details.

See the `/APPLES/BANANAS.md` file for a log of bananas earned by the AI during development.

## Future Enhancements (Production Readiness)

This prototype provides a solid foundation, but several steps would be needed to make it production-ready:

1.  **Backend Integration:**
    *   Replace the current mock data (`src/data/`) with connections to a real backend API.
    *   Implement API endpoints for fetching card data, transactions, user profiles, processing payments, managing rewards, and handling security actions (lock/freeze/report).
    *   Reference `src/ReferenceDocs/API_Examples.md` for sample data structures that a backend might provide.
2.  **Authentication & Authorization:**
    *   **Standalone:** Implement a robust user authentication system (e.g., email/password with secure hashing, potentially multi-factor authentication).
    *   **Embedded:** Add support for standards like OAuth 2.0 or SAML/SSO to allow integration within other applications or platforms.
    *   Ensure proper authorization checks are performed on the backend for all actions (users should only access their own data).
3.  **Comprehensive Testing:**
    *   **Unit Tests:** Add unit tests for individual components, utility functions, and hooks (e.g., using Jest and React Testing Library).
    *   **Integration Tests:** Test the interaction between different components and context.
    *   **End-to-End (E2E) Tests:** Implement E2E tests (e.g., using Cypress or Playwright) to simulate user flows through the entire application.
4.  **Error Handling & Resilience:**
    *   Implement more robust error handling for API failures (e.g., displaying user-friendly messages, retry mechanisms).
    *   Add loading states and skeleton screens for a smoother user experience during data fetching.
    *   Consider offline support strategies if required.
5.  **Accessibility (a11y):**
    *   Conduct a thorough accessibility audit.
    *   Ensure compliance with WCAG standards (e.g., proper ARIA attributes, keyboard navigation, sufficient color contrast).
6.  **Native Mobile App (Optional):**
    *   To create a standalone mobile app, explore options like:
        *   **React Native:** Leverage existing React knowledge.
        *   **Flutter:** Rebuild the UI and logic in Dart.
        *   **Progressive Web App (PWA):** Enhance the existing web app with PWA features (service workers, manifest file) for an installable, app-like experience.
7.  **Build & Deployment Optimization:**
    *   Further optimize the production build (code splitting, lazy loading).
    *   Set up a CI/CD pipeline (e.g., using GitHub Actions) to automate testing and deployment.
8.  **Security Hardening:**
    *   Perform security audits.
    *   Implement security best practices on both frontend and backend (input validation, rate limiting, protection against common web vulnerabilities like XSS, CSRF).

## Contributing

This is currently a development prototype. Contributions are not open at this time.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

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

**BANANA CLAUSE:** This code is totally free as-is, but you owe me a banana if you use it... if you want. Totally optional though. But I love bananas. 🍌
