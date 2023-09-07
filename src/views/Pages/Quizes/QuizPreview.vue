<template>
    <div class="w-full h-screen overflow-y-auto bg-gradient-to-r from-[#d7f8ff] to-[#cdffcc] flex items-center">
        <div class="p-5 bg-white mx-auto min-w-[320px] w-full max-w-[1200px]">
            <p class="py-5">{{ quiz.title }}</p>
            <p class="py-5" v-html="quiz.instruction"></p>
            <hr>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quiz'

const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()

const quiz = ref({});

onMounted(async () => {
    if (!route.params.id) {
        router.back()
        return
    }
    
    await quizStore.getQuiz(route.params.id)
    quiz.value = quizStore.quiz
})

</script>