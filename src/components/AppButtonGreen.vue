<script setup lang="ts">
    const props = defineProps<{
        label: string,
    }>();
</script>

<template>
    <div class="button_green clickable">
        <div class="button_content text-normal">{{label}}</div>
    </div>
</template>

<style scoped>
    .button_green {
        height: 52px;

        display: flex;
        justify-content: center;

        border-image: url('@/assets/button_green.png');
        border-image-width: auto auto;
        border-style: solid;
        border-image-slice: 67 78 fill;
    }

    .button_content {
        padding: 12px 32px;
        width: fit-content;
        display: flex;
        align-items: center;
    }
</style>
