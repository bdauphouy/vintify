<script lang="ts">
  export let id = "";
  export let label = "";
  export let value = "";
  export let placeholder = "";
</script>

<div class="flex flex-col gap-2 flex-1">
  <label for={id}>{label}</label>
  <input
    class="px-4 py-3 border-solid border-2 outline-none rounded-lg"
    {placeholder}
    {id}
    type="text"
    bind:value
  />
</div>
