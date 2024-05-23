<script lang="ts">
  export let variant: "primary" | "secondary" = "primary";
  export let size: "sm" | "md" = "md";
  export let href = "";
  export let as: "button" | "a" = "button";
</script>

<svelte:element
  this={as}
  {...as === "a" && { href }}
  on:click
  class="{variant === 'primary'
    ? 'bg-blue-400 text-white border-blue-400 hover:border-blue-400/80 hover:bg-blue-400/80'
    : 'bg-white text-blue-400 hover:bg-white/80'} {size === 'md'
    ? 'px-4 py-3'
    : 'px-3 py-1'} rounded-lg font-medium border-2 border-solid hover:shadow-md transition-all duration-300"
>
  <slot />
</svelte:element>
