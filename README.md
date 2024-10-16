
# Project Management System

## Overview

The Project Management System is a web application designed to help organizations manage their projects and members efficiently. The application allows administrators to create organizations, add projects, and manage members. Members can join organizations and participate in projects.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: EJS (Embedded JavaScript templates)
- **Styling**: CSS
- **Security**: Crypto for generating secure keys

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mwambay/PROJECT-MANAGEMENT-SYSTEM.git
    cd project-management-system
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the MongoDB server**:
    Ensure MongoDB is running on your local machine. You can start MongoDB using:
    ```bash
    mongod
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

    The server will start running on `http://localhost:3000`.

## Configuration

The application connects to a MongoDB database named [`project_manager`]

```javascript
const dbRI = 'mongodb://localhost:27017/project_manager';
mongoose.connect(dbRI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000, () => console.log('Server is running...')))
    .catch(err => console.error('Could not connect to MongoDB...'));
```

## Routes

### Public Routes

- **GET `/`**: Redirects to the organization page.
- **GET `/login`**: Renders the login page.
- **POST `/login_process`**: Processes the login form.
- **GET `/create_orga`**: Renders the create organization page.
- **POST `/login_admin`**: Processes the create organization form.
- **GET `/join_orga`**: Renders the join organization page.
- **POST `/login_member`**: Processes the join organization form.

### Protected Routes

- **GET `/dashboard`**: Renders the admin dashboard.
- **GET `/dashboard_member`**: Renders the member dashboard.
- **POST `/add_project`**: Adds a new project.

## Models

### Organization (Orga)

```javascript
const orgaSchema = new mongoose.Schema({
    name: String,
    description: String,
    cle: String
});
```

### Member

```javascript
const memberSchema = new mongoose.Schema({
    id_orga: mongoose.Schema.Types.ObjectId,
    id_project: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    as_admin: Boolean
});
```

### Project

```javascript
const projectSchema = new mongoose.Schema({
    id_orga: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    date_debut: Date,
    date_fin: Date
});
```

### Task

```javascript
const taskSchema = new mongoose.Schema({
    id_project: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    status: String,
    assigned_to: mongoose.Schema.Types.ObjectId
});
```

## Usage

1. **Create an Organization**:
    - Navigate to `/create_orga`.
    - Fill in the organization details and submit the form.

2. **Login as Admin**:
    - Navigate to `/login`.
    - Enter the organization name, admin name, and password to log in.

3. **Add Projects**:
    - Once logged in as an admin, navigate to the dashboard.
    - Fill in the project details and submit the form to add a new project.

4. **Join an Organization**:
    - Navigate to `/join_orga`.
    - Fill in the organization key and member details to join the organization.

5. **Login as Member**:
    - Navigate to `/login`.
    - Enter the organization name, member name, and password to log in.

## Security

- Passwords are stored securely using hashing.
- Organization keys are generated using the `crypto` module to ensure uniqueness and security.

## License

This project is licensed under the MIT License.
