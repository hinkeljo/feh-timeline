<script setup lang="ts">
    const props = defineProps<{
        label: string,
    }>();
</script>

<template>
    <div class="button clickable">
        {{label}}
    </div>
</template>

<style scoped>
    .button {
        background-color: orange;
        height: 52px;

        border-radius: 12px; 
        color: black;
        padding: 12px;
        display: flex;
        flex-direction: row;
        gap: 12px;

        font-size: 18px;
        font-weight: bold;

        display: flex;
        justify-content: center;
    }
</style>
