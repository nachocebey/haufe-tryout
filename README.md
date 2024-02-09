# Nacho's Haufe Technical Challenge

This project represents a technical challenge completed by Nacho Cebey for Haufe, a company. The application is a basic app that showcases various characters from the Rick and Morty series. Additionally, it incorporates user sessions, state control, call control, and more.

Thank you for taking the time to review this file. Any questions, comments, or feedback are highly appreciated.

Best regards.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system before getting started.

## Installation and Project Startup

1. Clone the repository:

    ```bash
    git clone [https://github.com/your-username/your-project.git](https://github.com/nachocebey/haufe-tryout)
    ```

2. Navigate to the project folder:

    ```bash
    cd haufe-tryout
    ```

3. Install dependencies for both the client and the server. To enhance the installation experience, **concurrently** and **npm-run-all** are used:

    ```bash
    npm install
    ```

4. Install client and server dependencies in parallel:

    ```bash
    npm install--all
    ```

5. Start both projects in parallel:

    ```bash
    npm start--all
    ```

## Testing

If you want to test the different projects:

- For the client:

    ```bash
    cd client
    ```

    ```bash
    npm start cypress:open
    ```

- For the server:

    ```bash
    cd server
    ```

    ```bash
    npm start test
    ```

## Technologies Used

### Client

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [react-router-dom](https://reactrouter.com/en/main)
- [redux](https://redux.js.org/)
- [sass](https://sass-lang.com/)
---------- Extras ----------
- [redux-persist](https://www.npmjs.com/package/redux-persist) - To enhance the use of redux, redux + redux-persist is employed for user persistence after page reloads.
- [@tanstack/react-query](https://tanstack.com/query/latest) - This library is used for caching API calls, optimizing memory resources on the client.

### Server

- [Express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [cors](https://expressjs.com/en/resources/middleware/cors.html)
- [axios](https://www.npmjs.com/package/axios/v/1.6.7)
---------- Extras ----------
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Used for encrypting sensitive data (passwords).

## Project Structure

The project consists of two parts: client and server.

### Client

The client is a basic application created with React + Vite, following a simple structure focused on views and components. SCSS is used for styling. It includes the following views:

- Login / Registration: Basic registration.
- Character List: A view listing different characters from the Rick and Morty series. React-query is utilized for caching calls to the API, optimizing client performance. It also includes simple pagination.
- Details View: A simple view displaying details of a specific character, allowing users to mark the character as a favorite.

### Server

The server project, developed with Express, is organized by routes, controllers, and models. It encrypts sensitive user information and acts as a bridge to the original Rick and Morty API. This project connects to a MongoDB database.

Both projects include testing. The client application uses Cypress for end-to-end testing, while the server uses Jest for unit testing of various endpoints.


## Contact

- Author: Nacho Cebey
- Email: [n.cebey@gmail.com]