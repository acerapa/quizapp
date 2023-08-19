<template>
    <div class="w-[100%] h-screen bg-gradient-to-r from-[#d7f8ff] to-[#cdffcc] flex items-center">
        <div class="m-auto w-96 h-auto text-center shadow rounded-lg bg-white px-10 py-16 relative">
            <AlertComponent class="absolute top-0 left-0 w-full" :code="alertConfig.code" :message="alertConfig.message" :fade-out-time="alertConfig.fadeOutTime" ref="alert" @fade-out="onFadeOutAlert"/>
            <img src="../../assets/logo.png" alt="logo" class="w-28 inline-block mb-5">
            <h1 class="text-xl font-normal">Login</h1>
            <form class="">
                <div class="text-start">
                    <input type="text" placeholder="Username or Email" v-model="credentials.username"
                        :class="[{ 'border-red-600': errors.username && errors.username.length }, 'border', 'p-2', 'rounded-md', 'block w-[100%]', 'mt-2', 'focus:outline', 'outline-gray-200', ' outline-1']" />
                    <small :class="['text-red-600', { 'opacity-100': errors.username && errors.username.length, 'opacity-0': !(errors.username && errors.username.length) },]">* {{
                        errors.username && errors.username.length ? errors.username[0] : '' }}</small>
                </div>
                <div class="text-start">
                    <input type="password" placeholder="Password" v-model="credentials.password"
                        :class="[{ 'border-red-600': errors.password && errors.password.length }, 'border', 'p-2', 'rounded-md', 'block w-[100%]', 'mt-1', 'focus:outline', 'outline-gray-200', ' outline-1']" />
                    <small :class="['text-red-600', { 'opacity-100': errors.password && errors.password.length, 'opacity-0': !(errors.password && errors.password.length) }]">* {{ errors.password && errors.password.length ? errors.password[0] : '' }}</small>
                </div>
                <button class="bg-[#01b9ff] hover:bg-blue-300 text-white py-2 px-4 rounded-md mt-2"
                    @click.prevent="login">
                    <img v-if="isLoading" src="../../assets/loader.png" class="animate-spin inline w-5 invert" alt="">
                    Login
                </button>
            </form>
            <p class="mt-4">No account yet? <RouterLink class="text-blue-600" :to="{ name: 'register' }">Click here!</RouterLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';
import { validate, hasError } from '@/utils/validator'

// components
import AlertComponent from '@/components/AlertComponent.vue';

/** ========================================================================
 * COFIGURATION AND VARIABLE DECLARATION
 ===========================================================================*/

const authStore = useAuthStore();
const credentials = ref({
    username: '',
    password: ''
})

const errors = ref({});

const rules = {
    username: {
        required: true,
        max_length: 50,
        min_length: 6
    },
    password: {
        required: true,
        min_length: 8
    }
}

const alertConfig = ref({
    code: 'success',
    message: '',
    fadeOutTime: 3000
})

const isLoading = ref(false)
const isLoginSuccess = ref(false)
const alert = ref()

const router = useRouter()

/** ========================================================================
 * METHODS
 ===========================================================================*/

const login = async () => {
    isLoading.value = true
    isLoginSuccess.value = false

    errors.value = validate(credentials.value, rules);
    if (hasError(errors.value)) {
        alertConfig.value.code = 'danger'
        alertConfig.value.message = 'Please fill up properly the fields!'
        alert.value.showAlert()

        isLoading.value = false
        return
    };
    
    const response = await authStore.login(credentials.value)
    if (!response) {
        alertConfig.value.code = 'danger'
        alertConfig.value.message = 'Invalid credentials'
    } else {
        alertConfig.value.code = 'success'
        alertConfig.value.message = 'Login successful'
        alertConfig.value.fadeOutTime = 500
        isLoginSuccess.value = true
    }

    alert.value.showAlert()
    isLoading.value = false
}

const onFadeOutAlert = () => {
    alertConfig.value.fadeOutTime = 3000
    
    if (isLoginSuccess.value) {
        router.push({ name: 'dashboard' })
    }
}
</script>
