import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({
    intitule: { type: String, required: true },
    type: { type: String, required: true },
    reponses: { type: mongoose.Schema.Types.ObjectId, ref: "Response"},
    goodAnswer: { type: [String], required: true },
});