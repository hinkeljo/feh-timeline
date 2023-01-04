<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { Event } from "./classes/Event";
import { EventData } from "./classes/EventData";
import ButtonToday from "./components/ButtonToday.vue";
import Timeline from "./components/Timeline.vue";
import ButtonPanel from "./components/ButtonPanel.vue";
import AppHeader from "./components/AppHeader.vue";

const eventData: EventData = new EventData(
  [
    new Event('Testing 1', 1670655600, 1671951600),
    new Event('Testing 2', 1671865200, 1672902000),
    new Event('Testing 3', 1671865200, 1672988400),
    new Event('Testing 4', 1672902000, 1681951600)
  ]
);

const timeline = ref(); 

function scrollToCurrentDate() {
  if(timeline.value == null) return; 
  timeline.value.scrollToCurrentDate();
}

</script>

<template>
  <header>
  </header>
  <main class="main">
    <Timeline ref="timeline" :eventdata="eventData"/>
    <ButtonPanel>
      <ButtonToday @click="scrollToCurrentDate()"></ButtonToday>
    </ButtonPanel>
  </main>
</template>

<style scoped>
  .main {
    max-width: 100vw;
  }
</style>
