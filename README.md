# AUTH & CRUD TASK

## Functionality
Functionality is divided into following three dimension:
### Auth
+ Sign Up
+ Verify email
+ Set Password after verifying email
+ Login with JWT (maintainace of Personal Access Token in DB for active user)
+ Logout
+ Reset Password (Get reset Password link at email and the link expires within 1 day if not used)

### User
+ View Profile
+ Edit Profile
+ Delete Account

### Role based
+ Admin User can view the list of user
+ Pagination for list

## Other features
+ Exception Handling
+ role based authorization control
+ Validation at client, server and database leve
+ Scalable
+ Well structured code

## Browse Live at :
[https://auth-nhrz.onrender.com]
> [!NOTE]
> Admin Credentials:
> Email: admin@admin.com
> Password: @dmIn123

## How to setup in localhost?
+ Install node and mongodb
+ Clone this repository
+ In root, there is `.env.example` file. Rename `.env.example` file to `.env`
+ Edit `.env` with your own credentials.
> [!NOTE]
> `DEF_ADMIN_EMAIL` and `DEF_ADMIN_PASS` is used to set email and password of admin if there is no admin users in database.
> [!NOTE]
> Cloudinary was used to store user images. Sign up in cloudinary to get your own API KEY and other credentials
+ in terminal, run `npm run build`
+ After that, run `npm start`
+ Browse app at [http://localhost:PORT_YOU_SET_IN_ENV]

## Tools used
+ Express JS for backend, React JS for frontend and MONGO DB as database service
+ Mongoose as ODM
+ bcryptjs for encrypting password
+ multer for image uploading and cloudinary for storing
+ JWT for authentication and authorization
+ nodemailer for mail service
+ ZOD for server side validation and Yup for client side validation
+ react-router-dom for route handling
+ axios for api call
+ react hook form for handle form submission
+ react-bootstrap for UI
+ Other UI enhancement tools: react-hot-toast, sweetalert2, react-icons

## Application Structure
Root Directory contains package.json and two folder:
+ client - for react code
+ server - for express code

`server` directory contains index.js file, where server is created with http module where express app is loaded.
express app is created in `server/src/config/express.config.js`. DB configuration, api routes, and error handling is loaded in express.config.js.
Api Routes are further expanded and maintained at `server/src/routes`.
Corresponding controller function are maintained in `server/src/controllers`. Class was used and singleton approach was implemented.
Database models are stored in `server/src/model` and database related operation are done and stored in `server/src/services`.
Middlewares for authentication, access control, and image upload are stored in `server/src/middlewares`.
`server/src/validators` contains schema for zod validation.

Similarly, `client` is created with vite template. Where `client/src/main.jsx` is the main js loaded in index.html. 
Routing has been done in `App.jsx` at src.
`client/src` contains 6 folders. 
+ `assets` contains static files.
+ `components` contains lower level components. It is further subdivided into auth, common and profile folder to store relevent dimensions component.
+ `context` contains authContext file for state management of authenticated user.
+ `pages` contains 4 subfolders; auth, common, home, profile. Each folder contains relevant pages component.
+ `repository` contains axios configuration.
+ `utils` contains small function like mapping mongodb time to user readable time.

## Folder Architecture
├───client
│   └───src
│       ├───assets
│       │   └───images
│       ├───components
│       │   ├───auth
│       │   └───common
│       │       ├───HomeHeading.jsx
│       │       ├───ImageUploader
│       │       └───Pagination
│       ├───context
│       ├───pages
│       │   ├───auth
│       │   │   ├───login
│       │   │   ├───logout
│       │   │   ├───password
│       │   │   └───signup
│       │   ├───common
│       │   ├───home
│       │   └───profile
│       ├───repository
│       └───utils
└───server
    └───src
        ├───config
        ├───controllers
        ├───middlewares
        ├───model
        ├───routes
        ├───services
        └───validators


