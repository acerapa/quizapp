<template>
  <SideNav />
  <div class="ml-60 p-5 overflow-auto h-screen">
      <h1 class="text-xl font-bold mt-11">Dashboard</h1>
      <div class="flex gap-5 mt-11">
        <div class="p-5 border text-center w-60">Quizes</div>
        <div class="p-5 border text-center w-60">Participated</div>
      </div>
      <div class="mt-11 p-5 border w-max">
        table table table
      </div>
  </div>
</template>

<script setup>
  import SideNav from '@/components/SideNav.vue';
</script>