<script setup>
</script>

<template>
  <div id="about" class="mx-8 border border-black rounded-lg my-10 md:my-20">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="flex p-10">
        <div class="mb-auto mt-auto max-w-lg max-h-[400px]">
          <h2 class="text-2xl md:text-5xl uppercase text-right">
            {{$t('about-title')}}
          </h2>
          <p class="text-lg text-right mt-5">
            {{$t('about-description')}}
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