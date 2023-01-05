<script setup lang="ts">
import { ref } from "vue";
import { Event } from "./classes/Event";
import { EventData } from "./classes/EventData";
import AppButton from "./components/AppButton.vue";
import AppTimeline from "./components/AppTimeline.vue";
import ButtonPanel from "./components/ButtonPanel.vue";
import AppHeader from "./components/AppHeader.vue";
import json from "./assets/events.json";

const eventData: EventData = new EventData(createEventList());

const timeline = ref(); 

function scrollToCurrentDate() {
  if(timeline.value == null) return; 
  timeline.value.scrollToCurrentDate();
}

function createEventList(): Event[] {
  const eventList: Event[] = []; 
  json.forEach((event) => {
    eventList.push(new Event(event.name, event.start, event.end));
  });
  return eventList; 
}

</script>

<template>
  <header>
  </header>
  <main class="main">
    <AppHeader/>
    <AppTimeline ref="timeline" :eventdata="eventData"/>
    <ButtonPanel>
      <AppButton label="Today" @click="scrollToCurrentDate()"/>
    </ButtonPanel>
  </main>
</template>

<style scoped>
  .main {
    max-width: 100vw;
  }
</style>
