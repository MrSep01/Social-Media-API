# Social Network API

## Introduction 📚

The Social Network API is a flexible and scalable backend designed to provide foundational functionality for social network web applications. It allows for easy management of user data, including their thoughts, reactions to thoughts, and friend lists, all within a NoSQL database environment optimized for handling large amounts of unstructured data.

## Project Overview 🌐

The goal of this project is to create an API that can support the dynamic and varied data interactions typical of social networking platforms. It includes endpoints for CRUD operations on users, thoughts (similar to posts), and reactions, as well as the ability to manage friend lists.

### Objectives 🎯

- Provide a RESTful API for managing user accounts and social interactions.
- Efficient handling of large, unstructured datasets with MongoDB.
- Real-time creation and management of user-generated content such as thoughts and reactions.
- Support for complex user relations like friendships.

## Technical Stack 🧰

- **Node.js**: The runtime environment for running JavaScript on the server.
- **Express.js**: The web application framework used for API routing.
- **MongoDB**: The NoSQL database used for storing data.
- **Mongoose**: The ODM (Object Data Modeling) library used to interact with MongoDB.

## Development Process 💻

### Step 1: Defining Models

Creating Mongoose models for `User` and `Thought` schemas, with `Reactions` as a subdocument schema within `Thought`.

### Step 2: Creating API Routes

Setting up Express routes to handle requests for user and thought management.

### Step 3: Implementing Controller Logic

Developing controllers to handle the business logic for each API endpoint.

### Step 4: Seeding the Database

Creating a `seed.js` script to populate the database with initial data for testing. [Casual Package](https://www.npmjs.com/package/casual) has been used for creating random seeding data.

## Code Breakdown 🧠

### Controllers

- **`userController.js`**: Handles the business logic for user-related endpoints.
- **`thoughtController.js`**: Manages endpoints related to thoughts and reactions.

### Models

- **`User.js`**: Defines the schema for users, including virtuals for derived data like `friendCount`.
- **`Thought.js`**: Outlines the schema for thoughts, including reactions.

## How to Use the API 🖥️

1. Ensure that Node.js and MongoDB are installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Install the required npm packages with `npm install`.
5. Seed the database with `npm run seed` to create initial data.
6. Start the server with `npm start`.
7. Use an API client like Insomnia or Postman to test the endpoints.

## Endpoints Overview

- **GET `/api/users`**: Retrieves all users.
- **POST `/api/users`**: Creates a new user.
- **GET `/api/users/:userId`**: Retrieves a single user by ID.
- **PUT `/api/users/:userId`**: Updates a user's information.
- **DELETE `/api/users/:userId`**: Deletes a user and their associated thoughts.
- **POST `/api/users/:userId/friends/:friendId`**: Adds a friend to a user's friend list.
- ... (list all other endpoints)

## Repository

[GitHub Repository Link](https://github.com/your-username/social-network-api)

## Demo

A demo of the API in action can be viewed here:
[API Demo Video](#)

## Conclusion 🏁

The Social Network API is a robust backend solution that encapsulates the critical functionalities required for modern social networking services, focusing on performance and scalability.

## License & Contribution 📜

Contributions are welcome! This project is open-source and available under the MIT License.
