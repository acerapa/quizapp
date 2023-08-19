<template>
    <div class="shadow">
        <div class="border fixed w-60 h-screen bg-[#B2E5C7] p-5">
            <div class="py-10 flex items-center">
                <img src="../assets/default.png" alt="profile" class="w-10 h-10 rounded-full inline mr-5">
                <span class="text-gray-600 font-bold">{{ username }}</span>
            </div>
            <div class="flex items-center hover:bg-[#5da783] rounded p-1">
                <RouterLink :to="{ name: 'dashboard' }" class="text-gray-600 hover:text-white w-[100%]">
                    <img src="../assets/dashboard.png" class="w-10 h-10 mr-5 invert inline cursor-pointer" alt="Test"> <span
                        class="cursor-pointer">Dashboard</span>
                </RouterLink>
            </div>
            <div class="flex items-center hover:bg-[#5da783] rounded p-1">
                <RouterLink :to="{ name: 'quiz-list' }" class="text-gray-600 hover:text-white w-[100%]">
                    <img src="../assets/test.png" class="w-10 h-10 mr-5 invert inline cursor-pointer" alt="Test"> <span
                        class="cursor-pointer">Quizes</span>
                </RouterLink>
            </div>
            <div class="flex items-center hover:bg-[#5da783] rounded p-1">
                <RouterLink :to="{ name: 'files' }" class="text-gray-600 hover:text-white w-[100%]">
                    <img src="../assets/folder.png" class="w-10 h-10 mr-4 invert inline cursor-pointer" alt="Test"> <span
                        class="cursor-pointer">Files</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const username = ref('Administrator')

onMounted(async () => {
    await authStore.getAuthUser();
    username.value = authStore.user.username
})

</script>