<template>
    <SideNav />
    <AlertComponent class="absolute top-2 right-2 z-40" :code="alertConfig.code" :message="alertConfig.message"
        :fade-out-time="alertConfig.fadeOutTime" ref="alertQuiz" @fade-out="onAlertClosed" />
    <div class="ml-60 p-5">
        <ModalComponent position="top-center" ref="modalSetting">
            <div class="bg-white p-5 rounded-md w-full mt-5 shadow-md relative">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold">Quiz Settings</h1>
                    <img src="../../../assets/close.png" class="w-5 h-5 cursor-pointer" @click="closeQuizSettingModal"
                        alt="" srcset="">
                </div>
                <div class="mt-5">
                    <div class="py-2">
                        <label for="is_active">Is Active</label>
                        <input type="checkbox" v-model="quizSettingForm.is_active" class="ml-2">
                    </div>
                    <div class="py-2">
                        <label for="is_shuffle">Is Shuffle</label>
                        <input type="checkbox" v-model="quizSettingForm.is_shuffle" class="ml-2">
                    </div>
                    <div class="py-2">
                        <label for="participants_limit">Participants Limit</label>
                        <input type="number" v-model="quizSettingForm.participants_limit"
                            class="ml-2 w-20 border focus:outline outline-1 outline-gray-200  rounded p-2">
                    </div>
                    <div class="py-2">
                        <label for="start_date">Start Date</label>
                        <input type="date" v-model="quizSettingForm.start_date"
                            class="ml-2 w-40 border focus:outline outline-1 outline-gray-200  rounded p-2">
                    </div>
                    <div class="py-2">
                        <label for="end_date">End Date</label>
                        <input type="date" v-model="quizSettingForm.end_date"
                            class="ml-2 w-40 border focus:outline outline-1 outline-gray-200  rounded p-2">
                    </div>
                </div>
                <div class="block text-right mt-10">
                    <button class="bg-red-500 text-white py-2 px-5 rounded-md ml-auto m-1 hover:bg-red-300"
                        @click="closeQuizSettingModal">Cancel</button>
                    <button class="bg-green-500 text-white py-2 px-5 rounded-md ml-auto m-1 hover:bg-green-300"
                        @click="saveQuizSetting">Save</button>
                </div>
            </div>
        </ModalComponent>
        <ModalComponent position="top-center" ref="modalQuestionForm">
            <div class="bg-white p-5 rounded-md w-full mt-5 shadow-md relative">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-bold">Add Question</h1>
                    <img src="../../../assets/close.png" class="w-5 h-5 cursor-pointer" @click="closeQuestionFormModal"
                        alt="" srcset="">
                </div>
                <div class="mt-5">
                    <div class="py-2">
                        <label for="">Type</label>
                        <div class="text-start">
                            <select name="question" v-model="questionForm.type" id=""
                                :class="[{ 'border-red-600': errors.type && errors.type.length }, 'border', 'py-2', 'px-4', 'rounded-md', 'block w-[100%]', 'mt-2', 'focus:outline', 'outline-gray-200', ' outline-1']">
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="enumeration">Enumeration</option>
                                <option value="explanation">Explanation</option>
                                <option value="select">Select</option>
                                <option value="true-or-false">True or False</option>
                            </select>
                            <small
                                :class="['text-red-600', { 'opacity-100': errors.type && errors.type.length, 'opacity-0': !(errors.type && errors.type.length) },]">*
                                {{
                                    errors.type && errors.type.length ? errors.type[0] : '' }}</small>
                        </div>
                    </div>

                    <div class="py-2">
                        <label for="">Question</label>
                        <div class="text-start">
                            <input type="text" placeholder="Question" v-model="questionForm.description"
                                :class="[{ 'border-red-600': errors.description && errors.description.length }, 'border', 'p-2', 'rounded-md', 'block w-[100%]', 'mt-2', 'focus:outline', 'outline-gray-200', ' outline-1']" />
                            <small
                                :class="['text-red-600', { 'opacity-100': errors.description && errors.description.length, 'opacity-0': !(errors.description && errors.description.length) },]">*
                                {{
                                    errors.description && errors.description.length ? errors.description[0] : '' }}</small>
                        </div>
                    </div>

                    <div class="py-2" v-if="questionForm.type == 'multiple-choice'">
                        <button class="bg-blue-500 text-white px-2 py-1 rounded block ml-auto" @click="addNewChoices"><span
                                class="font-semibold text-lg">&plus;</span> Add</button>
                        <div v-for="(index, choice) in choices">
                            <div class="grid grid-cols-12 mt-2 items-center gap-2"
                                :key="choice">
                                <label for="" class="col-span-1">{{ choice }}.</label>
                                <input type="text" v-model="choices[choice]"
                                    :class="['border p-2 rounded-md block mt-2 w-full focus:outline outline-gray-200 outline-1 col-span-10', { 'border border-red-600': (errors.multipleChoice && hasError(errors.multipleChoice)) }]"> 
                                <span
                                    :class="['col-span-1 font-semibold text-xl cursor-pointer', { 'hidden': Object.keys(choices).length <= 2 }]"
                                    @click="deleteChoice(choice)">&times;</span>
                            </div>
                            <small 
                                :class="['text-red-600 ml-10' , { 'opacity-100': errors.multipleChoice && errors.multipleChoice[choice] && errors.multipleChoice[choice].length, 'opacity-0': !(errors.multipleChoice && errors.multipleChoice[choice] && errors.multipleChoice[choice].length)  } ]">
                                * {{ (errors.multipleChoice && errors.multipleChoice[choice] && errors.multipleChoice[choice].length) ? errors.multipleChoice[choice][0] : '' }}
                            </small>
                        </div>
                    </div>

                    <div class="py-2 mt-2" v-if="questionForm.type == 'multiple-choice'">
                        <label for="">Answer</label>
                        <select name="Answer" id="" v-model="questionForm.answer"
                            :class="['border py-2 px-4 rounded-md block w-[100%] mt-2 focus:outline outline-gray-200 outline-1', { 'border border-red-600' : (errors.answer && errors.answer.length)  }]">
                            <option value="">Select Answer</option>
                            <option :value="choice" v-for="(index, choice) in choices" :key="choice">{{ choice }}</option>
                        </select>
                        <small :class="['text-red-600', { 'opacity-100': (errors.answer && errors.answer.length), 'opacity-0': !(errors.answer && errors.answer.length) }]">
                            * {{ (errors.answer && errors.answer.length) ? errors.answer[0] : '' }}
                        </small>
                    </div>

                    <div class="py-2 mt-2" v-if="questionForm.type == 'enumeration'">
                        <label for="">Answers</label>
                        <form action="">
                            <div class="grid grid-cols-12 items-center">
                                <input type="text"
                                    :class="['col-span-10 border py-2 px-4 rounded-md block w-[100%] focus:outline outline-gray-200 outline-1', { 'border border-red-600': (errors.enumeration && errors.enumeration.length) }]"
                                    v-model="enumModel">
                                <div class="col-span-2 text-right">
                                    <input type="submit" class="bg-blue-500 text-white px-2 py-2 rounded cursor-pointer"
                                        value="&plus; Add" @click.prevent="addEnumValues">
                                </div>
                            </div>
                            <small :class="['text-red-600', { 'opacity-100': (errors.enumeration && errors.enumeration.length), 'opacity-0': !(errors.enumeration && errors.enumeration.length) }]">
                                * {{ (errors.enumeration && errors.enumeration.length) ? errors.enumeration[0] : '' }}
                            </small>
                        </form>
                        <div class="mt-5 flex gap-2 max-w-[600px] flex-wrap">
                            <div class="grid grid-cols-12 items-center bg-gray-200 p-2 rounded-lg gap-2"
                                v-for="(enm, index) in enumeration" :key="index">
                                <p class="col-span-11 break-all">{{ enm }}</p>
                                <span class="col-span-1 font-semibold text-xl cursor-pointer"
                                    @click="deleteEnumValue(index)">&times;</span>
                            </div>
                        </div>
                    </div>

                    <div class="py-2 mt-2" v-if="questionForm.type == 'true-or-false'">
                        <label for="">Answer</label>
                        <select name="" id=""
                            class="border py-2 px-4 rounded-md block w-[100%] mt-2 focus:outline outline-gray-200 outline-1">
                            <option value="">Select Answer</option>
                            <option :value="true">True</option>
                            <option :value="false">False</option>
                        </select>
                    </div>

                    <div class="py-2 mt-2" v-if="questionForm.type == 'select'">
                        <div class="flex justify-between items-center">
                            <small class="text-yellow-600">Note: Check to select the answers</small>
                            <button class="bg-blue-500 text-white px-2 py-1 rounded block ml-auto"
                                @click="addSelectables"><span class="font-semibold text-lg">&plus;</span> Add</button>
                        </div>
                        <div v-for="(index, slct) in select" :key="slct">
                            <div class="flex gap-2 items-center mt-2">
                                <input type="checkbox" @change="selectables(slct, $event)">
                                <input type="text"
                                    :class="['border p-2 rounded-md block w-full focus:outline outline-gray-200 outline-1 col-span-10', { 'border border-red-600': (errors.select && errors.select[slct].length) }]"
                                    v-model="select[slct]">
                                <span
                                    :class="['col-span-1 font-semibold text-xl cursor-pointer', { 'hidden': Object.keys(select).length <= 2 }]"
                                    @click="deleteSelectables(slct)">&times;</span>
                            </div>
                            <small :class="['text-red-600', { 'opacity-100': (errors.select && errors.select[slct].length), 'opacity-0': !(errors.select && errors.select[slct].length)}]">
                                * {{ (errors.select && errors.select[slct].length) ? errors.select[slct][0] : '' }}
                            </small>
                        </div>
                        <div>
                            <small :class="['text-red-600', { 'opacity-100': (errors.select && !hasError(errors.select) == true && !selected.length), 'opacity-0': !(errors.select && !hasError(errors.select) == true && !selected.length) }]">
                                * {{ (errors.select && !hasError(errors.select) == true && !selected.length) ? 'Please check correct answer atleast one!' : '' }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="block text-right mt-10">
                    <button class="bg-red-500 text-white py-2 px-5 rounded-md ml-auto m-1 hover:bg-red-300"
                        @click="closeQuestionFormModal">Cancel</button>
                    <button class="bg-green-500 text-white py-2 px-5 rounded-md ml-auto m-1 hover:bg-green-300"
                        @click="createQuestion">Save</button>
                </div>
            </div>
        </ModalComponent>

        <h1 class="text-xl font-bold mt-11">Create Quiz</h1>
        <div class="mt-5 max-w-4xl bg-white shadow-md rounded-md p-5">
            <img src="../../../assets/setting.png" class="w-5 block ml-auto cursor-pointer" @click="showQuizSettingModal"
                alt="">
            <label for="title">Title</label>
            <div class="text-start">
                <input type="text" placeholder="Title" v-model="quizForm.title"
                    :class="[{ 'border-red-600': errors.title && errors.title.length }, 'border', 'p-2', 'rounded-md', 'block w-[100%]', 'mt-2', 'focus:outline', 'outline-gray-200', ' outline-1']" />
                <small
                    :class="['text-red-600', { 'opacity-100': errors.title && errors.title.length, 'opacity-0': !(errors.title && errors.title.length) },]">*
                    {{
                        errors.title && errors.title.length ? errors.title[0] : '' }}</small>
            </div>
            <div class="text-start">
                <label for="Instuction">Quiz Instruction</label><br>
                <div :class="[{ 'border-red-600': errors.instruction && errors.instruction.length }, 'rounded']">
                    <EditorComponent @update:content="editorUpdateContent" :value="instruction" />
                </div>
                <small
                    :class="['text-red-600', { 'opacity-100': errors.instruction && errors.instruction.length, 'opacity-0': !(errors.instruction && errors.instruction.length) },]">*
                    {{
                        errors.instruction && errors.instruction.length ? errors.instruction[0] : '' }}</small>
            </div>

            <div class="mt-5 flex justify-end gap-2">
                <button class="block bg-green-500 text-white px-5 py-2 rounded hover:bg-green-300"
                    @click="back">Back</button>
                <button class="block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-300"
                    @click="createQuiz">Save</button>
            </div>
        </div>
        <div class="my-16 max-w-4xl">
            <button class="bg-[#01b9ff] hover:bg-blue-300 text-white py-2 px-4 rounded-md"
                @click="showQuestionFormModal">Add Questions</button>
            <div class="sm:overflow-x-auto px-5 mt-5 shadow-md rounded-md">
                <table class="w-full">
                    <thead>
                        <tr class="font-bold text-base">
                            <td class="border-b-2 text-start px-2 py-2">Id</td>
                            <td class="border-b-2 text-start px-2 py-2">Question</td>
                            <td class="border-b-2 text-start px-2 py-2">Type</td>
                            <td class="border-b-2 text-start px-2 py-2">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(question, index) in questions" :key="index">
                            <td class="border-b text-start px-2 py-2">{{ index + 1 }}</td>
                            <td class="border-b text-start px-2 py-2">{{ question.description }}</td>
                            <td class="border-b text-start px-2 py-2">{{ question.type }}</td>
                            <td class="border-b text-start px-2 py-2">View</td>
                        </tr>

                        <tr v-if="!questions.length">
                            <td colspan="4" class="text-center px-2 py-2">No Questions!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { validate, hasError } from '@/utils/validator';
import { useQuizStore } from '@/stores/quiz'
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { saveState } from '@/utils/helpers'
// components
import SideNav from '@/components/SideNav.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import EditorComponent from '@/components/EditorComponent.vue';

/** ========================================================================
 * COFIGURATION AND VARIABLE DECLARATION
 ===========================================================================*/
const quiz = ref({});

const quizStore = useQuizStore();
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const alertConfig = ref({
    code: 'success',
    message: 'Quiz created successfully!',
    fadeOutTime: 3000
})

const quizForm = ref({
    title: '',
    instruction: '',
    created_by: null
});

const quizSettingForm = ref({
    is_active: false,
    is_shuffle: false,
    participants_limit: 0,
    start_date: null,
    end_date: null
})

const questionForm = ref({
    description: '',
    type: 'multiple-choice',
    quiz_id: null,
    choices: '',
    answer: ''
})

const choices = ref({
    A: '',
    B: '',
    C: '',
    D: ''
})

const select = ref({
    A: '',
    B: '',
})

const selected = ref([]);

const enumModel = ref()
const enumeration = ref([])

const errors = ref([]);
const quizRules = {
    title: {
        required: true,
        min_length: 6,
        max_length: 255
    },
    instruction: {
        required: true,
        min_length: 20,
    }
};

const questionRules = {
    description: {
        required: true,
        max_length: 255
    },
    type: {
        required: true
    },
    choices: {
        required: quizForm.value.type != 'explanation'
    },
    answer: {
        required: quizForm.value.type != 'explanation'
    }
}

const questions = ref([]);
const instruction = ref('');

const alertQuiz = ref(null);
const modalSetting = ref(null);
const modalQuestionForm = ref(null);

/** ========================================================================
 * METHODS
 ===========================================================================*/

onMounted(async () => {
    console.log("onMounted")
    await authStore.getAuthUser();
    quizForm.value.created_by = authStore.user.id;


    if (route.params.id) {
        await quizStore.getQuiz(route.params.id);
        populateData()
    } else {
        quizStore.resetQuizState()
    }
})

// modal start
const showQuizSettingModal = () => {
    modalSetting.value.showModal();
}

const closeQuizSettingModal = () => {
    modalSetting.value.closeModal();
}

const showQuestionFormModal = () => {
    modalQuestionForm.value.showModal();
}

const closeQuestionFormModal = () => {
    modalQuestionForm.value.closeModal();
}
// modal end

const editorUpdateContent = (content) => {
    quizForm.value.instruction = content;
}

const saveQuizSetting = async () => {
    quiz.value.setting = quizSettingForm.value;

    if (route.params.id) {
        await createQuiz();
    }

    modalSetting.value.closeModal();
}

const back = () => {
    router.push({ name: 'quiz-list' });
}

const createQuiz = async () => {
    errors.value = validate(quizForm.value, quizRules);
    if (hasError(errors.value)) {
        alertConfig.value.code = 'danger',
            alertConfig.value.message = 'Some fields has errors!'
        alertQuiz.value.showAlert()
        return
    };

    quiz.value.quiz = quizForm.value;
    quiz.value.setting = quizSettingForm.value;

    let response = null;
    if (route.params.id) {
        response = await quizStore.updateQuiz(route.params.id, quiz.value);
        alertConfig.value.code = 'success'
        alertConfig.value.message = 'Successfully updated!'
        alertConfig.value.fadeOutTime = 1000
    } else {
        response = await quizStore.createQuiz(quiz.value);
        alertConfig.value.code = 'success'
        alertConfig.value.message = 'Successfully Created!'
        alertConfig.value.fadeOutTime = 1000
    }

    if ((response.status === 201 || response.status === 200)) {
        alertQuiz.value.showAlert()
    } else {
        alertConfig.value.code = 'danger'
        alertConfig.value.message = 'Something went wrong!'
        alertConfig.value.fadeOutTime = 3000

        alertQuiz.value.showAlert()
    }
}

const createQuestion = async () => {
    // validation
    let choiceRules = {};
    let keys = [];

    switch (questionForm.value.type) {
        case 'multiple-choice':
            keys = Object.keys(choices.value, choiceRules)
            keys.forEach(key => {
                choiceRules[key] = {
                    required: true
                }
            })

            // validate question form fields
            delete questionRules.choices
            errors.value = validate(questionForm.value, questionRules)

            // validate question form choices
            errors.value.multipleChoice = validate(choices.value, choiceRules)

            // check if has errors
            let errorCopy = {...errors.value}
            delete errorCopy.multipleChoice

            if (hasError(errorCopy) && hasError(errors.value.multipleChoice)) {
                return;
            }

            questionForm.value.choices = JSON.stringify(choices.value)
            break;
        case 'enumeration':
            choiceRules = {
                enumeration: {
                    min_length: 1
                }
            }

            let customMessage = {
                enumeration: {
                    min_length: 'Please add atleast one item for enumeration!'
                }
            }

            // validate question form fields
            delete questionRules.choices
            delete questionRules.answer
            errors.value = validate(questionForm.value, questionRules)

            // validate question form choice
            errors.value.enumeration = validate({enumeration: enumeration.value}, choiceRules, customMessage).enumeration
            break;
        case 'select':
            keys = Object.keys(select.value)
            keys.forEach(key => {
                choiceRules[key] = {
                    required: true
                }
            })
            
            // validate question form fields
            delete questionRules.choices
            errors.value = validate(questionForm.value, questionRules)

            // validate question form choices
            errors.value.select = validate(select.value, choiceRules)
            
            if (!hasError(errors.value.select) && !selected.value.length) {
                return
            }
            break;
    }

    let response = {}
    if (quizStore.quiz) {
        questionForm.value.quiz_id = quizStore.quiz.id
        response = await quizStore.createQuizQuestion(questionForm.value)
        
        if (response.status == 200 || reset.status == 201) {
            alertConfig.value.code = 'success'
            alertConfig.value.message = 'Question created successfully!'
            alertConfig.value.fadeOutTime = 3000

            window.scrollTo(0, 0)

            alertQuiz.value.showAlert()
            await quizStore.getQuiz(quizStore.quiz.id)
            modalQuestionForm.value.closeModal()
            populateData()
        }
    } else {
        questions.value.push(questionForm.value)

        saveState('questions', questions.value)
    }
    reset()
}

const onAlertClosed = () => {
    console.log('Alert closed')
}

// add new choices
const addNewChoices = () => {
    const letters = Object.keys(choices.value);
    choices.value[String.fromCharCode(letters[letters.length - 1].charCodeAt() + 1)] = ''
}

// delete choices
const deleteChoice = (key) => {
    let choiceStart = 'A'

    delete choices.value[key]

    const values = Object.values(choices.value)
    choices.value = {}

    values.forEach(value => {
        choices.value[choiceStart] = value
        choiceStart = String.fromCharCode(choiceStart.charCodeAt() + 1)
    })
}

// add new enum values
const addEnumValues = () => {
    if (enumModel.value) {
        enumeration.value.push(enumModel.value)
        enumModel.value = ''
    }
}

const deleteEnumValue = (index) => {
    enumeration.value.splice(index, 1)
}

// add new selectables
const addSelectables = () => {
    const letters = Object.keys(select.value);
    select.value[String.fromCharCode(letters[letters.length - 1].charCodeAt() + 1)] = ''
}

// delete selectables
const deleteSelectables = (index) => {
    let selectStart = 'A'

    delete select.value[index]

    const values = Object.values(select.value)
    select.value = {}

    values.forEach(value => {
        select.value[selectStart] = value
        selectStart = String.fromCharCode(selectStart.charCodeAt() + 1)
    })
}

// check selectables
const selectables = (index, event) => {
    // selected.value.push(index)
    if (event.target.checked) {
        selected.value.push(index)
    } else {
        if (selected.value.includes(index)) {
            selected.value.splice(selected.value.indexOf(index), 1)
        }
    }
}

const reset = () => {
    // question
    questionForm.value = {
        title: '',
        instruction: '',
        created_by: null,
        type: 'multiple-choice'
    }

    // multiple choice
    choices.value = {
        A: '',
        B: '',
        C: '',
        D: ''
    }
}

const populateData = () => {
    questions.value = quizStore.quiz.question_set

    // quiz data to model
    quizForm.value.title = quizStore.quiz.title;
    instruction.value = quizStore.quiz.instruction;
    quizForm.value.created_by = quizStore.quiz.created_by;

    // quiz setting data to model
    quizSettingForm.value.is_active = quizStore.quiz.quizsetting_set[0].is_active;
    quizSettingForm.value.is_shuffle = quizStore.quiz.quizsetting_set[0].is_shuffle;
    quizSettingForm.value.participants_limit = quizStore.quiz.quizsetting_set[0].participants_limit;
    quizSettingForm.value.start_date = quizStore.quiz.quizsetting_set[0].start_date;
    quizSettingForm.value.end_date = quizStore.quiz.quizsetting_set[0].end_date;
}
</script>