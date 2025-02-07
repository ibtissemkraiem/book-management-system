# Book Management System

## Overview

The Book Management System is a full-stack application designed to manage a collection of books. It provides functionalities to add, view, update, and delete books. The backend is built with NestJS, and the frontend is developed using Next.js. The application uses MongoDB for data storage and is containerized using Docker for easy deployment.

## Features

- **Backend:**
  - RESTful API endpoints for book management.
  - Input validation and error handling.
  - API documentation with Swagger.

- **Frontend:**
  - Responsive UI for managing books.
  - Forms for adding and editing book details.
  - Integration with backend API using Axios.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/book-management-system.git
   cd book-management-system
   
2. **Environment Variables:**
   Create a .env file in the root directory and add the following variables
   ```bash
   MONGO_URI=mongodb://mongo:27017/Books-Management

3. **Environment Variables:**
   Use Docker Compose to build and run the application
   ```bash
   docker-compose up --build

The frontend will be accessible at http://localhost:3010, and the backend API will be at http://localhost:3000

**API Documentation:**
Once the backend is running, access the Swagger UI for API documentation at http://localhost:3000/api-docs
