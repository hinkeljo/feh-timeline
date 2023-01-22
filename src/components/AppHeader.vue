<script setup lang="ts">
    import { ref, type Ref } from "@vue/reactivity";
    import CustomDataModal from "./CustomDataModal.vue";
    import FilterMenu from "./FilterMenu.vue";
    import type { EventCategory } from "@/classes/EventCategory";

    const props = defineProps<{
        eventdata: EventCategory[],
    }>();

    let modalButtonCounter: Ref<number> = ref(0); 
    let modalActive: Ref<boolean> = ref(false);
    
    function incrementModalCounter(): void {
        modalButtonCounter.value = modalButtonCounter.value + 1;
    }

    function openCreateMenu(): void {
        modalActive.value = true;  
    }
</script>

<template>
    <div class="app-header">
        <div class="text-heading" @click="incrementModalCounter()">🦉 FEH Timeline</div>
        <div class="right">
            <FilterMenu :eventdata="eventdata"/>
            <div 
             v-if="modalButtonCounter >= 5"
             class="create text-subheading clickable" 
             @click="openCreateMenu()">
                Create data
            </div>
        </div>
    </div>
    <CustomDataModal v-if="modalActive" @close="modalActive = false"/>
</template>

<style scoped>
    .app-header {
        width: 100%;
        min-height: 52px;
        background-color: orange;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 12px;
        padding-right: 12px;
    }

    .right {
        display: flex;
        flex-direction: row;
        gap: 24px;
    }

    .create {
        text-decoration: underline;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
