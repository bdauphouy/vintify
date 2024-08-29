<script lang="ts">
  import { checkProfileUrl } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import Button from "./button.svelte";
  import Input from "./input.svelte";

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
  class="bg-gray-100 pt-10 pb-20 transition-[padding] duration-300 {isExtended
    ? 'md:pb-40'
    : ''} flex flex-col items-center px-6 md:px-20">
  <div class="w-full flex items-start sm:items-center justify-between">
    <div class="flex gap-4 flex-row">
      <a href="/">
        <img class="w-20" src="/images/vintify.svg" alt="vintify logo" />
      </a>
      <span class="text-sm sm:text-base">
        Made by
        <a
          href="https://x.com/bdauphouy"
          class="text-blue-400 hover:text-blue-400/80 transition-colors duration-300 underline underline-offset-4">
          @badolebado
        </a>
      </span>
    </div>
    <a
      href="https://github.com/bdauphouy/vintify"
      class="items-center flex gap-2 underline underline-offset-4 hover:text-black/60 transition-colors duration-300">
      <img class="w-4" src="/images/github.svg" alt="github logo" />
      <span class="sr-only sm:not-sr-only"> Github </span>
    </a>
  </div>

  <h1
    class="text-4xl mt-20 font-bold transition-[margin] duration-300 leading-snug {isExtended
      ? 'md:mt-40'
      : ''}">
    Export your
    <span class="bg-blue-400 text-white px-2 md:px-3 md:py-1 rounded-lg">
      Vinted
    </span>
    products easily.
  </h1>

  <form class="md:max-w-xl w-full mt-20" on:submit={handleSubmit}>
    <div class="flex sm:items-end gap-4 flex-col sm:flex-row">
      <Input
        label="Enter your Vinted profile URL"
        placeholder="https://www.vinted.fr/member/12345678"
        bind:value={vintedProfileUrl} />
      <Button>Fetch products</Button>
    </div>
    {#if inputError}
      <p class="mt-2 text-red-500">{inputError}</p>
    {/if}
  </form>
</header>
