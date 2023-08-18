<template>
    <SideNav />

    <div class="ml-60 p-5">
        <h1 class="text-xl font-bold mt-11">Quizes</h1>
        <div class="max-w-4xl">
            <RouterLink :to="{ name: 'quiz-create' }">
                <button
                    class="mt-5 mr-10 border p-2 rounded cursor-pointer bg-[#01b9ff] text-white hover:bg-blue-300">Create
                    new quiz</button>
            </RouterLink>
            <input type="text" class="border h-10 p-4 rounded focus:outline outline-gray-200 outline-1 inline-block mr-auto"
                placeholder="Search" @input="search">
        </div>
        <div class="sm:overflow-x-auto px-5">
            <table class="w-full mt-5">
                <thead>
                    <tr class="font-bold text-base">
                        <td class="border-b-2 text-start px-2 py-2">Id</td>
                        <td class="border-b-2 text-start px-2 py-2">Title</td>
                        <td class="border-b-2 text-start px-2 py-2">Instruction</td>
                        <td class="border-b-2 text-start px-2 py-2">Status</td>
                        <td class="border-b-2 text-start px-2 py-2">Shuffle</td>
                        <td class="border-b-2 text-start px-2 py-2">Participants</td>
                        <td class="border-b-2 text-start px-2 py-2">Items</td>
                        <td class="border-b-2 text-start px-2 py-2">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(quiz, index) in quizes" :key="index" class="text-sm">
                        <td class="border-b text-start px-2 py-2">{{ quiz.id }}</td>
                        <td class="border-b text-start px-2 py-2">{{ quiz.title }}</td>
                        <td class="border-b text-start px-2 py-2"><p v-html="quiz.instruction.replaceAll('<br>', ' ')"></p></td>
                        <td class="border-b text-start px-2 py-2">{{ quiz.quizsetting_set[0].is_active ? 'Activated' : 'Deactivated' }}</td>
                        <td class="border-b text-start px-2 py-2">{{ quiz.quizsetting_set[0].is_shuffle ? 'Shuffled' : 'Ordered' }}</td>
                        <td class="border-b text-start px-2 py-2">{{ quiz.quizsetting_set[0].participants.length }}</td>
                        <td class="border-b text-start px-2 py-2">{{ quiz.question_set.length }}</td>
                        <td class="border-b text-start px-2 py-2">
                            <RouterLink :to="{ name: 'quiz-edit', params: { id: quiz.id } }">
                                <button class="bg-blue-500 p-1 rounded shadow">
                                    <img class="invert" src="../../../assets/view.png" alt="">
                                </button>
                            </RouterLink>
                        </td>
                    </tr>
                    <tr v-if="!quizes.length">
                        <td colspan="6" class="text-center px-2 py-2">No Quizes!</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import SideNav from '@/components/SideNav.vue';
import { useQuizStore } from '../../../stores/quiz';


/** ========================================================================
 * COFIGURATION AND VARIABLE DECLARATION
 ===========================================================================*/

const quizStore = useQuizStore();
const quizes = ref([]);

/** ========================================================================
 * METHODS
 ===========================================================================*/

onMounted( async() => {
    await quizStore.getQuizes();
    quizes.value = quizStore.quizes;
});


</script>