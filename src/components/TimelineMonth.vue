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
        padding-bottom: 0px;
    }

    .month-label {
        width: 200px;
        height: 75px;
        color: white;
        -webkit-text-stroke: black 1px;
        font-size: 24px;
        font-weight: bold;
        padding-left: 24px;
        padding-right: 24px;
        background-image: url('@/assets/background_month.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .days_list {
        display: flex;
        flex-direction: row;
        width: fit-content;
    }

    .day {
        color: white;
        font-size: 18px;
        font-weight: bold;
        width: 48px;
        height: 48px;
        border: 2px;
        border-right: 1px;
        border-left: 1px;
        border-color: white;
        border-style: solid;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
