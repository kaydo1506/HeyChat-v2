# Chat Application README

## Overview

This Chat Application is a real-time communication platform where users can send and receive messages instantly. It's designed to demonstrate real-time messaging capabilities, basic user authentication, chat room functionality, and includes data visualization for chat analytics.

## Key Features

-   **Real-time Messaging:** Send and receive message.
-   **User Authentication:** Simple authentication mechanism for users (A veeery simple implementation).
-   **Chat Room Functionality:** Users can join a chat room and communicate with others.
-   **Data Visualisation:** Utilises scatter and line charts to provide insights into chat analytics.

## Technologies and Tools Used

### Frontend:

-   *React*
-   *Tailwind CSS* 
-   *Chart.js*
-   *React Router* 

### Backend:

-   *WebSocket* 
-   *Node.js*
 
### Data Visualisation:

-   *Chart.js*
### Containerisation:

-   **Docker**

### Development Tools:

-   *npm*
-   *Visual Studio Code*
-   *Git*

## Setup and Installation

### Clone the repository:

    git clone


 1. ### Using Docker Compose
    
    To simplify the building and running process of multiple containers,
    use Docker Compose:
    
    #### Build and run with Docker Compose
    
     `docker-compose up --build` 
     
	This command builds the images for the frontend and backend services defined in  docker-compose.yml), and  starts the containers.
    
    After the containers are up and running, access the application via:
    [http://localhost:3000](http://localhost:3000/)
    
 2. ### Running Without Docker
    
    For development purposes, you can run both the frontend and backend
    servers simultaneously without Docker, using concurrently:
    
    #### Start both servers with npm
    
    Ensure you are in the server directory, then use the `dev` script to
    start both the backend and frontend servers:
    
    `cd server`

    `npm install` 
    
    `npm run dev`  
    
    After starting both the frontend and backend, the application will
    be accessible at [http://localhost:3000](http://localhost:3000/).
