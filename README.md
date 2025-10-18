### eGov Kenya - Digital Government Services Platform

eGov Kenya is a modern web platform that provides access to Kenyan government services, including KRA tax filing, PIN registration, and compliance certificates. The platform leverages AI-powered chat to assist users in navigating and accessing government services efficiently.

## Features

🏛️ Access to key Kenyan government services (KRA, PIN, compliance, etc.)
🤖 AI-powered chat assistant for user support and guidance
📱 Responsive and mobile-friendly design
⚡ Built with React, Vite, TypeScript, and Tailwind CSS
🔒 Supabase integration for backend and authentication
🌙 Light and dark mode support

## Project Structure

    ```bash
    .

    ├── public/ # Static assets
    ├── src/ # Source code
    │ ├── assets/ # Images and media
    │ ├── components/ # React components
    │ ├── hooks/ # Custom React hooks
    │ ├── integrations/ # API and service integrations
    │ ├── lib/ # Utility libraries
    │ ├── pages/ # Page components/views
    │ └── main.tsx # App entry point
    ├── supabase/ # Supabase configuration and functions
    ├── index.html # HTML entry point
    ├── tailwind.config.ts # Tailwind CSS configuration
    ├── vite.config.ts # Vite configuration
    ├── .env # Environment variables
    └── package.json # Project metadata and scripts
    ```

## Getting Started
Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Supabase account (for backend services)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/egov-kenya.git
    cd egov-kenya
    ```

2. Install dependencies:
    ```bash
    npm instal
    ```

3. Configure environment variables:
Copy .env and set your Supabase credentials:
    ```bash
    VITE_SUPABASE_PROJECT_ID=your_project_id
    VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
    VITE_SUPABASE_URL=your_supabase_url
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open http://localhost:8080 in your browser.


## Technologies Used
- React
- Vite
- TypeScript
- Tailwind CSS
- Supabase
- Radix UI
- shadcn/ui

# Note: 
- This project is not affiliated with the official Kenyan government. For official services, visit ecitizen.go.ke.

- Access Kenyan government services quickly and securely with eGov Kenya. Powered by modern web technologies and AI.