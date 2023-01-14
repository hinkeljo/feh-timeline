<script setup lang="ts">
import { ref } from "vue";
import { Event } from "./classes/Event";
import { EventData } from "./classes/EventData";
import AppButton from "./components/AppButton.vue";
import AppTimeline from "./components/AppTimeline.vue";
import ButtonPanel from "./components/ButtonPanel.vue";
import AppHeader from "./components/AppHeader.vue";
import json from "./assets/events.json";
import { EventCategory } from "./classes/EventCategory";

const eventData: EventCategory[] = parseJsonData();

const timeline = ref(); 

function scrollToCurrentDate() {
  if(timeline.value == null) return; 
  timeline.value.scrollToCurrentDate();
}

function createEventList(): Event[] {
  const eventList: Event[] = []; 
  json.forEach((entry) => {
    eventList.push(new Event(entry.event.name, entry.event.start, entry.event.end));
  });
  return eventList; 
}

function parseJsonData(): EventCategory[] {
  let result: EventCategory[] = []; 
  json.forEach((entry) => {
    // does category already exist?
    let existingCategory = result.filter(e => e.name == entry.category);
    if(existingCategory.length == 1) {
      // add entry to existing category
      let category = existingCategory[0];
      category.events.addEvent(new Event(entry.event.name, entry.event.start, entry.event.end));
    } else if(existingCategory.length == 0) {
      // create new category
      console.log("adding new category: " + entry.category);
      result.push(new EventCategory(
        entry.category, 
        new EventData([new Event(entry.event.name, entry.event.start, entry.event.end)])
      ));
    } else {
      console.log("Found two instances of category: " + entry.category);
      console.log("This should NEVER happen!");
    }
  });
  return result;
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
