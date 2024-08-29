<script>
  import Button from "./button.svelte";
</script>

<div
  class="h-14 bg-blue-400 flex justify-center items-center text-white font-medium"
>
  <h3 class="flex gap-4 items-center">
    You like the website? Give me a star :)
    <Button
      as="a"
      href="https://github.com/bdauphouy/vintify"
      variant="secondary"
      size="sm"
    >
      Go to Github
    </Button>
  </h3>
</div>
