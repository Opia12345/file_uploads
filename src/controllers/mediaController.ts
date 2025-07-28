import { Request, Response } from "express";
import Media from "../models/media.model";

export const allMedia = async (req: Request, res: Response) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: media });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
