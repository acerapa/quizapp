<template>
    <SideNav />
    <div class="ml-60 p-5">
        <h1 class="text-xl font-bold mt-11">Create Quiz</h1>

        <div class="mt-5 w-max">
            <img src="../../../assets/setting.png" class="w-5 block ml-auto cursor-pointer" alt="">
            <label for="Instuction">Quiz Instruction</label><br>
            <QuillEditor @update:content="updateForm" theme="snow" :options="{ placeholder: 'Quiz Instruction' }"/>
            <!-- <textarea name="instruction" id="" cols="60" rows="2" class="border mt-2 rounded p-2" placeholder="Quiz Instruction"></textarea> -->
        </div>
        <div class="mt-5">
            <button class="bg-[#01b9ff] hover:bg-blue-300 text-white py-2 px-4 rounded-md">Add Questions</button>
            <div class="mt-4 border w-max p-5">
                Table here
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SideNav from '@/components/SideNav.vue';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const quizForm = ref({
    content: ''
});

const updateForm = (content) => {
    console.log(JSON.stringify(content));
}
</script>