<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <RouterView />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "我的应用",
  meta: [{ name: "description", content: "我的神奇网站ffffff。" }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
});
useSeoMeta({
  title: "我的神奇网站",
  ogTitle: "我的神奇网站",
  description: "这是我的神奇网站，让我来告诉你关于它的一切。",
  ogDescription: "这是我的神奇网站，让我来告诉你关于它的一切。",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>
