<script setup lang="ts">

</script>

<template>
    <div class="panel">
        <slot></slot>
    </div>
</template>

<style scoped>
    .panel {
        margin-top: 12px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
