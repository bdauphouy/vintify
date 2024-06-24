<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/components/button.svelte";
  import Input from "$lib/components/input.svelte";
  import {
    filedrop,
    type Files as FileDropFiles,
    type FileDropOptions,
  } from "filedrop-svelte";
  import Images from "./images.svelte";
  import { createdProducts } from "$lib/stores/created-products";

  export let isExtended = true;
  let productTitle = "";
  let productPrice = "";
  let inputError = "";

  const options: FileDropOptions = {
    windowDrop: false,
    accept: "image/*",
  };
  let files: FileDropFiles;
  let images: HTMLImageElement[] = [];
  let isDragOver = false;

  const handleFileDrop = (e: CustomEvent<{ files: FileDropFiles }>) => {
    inputError = "";

    files = e.detail.files;

    if (files.rejected.length) {
      inputError = "A problem occured while uploading the images.";
      return;
    }

    for (const file of files.accepted) {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        images = [...images, image];
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileDragEnter = () => (isDragOver = true);

  const handleFileDragLeave = () => (isDragOver = false);

  const handleImageRemove = (e: CustomEvent<{ index: number }>) => {
    const { index } = e.detail;

    images = images.filter((_, i) => i !== index);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    createdProducts.update((products) => [
      ...products,
      {
        id: Math.random().toString(36).substring(2, 9),
        images,
        title: productTitle,
        price: productPrice,
      },
    ]);

    const response = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: images.map((image) => image.src),
      }),
    });

    const data = await response.json();

    console.log(data);
  };
</script>

<header
  class="bg-gray-100 pt-10 transition-[padding] duration-300 {isExtended
    ? 'pb-40'
    : 'pb-20'} flex flex-col items-center px-6 md:px-20"
>
  <div class="w-full flex items-start sm:items-center justify-between">
    <div class="flex gap-4 flex-col sm:flex-row">
      <a href="/">
        <img class="w-20" src="/images/vintify.svg" alt="vintify logo" />
      </a>
      <span
        >Made by <a
          href="https://x.com/bdauphouy"
          class="text-blue-400 hover:text-blue-400/80 transition-colors duration-300 underline underline-offset-4"
          >@badolebado</a
        ></span
      >
    </div>
    <a
      href="https://github.com/bdauphouy/vintify"
      class="items-center flex gap-2 underline underline-offset-4 hover:text-black/60 transition-colors duration-300"
      ><img class="w-4" src="/images/github.svg" alt="github logo" /> Github</a
    >
  </div>

  <h1
    class="text-4xl font-bold transition-[margin] duration-300 leading-snug {isExtended
      ? 'mt-40'
      : 'mt-10'}"
  >
    Create your
    <span class="bg-blue-400 text-white px-2 md:px-3 md:py-1 rounded-lg"
      >Shopify</span
    >
    products easily.
  </h1>

  <form class="md:max-w-xl w-full mt-20" on:submit={handleSubmit}>
    <div class="grid gap-4 grid-cols-4">
      <div class="col-span-4 flex flex-col gap-4">
        <div
          use:filedrop={options}
          on:filedrop={handleFileDrop}
          on:filedragenter={handleFileDragEnter}
          on:filedragleave={handleFileDragLeave}
          class="{isDragOver
            ? 'bg-blue-400/10'
            : ''} hover:bg-blue-400/10 transition-colors duration-300 cursor-pointer border-2 border-dashed border-blue-400 h-40 rounded flex justify-center items-center text-blue-400"
        >
          Drop your images here.
        </div>
        <Images on:remove={handleImageRemove} {images} />
      </div>
      <div class="col-span-3">
        <Input
          label="Title"
          placeholder="Ex. Aligatueur ex - 003/016 - Deck"
          bind:value={productTitle}
        />
      </div>
      <div>
        <Input type="number" label="Price" bind:value={productPrice} />
      </div>
      <div class="col-span-4 flex flex-col">
        <Button>Add product</Button>
      </div>
    </div>
    {#if inputError}
      <p class="mt-2 text-red-500">{inputError}</p>
    {/if}
  </form>
</header>
