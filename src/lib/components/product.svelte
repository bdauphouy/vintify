<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: number;
  export let title = "";
  export let price = "";
  export let images: string[];
  export let isSelected = true;

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("select", { productId: id });
  };
</script>

<div
  tabindex="0"
  on:click={handleClick}
  class="transition-colors duration-300 select-none rounded-lg h-full overflow-hidden border-solid border-2 cursor-pointer"
  class:border-blue-400={isSelected}
  class:bg-blue-50={isSelected}
>
  {#if images.length > 0}
    <img
      draggable="false"
      class="h-80 w-full object-cover"
      src={images[0]}
      alt={title}
    />
  {/if}
  <ul class="p-4 flex flex-col gap-2">
    <li class="font-medium">{title}</li>
    <li>{price}€</li>
  </ul>
</div>
