# 🍔 Food Delivery App - Full Stack MERN Project

This is a **Full Stack Food Ordering Website** built using **React.js**, **MongoDB**, **Express.js**, **Node.js**, and **Stripe**. It includes a user-facing frontend, an admin panel, and a backend API.

---

## 🚀 Features

- ✅User registration and login (authentication)
- ✅Browse and filter food items
- ✅Add food to cart and place orders
- ✅Stripe payment integration
- ✅Order history for users
- ✅Admin dashboard to manage food and orders
- ✅Order status update feature

  ---

## 🧩 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas
- **Payment Gateway**: Stripe

  ---

## 🛠️ Project Setup

1. **Clone the Repository**
 ```bash
   git clone https://github.com/Farihasiddiqui004/food-delivery-app.git
 ```

---

2. **Backend Setup**
   
📁 Go to the backend folder and install dependencies:

 ```bash
  cd backend
  npm install
 ```

🗂️ Create a .env file inside the backend folder and add your environment variables:

 ```bash
  MONGO_URI=your_mongodb_uri
  STRIPE_SECRET_KEY=your_stripe_secret
  JWT_SECRET=your_jwt_secret_key
  CLOUDINARY_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
 ```

▶️ Start the backend server:

 ```bash
  npm run server
 ```

---

3. **Frontend/Admin Setup**
   
📁 Go to the frontend or admin folder and install dependencies:

 ```bash
  cd frontend
  npm install
 ```

or

 ```bash
  cd admin
  npm install
 ```

🗂️ Create a .env file inside frontend and admin folders:

 ```bash
  VITE_BACKEND_URL=https://your-backend-deployment-link.com/api
 ```

▶️ Start frontend/admin server:

 ```bash
  npm run dev
 ```

---

### ⚠️ Important Note
In backend/controllers/orderController.js, if you are using:
 ```bash
  http://localhost:5173
 ```

as the frontend URL, replace it with your deployed frontend URL before production:
 ```bash
  https://your-frontend.vercel.app
 ```

---

## 📦 Dependencies
- React.js
- Node.js
- Express.js
- MongoDB
- Stripe

---

## 🔗 Localhost URLs

- **Backend**	http://localhost:4000
- **Frontend**	http://localhost:5173
- **Admin**	http://localhost:5174
