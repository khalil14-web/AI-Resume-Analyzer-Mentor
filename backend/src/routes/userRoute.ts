import express from "express";
import { login, register } from "../services/userService";



// إنشاء Router خاص بـ Express
// هذا مثل "موظف الاستقبال" الذي يستقبل الطلبات ويحدد ماذا نفعل بها
const router = express.Router();

// ======================
// مسار تسجيل المستخدم (Register)
// ======================
router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    console.log(request.body);

    const { statusCode, data } = await register({ firstName, lastName, email,password,});

    response.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    response.status(500).send("Something went wrong!");
  }
});

// ======================
// مسار تسجيل الدخول (Login)
// ======================
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const { statusCode, data } = await login({ email, password });

    response.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    response.status(500).send("Something went wrong!");
  }
});

export default router;
