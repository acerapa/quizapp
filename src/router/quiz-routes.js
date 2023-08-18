export default [
  {
    path: '/quiz',
    name: 'quiz-list',
    component: () => import('../views/Pages/Quizes/QuizListPage.vue'),
    meta: {
      title: 'Quiz App | Quizes'
    }

  },
  {
    path: '/quiz/:id',
    name: 'quiz-edit',
    component: () => import('../views/Pages/Quizes/QuizFormPage.vue'),
    meta: {
      title: 'Quiz App | Edit Quiz'
    }
  },
  {
    path: '/quiz/create',
    name: 'quiz-create',
    component: () => import('../views/Pages/Quizes/QuizFormPage.vue'),
    meta: {
      title: 'Quiz App | Create Quiz'
    }
  }
]
