<script lang="ts">
  import Product from "$lib/components/mirage/product.svelte";
  import { createdProducts } from "$lib/stores/created-products";
</script>

<section class="max-w-6xl mx-auto pt-10 pb-60">
  {#if $createdProducts.length > 0}
    <ul class="grid grid-cols-4 gap-4 mt-10">
      {#each $createdProducts as product}
        <li>
          <Product
            id={product.id}
            title={product.title}
            price={product.price}
            images={product.images}
          />
        </li>
      {/each}
    </ul>
  {:else}
    <div class="flex gap-4 justify-center px-6">
      <img src="/images/search.svg" alt="search icon" class="w-6" />
      <p>Create your first item just above.</p>
    </div>
  {/if}
</section>
