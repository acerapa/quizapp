export default [
  {
    path: '/quiz',
    name: 'quiz-list',
    component: () => import('../views/Pages/Quizes/QuizListPage.vue'),
    meta: {
      title: 'Quiz App | Quizes',
      requiresAuth: true
    }

  },
  {
    path: '/quiz/:id',
    name: 'quiz-edit',
    component: () => import('../views/Pages/Quizes/QuizFormPage.vue'),
    meta: {
      title: 'Quiz App | Edit Quiz',
      requiresAuth: true
    }
  },
  {
    path: '/quiz/create',
    name: 'quiz-create',
    component: () => import('../views/Pages/Quizes/QuizFormPage.vue'),
    meta: {
      title: 'Quiz App | Create Quiz',
      requiresAuth: true
    }
  },
  {
    path: '/quiz/preview/:id',
    name: 'quiz-preview',
    component: () => import('../views/Pages/Quizes/QuizPreview.vue'),
    meta: {
      title: 'Quiz App | Preview Quiz',
      requiresAuth: true
    }
  }
]
