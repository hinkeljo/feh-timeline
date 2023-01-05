<script setup lang="ts">
    import CustomDataModal from "./CustomDataModal.vue";

    function openCreateMenu(): void {
        console.log("Opening menu to create event data..."); 
    }
</script>

<template>
    <div class="app-header">
        <div class="text-heading">FEH Timeline</div>
        <div class="right">
            <div 
             class="create text-subheading clickable" 
             @click="openCreateMenu()">
                Create data
            </div>
        </div>
    </div>
    <!--CustomDataModal></CustomDataModal-->
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

    .create {
        text-decoration: underline;
    }
</style>
