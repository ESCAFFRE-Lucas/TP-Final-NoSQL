import type { PageServerLoad } from "../../../../.svelte-kit/types/src/routes/$types";
import { type Action, type Actions, redirect } from "@sveltejs/kit";
import { getSurveyById } from "../../../services/survey.service";
import { env } from "$env/dynamic/private";
import { verifyToken } from "../../../utils/token";
import { getQuestionById } from "../../../services/question.service";
import { getResponseById } from "../../../services/response.service";

type IdSurvey = {
    idSurvey: string,
}

type IdUser = {
    idUser: string,
}

type Question = {
    _id: string;
    intitule: string;
    type: string;
    reponses: string;
    goodAnswer: string[];
}

export const load: PageServerLoad = async ({ cookies, params }) => {
    const token = cookies.get("token");
    if (token && token !== "undefined") {
        const user = verifyToken(token, env.JWT_SECRET!);
        console.log('user:', user);
        const idSurvey = (params as IdSurvey).idSurvey;
        const idUser = (params as IdUser).idUser;
        let surveyQuestion: Question[] = [];
        let responses: string[] = [];
        if (idSurvey) {
            let survey = await getSurveyById(idSurvey);
            if (!survey) {
                return redirect(303, "/");
            }
            survey = {
                _id: survey._id.toString(),
                nom: survey.nom,
                createur: survey.createur.toString(),
                questions: survey.questions.map((question: { toString: () => any; }) => question.toString())
            }
            surveyQuestion = survey.questions.map(async (questionId: string) => {
                let question = await getQuestionById(questionId);
                question = {
                    _id: question._id.toString(),
                    intitule: question.intitule,
                    type: question.type,
                    reponses: question.reponses.toString(),
                    goodAnswer: question.goodAnswer
                }
                return question
            });

            responses = survey.questions.map(async (questionId: string) => {
                let question = await getQuestionById(questionId);
                question = {
                    _id: question._id.toString(),
                    intitule: question.intitule,
                    type: question.type,
                    reponses: question.reponses.toString(),
                    goodAnswer: question.goodAnswer
                }
                let response = await getResponseById(question.reponses);
                response = {
                    _id: response._id.toString(),
                    options: response.options.map((option: { toString: () => any; }) => option.toString())
                }
                return response;
            });


            return {
                survey,
                surveyQuestion: await Promise.all(surveyQuestion),
                responses: await Promise.all(responses),
                userId: idUser,
                idSurvey: idSurvey
            }
        } else {
            return redirect(303, "/auth");
        }
    }
}

const submit: Action = async ({ request }) => {
    try {
        const data = await request.formData();
        const userId = data.get('userId') as string;
        const surveyId = data.get('surveyId') as string;
        const responses = data.getAll('responses') as string[];
        console.log('responses:', responses);
        return redirect(303, `/responses/${userId}/${surveyId}`);
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: "An error occurred during submission" };
    }

}


export const actions: Actions = {
    submit
} satisfies Actions