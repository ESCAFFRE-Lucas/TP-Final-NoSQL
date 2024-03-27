import { question, survey } from "$lib/server/db";
import { deleteQuestion } from "./question.service";

type Survey = {
    nom: string;
    createur: string;
    questions: string[];
}

type AddQuestion = {
    questions: string[];
}

export const createSurvey = async (surveyData: Survey) => {
    try {
        return await survey.create(surveyData);
    } catch (error) {
        console.error('Erreur lors de la création du sondage :', error);
        throw new Error('Impossible de créer un nouveau sondage');
    }
}

export const getSurvey = async (nom: string) => {
    try {
        return await survey.findOne({
            nom
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du sondage :', error);
        throw new Error('Impossible de récupérer le sondage');
    }
}

export const getSurveyById = async (id: string) => {
    try {
        return await survey.findById(id);
    } catch (error) {
        console.error('Erreur lors de la récupération du sondage :', error);
        throw new Error('Impossible de récupérer le sondage');
    }
}

export const getAllUserSurveys = async (createur: string) => {
    try {
        return await survey.find({
            createur
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des sondages :', error);
        throw new Error('Impossible de récupérer les sondages');
    }
}

export const updateSurvey = async (nom: string, surveyData: Survey) => {
    try {
        return await survey.findOneAndUpdate({
            nom
        }, surveyData);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du sondage :', error);
        throw new Error('Impossible de mettre à jour le sondage');
    }
}

export const addQuestionToSurvey = async (idSurvey: string, addQuestion: AddQuestion) => {
    try {
        return await survey.findOneAndUpdate({
            _id: idSurvey
        }, { $push: { questions: addQuestion.questions } });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la question au sondage :', error);
        throw new Error('Impossible d\'ajouter la question au sondage');
    }
}

export const deleteSurvey = async (id: string) => {
    try {
        const survey = await getSurveyById(id);

        for (let i = 0; i < survey.questions.length; i++) {
            await deleteQuestion(survey.questions[i]);
        }

        return await survey.deleteOne({
            _id: id
        });
    } catch (error) {
        console.error('Erreur lors de la suppression du sondage :', error);
        throw new Error('Impossible de supprimer le sondage');
    }
}