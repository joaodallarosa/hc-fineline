<template>
  <div class="container mx-auto px-6 py-6 text-center h-screen">
    <div class="h-full border-2 border-black">
      <img class="max-h-48 block ml-auto mr-auto mb-10 mt-10" src="/images/logo.png" />
      <div>
        <a href="www.instagram.com/carvalho_helena">Instagram</a>
      </div>
      <div>
        <a href="www.instagram.com/carvalho_helena">Whatsapp</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
if (process.client) {
  onMounted(() => {
    console.log(window.innerWidth, window.innerHeight);
  });
}

const description = ref('HC Tattoo - Tag')
useHead({
  meta: [
    { name: 'description', content: description }
  ],
})
</script>
