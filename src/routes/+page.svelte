<script lang="ts">
  import ExportBanner from "$lib/components/export-banner.svelte";
  import Header from "$lib/components/header.svelte";
  import Loader from "$lib/components/loader.svelte";
  import Products from "$lib/components/products.svelte";
  import { selectedProducts } from "$lib/stores/selected-products";
  import type { Product } from "$lib/types";
  import { getProducts } from "$lib/utils";
  import TopBanner from "$lib/components/top-banner.svelte";

  let products: Product[] = [];
  let isFetching = false;
  let isFetched = false;

  const handleSubmit = async ({
    detail,
  }: CustomEvent<{ profileId: string }>) => {
    const { profileId } = detail;

    products = [];
    isFetching = true;

    try {
      const response = await getProducts(profileId);

      if (!response) return;

      products = response;
    } catch (error) {
      console.error(error);
    } finally {
      isFetching = false;
      isFetched = true;
    }
  };
</script>

<!-- <TopBanner /> -->

<Header isExtended={products.length === 0} on:fetch={handleSubmit} />

{#if isFetching}
  <Loader />
{:else}
  <Products {isFetched} {products} />
{/if}

{#if $selectedProducts.length > 0}
  <ExportBanner {products} />
{/if}
