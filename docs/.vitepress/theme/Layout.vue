<template>
  <DefaultTheme.Layout>
    <template #home-hero-image>
      <VPImage
        :image="{ light: '/images/hero-light@2x.png', dark: '/images/hero@2x.png' }"
        alt="hero"
        width="866"
        height="566"
      />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme, { VPImage } from 'vitepress/theme'
</script>

<style scoped>

</style>
