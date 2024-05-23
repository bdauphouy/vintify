<script lang="ts">
  export let name = "";
  export let value = "";
  export let checked = false;
</script>

<div>
  <input
    hidden
    on:input
    {checked}
    type="radio"
    id="{name}-{value}"
    {name}
    {value}
  />
  <label
    class="block cursor-pointer border-2 border-solid px-4 py-2 rounded-lg transition-colors duration-300 {checked
      ? 'text-blue-400 bg-white'
      : 'text-white hover:bg-white/20'}"
    for="{name}-{value}"
  >
    <slot />
  </label>
</div>
