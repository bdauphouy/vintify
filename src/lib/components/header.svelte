<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./button.svelte";
  import Input from "./input.svelte";
  import { checkProfileUrl } from "$lib/utils";

  export let isExtended = true;
  let vintedProfileUrl = "";
  let inputError = "";

  const dispatch = createEventDispatcher();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    try {
      const profileId = checkProfileUrl(vintedProfileUrl);

      dispatch("fetch", { profileId });
    } catch (error) {
      inputError = (error as Error).message;
    }
  };
</script>

<header
  class="bg-gray-100 pt-10 transition-[padding] duration-300 {isExtended
    ? 'pb-40'
    : 'pb-20'} flex flex-col items-center px-20"
>
  <div class="w-full flex justify-between">
    <div class="flex gap-4">
      <img class="w-20" src="/images/vintify.svg" alt="vintify logo" />
      <span
        >Made by <a
          href="https://x.com/bdauphouy"
          class="text-blue-400 hover:text-blue-400/80 transition-colors duration-300 underline underline-offset-4"
          >@badolebado</a
        ></span
      >
    </div>
    <a
      href="https://github.com/bdauphouy/vintify"
      class="flex gap-2 underline underline-offset-4 hover:text-black/60 transition-colors duration-300"
      ><img class="w-4" src="/images/github.svg" alt="github logo" /> Github</a
    >
  </div>

  <h1
    class="text-4xl font-bold transition-[margin] duration-300 {isExtended
      ? 'mt-40'
      : 'mt-10'}"
  >
    Export your
    <span class="bg-blue-400 text-white px-3 py-1 rounded-lg">Vinted</span>
    products easily.
  </h1>

  <form class="max-w-xl w-full mt-20" on:submit={handleSubmit}>
    <div class="flex items-end gap-4">
      <Input
        label="Enter your Vinted profile URL"
        placeholder="https://www.vinted.fr/member/12345678"
        bind:value={vintedProfileUrl}
      />
      <Button>Fetch products</Button>
    </div>
    {#if inputError}
      <p class="mt-2 text-red-500">{inputError}</p>
    {/if}
  </form>
</header>
