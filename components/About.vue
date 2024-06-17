<template>
  <section
    id="about"
    class="container mx-auto flex flex-col items-center justify-center my-10 md:my-20"
  >
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="relative md:order-2 min-h-[300px] md:min-h-[500px]">
        <img
          class="w-full h-full object-cover object-center rounded-lg absolute top-0 left-0"
          :src="useAssets('helena/helena.jpg')"
          alt=""
        />
      </div>
      <div class="flex p-10 md:order-1">
        <div class="mb-auto mt-auto text-center">
          <h2 class="text-2xl md:text-5xl uppercase">
            {{ $t("about-title") }}
          </h2>
          <p class="text-lg mt-5 text-justify">
            {{ $t("about-description") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>