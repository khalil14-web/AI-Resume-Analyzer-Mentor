import cvModel, { ICV } from "../models/cvModel";

export const saveCV = async (
  filename: string,
  path: string,
  owner: string
): Promise<ICV> => {
  const cv = new cvModel({ filename, path, owner });
  return await cv.save();
};

export const getUserCVs = async (owner: string): Promise<ICV[]> => {
  return await cvModel
    .find({ owner })                   // فقط ملفات المستخدم
    .sort({ uploadedAt: -1 });         // الأحدث أولاً
};

export const getCVById = async (id: string): Promise<ICV | null> => {
  return await cvModel.findById(id);
};
