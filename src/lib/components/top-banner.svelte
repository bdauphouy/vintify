<script>
  import Button from "./button.svelte";
</script>

<div
  class="h-16 bg-blue-400 flex justify-center items-center text-white font-medium"
>
  <h3 class="flex gap-4 items-center">
    You like the website and you want to support me?
    <Button as="a" href="/" variant="secondary" size="sm"
      >Buy me a coffee</Button
    >
  </h3>
</div>
