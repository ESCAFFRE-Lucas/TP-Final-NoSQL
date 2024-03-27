<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import GoBack from "@components/GoBack.svelte";
    import type { PageServerData } from './$types';

    export let data: PageServerData;

    console.log(data);

    let questionType = 'open';
    let numOptions = 2;
    let surveyId = $page.params.idSurvey;

    const toggleOptions = () => {
        questionType === 'qcm';
    }

    const updateNumOptions = (e) => {
        numOptions = parseInt(e.target.value, 10);
    }
</script>

<div class="section">
    <slot/>
</div>

<div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <GoBack className="absolute top-0 left-0 m-4 text-white text-2xl" href="/"/>
    <div class="container mx-auto">
        <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
                <div class="section pb-5 pt-5 pt-sm-2 text-center">
                    <h6 class="mb-0 pb-3"><span class="text-[#ffeba7]">Ask a Question</span></h6>
                    <div class="card-3d-wrap mx-auto">
                        <div class="card-3d-wrapper">
                            <form class="card-front" method="POST" action="/{surveyId}/questions/?/makeQuestion"
                                  use:enhance>
                                <div class="center-wrap">
                                    <div class="section text-center">
                                        <div class="form-group">
                                            <input type="text" name="intitule" class="form-style"
                                                   placeholder="Your question">
                                        </div>
                                        <div class="form-group mt-2">
                                            <select bind:value={questionType} on:change={toggleOptions}
                                                    class="form-style">
                                                <option value="open">Open Question</option>
                                                <option value="qcm">QCM (Multiple Choice Question)</option>
                                            </select>
                                            <input type="text" name="type" class="form-style mt-2 hidden"
                                                   value={questionType}>
                                        </div>
                                        {#if questionType === 'qcm'}
                                            <div class="form-group mt-2">
                                                <select bind:value={numOptions} on:change={updateNumOptions}
                                                        class="form-style pr-4">
                                                    {#each [2, 3, 4] as option}
                                                        <option value={option}>{option}</option>
                                                    {/each}
                                                </select>
                                                {#each Array(numOptions) as _, index}
                                                    <input type="text" name="option" class="form-style"
                                                           placeholder={`Option ${index + 1}`}>
                                                    <input type="checkbox" name="correctOption" value={index + 1}
                                                           class="form-checkbox mt-2">
                                                {/each}
                                            </div>
                                        {/if}
                                        {#if questionType === 'open'}
                                            <div class="form-group mt-2">
                                                <input type="text" name="correctOption" class="form-style"
                                                       placeholder="Expected Answer">
                                            </div>
                                        {/if}
                                        <button type="submit" class="btn mt-4 bg-[#ffeba7] w-32 rounded-2xl">Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
                <div class="section pb-5 pt-5 pt-sm-2 text-center">
                    <h6 class="mb-0 pb-3"><span class="text-[#ffeba7]">Questions</span></h6>
                    <div class="card-3d-wrap mx-auto">
                        <div class="card-3d-wrapper">
                            <div class="card-front text-center">
                                <div class="center-wrap">
                                    <div class="section text-center">
                                        {#each data.questionArray as question}
                                            <a href="/{surveyId}/questions/{question._id}"
                                               class="btn mt-4 bg-[#ffeba7] w-32 rounded-2xl">{question.intitule}</a>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
