<script lang="ts">
    import type { PageServerData } from './$types';
    import Cookies from "js-cookie";
    import { goto } from "$app/navigation";

    export let data: PageServerData;

    const logout = () => {
        Cookies.remove("token");
        goto("/auth");
    }
</script>

<h1 class="text-2xl font-bold mb-4">Bonjour, {data.userData.username}</h1>

<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        on:click={logout}>
    Déconnexion
</button>

<div class="flex items-center mb-4">
    <form class="flex" method="POST" action="?/nameSurvey">
        <input type="hidden" name="userId" value="{data.userId}">
        <input type="text" placeholder="Nom du sondage" name="nom"
               class="mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
        <button type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Ajouter
        </button>
    </form>
</div>


{#if data.surveys && data.surveys.length > 0}
    <ul>
        {#each data.surveys as item}
            <form method="POST" action="?/surveyDelete">
                <a href="/{item._id}/questions">
                    <li class="flex items-center justify-between px-4 py-2 border-b border-gray-300">
                        <span>{item.nom}</span>
                    </li>
                </a>
                <input type="hidden" name="idSurvey" value="{item._id.toString()}">
                <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600">
                    Supprimer
                </button>
            </form>
        {/each}
    </ul>
{:else}
    <p>Aucun élément à afficher</p>
{/if}

<div class="flex flex-col items-center mb-4">
    <h2 class="text-xl font-bold mb-2">Autres utilisateurs</h2>
    {#if data.usersData && data.usersData.length > 0}
        <ul>
            {#each data.usersData as user}
                <a href="/{user._id}">
                    <li class="flex items-center justify-between px-4 py-2 border-b border-gray-300">
                        <span>{user.username}</span>
                    </li>
                </a>
            {/each}
        </ul>
    {:else}
        <p>Aucun élément à afficher</p>
    {/if}
</div>


