<script lang="ts">
  import { selectedProducts } from "$lib/stores/selected-products";
  import type { Product as ProductType } from "$lib/types";
  import Button from "./button.svelte";
  import Product from "./product.svelte";

  export let products: ProductType[] = [];
  export let isFetched = false;

  $: {
    selectedProducts.set(products.map((product) => product.id));
  }

  const handleSelect = ({ detail }: CustomEvent<{ productId: number }>) => {
    const { productId } = detail;

    if ($selectedProducts.includes(productId)) {
      selectedProducts.update((products) =>
        products.filter((id) => id !== productId),
      );
    } else {
      selectedProducts.update((products) => [...products, productId]);
    }
  };

  const handleClickSelectAll = () => {
    selectedProducts.set(products.map((product) => product.id));
  };

  const handleClickUnselectAll = () => {
    selectedProducts.set([]);
  };
</script>

<section class="max-w-6xl mx-auto pt-10 pb-60 px-6 lg:px-20">
  {#if products.length > 0}
    <header
      class="flex justify-between items-start md:items-center md:flex-row flex-col gap-8">
      <h2 class="text-4xl font-semibold">
        Products of {products[0].vendor}
      </h2>
      <div class="flex flex-shrink-0 gap-4 items-center">
        <Button on:click={handleClickSelectAll}>Select All</Button>
        <Button variant="secondary" on:click={handleClickUnselectAll}>
          Unselect All
        </Button>
      </div>
    </header>

    <ul
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
      {#each products as product}
        <li>
          <Product
            id={product.id}
            title={product.title}
            price={product.price}
            images={product.images}
            isSelected={$selectedProducts.includes(product.id)}
            on:select={handleSelect} />
        </li>
      {/each}
    </ul>
  {:else}
    <div class="flex gap-4 justify-center px-6">
      {#if isFetched}
        <img src="/images/sad.svg" alt="sad face" class="w-6" />
        <p>No products found.</p>
      {:else}
        <img src="/images/search.svg" alt="search icon" class="w-6" />
        <p>
          Please enter your Vinted profile URL in the header to fetch your
          products.
        </p>
      {/if}
    </div>
  {/if}
</section>
