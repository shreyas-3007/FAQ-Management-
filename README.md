# FAQ Management System with Multi-Language Support

## Overview
This project is a **FAQ Management System** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). It provides a comprehensive solution for managing and displaying FAQs in multiple languages. The system supports dynamic translation of content using **Google Translate API**. The application also incorporates **Redis caching** to improve performance and speed up the retrieval of FAQs.

## Features
- **Multi-Language FAQ Support**: FAQs are stored in multiple languages (English, Hindi, Bengali, etc.) and can be dynamically fetched based on the selected language.
- **RESTful API**: API endpoints allow CRUD operations for FAQs. The API supports fetching FAQs in different languages using query parameters.
- **Caching**: **Redis** is used to cache translations for improved performance.
- **Admin Panel**: A user-friendly admin interface is provided for easy management of FAQs.
- **Unit Tests**: The application is tested using **Jest** or similar testing libraries to ensure the correctness of models, API responses, and core functionality.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Caching**: Redis
- **Translation API**: Google Translate API / googletrans
- **Testing**: Jest
- **Version Control**: Git

## Login Credentials
- **Admin Panel**:  
  - Username: `admin@gmail.com`  
  - Password: `admin@123`
 
# Prerequisites
Before you begin, make sure you have the following installed:

- Node.js (version 14 or higher)
- MongoDB (either locally or using MongoDB Atlas)
- Docker (if you're using Docker)
- Git

## Clone the Repository
Clone the repository to your local machine:

Run the command to clone the repository:
```bash
git clone https://github.com/shreyas-3007/FAQ-Management-
```





## Option 1: Using Docker (Recommended for Docker Users)
If you're using Docker, follow these steps to set up the application:

- Make sure Docker is installed and running.
- Run the command `docker-compose up --build` to build and start the containers for both the backend and frontend services.
- Once the containers are running, you can access the application:
  - **Frontend**: Open your browser and go to `http://localhost:5173`
  - **Backend**: The backend API will be available at `http://localhost:3000`

## Option 2: Manual Setup
If you're not using Docker, you can manually set up both the frontend and backend.

1. **Frontend Setup**
   - Navigate to the frontend folder.
   - Run `npm install` to install the necessary dependencies.
   - Run `npm run dev` to start the frontend development server.
   - The frontend will be accessible at `http://localhost:3000`.

2. **Backend Setup**
   - Navigate to the backend folder.
   - Run `npm install` to install the necessary dependencies.
   - Run `npm run dev` to start the backend server.
   - The backend API will be available at `http://localhost:5000`.
