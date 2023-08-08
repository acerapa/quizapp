export default [
    {
        path: '/quiz',
        name: 'quiz-list',
        component: () => import('../views/Pages/Quizes/QuizListPage.vue')
    },
    {
        path: '/quiz/:id',
        name: 'quiz-edit',
        component: () => import('../views/Pages/Quizes/QuizFormPage.vue')
    },
    {
        path: '/quiz/create',
        name: 'quiz-create',
        component: () => import('../views/Pages/Quizes/QuizFormPage.vue')
    }
]
