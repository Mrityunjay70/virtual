# Virtual Campus Exploration and Booking System

## Overview

The Virtual Campus Exploration and Booking System is a web application designed to provide prospective students and visitors with a virtual tour of a campus. The system allows users to explore various parts of the campus, view detailed information about each location, and book appointments or visits.

## Features

- **Interactive Campus Map:** Users can navigate through an interactive map to explore different campus locations.
- **Location Details:** Each location on the campus map provides detailed information, including images, descriptions, and videos.
- **Booking System:** Users can book appointments or visits to specific locations or departments on the campus.
- **User Authentication:** Secure user authentication to manage bookings and user profiles.
- **Admin Panel:** An admin panel for managing locations, bookings, and user accounts.

## Technologies Used

- **Frontend:**
  - React.js: For building the user interface.
  - Redux: For state management.
  - React Router: For handling navigation.
  - Axios: For making HTTP requests.

- **Backend:**
  - Node.js: For building the backend server.
  - Express.js: For handling API routes.
  - MongoDB: For the database.
  - Mongoose: For interacting with MongoDB.

- **Other:**
  - JWT (JSON Web Tokens): For user authentication.
  - Cloudinary: For image and video storage.
  - Google Maps API: For the interactive campus map.

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/virtual-campus-exploration.git
    cd virtual-campus-exploration
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

    This will start both the backend server and the React development server.

## Usage

1. **Explore the Campus:**
   - Navigate through the interactive map to explore different locations.
   - Click on a location to view detailed information.

2. **Book a Visit:**
   - Sign up or log in to your account.
   - Navigate to the booking section.
   - Select a location and choose a date and time for your visit.

3. **Admin Panel:**
   - Log in as an admin to manage locations, bookings, and user accounts.
   - Add, edit, or remove campus locations.
   - View and manage user bookings.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to contact us at contact mrityunjaysingh7737@gmail.com.
