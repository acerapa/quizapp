<template>
    <div class="w-28 h-28 flex items-center relative">
        <div class="w-24 h-24 absolute rounded-full z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2" ref="pieCircle">
            <div class="w-12 h-12 bg-blue-500 bg-white rounded-tr-full absolute z-30 right-0 origin-bottom-left" ref="absPiePart1"></div>
            <div class="w-12 h-12 bg-blue-500 rounded-tl-full bg-white relative z-20" ref="piePart1"></div>
            <div class="w-12 h-12 bg-blue-500 rounded-tr-full relative z-20" ref="piePart2"></div>
            <div class="w-12 h-12 bg-blue-500 rounded-bl-full bg-white relative z-20" ref="piePart3"></div>
            <div class="w-12 h-12 bg-blue-500 rounded-br-full bg-white relative z-20" ref="piePart4"></div>
        </div>
        <div class="w-24 h-24 rounded-full bg-transparent mx-auto flex items-center relative z-20">
            <div class="w-20 h-20 rounded-full bg-green-200 mx-auto flex items-center text-center">
                <span class="block mx-auto">{{ timer }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const component_name = '<TimerComponent />';

const timer = ref(null);

// ref elements
const piePart1 = ref(null)
const piePart2 = ref(null)
const piePart4 = ref(null)
const piePart3 = ref(null)
const absPiePart1 = ref(null)
const pieCircle = ref(null)

const props = defineProps({
    time: {
        default: '1:00',
        type: String
    }
})

const degrees = 360;
const interval = ref(0);

const interval_id = ref(null);

const count = ref(0)
const seconds = ref(0)

onMounted(() => {
    seconds.value = evalTimeToMillSec()/1000;
    interval.value = degrees / (evalTimeToMillSec() / 100);
    
    convertToString(seconds.value);

    let circularDegree  = 0;
    interval_id.value = setInterval(() => {
        
        circularDegree+= interval.value;
        if (!absPiePart1.value) {
            clearAllIntervals();
        }

        absPiePart1.value.style = `rotate: ${circularDegree}deg`;

        if (circularDegree >= 90) {
            piePart4.value.classList.remove('bg-white');
        }

        if (circularDegree >= 180) {
            piePart3.value.classList.remove('bg-white');
        }

        if (circularDegree >= 270) {
            piePart1.value.classList.remove('bg-white');
            piePart2.value.style = 'z-index: 35;'
        }
        
        if (degrees < circularDegree) {
            clearAllIntervals();
        }
        
        // decrement time
        count.value++
        if (!(count.value % 10)) {
            seconds.value--;
            convertToString(seconds.value);
        }
        

    }, 100);
})

const evalTimeToMillSec = () => {
    const extractTime = props.time.split(':');
    
    if (extractTime.length > 2) {
        console.error(component_name + ': Only accept this format minutes:seconds Ex. 00:00')
        return;
    }

    return ((parseInt(extractTime[0]) * 60) + parseInt(extractTime[1])) * 1000;
}

const clearAllIntervals = () => {
    clearInterval(interval_id.value);
}

const convertToString = (seconds) => {
const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const ss = String(Math.floor(seconds % 60)).padStart(2, '0');

  timer.value = `${hh}:${mm}:${ss}`;
}
</script>
