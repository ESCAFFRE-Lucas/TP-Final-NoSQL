import { type Action, type Actions, redirect } from "@sveltejs/kit";
import { createUser, getUser } from "../../services/user.service";
import { generateToken, verifyToken } from "../../utils/token";
import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";
import { defaultCookiesOptions } from "$lib/helpers/cookie.helper";

type AuthPayload = {
    username: string;
    password: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get("token");
    if (token && token !== "undefined") {
        const user = verifyToken(token, env.JWT_SECRET!);
        if (user) {
            return redirect(303, "/");
        }
    }
}

const login: Action = async ({cookies, request }) => {
    try {
        const data = await request.formData();
        const formData = Object.fromEntries([...data.entries()]) as AuthPayload;
        const user = await getUser(formData.username, formData.password);

        if (user) {
            const token = generateToken({ userId: user._id }, env.JWT_SECRET!, "1d");
            cookies.set("token", token, { path: "/", ...defaultCookiesOptions });
            return redirect(303, "/");
        } else {
            return { success: false, message: "Invalid username or password" };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: "An error occurred during login" };
    }
}

const register: Action = async ({cookies, request}) => {
    try {
        const data = await request.formData();
        const formData = Object.fromEntries([...data.entries()]) as AuthPayload;
        const user = await createUser({ username: formData.username, password: formData.password, role: "user" });

        if (user) {
            const token = generateToken({ userId: user._id }, env.JWT_SECRET!, "1h");
            cookies.set("token", token, { path: "/", ...defaultCookiesOptions });
            return redirect(303, "/");
        } else {
            return { success: false, message: "An error occurred during registration" };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: "An error occurred during registration" };
    }
}

export const actions: Actions = {
    login,
    register
} satisfies Actions