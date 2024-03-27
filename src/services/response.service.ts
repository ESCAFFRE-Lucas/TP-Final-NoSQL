import { response } from "$lib/server/db";

type Reponse = {
    options: string[];
}

export const createReponse = async (reponseData: Reponse) => {
    try {
        return await response.create(reponseData);
    } catch (error) {
        console.error('Erreur lors de la création de la réponse :', error);
        throw new Error('Impossible de créer une nouvelle réponse');
    }
}

export const getReponse = async (reponses: string[]) => {
    try {
        return await response.findOne({
            reponses
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de la réponse :', error);
        throw new Error('Impossible de récupérer la réponse');
    }
}

export const getResponseById = async (id: string) => {
    try {
        return await response.findById(id);
    } catch (error) {
        console.error('Erreur lors de la récupération de la réponse :', error);
        throw new Error('Impossible de récupérer la réponse');
    }
}

export const updateReponse = async (reponses: string[], reponseData: Reponse) => {
    try {
        return await response.findOneAndUpdate({
            reponses
        }, reponseData);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réponse :', error);
        throw new Error('Impossible de mettre à jour la réponse');
    }
}

export const deleteReponse = async (id: string) => {
    try {
        return await response.deleteOne({
            _id: id
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de la réponse :', error);
        throw new Error('Impossible de supprimer la réponse');
    }
}