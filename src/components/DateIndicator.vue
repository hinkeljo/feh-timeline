<script setup lang="ts">import { computed } from 'vue';

    const props = defineProps<{
        offsetDays: number;
    }>();

    const style = computed(() => {
        let offset: number = props.offsetDays * 48 - 2; 
        return {
        'left': offset + 'px',
        };
    });
</script>

<template>
    <div 
        class="pointer"
        v-bind:style="style">
    </div>
</template>

<style scoped>
    .pointer {
        position: absolute;
        top: -12px;
        bottom: 0;
        background-color: red;
        width: 4px;
        opacity: 1;
        z-index: 1;
    }
</style>
