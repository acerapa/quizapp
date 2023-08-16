<script setup>
import { RouterView, /* useRoute */ } from 'vue-router';

// const route = useRoute();
// onMounted(() => {
//   const meta = route.meta;
  
//   console.log(meta);
//   if (Object.keys(meta).length > 0) {
//     localStorage.setItem('meta', JSON.stringify(meta));
//   }

//   if (localStorage.getItem('meta')) {
//     const meta = JSON.parse(localStorage.getItem('meta'));
//     document.title = meta.title ? meta.title : 'Quiz App';
//   }

// });

</script>

<template>
  <RouterView />
</template>
