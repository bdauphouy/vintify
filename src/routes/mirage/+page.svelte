<script lang="ts">
  import MirageHeader from "$lib/components/mirage/header.svelte";
  import Products from "$lib/components/mirage/products.svelte";
  import { createdProducts } from "$lib/stores/created-products";
</script>

<!-- <TopBanner /> -->

<MirageHeader isExtended={$createdProducts.length === 0} />

<Products />
