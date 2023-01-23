<script setup lang="ts">
import { onMounted, computed, type ComputedRef, ref } from "vue";
import TimelineMonth from "./TimelineMonth.vue";
import EventCard from "./EventCard.vue";
import { EventData } from "@/classes/EventData";
import { RefreshService } from "@/classes/RefreshService";
import DateIndicator from "./DateIndicator.vue";
import { Month } from "@/classes/Month";
import type { EventCategory } from "@/classes/EventCategory";

const refreshKey = ref(0);

onMounted(() => {
  scrollToCurrentDate();
  let refreshHandler = (rs: RefreshService, key: number) => {
    console.log("Refresh!");
    refreshKey.value = key;
  }
  RefreshService.Instance.OnRefresh.on(refreshHandler);
});

const props = defineProps<{
  eventdata: EventCategory[];
}>();

defineExpose({
  scrollToCurrentDate,
});

const filteredEventData = computed(() => {
  const key = refreshKey.value;
  console.log("Computing event data...");
  return props.eventdata.filter(e => e.visible && key == key);
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
  let result: Month[] = []; 
  // add all unqiue months
  props.eventdata.forEach((entry) => {
    entry.events.months.forEach((month) => {
      if(result.filter(m => m.index == month.index && m.year == month.year).length == 0) {
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
    document.getElementById("scrollContainerX");
  let scrollBehaviour: ScrollToOptions = {
    top: 0,
    left: scrollTarget,
    behavior: "smooth",
  };
  scrollElement!.scrollTo(scrollBehaviour);
}
</script>

<template>
  <div class="scroll-container-x" id="scrollContainerX">
    <div class="timeline-container">
      <div class="timeline">
        <TimelineMonth
          v-for="month in months"
          :name="month.name"
          :days="month.days"
        />
      </div>
      <div class="scroll-container-y">
        <div class="category-list">
          <div v-for="category in filteredEventData" class="eventlist">
            <div v-for="row in category.events.getRows()" class="eventrow">
              <EventCard
                v-for="element in row"
                :event="element.event"
                :offset="element.offsetDays"
              />
            </div>
          </div>
          <DateIndicator :offsetDays="currentOffset"> </DateIndicator>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container-x {
  width: 100%;
  flex-grow: 1;    
  overflow-x: auto;
  overflow-y: auto;
  overscroll-behavior: none;
}

.scroll-container-y {
  width: 100%;
  padding-bottom: 164px;
}

.timeline-container {
  width: fit-content;
  height: fit-content;
}

.timeline {
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0px;
  padding-top: 12px;
  z-index: 9;

  background-image: url('@/assets/background_main_black.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.category-list {
  width: 100%;
  height: fit-content;
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
