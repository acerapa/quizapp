<template>
    <textarea placeholder="Enter Content" ref="editor"></textarea>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
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
const $editor = ref(null)
onMounted(() => {
    $editor.value = $(editor.value);

    $editor.value.on('tbwchange', (e) => {
      const content = e.currentTarget.value;
      emit('update:content', content);
    });

    $editor.value.trumbowyg({
        svgPath: '../src/assets/icons.svg',
        btns: [['bold', 'italic'], ['link']],
        html: props.value
    })

})

watch(() => props.value, function () {
    $editor.value.trumbowyg('html', props.value);
})

</script>
