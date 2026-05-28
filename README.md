# 🚀 Notes API Backend

A simple and clean **Notes CRUD Backend API** built using:

* ⚡ Node.js
* 🚂 Express.js
* 🍃 MongoDB
* 🧩 Mongoose
* 🔐 JWT Authentication

---

# ✨ Features

✅ User Registration
✅ JWT Authentication
✅ Create Notes
✅ Get Notes
✅ Update Notes
✅ Delete Notes
✅ MongoDB Database Connection

---

# 📦 Install Dependencies

```bash
npm install express mongoose dotenv cookie-parser jsonwebtoken
```

---

# ▶️ Run Server

```bash
node server.js
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root folder.

```env
PORT=3000
TOKEN_SECRET=your_secret_key
```

---

# 📌 API Endpoints

| Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| POST   | `/api/auth/register`    | Register User |
| POST   | `/api/notes`            | Create Note   |
| GET    | `/api/notes`            | Get All Notes |
| PUT    | `/api/notes/update/:id` | Update Note   |
| DELETE | `/api/notes/delete/:id` | Delete Note   |

---

# 📥 Example Request

## Register User

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

# ✅ Success Response

```json
{
  "message": "Task created successfully"
}
```

---

# ❌ Error Response

```json
{
  "message": "All fields are required"
}
```

---

# 👨‍💻 Author

**Sachin Bind**
