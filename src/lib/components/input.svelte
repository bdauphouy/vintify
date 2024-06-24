<script lang="ts">
  export let type: "text" | "number" = "text";
  export let id = "";
  export let label = "";
  export let value = "";
  export let placeholder = "";
</script>

<div class="flex flex-col gap-2 flex-1">
  <label for={id}>{label}</label>
  {#if type === "number"}
    <input
      class="px-4 py-3 border-solid border-2 outline-none rounded-lg focus:border-blue-400 transition-colors duration-300"
      {placeholder}
      {id}
      type="number"
      bind:value
    />
  {:else}
    <input
      class="px-4 py-3 border-solid border-2 outline-none rounded-lg focus:border-blue-400 transition-colors duration-300"
      {placeholder}
      {id}
      type="text"
      bind:value
    />
  {/if}
</div>
