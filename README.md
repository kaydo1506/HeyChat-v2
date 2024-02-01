## Chat Application README
### Overview
This Chat Application is a real-time communication platform where users can send and receive messages instantly. It includes data visualization for chat analytics.

## Key Features
Real-time messaging
User authentication (barely -_-)
Chat room functionality
Data visualization (scatter and line charts)

## Technologies and Tools Used
### Frontend:

React
Tailwind CSS
Chart.js
React Router

### Backend:

WebSocket
Node.js

### Data Visualization:
Chart.js: For creating interactive charts (scatter chart and line chart).

### Containerization:
Docker

Development Tools:
npm
Visual Studio Code
Git


### Setup and Installation
Clone the repository:
git clone <repository-url>
cd chat-application
npm install

### To run the React frontend:

npm start
### To run the backend WebSocket server:

node server.js


### Docker:

Build the Docker image:
docker build -t react-chat-app .
Run the Docker container:
docker run -p 3000:3000 react-chat-app
Access the Application:
The application will be available at http://localhost:3000.
