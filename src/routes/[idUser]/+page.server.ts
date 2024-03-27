import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/$types";
import { getAllUserSurveys } from "../../services/survey.service";
import { env } from "$env/dynamic/private";
import { verifyToken } from "../../utils/token";
import { redirect } from "@sveltejs/kit";

type IdUser = {
    idUser: string,
}
export const load: PageServerLoad = async ({ cookies, params }) => {
    const token = cookies.get("token");
    if (token && token !== "undefined") {
        const user = verifyToken(token, env.JWT_SECRET!);
        console.log('user:', user);
        if (user && typeof user !== 'string' && 'userId' in user) {
            let userId = (params as IdUser).idUser;
            let surveys = await getAllUserSurveys(userId);
            surveys = surveys.map( (survey) => {
                return {
                    _id: survey._id.toString(),
                    nom: survey.nom,
                    createur: survey.createur.toString(),
                    questions: survey.questions.map( (question: { toString: () => any; }) => question.toString())
                }
            });
            return {
                surveys,
                userId: userId
            }
        } else {
            console.error("L'objet user n'a pas la propriété userId");
            return redirect(303, "/auth");
        }
    } else {
        return redirect(303, "/auth");
    }
};