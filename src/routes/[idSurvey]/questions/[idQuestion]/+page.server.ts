import type { PageServerLoad } from "./$types";
import { verifyToken } from "../../../../utils/token";
import { env } from "$env/dynamic/private";
import { type Action, type Actions, redirect } from "@sveltejs/kit";
import { getQuestionById, updateQuestion } from "../../../../services/question.service";
import { getResponseById, updateReponse } from "../../../../services/response.service";

type IdQuestion = {
    idQuestion: string;
}

type IdSurvey = {
    idSurvey: string;
}

export const load: PageServerLoad = async ({ cookies, params }) => {
    const token = cookies.get("token");
    if (token && token !== "undefined") {
        const user = verifyToken(token, env.JWT_SECRET!);
        console.log('user:', user);
        const idQuestion = (params as IdQuestion).idQuestion;
        const idSurvey = (params as IdSurvey).idSurvey;
        if (idQuestion) {
            let question = await getQuestionById(idQuestion);
            if (!question) {
                return redirect(303, "/");
            }
            question = {
                _id: question._id.toString(),
                intitule: question.intitule,
                type: question.type,
                reponses: question.reponses.toString(),
                goodAnswer: question.goodAnswer
            };

            let response = await getResponseById(question.reponses);

            response = {
                _id: response._id.toString(),
                options: response.options
            };

            return {
                question,
                idSurvey,
                response
            }
        } else {
            return redirect(303, "/");
        }
    } else {
        return redirect(303, "/auth");
    }
}

const update: Action = async ({ request, params }) => {
    const data = await request.formData();
    const intitule = data.get('intitule') as string;
    const type = data.get('type') as string;
    const reponses = data.get('response') as string;
    const goodAnswer = data.get('goodAnswer') as string;
    const options = data.get('options') as string;

    const optionsArray = options.split(',');

    const idQuestion = (params as IdQuestion).idQuestion;

    try {
        await updateReponse(reponses, {
            options: optionsArray
        });

        await updateQuestion(idQuestion, {
            intitule,
            type,
            goodAnswer
        });
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: "An error occurred during the update" };
    }
}

export const actions: Actions = {
    update
} satisfies Actions