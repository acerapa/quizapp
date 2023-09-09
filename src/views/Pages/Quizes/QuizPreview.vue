<template>
    <div class="w-full h-screen overflow-y-auto bg-gradient-to-r from-[#d5ecf1] to-[#dcfddb] grid items-center px-4">
        <div class="p-5 my-5 rounded mx-auto bg-slate-50 min-w-[320px] w-full max-w-[1200px]">
            <strong class="py-5 text-lg">{{ quiz.title }}</strong>
            <b class="py-5" v-html="quiz.instruction"></b>
            <hr class="my-5">

            <div class="questions">
                <div class="p-5 bg-white mx-2 my-4 rounded-md shadow-sm" v-for="(question) in questions" :key="question.key">
                    <strong>{{ question.description }}</strong>
                    <div class="p-2" v-if="question.type == ENUMERATION">
                        <form action="" class="flex items-center space-x-2">
                            <input type="text" class="border p-2 rounded-md block w-[100%] focus:outline outline-gray-200 outline-1">
                            <input type="submit" class="bg-blue-500 text-white px-2 py-2 rounded cursor-pointer"
                                        value="&plus; Add">
                        </form>

                        <div class="answer-pool">
                            <code>TODO: need to decide how to answer in enumeration type questions</code>
                        </div>
                    </div>

                    <div class="p-2" v-if="question.type == SELECT">
                        <div class="flex space-x-2 py-2" v-for="(choice, index) of JSON.parse(question.choices)" :key="index">
                            <input type="checkbox" name="answer" id="" :value="index">
                            <label for="" class="flex-1">{{ choice }}</label>
                        </div>
                    </div>

                    <div class="p-2" v-if="question.type == MULTIPLE_CHOICE">
                        <div class="flex space-x-2 py-2" v-for="(choice, index) of JSON.parse(question.choices)" :key="index">
                            <input type="radio" name="answer" id="" :value="index">
                            <label for="" class="flex-1">{{ choice }}</label>
                        </div>
                    </div>

                    <div class="p-2" v-if="question.type == EXPLANATION">
                        <textarea placeholder="Answer here" name="" id="" cols="30" rows="4" class="box-border p-4 w-full border rounded focus:outline outline-gray-200 outline-1"></textarea>
                    </div>

                    <div class="p-2" v-if="question.type == TRUE_OR_FALSE">
                        <div class="flex space-x-2">
                            <input type="radio" name="answer" id="" disabled>
                            <label for="" class="flex-1">True</label>
                        </div>
                        <div class="flex space-x-2">
                            <input type="radio" name="answer" id="" disabled>
                            <label for="" class="flex-1">False</label>
                        </div>
                    </div>
                </div>
            </div>

            <RouterLink :to="{ name: 'quiz-edit', params: { id: quiz.id } }">
                <button class="block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-300 mx-auto">&lt; Back</button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quiz';
import { TRUE_OR_FALSE, MULTIPLE_CHOICE, ENUMERATION, EXPLANATION, SELECT } from '../../../utils/const'

const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()

const quiz = ref({});
const questions = ref([])

onMounted(async () => {
    if (!route.params.id) {
        router.back()
        return
    }
    
    await quizStore.getQuiz(route.params.id)
    quiz.value = quizStore.quiz
    questions.value = quiz.value.question_set
})

</script>