# NEXT JS REST API with Middlewares and MongoDB

This project is a fully functioning REST API built with Next.js. It includes middleware support and uses MongoDB as the database.

## Features

- Next.js framework
- RESTful API endpoints
- Middleware integration
- MongoDB for data storage

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/arturoCrisanto/crudnextjs.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB database and update the connection string in the environment variables.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

### User Endpoints

- `GET /api/users` - Retrieve a list of users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Retrieve a specific user by ID
- `PUT /api/users/:id` - Update a specific user by ID
- `DELETE /api/users/:id` - Delete a specific user by ID

### Note Endpoints

- `GET /api/notes` - Retrieve a list of notes for a specific user
- `POST /api/notes` - Create a new note for a specific user
- `DELETE /api/notes` - Delete a specific note for a specific user
- `PATCH /api/notes` - Update a specific note for a specific user
- `GET /api/notes/[note]` - Retrieve a specific note by ID for a specific user

## Middleware

This project includes middleware for:

- Authentication
- Logging
- Error handling

## License

This project is licensed under the MIT License.
