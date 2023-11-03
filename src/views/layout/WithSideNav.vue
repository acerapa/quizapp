<script setup>
import { RouterView, useRoute } from 'vue-router';
import SideNav from '@/components/SideNav.vue';
import '../../utils/event'
</script>

<template>
  <SideNav />
  <div class="mt-24 px-3 sm:mt-0 sm:p-3 md:p-5 md:ml-60 sm:ml-[5.5rem]">
      <RouterView />
  </div>
</template>