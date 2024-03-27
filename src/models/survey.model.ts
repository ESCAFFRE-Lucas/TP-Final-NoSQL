import mongoose from "mongoose";

export const surveySchema = new mongoose.Schema({
    nom: { type: String, required: true },
    createur: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});
