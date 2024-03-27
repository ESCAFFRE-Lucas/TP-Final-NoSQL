import { survey, user } from "$lib/server/db";

type User = {
    username: string;
    password: string;
    role: string;
}

type AddSurvey = {
    surveys: string[];
}

export const createUser = async (userData: User) => {
    try {
        return await user.create(userData);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        throw new Error('Impossible de créer un nouvel utilisateur');
    }
}

export const getUser = async (username: string, password: string) => {
    try {
        return await user.findOne({
            username,
            password
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        throw new Error('Impossible de récupérer l\'utilisateur');
    }
}

export const getUsers = async () => {
    try {
        return await user.find();
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        throw new Error('Impossible de récupérer les utilisateurs');
    }
}

export const getUserById = async (id: string) => {
    try {
        return await user.findById(id);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        throw new Error('Impossible de récupérer l\'utilisateur');
    }
}

export const updateUser = async (username: string, userData: User) => {
    try {
        return await user.findOneAndUpdate({
            username
        }, userData);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        throw new Error('Impossible de mettre à jour l\'utilisateur');
    }
}

export const addSurveyToUser = async (idUser: string, addSurvey: AddSurvey) => {
    try {
        return await user.findOneAndUpdate({
            _id: idUser
        }, { $push: { surveys: addSurvey.surveys } });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la question au sondage :', error);
        throw new Error('Impossible d\'ajouter la question au sondage');
    }
}

export const deleteUser = async (id: string) => {
    try {
        return await user.deleteOne({
            _id: id
        });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        throw new Error('Impossible de supprimer l\'utilisateur');
    }
}