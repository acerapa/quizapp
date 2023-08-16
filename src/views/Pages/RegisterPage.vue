<template>
    <div class="w-[100%] h-screen bg-gradient-to-r from-[#d7f8ff] to-[#cdffcc] flex items-center">
        <div class="m-auto w-96 h-auto text-center shadow rounded-lg bg-white px-10 py-16 relative">
            <AlertComponent class="absolute top-0 left-0" :code="alertConfig.code" :message="alertConfig.message" :fade-out-time="alertConfig.fadeOutTime" @fade-out="onFadeOutAlert"  ref="alert"/>
            <img src="../../assets/logo.png" alt="logo" class="w-28 inline-block mb-5">
            <h1 class="text-xl font-normal">Register</h1>
            <form class="">

                <div class="text-start">
                    <input type="text" placeholder="Username" v-model="userModel.username"
                        :class="[{ 'border-red-600': errors.username && errors.username.length }, 'border', 'p-2', 'rounded-md', 'block w-[100%]', 'mt-1', 'focus:outline', 'outline-gray-200', ' outline-1']" />
                    <small 
                        :class="['text-red-600', 'text-sm', {'opacity-100': errors.username && errors.username.length, 'opacity-0': !(errors.username && errors.username.length)}]">
                        *{{ errors.username && errors.username.length ? errors.username[0] : '' }}</small>
                </div>
                <div class="text-start">
                    <input type="email" placeholder="Email" v-model="userModel.email"
                        :class="[{ 'border-red-600': errors.email && errors.email.length }, 'border', 'p-2', 'rounded-md', 'block w-[100%]', 'mt-1', 'focus:outline', 'outline-gray-200', ' outline-1']" />
                    <small 
                        :class="['text-red-600', 'text-sm', {'opacity-100': errors.email && errors.email.length, 'opacity-0': !(errors.email && errors.email.length)}]">
                        *{{ errors.email && errors.email.length ? errors.email[0] : '' }}</small>
                </div>
                <div class="text-start">
                    <input type="password" placeholder="Password" v-model="userModel.password"
                        :class="[{ 'border-red-600': errors.password && errors.password.length }, 'border', 'p-2', 'rounded-md', 'block w-[100%]', 'mt-1', 'focus:outline', 'outline-gray-200', ' outline-1']" />
                    <small 
                        :class="['text-red-600', 'text-sm', {'opacity-100': errors.password && errors.password.length, 'opacity-0': !(errors.password && errors.password.length)}]">
                        *{{ errors.password && errors.password.length ? errors.password[0] : '' }}</small>
                </div>

                <button class="bg-[#01b9ff] hover:bg-blue-300 text-white py-2 px-4 mt-2 rounded-md"
                    @click.prevent="register">
                    <img v-if="isLoading" src="../../assets/loader.png" class="animate-spin inline w-5 invert" alt="">
                    Register
                </button>
            </form>
            <p class="mt-4">Already have an account? <RouterLink class="text-blue-600" :to="{ name: 'login' }">Click here!</RouterLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { validate, hasError } from '../../utils/validator'
// components
import AlertComponent from '../../components/AlertComponent.vue';

/** ========================================================================
 * COFIGURATION AND VARIABLE DECLARATION
 ===========================================================================*/

const authStore = useAuthStore()

const userModel = ref({
    email: '',
    username: '',
    password: ''
})

const alertConfig = ref({
    code: 'success',
    message: 'Registered successfully!',
    fadeOutTime: 3000
})

const errors = ref({});

const rules = {
    username: {
        required: true,
        max_length: 50,
        min_length: 6
    },
    email: {
        required: true,
        email: true        
    },
    password: {
        required: true,
        min_length: 8
    }
}

const isLoading = ref(false)
const isRegisterSuccess = ref(false)
const alert = ref()

const router = useRouter();

/** ========================================================================
 * METHODS
 ===========================================================================*/

const register = async () => {
    isLoading.value = true
    isRegisterSuccess.value = false

    errors.value = validate(userModel.value, rules);
    if (hasError(errors.value)) {
        alertConfig.value.code = 'danger'
        alertConfig.value.message = 'Please fill up properly the fields!'
        isLoading.value = false
        alert.value.showAlert()
        return
    } 
    
    const response = await authStore.register(userModel.value)
    if (!response.id) {
        errors.value = response
        alertConfig.value.code = 'danger'
        alertConfig.value.message = 'Something went wrong!'
    } else {
        alertConfig.value.code = 'success'
        alertConfig.value.message = 'Registered successfully, Plase Login!'
        alertConfig.value.fadeOutTime = 500
        isRegisterSuccess.value = true
    }


    alert.value.showAlert()
    isLoading.value = false
}

const onFadeOutAlert = () => {
    alertConfig.value.fadeOutTime = 3000
    
    if (isRegisterSuccess.value) {
        router.push({ name: 'login' })
    }
}

</script>
