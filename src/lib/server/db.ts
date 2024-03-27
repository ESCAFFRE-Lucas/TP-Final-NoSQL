import mongoose from "mongoose";
import { env } from "$env/dynamic/private";
import { userSchema } from "../../models/user.model";
import { surveySchema } from "../../models/survey.model";
import { responseSchema } from "../../models/response.model";
import { questionSchema } from "../../models/question.model";

mongoose.connect(env.INTERNAL_URL);

export const user = mongoose.models.User || mongoose.model("User", userSchema);
export const survey = mongoose.models.Survey || mongoose.model("Survey", surveySchema);
export const question = mongoose.models.Question || mongoose.model("Question", questionSchema);
export const response = mongoose.models.Response || mongoose.model("Response", responseSchema);

export default mongoose;

