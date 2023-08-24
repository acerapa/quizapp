import { defineStore } from 'pinia'
import { APIHandler, HTTPMethods, verfiyToken } from '../api'
import { getState, StateKeys } from '../utils/helpers';

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        quizes: [],
        quiz: null,
    }),

    actions: {
        async getQuizes() {
            const isVerfied = await verfiyToken();
            if (!isVerfied) {
                console.log('need login');
                return
            }

            const response = await APIHandler('quizes', HTTPMethods.GET, null, {
                Authorization: `Bearer ${ getState(StateKeys.ACCESS) }`
            });
            this.quizes = response.quizes;
        },

        async createQuiz(quizConfig) {
            const isVerfied = await verfiyToken();
            if (!isVerfied) {
                console.log('need login');
                return
            }

            const response = await APIHandler('quizes/', HTTPMethods.POST, quizConfig, {
                Authorization: `Bearer ${ getState(StateKeys.ACCESS) }`
            });
            
            return response;
        },

        async getQuiz(quizId) {
            const isVerfied = await verfiyToken();
            if (!isVerfied) {
                console.log('need login');
                return
            }

            const response = await APIHandler(`quizes/${ quizId }/`, HTTPMethods.GET, null, {
                Authorization: `Bearer ${ getState(StateKeys.ACCESS) }`
            });
            this.quiz = response.quiz;
        },

        async updateQuiz(quizId, quizConfig) {
            const isVerfied = await verfiyToken();
            if (!isVerfied) {
                console.log('need login');
                return
            }

            const response = await APIHandler(`quizes/${ quizId }/`, HTTPMethods.PUT, quizConfig, {
                Authorization: `Bearer ${ getState(StateKeys.ACCESS) }`
            });
            
            return response;
        },

        async createQuizQuestion() {
            const isVerfied = await verfiyToken();
            if (!isVerfied) {
                console.log('need login');
                return
            }

            const response = await APIHandler(`quizes/questions/`, HTTPMethods.POST, null, {
                Authorization: `Bearer ${ getState(StateKeys.ACCESS) }`
            });

            return response;
        },

        resetQuizState() {
            this.quiz = null;
        }
    },
    getters: {},
})
