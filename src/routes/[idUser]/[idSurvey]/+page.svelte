<script lang="ts">
    import type { PageServerData } from './$types';
    import GoBack from "@components/GoBack.svelte";

    export let data: PageServerData;

    let index = 0;

</script>

<div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <GoBack className="absolute top-0 left-0 m-4 text-white text-2xl" href="/{data.userId}"/>
    <div class="max-w-md mx-auto">
        {#if data.surveyQuestion.length > 0}
            <h1 class="text-2xl font-bold mb-4 text-[#ffeba7]">Questions :</h1>
            <form method="POST" action="/{data.userId}/{data.idSurvey}/?/submit">
                {#each data.surveyQuestion as question}
                    <div class="mb-6">
                        <h2 class="text-lg text-[#ffeba7] font-semibold mb-2">Question {index + 1}
                            : {question.intitule}</h2>
                        <ul>
                            {#each data.responses as response}
                                {#if question.reponses == response._id}
                                    {#each response.options as option}
                                        <li class="ml-4">
                                            <input type="radio" name="{question._id}" value="{option}" id="{option}">
                                            <label for="{option}" class="ml-2 text-[#ffeba7]">{option}</label>
                                        </li>
                                    {/each}
                                {/if}
                            {/each}
                        </ul>
                    </div>
                {/each}
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Valider
                </button>
            </form>
        {:else}
            <h1 class="text-2xl font-bold mb-4 text-[#ffeba7]">Aucune question n'a été trouvée</h1>
        {/if}
    </div>
</div>

