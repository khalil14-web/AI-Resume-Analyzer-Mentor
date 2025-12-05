// استيراد Mongoose للعمل مع قاعدة البيانات MongoDB
// Schema: لتحديد شكل البيانات
// Document: لتمثيل سجل واحد في قاعدة البيانات
import mongoose, { Schema, Document } from "mongoose";

//IUser: يحدد شكل البيانات لمستخدم واحد (TypeScript Interface).
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


//Schema: يحدد قالب MongoDB عند تخزين المستخدم، أي أنه يجبرنا على وجود الحقول الأساسية.
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// إنشاء الـ Model
const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
