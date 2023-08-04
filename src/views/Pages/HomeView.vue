<template>
  <header>
    <div class="w-[100%] bg-gradient-to-r from-[#B9F0FC] to-[#8FEB8D] h-20 shadow-md flex items-center">
      <img src="../../assets/logo.png" alt="logo" class="block ml-3 w-16">
      <h1 class="text-xl font-extrabold ml-3 text-green-500">Quiz App</h1>
      <h2 class="text-lg text-green-500 block ml-auto mr-3 cursor-pointer hover:text-[#00b9ff]">Login</h2>
    </div>
  </header>

  <main class="w-[100%] h-calc-20 bg-gradient-to-l from-[#d7f8ff] to-[#cdffcc] flex items-center">
    <div class="block mx-auto w-[50%] text-center">
      <h1 class="text-6xl font-bold text-[#005A60]">Create Quizzes Online</h1>
      <h1 class="text-6xl font-bold text-[#005A60]">For your Student,</h1>
      <h1 class="text-6xl font-bold text-[#005A60]">Participants</h1>
      <p class="text-lg font-normal text-[#005A60] mt-2">Provides a handy quizzess online</p>

      <RouterLink to="/login">
        <button class="rounded-full bg-[#01b9ff] hover:bg-blue-300 text-white px-10 py-2 mt-5">Get Started</button>
      </RouterLink>
    </div>
  </main>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
</script>