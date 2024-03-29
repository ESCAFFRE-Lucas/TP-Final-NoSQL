import { question, response, survey } from "$lib/server/db";
import { deleteReponse } from "./response.service";
import { getSurveyById } from "./survey.service";

type Question = {
    intitule: string;
    type: string;
    goodAnswer: string| string[];
}

export const createQuestion = async (questionData: Question) => {
    try {
        return await question.create(questionData);
    } catch (error) {
        console.error('Erreur lors de la création de la question :', error);
        throw new Error('Impossible de créer une nouvelle question');
    }
}

export const getQuestion = async (intitule: string) => {
    try {
        return await question.findOne({
            intitule
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de la question :', error);
        throw new Error('Impossible de récupérer la question');
    }
}

export const getQuestionById = async (id: string) => {
    try {
        return await question.findById(id);
    } catch (error) {
        console.error('Erreur lors de la récupération de la question :', error);
        throw new Error('Impossible de récupérer la question');
    }
}

export const updateQuestion = async (id: string, questionData: Question) => {
    try {
        return await question.updateOne({
            _id: id
        }, questionData);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la question :', error);
        throw new Error('Impossible de mettre à jour la question');
    }
}

export const deleteQuestion = async (questionId: string) => {
    try {
        const question = await getQuestionById(questionId.toString());
        console.log('question:', question.reponses.toString());

        const responsesQuestion = await response.findOne({
            _id: question.reponses.toString()
        });

        await deleteReponse(responsesQuestion._id);

        return await question.deleteOne({
            _id: questionId
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de la question :', error);
        throw new Error('Impossible de supprimer la question');
    }
}