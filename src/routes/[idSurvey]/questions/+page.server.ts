import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
import { verifyToken } from "../../../utils/token";
import { type Action, type Actions, redirect } from "@sveltejs/kit";
import { createQuestion, deleteQuestion, getQuestionById } from "../../../services/question.service";
import { createReponse } from "../../../services/response.service";
import { addQuestionToSurvey, getSurveyById } from "../../../services/survey.service";

type QuestionPayload = {
    id: string,
    intitule: string,
    type: string,
    reponses: string,
    goodAnswer: string | string[],
}

type IdSurvey = {
    idSurvey: string,
}

export const load: PageServerLoad = async ({ cookies, params }) => {
    const token = cookies.get("token");
    if (token && token !== "undefined") {
        const user = verifyToken(token, env.JWT_SECRET!);
        console.log('user:', user);
        const idSurvey = (params as IdSurvey).idSurvey;
        if (idSurvey) {
            const survey = await getSurveyById(idSurvey);
            let questionId: string[] = [];
            let questionArray: QuestionPayload = [];
            if (!survey) {
                return redirect(303, "/");
            }
            survey.questions.forEach((id: { toString: () => string; }) => {
                questionId.push(id.toString());
            });

            for (const id of questionId) {
                const question = await getQuestionById(id);
                questionArray.push({
                    _id: question._id.toString(),
                    intitule: question.intitule,
                    type: question.type,
                    reponses: question.reponses.toString(),
                    goodAnswer: question.goodAnswer
                });
            }

            return {
                questionArray
            }
        } else {
            return redirect(303, "/auth");
        }
    }
}

const makeQuestion: Action = async ({ request, params }) => {
    const data = await request.formData();
    const intitule = data.get('intitule') as string;
    const type = data.get('type') as string;
    if (type === "open") {
        const goodAnswer = data.get('correctOption') as string;
        const newResponse = await createReponse({
            options: ["yes", "no"]
        });
        const newOpenQuestion = await createQuestion({
            intitule: intitule,
            type: type,
            reponses: newResponse._id.toString(),
            goodAnswer: goodAnswer.toLowerCase()
        });
        await addQuestionToSurvey(params.idSurvey!, {
            questions: newOpenQuestion._id.toString()
        });
    } else if (type === "qcm") {
        const reponses: string[] = [];
        const goodAnswers: string[] = [];
        const allAnswers = data.getAll('option');
        const correctOptions = data.getAll('correctOption');
        allAnswers.forEach((answer) => {
            if (typeof answer === "string") {
                reponses.push(answer);
            }
        });
        correctOptions.forEach((answer) => {
            if (typeof answer === "string") {
                goodAnswers.push(answer);
            }
        });
        console.log("reponses:", reponses);
        const newResponse = await createReponse({
            options: reponses
        });
        const newQcmQuestion = await createQuestion({
            intitule: intitule,
            type: type,
            reponses: newResponse._id.toString(),
            goodAnswer: goodAnswers
        });
        const addQuestion = await addQuestionToSurvey(params.idSurvey!, {
            questions: newQcmQuestion._id.toString()
        });
        console.log('addQuestion:', addQuestion);
        console.log('newQcmQuestion:', newQcmQuestion);
        console.log('newResponse:', newResponse);
    }
}

const questionDelete: Action = async ({ request }) => {
    try {
        const data = await request.formData();
        const questionId = data.get('questionId') as string;
        await deleteQuestion(questionId);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const actions: Actions = {
    makeQuestion,
    questionDelete
} satisfies Actions;