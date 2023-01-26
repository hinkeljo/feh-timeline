<script setup lang="ts">
    import { ref, type Ref } from "@vue/reactivity";
    import CustomDataModal from "./CustomDataModal.vue";
    import FilterMenu from "./FilterMenu.vue";
    import type { EventCategory } from "@/classes/EventCategory";
    import { filter } from "@/classes/DialogService";

    const props = defineProps<{
        eventdata: EventCategory[],
    }>();

    let modalButtonCounter: Ref<number> = ref(0); 
    let modalActive: Ref<boolean> = ref(false);
    
    async function incrementModalCounter(): Promise<void> {
        modalButtonCounter.value = modalButtonCounter.value + 1;
        let result = await filter(props.eventdata);
        console.log(result);
    }

    function openCreateMenu(): void {
        modalActive.value = true;  
    }
</script>

<template>
    <div class="app-header center-h">
        <div class="app-header-content">
            <div class="text-heading center-v gap-12" @click="incrementModalCounter()">
                <img class="owl" src="@/assets/feh.png" />
                FEH Timeline
            </div>
            <!--div class="right">
                <FilterMenu :eventdata="eventdata"/>
                <div 
                v-if="modalButtonCounter >= 5"
                class="create text-subheading clickable" 
                @click="openCreateMenu()">
                    Create data
                </div>
            </div-->
        </div>
    </div>
    <CustomDataModal v-if="modalActive" @close="modalActive = false"/>
</template>

<style scoped>
    .app-header {
        width: 100%;
        min-height: 64px;
        background: url('@/assets/background_header.png') no-repeat;
        background-position-y: bottom;
        background-position-x: center;
    }

    .app-header-content {
        width: 100%;
        max-width: 600px;
        height: 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-left: 12px;
        padding-right: 12px;
    }

    .owl {
        max-width: 36px;
        max-height: 36px;
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
