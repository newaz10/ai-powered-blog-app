# Quickblog 📝

Quickblog is a simple and fast blogging platform built with the **MERN stack**.  
It allows users to easily write, publish, and manage their blogs with a clean and responsive interface.

---

## 🚀 Features

- ✏ **Create & Publish Blogs** – Write blogs with ease and publish instantly.
- 📂 **Manage Your Posts** – Edit or delete existing blogs from a dashboard.
- 📱 **Responsive Design** – Works on all devices.
- ⚡ **Fast Performance** – Optimized frontend with Vite.
- 🔒 **Secure Backend** – JWT authentication & secure API endpoints.

---

## 📂 Project Structure
```
Quickblog/
│
├── client/ # Frontend (React + Vite)
│ ├── public/
│ ├── src/
│ └── .env
│
├── server/ # Backend (Node.js + Express)
│ ├── configs/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── .env
│
└── .gitignore

```
---

## ⚙ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sahil2003kumar/QUICKBLOG.git

cd quickblog
```

### 2️⃣ Install Backend Dependencies
```bash
cd server
npm install

```


### 3️⃣ Install Frontend Dependencies
```bash
cd ../client
npm install

```

### 4️⃣ Usage

#### Run Backend

```bash
cd server
npm start

```


### Run Frontend
```bash
cd client
npm run dev
```




🔑 Environment Variables

**Backend `.env`**
```ini
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

```

**Frontend `.env`**
```ini
VITE_API_URL=http://localhost:3000
```

🤝 Contributing
Contributions are welcome!

Fork the repository

Create a new branch (feature/YourFeature)

Commit your changes

Open a pull request

📜 License
This project is licensed under the MIT License.