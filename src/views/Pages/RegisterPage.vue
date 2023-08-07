<template>
    <div class="w-[100%] h-screen bg-gradient-to-r from-[#d7f8ff] to-[#cdffcc] flex items-center">
        <div class="m-auto w-96 h-auto text-center shadow rounded-lg bg-white px-10 py-16">
            <img src="../../assets/logo.png" alt="logo" class="w-28 inline-block mb-5">
            <h1 class="text-xl font-normal">Register</h1>
            <form class="">
                <input type="text" placeholder="Username" class="border p-2 rounded-md block w-[100%] my-5 focus:outline outline-gray-400 outline-1" />
                <input type="password" placeholder="Password" class="border p-2 rounded-md block w-[100%] my-5 focus:outline outline-gray-400 outline-1" />
                <button class="bg-[#01b9ff] hover:bg-blue-300 text-white py-2 px-4 rounded-md">Register</button>
            </form>
            <p class="mt-4">Already have an account? <RouterLink :to="{ name: 'login' }">Click here!</RouterLink></p>
        </div>
    </div>
</template>

<script setup></script>
