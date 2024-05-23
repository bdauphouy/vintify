<script lang="ts">
  import { slide } from "svelte/transition";
  import Button from "./button.svelte";
  import { selectedProducts } from "$lib/stores/selected-products";
  import type { ExportFormat, Product } from "$lib/types";
  import { downloadCSV, downloadJSON, generateShopifyCSV } from "$lib/utils";
  import Radio from "./radio.svelte";

  export let products: Product[] = [];
  export let exportFormat: ExportFormat = "csv-for-shopify";

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;

    exportFormat = target.value as ExportFormat;
  };

  const handleClick = () => {
    const productsToExport = products.filter((product) =>
      $selectedProducts.includes(product.id),
    );

    if (exportFormat === "json") {
      const json = JSON.stringify(productsToExport, null, 2);

      downloadJSON(json);

      return;
    }

    const csv = generateShopifyCSV(productsToExport);

    downloadCSV(csv);
  };
</script>

<div
  transition:slide={{ duration: 300, delay: 300 }}
  class="fixed h-36 flex justify-between items-center w-full bottom-0 bg-blue-400 text-white px-8"
>
  <div class="flex flex-col gap-4">
    <h3 class="font-medium">Select the export format.</h3>
    <ul class="flex gap-4 items-center">
      <li>
        <Radio
          name="export-format"
          value="csv-for-shopify"
          on:input={handleInput}
          checked={exportFormat === "csv-for-shopify"}
        >
          <div class="flex gap-2">
            CSV for
            <img class="w-20" src="/images/shopify.png" alt="shopify logo" />
          </div>
        </Radio>
      </li>
      <li>
        <Radio
          name="export-format"
          value="json"
          on:input={handleInput}
          checked={exportFormat === "json"}
        >
          <div class="flex gap-2">JSON</div>
        </Radio>
      </li>
    </ul>
  </div>
  <Button variant="secondary" on:click={handleClick}>
    Export {$selectedProducts.length} elements
  </Button>
</div>
