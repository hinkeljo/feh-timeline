<script setup lang="ts">
import { ref } from "vue";
import { Event } from "./classes/Event";
import { EventData } from "./classes/EventData";
import AppButtonToday from "./components/AppButtonToday.vue";
import AppButtonFilter from "./components/AppButtonFilter.vue";
import AppButtonInfo from "./components/AppButtonInfo.vue";
import AppTimeline from "./components/AppTimeline.vue";
import ButtonPanel from "./components/ButtonPanel.vue";
import AppHeader from "./components/AppHeader.vue";
import json from "./assets/events.json";
import { EventCategory } from "./classes/EventCategory";
import { DialogWrapper } from 'vue3-promise-dialog';
import { filter } from "./classes/DialogService";

const eventData: EventCategory[] = parseJsonData();

const timeline = ref(); 

function scrollToCurrentDate() {
  if(timeline.value == null) return; 
  timeline.value.scrollToCurrentDate();
}

async function openFilterMenu() {
  let result = await filter(eventData);
  console.log(result);
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
      return []; 
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
    <AppTimeline v-if="eventData.length > 0" ref="timeline" :eventdata="eventData"/>
    <ButtonPanel v-if="eventData.length > 0">
      <AppButtonFilter @click="openFilterMenu()"/>
      <AppButtonToday @click="scrollToCurrentDate()"/>
      <AppButtonInfo @click=""/>
    </ButtonPanel>
    <div v-if="eventData.length == 0" class="center">
      <img class="sand" src="./assets/sand.jpg"/>
    </div>
    <DialogWrapper :transition-attrs="{name: 'dialog'}"/>
  </main>
</template>

<style scoped>
  .main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .sand {
    max-width: 100%;
  }

  .background {
    background-image: url(./assets/background_main_black.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
