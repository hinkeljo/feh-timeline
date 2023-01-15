<script setup lang="ts">

</script>

<template>
    <div class="panel">
        <slot></slot>
    </div>
</template>

<style scoped>
    .panel {
        position: fixed;
        bottom: 24px;
        right: 24px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
