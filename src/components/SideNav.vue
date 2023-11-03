<template>
    <div class="shadow hidden sm:block">
        <div class="border fixed md:w-60 h-screen bg-[#B2E5C7] p-5">
            <div class="py-10 flex items-center max-md:justify-center">
                <img src="../assets/default.png" alt="profile" class="w-10 h-10 rounded-full inline md:mr-5">
                <span class="text-gray-600 font-bold md:inline hidden">{{ username }}</span>
            </div>
            <div :class="['flex items-center hover:bg-[#5da783] rounded p-1 mt-1', {'bg-[#5da783]': nav.isActive}]" v-for="(nav, index) in navigations" :key="index">
                <RouterLink :to="{ name: nav.name }" :class="['text-gray-600 hover:text-white w-[100%]', {'text-white': nav.isActive}]">
                    <img :src="nav.icon" class="w-10 h-10 md:mr-5 invert inline cursor-pointer" alt="Test"> <span
                        class="cursor-pointer md:inline hidden">{{ nav.text }}</span>
                </RouterLink>
            </div>
        </div>
    </div>
    <div class="fixed bg-white top-0 left-0 w-full shadow-sm px-3 py-2 sm:hidden z-20 h-14 flex  items-center justify-between">
        <button type="button">
            <img src="../assets/menu.png" class="w-9" alt="menu">
        </button>
        <button type="button">
            <img src="../assets/notification.png" class="w-6" alt="notification-bell">
        </button>
    </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { onMounted, ref } from 'vue';
import { StateKeys, getState } from '@/utils/helpers';
import { on } from '@/utils/event';

// icons
import dashboard from '@/assets/dashboard.png'
import test from '@/assets/test.png'
import folder from '@/assets/folder.png'

const authStore = useAuthStore();
const username = ref('')
const route = useRoute();

const navigations = ref([
    {
        name: 'dashboard',
        text: 'Dashboard',
        icon: dashboard,
        names: [
            'dashboard'
        ],
        isActive: false
    },
    {
        name: 'quiz-list',
        text: 'Quizes',
        icon: test,
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
        icon: folder,
        names: [
            'files'
        ],
        isActive: false
    }
])

on('set-nav', function() {
    navigations.value.forEach(nav => {
        if (nav.names.includes(getState(StateKeys.ACTIVE_PAGE))) {
            nav.isActive = true
        } else {
            nav.isActive = false
        }
    })
})

onMounted(async () => {
    await authStore.getAuthUser();
    username.value = authStore.user.username

    navigations.value.forEach(nav => {
        if (nav.names.includes(getState(StateKeys.ACTIVE_PAGE))) {
            nav.isActive = true
        } else {
            nav.isActive = false
        }
    })
})

</script>