# backend_courseselling

## Description
A backend service for managing courses, users, and admin functionalities using Node.js, Express, and MongoDB.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.

## Usage
To run the application, use the following command:
```
node index.js
```

## API Endpoints

### Authentication
- **POST** `/user/register`: Register a new user.
- **POST** `/user/login`: Log in a user.
- **POST** `/user/updateuser`: Update user information.
- **GET** `/user/getallcourse`: Retrieve all available courses.
- **POST** `/user/purchasecourse`: Purchase a course.
- **POST** `/user/showpurchasedcourse`: Show purchased courses.
- **GET** `/user/logout`: Log out a user.

### Admin
- **POST** `/admin/signup`: Register a new admin.
- **POST** `/admin/signin`: Log in an admin.
- **POST** `/admin/createcourse`: Create a new course.
- **POST** `/admin/updatecourse`: Update an existing course.
- **DELETE** `/admin/deletecourse`: Delete a course.
- **GET** `/admin/allcourses`: Retrieve all courses for the admin.
- **GET** `/admin/logout`: Log out an admin.

## License
This project is licensed under the ISC License.
