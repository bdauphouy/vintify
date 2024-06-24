<script lang="ts">
  import type { Image } from "$lib/types";
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  export let images: Image[] = [];

  const dispatch = createEventDispatcher();

  const handleImageRemove = (id: string) => {
    dispatch("remove", { id });
  };
</script>

<ul class="grid grid-cols-4 gap-4">
  {#each images as image (image.id)}
    <li transition:fade animate:flip class="relative h-40">
      <button
        on:click={() => handleImageRemove(image.id)}
        type="button"
        class="bg-blue-400 text-white p-1 absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 rounded-full"
      >
        <img class="w-4" src="/images/close.svg" alt="Remove" />
      </button>
      <img
        class="w-full h-full object-cover rounded-md"
        src={image.base64}
        alt=""
      />
    </li>
  {/each}
</ul>
