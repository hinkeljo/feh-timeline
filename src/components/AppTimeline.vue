<script setup lang="ts">
import { onMounted, computed, type ComputedRef } from "vue";
import TimelineMonth from "./TimelineMonth.vue";
import EventCard from "./EventCard.vue";
import { EventData } from "@/classes/EventData";
import DateIndicator from "./DateIndicator.vue";
import { Month } from "@/classes/Month";
import type { EventCategory } from "@/classes/EventCategory";

onMounted(() => {
  console.log(months.value);
  scrollToCurrentDate();
});

const props = defineProps<{
  eventdata: EventCategory[];
}>();

defineExpose({
  scrollToCurrentDate,
});

const currentOffset: ComputedRef<number> = computed(() => {
  let now: number = Date.now();
  // adjust for milliseconds
  let nowTimestamp: number = Math.floor(now / 1000);
  let firstMonth: Month = months.value[0];
  if(firstMonth == undefined) {
    return 0; 
  }
  let start = Month.getTimestampForMonth(
    firstMonth.index,
    firstMonth.year
  );
  return EventData.calculateDayOffset(start, nowTimestamp);
});

const months: ComputedRef<Month[]> = computed(() => {
  console.log("calculating months...");
  let result: Month[] = []; 
  // add all unqiue months
  console.log(props.eventdata);
  props.eventdata.forEach((entry) => {
    entry.events.months.forEach((month) => {
      if(result.filter(m => m.index == month.index && m.year == month.year).length == 0) {
        console.log("adding month " + month.index + " of " + month.year);
        result.push(month);
      }
    });
  });
  // sort months
  return result.sort((a, b) => {
    if(a.year > b.year) return 1; 
    else if(a.year < b.year) return -1; 
    else return a.index > b.index ? 1 : -1;
  }); 
});

function scrollToCurrentDate(): void {
  // get day offset
  let scrollTarget: number = currentOffset.value * 48;
  // adjust for page width
  scrollTarget = scrollTarget - window.innerWidth / 2;
  let scrollElement: HTMLElement | null =
    document.getElementById("timelineContainer");
  let scrollBehaviour: ScrollToOptions = {
    top: 0,
    left: scrollTarget,
    behavior: "smooth",
  };
  scrollElement!.scrollTo(scrollBehaviour);
}
</script>

<template>
  <div class="vertical-scroll">
    <div class="timeline-container" id="timelineContainer">
      <div class="timeline">
        <TimelineMonth
          v-for="month in months"
          :name="month.name"
          :days="month.days"
        />
      </div>
      <div class="category-list">
        <div v-for="(category, index) in eventdata" class="eventlist">
          <div v-for="(row, index) in category.events.getRows()" class="eventrow">
            <EventCard
              v-for="(element, index) in row"
              :event="element.event"
              :offset="element.offsetDays"
            />
          </div>
        </div>
        <DateIndicator :offsetDays="currentOffset"> </DateIndicator>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vertical-scroll {
  width: 100%;
}

.timeline-container {
  padding: 12px;
  overflow-x: scroll;
}

.timeline {
  display: flex;
  flex-direction: row;
}

.eventlist {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.eventrow {
  display: flex;
  flex-direction: row;
}
</style>
