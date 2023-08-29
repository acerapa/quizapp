<template>
    <div class="shadow">
        <div class="border fixed w-60 h-screen bg-[#B2E5C7] p-5">
            <div class="py-10 flex items-center">
                <img src="../assets/default.png" alt="profile" class="w-10 h-10 rounded-full inline mr-5">
                <span class="text-gray-600 font-bold">{{ username }}</span>
            </div>
            <div :class="['flex items-center hover:bg-[#5da783] rounded p-1 mt-1', {'bg-[#5da783]': nav.isActive}]" v-for="(nav, index) in navigations" :key="index">
                <RouterLink :to="{ name: nav.name }" :class="['text-gray-600 hover:text-white w-[100%]', {'text-white': nav.isActive}]">
                    <img :src="`src/assets/${nav.icon}`" class="w-10 h-10 mr-5 invert inline cursor-pointer" alt="Test"> <span
                        class="cursor-pointer">{{ nav.text }}</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const username = ref('')
const route = useRoute();

const navigations = ref([
    {
        name: 'dashboard',
        text: 'Dashboard',
        icon: 'dashboard.png',
        names: [
            'dashboard'
        ],
        isActive: false
    },
    {
        name: 'quiz-list',
        text: 'Quizes',
        icon: 'test.png',
        names: [
            'quiz-list',
            'quiz-create',
            'quiz-edit'
        ],
        isActive: false
    },
    {
        name: 'files',
        text: 'Files',
        icon: 'folder.png',
        names: [
            'files'
        ],
        isActive: false
    }
])

onMounted(async () => {
    await authStore.getAuthUser();
    username.value = authStore.user.username

    navigations.value.forEach(nav => {
        if (nav.names.includes(route.name)) {
            nav.isActive = true
        } else {
            nav.isActive = false
        }
    })
})

</script>