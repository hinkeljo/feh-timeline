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

function parseJsonData(): EventCategory[] {
  let result: EventCategory[] = []; 
  json.forEach((entry) => {
    // does category already exist?
    let existingCategory = result.filter(e => e.name == entry._category);
    if(existingCategory.length == 1) {
      // add entry to existing category
      let category = existingCategory[0];
      category.events.addEvent(new Event(entry._event._name, entry._event._start, entry._event._end, entry._event._unkown_end));
    } else if(existingCategory.length == 0) {
      // create new category
      result.push(new EventCategory(
        entry._category, 
        new EventData([new Event(entry._event._name, entry._event._start, entry._event._end, entry._event._unkown_end)]),
        true
      ));
    } else {
      console.log("Found two instances of category: " + entry._category);
      console.log("This should NEVER happen!");
    }
  });
  return result;
}

</script>

<template>
  <header>
  </header>
  <main class="main background">
    <AppHeader :eventdata="eventData"/>
    <AppTimeline ref="timeline" :eventdata="eventData"/>
    <ButtonPanel>
      <AppButton label="Today" @click="scrollToCurrentDate()"/>
    </ButtonPanel>
  </main>
</template>

<style scoped>
  .main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .background {
    background-image: url(./assets/background_main_black.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
