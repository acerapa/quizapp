<template>
    <div :class="['rounded-md', 'border', 'text-white', 'opacity-0', { 'fadeIn': show }, colorCodes[code].bg, colorCodes[code].border]"
        ref="alertContainer">
        <div class="grid grid-cols-12 gap-1">
            <div class="col-span-10 text-start p-2 flex items-center font-medium">
                {{ message }}
            </div>
            <div class="col-span-2 p-2 flex items-center">
                <img class="invert w-6 block ml-auto cursor-pointer" src="../assets/close.png" alt="close" @click="closeAlert">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/** ========================================================================
 * COFIGURATION AND VARIABLE DECLARATION
 ===========================================================================*/
const emit = defineEmits(['fadeOut']);

const colorCodes = {
    success: {
        bg: 'bg-green-300',
        border: 'border-green-200'
    },
    danger: {
        bg: 'bg-red-300',
        border: 'border-red-600'
    },
    warning: {
        bg: 'bg-yellow-300',
        border: 'border-yellow-600'
    },
    info: {
        bg: 'bg-blue-300',
        border: 'border-blue-600'
    }
}

const props = defineProps({
    code: {
        type: String,
        default: 'success'
    },
    message: {
        type: String,
        default: 'Hello World'
    },
    autoClose: {
        type: Boolean,
        default: true
    },
    fadeOutTime: {
        type: Number,
        default: 3000
    }
})

const show = ref(false);
const alertContainer = ref();
const alertTimeOut = ref();

/** ========================================================================
 * METHODS
 ===========================================================================*/

onMounted(() => {
    alertContainer.value.addEventListener('animationend', () => {
        if (Array.from(alertContainer.value.classList).includes('fadeIn')) {
            alertContainer.value.classList.remove('fadeIn');
            alertContainer.value.classList.remove('opacity-0');
            if (props.autoClose) {
                alertTimeOut.value = setTimeout(() =>{
                    closeAlert()
                }, props.fadeOutTime)
            }
        }

        if (Array.from(alertContainer.value.classList).includes('fadeOut')) {
            alertContainer.value.classList.remove('fadeOut');
            alertContainer.value.classList.add('opacity-100');
            emit('fadeOut')
            show.value = false
        }
    })
})

function showAlert() {
    show.value = true;
}

function closeAlert() {
    if (alertContainer.value) {
        alertContainer.value.classList.add('fadeOut');
    }
}

defineExpose({
    showAlert,
})

</script>

<style scoped>
.fadeIn {
    animation: fadeIn 0.5s ease-in-out forwards;
}

.fadeOut {
    animation: fadeOut 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-10px);
    }
}
</style>