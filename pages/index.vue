<template>
  <div class="text-center font-sans font-thin">
    <Menu />

    <Tattoos />

    <!-- <tattoos-reorder /> -->

    <About />

    <Studio />

    <Testimonials />
  </div>
  <img
    height="1"
    width="1"
    style="display: none"
    src="https://www.facebook.com/tr?id=1306111036657039&ev=PageView&noscript=1"
  />
</template>

<style>
body {
  background: #f2e8d6;
  font-family: Geosans;
}

.masonry-item {
  min-height: 100px;
}

.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}
</style>
