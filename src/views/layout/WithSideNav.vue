<script setup>
import { RouterView, useRoute } from 'vue-router';
import SideNav from '@/components/SideNav.vue';
import '../../utils/event'
</script>

<template>
  <SideNav />
  <div class="md:ml-60 ml-[5.5rem] p-5">
      <RouterView />
  </div>
</template>