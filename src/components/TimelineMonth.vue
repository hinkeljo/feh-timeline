<script setup lang="ts">
    defineProps<{
        name: string;
        days: number; 
    }>();
</script>

<template>
    <div class="layout">
        <div class="month">
            <div class="month-label sticky">{{ name }}</div>
        </div>
        <div class="days_list">
            <div v-for="n in days" class="day">{{ n }}</div>
        </div>
    </div>
</template>

<style scoped>
    .layout {
        display: flex;
        flex-direction: column;
    }

    .month {
        padding-bottom: 12px;
    }

    .month-label {
        width: fit-content;
        color: orange;
        font-size: 24px;
        font-weight: bold;
        padding-left: 12px;
        padding-right: 12px;
    }

    .days_list {
        display: flex;
        flex-direction: row;
        width: fit-content;
    }

    .day {
        color: lightgray;
        font-size: 18px;
        font-weight: bold;
        width: 48px;
        height: 48px;
        border: 2px;
        border-right: 1px;
        border-left: 1px;
        border-color: grey;
        border-style: solid;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
