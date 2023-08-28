<template>
  <SideNav />
  <div class="ml-60 p-5 overflow-auto h-screen">
      <h1 class="text-xl font-bold mt-11">Dashboard</h1>
      <div class="flex gap-5 mt-11">
        <div class="p-5 border text-center w-60"><b>{{ quizStore.quizes.length }}</b> Quizes</div>
        <div class="p-5 border text-center w-60">Participated Quizes</div>
      </div>
      <div class="mt-11 p-5 border w-max">
        Recently created quiz/es
      </div>

      <div class="mt-11 p-5 border w-max">
        Recently Participated quiz/es
      </div>
  </div>
</template>

<script setup>
  import SideNav from '@/components/SideNav.vue';
  import { useQuizStore } from '@/stores/quiz'

  const quizStore = useQuizStore()

</script>
