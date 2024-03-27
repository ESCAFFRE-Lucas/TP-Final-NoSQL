<script lang="ts">
    import type { PageServerData } from "./$types";
    import GoBack from "@components/GoBack.svelte";

    export let data: PageServerData;
</script>

<div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <GoBack className="absolute top-0 left-0 m-4 text-white text-2xl" href="/{data.idSurvey}/questions"/>
    <div class="bg-white p-8 rounded-lg shadow-lg">
        <form action="/{data.idSurvey}/questions/{data.question._id}/?/update" method="POST">
            <div class="mb-4">
                <label for="intitule" class="block text-gray-700 text-sm font-bold mb-2">Question</label>
                <input type="text" id="intitule" name="intitule" value="{data.question.intitule}"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div class="mb-4">
                <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Type</label>
                <select id="type" name="type"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="qcm" selected={data.question.type === "qcm"}>QCM</option>
                    <option value="open" selected={data.question.type === "open"}>Question Ouverte</option>
                </select>
            </div>
            <div class="mb-4">
                {#if data.question.type === "qcm"}
                    <label for="options" class="block text-gray-700 text-sm font-bold mb-2">Options</label>
                    <input type="text" id="options" name="options" value="{data.response.options}"
                           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                {/if}
                {#if data.question.type === "open"}
                    <label for="options" class="block text-gray-700 text-sm font-bold mb-2">Options</label>
                    <input type="text" id="options" name="options" value="{data.response.options}"
                           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                {/if}
            </div>
            <div class="mb-4">
                <label for="goodAnswer" class="block text-gray-700 text-sm font-bold mb-2">Bonne réponse (numéro de la réponse si QCM)</label>
                <input type="text" id="goodAnswer" name="goodAnswer" value="{data.question.goodAnswer}"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <input type="hidden" name="response" value="{data.response._id}"/>
            <div class="flex items-center justify-between">
                <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                </button>
            </div>
        </form>
    </div>
</div>