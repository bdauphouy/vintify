<script lang="ts">
  import type { Image } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  export let id = "";
  export let title = "";
  export let price = "";
  export let images: Image[];

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("select", { productId: id });
  };
</script>

<div
  tabindex="0"
  on:click={handleClick}
  class="transition-colors duration-300 select-none rounded-lg h-full overflow-hidden border-solid border-2 cursor-pointer"
>
  {#if images.length > 0}
    <img
      draggable="false"
      class="h-80 w-full object-cover"
      src={images[0].base64}
      alt={title}
    />
  {/if}
  <ul class="p-4 flex flex-col gap-2">
    <li class="font-medium">{title}</li>
    <li>{price}€</li>
  </ul>
</div>
