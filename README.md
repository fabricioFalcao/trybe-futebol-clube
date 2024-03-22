# TFC - Football Club API

🧑‍💻 **What was developed:**

In this project, an API backend for a football information website called TFC (The Football Central) was developed. The project aimed to provide various endpoints to support functionalities related to teams, user authentication, matches, and leaderboards.
<hr>

### Tools and Technologies

- **Node.js**: Used as the runtime environment for the backend server.
- **Express.js**: Framework utilized for building the RESTful API endpoints.
- **Sequelize**: Employed for ORM (Object-Relational Mapping) to interact with the MySQL database.
- **MySQL**: Database management system utilized to store and manage data.
- **Docker**: Containerization tool utilized to containerize the backend application, frontend application, and MySQL database for easy deployment and scalability.
- **TypeScript**: Programming language used for developing the backend application, providing type safety and enhanced developer experience.
- **JWT (JSON Web Tokens)**: Utilized for user authentication and authorization, ensuring secure access to protected endpoints.
- **Mocha and Chai**: Testing frameworks used for implementing unit and integration tests.
- **TDD (Test-Driven Development)**: Development approach followed, ensuring robust test coverage for backend functionalities.
<hr>

### Backend Functionalities

- **Database Structure**: Established using Sequelize with migrations and models created for tables corresponding to teams, users, and matches.
- **User Authentication**: Implemented endpoints for user authentication using JWT tokens, including login and token validation middleware.
- **Match Management**: Developed endpoints for fetching match details, updating ongoing matches, and finishing matches.
- **Leaderboard Calculations**: Implemented leaderboard endpoints to provide information about team performance, both for home and away matches.
- **Test Coverage**: Ensured robust test coverage for backend functionalities through unit and integration tests, following a Test-Driven Development (TDD) approach.

The resulting API provided essential functionalities for the TFC website, enabling users to access accurate and up-to-date football information.
