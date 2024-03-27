import type { PageServerLoad } from "../../.svelte-kit/types/src/routes/$types";
import { verifyToken } from "../utils/token";
import { env } from "$env/dynamic/private";
import { type Action, type Actions, redirect } from "@sveltejs/kit";
import { createSurvey, deleteSurvey, getAllUserSurveys } from "../services/survey.service";
import { addSurveyToUser, getUserById, getUsers } from "../services/user.service";

export type Survey = {
    nom: string;
    createur: string;
}

export const load: PageServerLoad = async ({ cookies, locals }) => {
    const token = cookies.get("token");
    if (token && token !== "undefined") {
        const user = verifyToken(token, env.JWT_SECRET!);
        console.log('user:', user);
        if (user && typeof user !== 'string' && 'userId' in user) {
            let surveys = await getAllUserSurveys(user.userId);
            let userData = await getUserById(user.userId);
            let users = await getUsers();
            let usersData = users.map( (user) => {
                return {
                    _id: user._id.toString(),
                    username: user.username
                }
            });
            surveys = surveys.map( (survey) => {
                return {
                    _id: survey._id.toString(),
                    nom: survey.nom,
                    createur: survey.createur.toString(),
                    questions: survey.questions.map( (question: { toString: () => any; }) => question.toString())
                }
            })
            userData = {
                _id: userData._id.toString(),
                username: userData.username,
                surveys: userData.surveys.map( (survey: { toString: () => any; }) => survey.toString())
            }

            usersData.forEach( (user) => {
                if (userData._id === user._id) {
                    usersData.splice(usersData.indexOf(user), 1);
                }
            });
            return {
                surveys,
                userData,
                usersData,
                userId: user.userId
            }
        } else {
            console.error("L'objet user n'a pas la propriété userId");
            return redirect(303, "/auth");
        }
    } else {
        return redirect(303, "/auth");
    }
}

const nameSurvey: Action = async ({ request }) => {
    try {
        const data = await request.formData();
        const nom = data.get('nom') as string;
        const userId = data.get('userId') as string;
        const newSurvey = await createSurvey({
            nom: nom,
            createur: userId,
            questions: []
        });
        await addSurveyToUser(userId, {
            surveys: newSurvey._id.toString()
        });
    } catch (error) {
        console.error('Erreur lors de la création du sondage :', error);
        return { success: false, message: "Impossible de créer un nouveau sondage" };

    }
}

const surveyDelete: Action = async ({ request }) => {
    try {
        const data = await request.formData();
        const surveyId = data.get('idSurvey') as string;
        await deleteSurvey(surveyId);
    } catch (error) {
        console.error('Erreur lors de la suppression du sondage :', error);
        return { success: false, message: "Impossible de supprimer le sondage" };
    }
}



export const actions: Actions = {
    nameSurvey,
    surveyDelete
} satisfies Actions