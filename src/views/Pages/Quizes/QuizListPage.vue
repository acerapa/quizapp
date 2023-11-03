<template>
    <AlertComponent class="absolute top-14 right-2 z-30" :code="alertConfig.code" :message="alertConfig.message"
        :fade-out-time="alertConfig.fadeOutTime" ref="alertQuiz" />
    <div>
        <ModalComponent position="top-center" ref="modalConfirm">
            <div class="bg-white p-5 rounded-md w-full mt-5 shadow-md relative">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold">Confirmation</h1>
                    <img src="../../../assets/close.png" class="w-5 h-5 cursor-pointer" @click="modalConfirm.closeModal()"
                        alt="" srcset="">
                </div>
                <hr class="mt-4">
                <div class="mt-4">
                    <p class="mt-5 font-semibold">Are you sure you want to delete this quiz?</p>

                    <div class="block text-right mt-10">
                        <button class="bg-red-500 text-white py-2 px-5 rounded-md ml-auto m-1 hover:bg-red-300"
                            @click="confirmationModalRes(false)">No</button>
                        <button class="bg-green-500 text-white py-2 px-5 rounded-md ml-auto m-1 hover:bg-green-300"
                            @click="confirmationModalRes(true)">Yes</button>
                    </div>
                </div>
            </div>
        </ModalComponent>
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
                        <td class="border-b text-start px-2 py-2 flex gap-1 flex-wrap">
                            <RouterLink :to="{ name: 'quiz-edit', params: { id: quiz.id } }">
                                <button class="bg-blue-500 p-1 rounded shadow">
                                    <img class="invert w-5 h-5" src="../../../assets/view.png" alt="">
                                </button>
                            </RouterLink>
                            <button class="bg-red-500 p-1 rounded shadow" @click="confirmDeleteQuiz(quiz.id)">
                                <img class="invert w-5 h-5" src="../../../assets/trash.png" alt="">
                            </button>
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
import { useQuizStore } from '../../../stores/quiz';

// component
import ModalComponent from '@/components/ModalComponent.vue' 
import AlertComponent from '@/components/AlertComponent.vue' 


/** ========================================================================
 * COFIGURATION AND VARIABLE DECLARATION
 ===========================================================================*/

const quizStore = useQuizStore();
const quizes = ref([]);

const modalConfirm = ref(null);
const toDeleteQuiz = ref(null);
const alertQuiz = ref(null);

const alertConfig = ref({
    code: 'success',
    message: '',
    fadeOutTime: 3000
});

/** ========================================================================
 * METHODS
 ===========================================================================*/

onMounted( async() => {
    await quizStore.getQuizes();
    quizes.value = quizStore.quizes;
});

const confirmationModalRes = async (response) => {
    modalConfirm.value.closeModal();

    if (response) {
        alertConfig.value.code = 'success'
        alertConfig.value.message = 'Quiz deleted successfully!'
        alertConfig.value.fadeOutTime = 3000

        await quizStore.deleteQuiz(toDeleteQuiz.value);
        window.scrollTo(0, 0);
        alertQuiz.value.showAlert()


        await quizStore.getQuizes();
        quizes.value = quizStore.quizes;
    }
    
}

const confirmDeleteQuiz = (quiz_id) => {
    toDeleteQuiz.value = quiz_id;
    modalConfirm.value.showModal();
}

</script>