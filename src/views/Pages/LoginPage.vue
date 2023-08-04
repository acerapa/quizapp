<template>
    <div class="w-[100%] h-screen bg-gradient-to-r from-[#d7f8ff] to-[#cdffcc] flex items-center">
        <div class="m-auto w-96 h-auto text-center shadow rounded-lg bg-white px-10 py-20">
            <h1 class="text-xl font-normal">Login</h1>
            <form class="">
                <input type="text" placeholder="Username" class="border p-2 rounded-md block w-[100%] my-5 focus:outline outline-gray-400 outline-1" />
                <input type="password" placeholder="Password" class="border p-2 rounded-md block w-[100%] my-5 focus:outline outline-gray-400 outline-1" />
                <button class="bg-[#01b9ff] hover:bg-blue-300 text-white py-2 px-4 rounded-md">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup></script>