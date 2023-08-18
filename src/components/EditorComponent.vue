<template>
    <textarea placeholder="Enter Content" ref="editor"></textarea>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import $ from 'jquery';
import 'trumbowyg';
import 'trumbowyg/dist/ui/trumbowyg.min.css';

const editor = ref(null);
const emit = defineEmits(['update:content']);

const props = defineProps({
    value: {
        type: String,
        required: true
    }
})

onMounted(() => {
    const $editor = $(editor.value);

    $editor.on('tbwchange', (e) => {
      const content = e.currentTarget.value;
      emit('update:content', content);
    });

    $editor.trumbowyg({
        svgPath: '../src/assets/icons.svg',
        btns: [['bold', 'italic'], ['link']],
        html: props.value
    })

    setTimeout(() => {
        $editor.trumbowyg('html', props.value);
    }, 300);
})

</script>
