<script setup lang="ts">
    import { reactive } from "@vue/reactivity";
    import CustomDataEvent from "./CustomDataEvent.vue";
    import { Event } from '@/classes/Event';
    import AppButton from "./AppButton.vue";
import { EventExport } from "@/classes/EventExport";

    const eventExports: EventExport[] = reactive([]);

    function addEvent(): void {
        let newEvent: Event = new Event("New Event", 0, 0); 
        eventExports.push(new EventExport("", newEvent));
    }

    function exportEvents(): void {
        downloadJSON();
    }

    function downloadJSON(): void {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(eventExports).replace(/_/g, ""));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "events.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
</script>

<template>
    <div class="modal">
        <div class="modal-background">
            <div class="modal-card">
                <div class="modal-header">
                    <div class="text-heading center-v">Create event data</div>
                    <img src="../assets/icon_close.svg" class="close-button" @click="$emit('close')"/>
                </div>
                <div class="event-container">
                    <CustomDataEvent 
                        v-for="(eventExport, index) in eventExports"
                        :event-export="eventExport">
                    </CustomDataEvent>
                </div>
                <div class="add-button center text-subheading clickable" @click="addEvent()" >
                    <img class="add-icon" src="./icons/icon_add.svg" />
                    Add Event
                </div>
                <AppButton label="Export events" @click="exportEvents()"></AppButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal {
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 4;
    }

    .modal-background {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 24px;
    }

    .close-button {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .modal-card {
        background-color: white;
        border-radius: 24px;
        padding: 18px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 80%;
        max-height: 80%;
    }

    .add-button {
        gap: 4px;
    }

    .add-icon {
        width: 24px;
        height: 24px;
    }

    .event-container {
        display: flex;
        flex-direction: column;
        gap: 6px;
        overflow-y: auto;
    }
</style>
