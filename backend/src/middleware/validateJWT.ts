import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";

const validateJWT = async (req: ExtendRequest, res: Response, next: NextFunction) => {
  try {
      // 1️⃣ قراءة الهيدر authorization
    const authorizationHeader = req.get("authorization");
    if (!authorizationHeader) {
      return res.status(403).send("Authorization header was not provided");
    }

    // 2️⃣ استخراج التوكن من شكل: Bearer token123
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(403).send("Bearer token not found");
    }

       // 3️⃣ التحقق من صحة التوكن
    jwt.verify(token, process.env.JWT_SECRET || "", async (err, payload) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }

      if (!payload) {
        return res.status(403).send("Invalid token payload");
      }

      // 4️⃣ استخراج بيانات المستخدم من payload
      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };

      // Fetch user from database based on the payload
      const user = await userModel.findOne({ email: userPayload.email });
      if (!user) {
        return res.status(404).send("User not found");
      }

      // 6️⃣ نضيف المستخدم داخل req
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
};

export default validateJWT;
