<script setup>
</script>

<template>
  <div id="about" class="mx-8 border border-black rounded-lg my-10 md:my-20">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="flex p-10">
        <div class="mb-auto mt-auto max-w-lg max-h-[400px]">
          <h2 class="text-2xl md:text-5xl uppercase text-right">
            About Helena
          </h2>
          <p class="text-lg text-right mt-5">
            Originally from southern Brazil, now based in Paris, my specialty is
            creating delicate fine line tattoos that allow clients to express
            themselves and commemorate meaningful memories. What I love most
            about my job is connecting with diverse individuals and being a part
            of their significant moments.
          </p>
        </div>
      </div>
      <div class="max-h-[200px] md:max-h-[600px]">
        <img
          class="w-screen h-full object-cover object-center rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
          :src="useAssets('about.jpg')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>