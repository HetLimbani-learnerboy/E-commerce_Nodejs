# E-commerce_Nodejs
A basic E-commerce website built using React, Node.js, CSS, and MongoDB for backend data storage.

## Features
- User authentication (Signup/Login)
- Product management (Add/Update/Delete)
- Profile management
- Protected routes
- Dynamic product listing
- User-friendly navigation

## Tech Stack
- Frontend: React.js, CSS3
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## Project Structure
```
E-commerce_Nodejs/
├── Back-end/           # Node.js server code
│   ├── index.js        # Server entry point
│   └── package.json    # Backend dependencies
└── front-end/          # React application
    ├── public/         # Static files
    └── src/            # Source code
        ├── Pages       # React pages (Addproducts.js, Productlist.js etc..)
        └── App.css     # CSS styles
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.


### It is my project code screenshot..
<img width="1710" alt="Project_SS" src="https://github.com/user-attachments/assets/c9770dd7-729b-40b7-8557-a7d2b4035f40" />


### It is my project frontend screen shot
<img width="1532" alt="Frontend_1" src="https://github.com/user-attachments/assets/6981612d-054d-4aef-a980-09e4b6e63817" />
<img width="1532" alt="Frontend_2" src="https://github.com/user-attachments/assets/dd10b2aa-cbc0-45a1-933a-471c0103566e" />


### It is my project Demo video on Linkdln
https://www.linkedin.com/posts/het-limbani-a62a8131a_reactjs-nodejs-css-activity-7319622045506433025-qSA9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFD17KoBKwdo2fmF7tvqRxEAvFSK-rpekWA

## Backend startup

Follow these steps to run the backend server locally. The backend code lives in the `Back-end/` folder and requires a MongoDB connection string set in an environment file.

1. Create a `.env` file inside the `Back-end/` folder with at least the MongoDB URI:

```
MONGO_URI=your_mongodb_connection_string_here
PORT=5400    # optional, defaults to 5400 if not provided
```

2. Install dependencies and start the server:

```bash
cd Back-end
npm install
# The package.json currently references `server.js` in the start script; this repo's backend entry is `index.js`.
# You can start the app directly with:
node index.js
# Or update `Back-end/package.json` to set the start script to `node index.js` and then run:
# npm start
```

3. Open the API in your browser or use curl/Postman:

```
http://localhost:5400/
```

Notes:
- The server expects `process.env.MONGO_URI` to be set. If you use a hosted MongoDB (Atlas), paste the connection string into the `.env` file.
- The code uses a hard-coded JWT key variable `Jwtkey = 'ecomm'` in `Back-end/index.js`. For production, move this into your `.env` and read it via `process.env.JWT_KEY` instead.

## Screenshots (place images in `assets/images/` or use URLs)

Below is a sample table layout for the 8 screenshots you mentioned. Order (left→right, top→bottom):
- 1: Code screenshot
- 2–7: Frontend screenshots (six images)
- 8: Data storage / database screenshot

| Code (1) | Frontend (2) | Frontend (3) | Frontend (4) |
|---|---|---|---|
| ![Code screenshot](assets/images/code.png) | ![Frontend 1](assets/images/frontend1.png) | ![Frontend 2](assets/images/frontend2.png) | ![Frontend 3](assets/images/frontend3.png) |

| Frontend (5) | Frontend (6) | Frontend (7) | Data storage (8) |
|---|---|---|---|
| ![Frontend 4](assets/images/frontend4.png) | ![Frontend 5](assets/images/frontend5.png) | ![Frontend 6](assets/images/frontend6.png) | ![Data storage](assets/images/datastorage.png) |

How to use these placeholders:
- Create the directory `assets/images/` at the repository root and add your 8 images with the filenames used above. Git will render them in the table.
- Or replace any `assets/images/*.png` entry with a full HTTPS URL (for images hosted elsewhere) if you prefer not to commit the images to the repo.

If you'd like, I can also:
- update `Back-end/package.json` to make `npm start` run `index.js` instead of `server.js`,
- create an example `.env.example` file,
- or add the actual image files into `assets/images/` if you upload them or tell me their paths/filenames.


