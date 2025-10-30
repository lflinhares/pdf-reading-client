# PDF Reader - Frontend

This is the client-side application for the PDF Reader project, built with React, TypeScript, and Styled Components. It provides a modern, responsive interface for users to upload, manage, and read their PDF files in various modes.

## Features

- **Secure Authentication:** User registration and login system using JWT.
- **PDF Library:** Upload, view a list of, and delete your personal PDF files.
- **Multi-View Reading:**
  - **Layout View:** A high-fidelity view that preserves the original PDF layout.
  - **Text View:** A reflowable text-only mode for maximum readability, with reconstructed paragraphs.
  - **Player View:** A speed-reading mode that displays one word at a time.
- **Responsive Design:** Mobile-first interface that works great on all screen sizes.
- **Theming:** Switch between dark and light themes for comfortable reading.

## Tech Stack

- **React 18**
- **TypeScript**
- **React Router** for navigation.
- **Styled Components** for styling.
- **Axios** for making API requests.
- **React-PDF** for rendering PDF documents.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd pdf-reader-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will also automatically run the `postinstall` script to copy the necessary PDF.js worker file.

3.  **Set up environment variables:**
    This project does not require a `.env` file as the API URL is hardcoded in `src/api.ts`. For production, you should move this to an environment variable.

### Running the Development Server

To start the application in development mode, run:

```bash
npm start
