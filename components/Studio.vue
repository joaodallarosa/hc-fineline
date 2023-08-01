<script setup>
</script>

<template>
  <div id="studio" class="mx-8 border border-black rounded-lg my-10 md:my-20">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="max-h-[200px] md:max-h-[600px]">
        <img
          class="w-screen h-full object-cover object-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          :src="useAssets('studio.png')"
          alt=""
        />
      </div>
      <div class="flex p-10">
        <div class="mb-auto mt-auto max-w-lg max-h-[400px]">
          <h2 class="text-left text-2xl md:text-5xl uppercase">
            {{ $t("studio-title") }}
          </h2>
          <p class="text-left mt-5 text-lg">
            <a
              href="https://goo.gl/maps/KqjacKx7tV7oE29s5"
              target="_blank"
              class="underline"
              >{{ $t("studio-address") }}</a
            >
          </p>
          <p class="text-left mt-5 text-lg">
            {{ $t("studio-description") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>