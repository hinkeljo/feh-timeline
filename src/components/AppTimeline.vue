<script setup lang="ts">
import { onMounted, computed } from "vue";
import TimelineMonth from "./TimelineMonth.vue";
import EventCard from "./EventCard.vue";
import { EventData } from "@/classes/EventData";
import DateIndicator from "./DateIndicator.vue";
import { Month } from "@/classes/Month";

onMounted(() => {
  scrollToCurrentDate();
});

const props = defineProps<{
  eventdata: EventData;
}>();

defineExpose({
  scrollToCurrentDate,
});

const currentOffset = computed(() => {
  let now: number = Date.now();
  // adjust for milliseconds
  let nowTimestamp: number = Math.floor(now / 1000);
  let start = Month.getTimestampForMonth(
    props.eventdata.months[0].index,
    props.eventdata.months[0].year
  );
  return EventData.calculateDayOffset(start, nowTimestamp);
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
          v-for="month in eventdata.months"
          :name="month.name"
          :days="month.days"
        />
      </div>
      <div class="eventlist">
        <div v-for="(row, index) in eventdata.getRows()" class="eventrow">
          <EventCard
            v-for="(element, index) in row"
            :event="element.event"
            :offset="element.offsetDays"
          />
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
