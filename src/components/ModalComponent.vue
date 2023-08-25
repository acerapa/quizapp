<template>
    <div ref="overlay" :class="['overlay fixed bg-gray-500 w-screen h-screen z-20 top-0 left-0 bg-opacity-50 overflow-y-auto grid', ...modalPosition[position], {'block': show, 'hidden': !show}]">
        <div ref="modalCont" :class="['rounded-lg min-w-[500px] w-fit']">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

/** ========================================================================
 * COFIGURATION AND VARIABLE DECLARATION
 ===========================================================================*/

const props = defineProps({
    position: {
        type: String,
        default: 'center'
    }, 
    animation: {
        type: String,
        default: 'fade-top-bot'
    }
})

const modalPosition = ref({
    center: ['justify-center items-center'],
    'top-center': ['justify-center items-start'],
    'bottom-center': ['justify-center items-end'],
    'top-right': ['justify-end items-start'],
    'top-left': ['justify-start items-start'],
    'bottom-right': ['justify-end items-end'],
    'bottom-left': ['justify-start items-end'],
})

const show = ref(false);

/** ========================================================================
 * METHODS
 ===========================================================================*/

 //TODO: add animation and choices for animation to be used

const showModal = () => {
    show.value = true;
}

const closeModal = () => {
    show.value = false;
}

defineExpose({
    showModal,
    closeModal
})

</script>