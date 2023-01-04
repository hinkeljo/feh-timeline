<script setup lang="ts">
    function openCreateMenu(): void {
        console.log("Opening menu to create event data..."); 
    }
</script>

<template>
    <div class="app-header">
        <div class="left">FEH Timeline</div>
        <div class="right">
            <div 
             class="create clickable" 
             @click="openCreateMenu()">
                Create data
            </div>
        </div>
    </div>
</template>

<style scoped>
    .app-header {
        width: 100%;
        height: 52px;
        background-color: orange;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 12px;
        padding-right: 12px;
    }

    .left {
        font-size: 18px;
        font-weight: bold;
        color: black;
    }

    .create {
        font-size: 12px;
        font-weight: bold;
        color: black;
        text-decoration: underline;
    }
</style>
