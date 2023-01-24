<script setup lang="ts">
    import type { EventCategory } from '@/classes/EventCategory';
    import {closeDialog} from 'vue3-promise-dialog'

    const props = defineProps<{
        eventdata: EventCategory[],
    }>();

    function returnValue() {
        return true; 
    }
</script>

<template>
    <div class="dialog_background">
        <div class="dialog_body">
            <p>Test</p>
            <button @click="closeDialog(false)" class="btn">NO</button>
            <button @click="closeDialog(true)" class="btn">YES</button>
        </div>
    </div>
</template>

<style scoped>
    .dialog_background {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 99;
    }

    .dialog_body {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
    }
</style>
