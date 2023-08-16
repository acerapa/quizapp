<template>
    <SideNav />

    <div class="ml-60 p-5">
        <h1 class="text-xl font-bold mt-11">Quizes</h1>
        <div class="max-w-4xl">
            <RouterLink :to="{ name: 'quiz-create' }">
                <button class="mt-5 mr-10 border p-2 rounded cursor-pointer bg-[#01b9ff] text-white hover:bg-blue-300">Create new quiz</button>
            </RouterLink>
            <input type="text" class="border h-10 p-4 rounded focus:outline outline-gray-200 outline-1 inline-block mr-auto" placeholder="Search" @input="search">
        </div>
        <div class="sm:overflow-x-auto">
            <div class="grid grid-cols-6 text-center mt-5 min-w-[600px]">
                <div class="border p-2">Id</div>
                <div class="border p-2">Title</div>
                <div class="border p-2">Description</div>
                <div class="border p-2">Status</div>
                <div class="border p-2">Participants</div>
                <div class="border p-2">Actions</div>
            </div>
    
            <div class="grid grid-cols-6 text-center min-w-[600px]" v-for="quiz in quizes" :key="quiz.id">
                <div class="border p-2 grid items-center justify-center">
                    <span>
                        {{ quiz.id }}
                    </span>
                </div>
                <div class="border grid items-center justify-center">
                    <span>
                        {{ quiz.title }}
                    </span>
                </div>
                <div class="border p-2 grid items-center justify-center">
                    <span>
                        {{ quiz.description }}
                    </span>
                </div>
                <div class="border p-2 grid items-center justify-center">
                    <span>
                        {{ quiz.status }}
                    </span>
                </div>
                <div class="border p-2 grid items-center justify-center">
                    <span>
                        {{ quiz.participants }}
                    </span>
                </div>
                <div class="border p-2 grid items-center justify-center">Actions</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import SideNav from '@/components/SideNav.vue';

    const quizes = ref([
        {
            id: 1,
            title: 'Quiz 1',
            description: 'This is the quiz 1 This is the quiz 1 This is the quiz 1 This is the quiz 1',
            status: 0,
            participants: 0
        },
        {
            id: 2,
            title: 'Quiz 2',
            description: 'This is the quiz 2',
            status: 1,
            participants: 0
        },
        {
            id: 3,
            title: 'Quiz 3',
            description: 'This is the quiz 3',
            status: 2,
            participants: 0
        },
        {
            id: 2,
            title: 'Quiz 2',
            description: 'This is the quiz 2',
            status: 1,
            participants: 0
        },
        {
            id: 2,
            title: 'Quiz 2',
            description: 'This is the quiz 2',
            status: 1,
            participants: 0
        },
        {
            id: 2,
            title: 'Quiz 2',
            description: 'This is the quiz 2',
            status: 1,
            participants: 0
        },
        {
            id: 2,
            title: 'Quiz 2',
            description: 'This is the quiz 2',
            status: 1,
            participants: 0
        },
        {
            id: 2,
            title: 'Quiz 2',
            description: 'This is the quiz 2',
            status: 1,
            participants: 0
        },
    ]);

    const quizesCopy = ref([...quizes.value]);

    const search = (e) => {
        const value = e.target.value;
        if (value === '') {
            quizes.value = [...quizesCopy.value];
        } else {
            quizes.value = quizesCopy.value.filter(quiz => quiz.title.toLowerCase().includes(value.toLowerCase()));
        }
    }
</script>