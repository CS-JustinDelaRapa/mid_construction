# Mid Construction: Task Management Application

## Tech Stack

### Frontend
- React.js
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MySQL (with mysql2 driver)
- Dotenv for environment configuration

### Development Tools
- npm/yarn
- Git
- VS Code (recommended)

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MySQL Server

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/CS-JustinDelaRapa/mid_construction.git
cd mid_construction
```

### 2. Backend Setup
1. Navigate to backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Configure Environment
- Copy `.env.example` to `.env`
- Update database credentials in `.env`
```bash
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_database_password
DB_NAME=task_management
PORT=8080
```

4. Start Backend Server
```bash
npm start
```

### 3. Frontend Setup
1. Navigate to frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Start Frontend Development Server
```bash
npm start
```

## Running the Application
- Backend runs on `http://localhost:8080`
- Frontend runs on `http://localhost:3000`

## Database Setup
- Ensure MySQL is running
- The application will automatically create the `task_management` database and required tables

## Deployment
- Backend: Can be deployed on Heroku, DigitalOcean, or AWS
- Frontend: Suitable for Netlify, Vercel, or GitHub Pages
