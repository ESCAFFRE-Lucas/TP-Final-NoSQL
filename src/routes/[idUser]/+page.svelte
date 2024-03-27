<script lang="ts">
    import type { PageServerData } from './$types';
    import GoBack from "@components/GoBack.svelte";

    export let data: PageServerData;

</script>

<div class="section">
    <slot/>
</div>
<div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <GoBack className="absolute top-0 left-0 m-4 text-white text-2xl" href="/"/>
    <div class="flex items-center mb-4">
        {#if data.surveys.length === 0}
            <p class="text-gray-500 ml-2">Aucun sondage disponible</p>
        {:else}
            <h2 class="text-2xl text-[#ffeba7] font-bold">Surveys disponible :</h2>
            <ul class="ml-4">
                {#each data.surveys as survey}
                    <a href="/{data.userId}/{survey._id}">
                        <li class="text-blue-500 hover:underline">{survey.nom}</li>
                    </a>
                {/each}
            </ul>
        {/if}
    </div>
</div>