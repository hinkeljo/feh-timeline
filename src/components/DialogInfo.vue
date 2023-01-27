<script setup lang="ts">
    import { closeDialog } from 'vue3-promise-dialog'
    import AppButtonGreen from './AppButtonGreen.vue';
</script>

<template>
    <div class="dialog_background">
        <div class="dialog_body">
            <div class="dialog_header text-normal">FEH Timeline</div>
            <div class="text-small">
                This is the event timeline for the Fire Emblem: Heroes mobile game. 
                
            </div>
            <AppButtonGreen label="Close" @click="closeDialog(true)"></AppButtonGreen>
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
        width: max-content;
        height: max-content;
        max-width: 95%;
        max-width: 95%;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;

        border-image: url('@/assets/background_dialog.png');
        border-image-width: auto auto;
        border-style: solid;
        border-image-slice: 99 350 fill;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
    }

    .dialog_header {
        text-align: center;
        padding: 12px 12px 12px 12px;
    }

    .button_filter_active::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-image: url('@/assets/toggle_active.png');
        border-image-width: auto auto;
        border-image-slice: 41 53 fill;
    }

    .button_filter_inactive::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-image: url('@/assets/toggle_inactive.png');
        border-image-width: auto auto;
        border-style: solid;
        border-image-slice: 41 53 fill;
    }

    .filter_label {
        padding: 12px 32px;
        width: fit-content;
    }
</style>
