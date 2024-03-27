import mongoose from "mongoose";

export const responseSchema = new mongoose.Schema({
    options: { type: [String], required: true }
});