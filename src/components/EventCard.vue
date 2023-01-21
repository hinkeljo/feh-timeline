<script setup lang="ts">
  import type { Event } from '@/classes/Event';
  import dayjs from 'dayjs';
  import { computed, onMounted, ref, type Ref } from 'vue';

  const props = defineProps<{
    event: Event,
    offset: number
  }>();

  const style_spacer = computed(() => {
    let width: number = props.offset * 48; 
    return {
      'width': width + 'px',
    };
  });

  const style_card = computed(() => {
    let width: number = props.event.getLengthInDays() * 48; 
    return {
      'width': width + 'px',
      'max-width': width + 'px'
    };
  });

  const now: Ref<number> = ref( Date.now() ); 
  const difference = computed(() => {
    if((now.value / 1000 > props.event.start && now.value / 1000 < props.event.end) 
      && props.event.unkown_end) return "Unknown";
    // adjust for milliseconds
    const currentTime = now.value / 1000; 
    let compare  = 0; 
    if(currentTime < props.event.start) compare = props.event.start;
    else if(currentTime < props.event.end) compare = props.event.end;
    if(compare != 0) {
      const dateNow = dayjs.unix(currentTime); 
      const dateCompare = dayjs.unix(compare);
      let hours = Math.abs(dateNow.diff(dateCompare, 'hours', true));  
      const minutes = Math.floor((hours * 60) % 60); 
      const days = Math.floor(hours / 24);
      hours = Math.floor(hours - (days * 24));
      let result: string = ''; 
      if(days > 0) result = days + 'd'; 
      if(hours > 0) result = result + ' ' + hours + 'h';
      if(minutes > 0) result = result + ' ' + minutes + 'm'; 
      return result; 
    } else return ''; 
  }); 

  onMounted(() => {
    console.log('Event ' + props.event.name); 
    console.log('Start ' + dayjs.unix(props.event.start).format('DD.MM.YYYY hh:mm')); 
    console.log('End ' + dayjs.unix(props.event.end).format('DD.MM.YYYY hh:mm'));
    console.log('Runs for ' + props.event.getLengthInDays() + ' days');
    console.log('Offset: ' + props.offset + ' days');
    console.log('-----');
  });
</script>

<template>
  <div class="eventcard-container">
    <div class="spacer" v-bind:style="style_spacer"></div>
    <div class="eventcard" :class="{fading: event.unkown_end}" v-bind:style="style_card">
      <div class="eventcard-body sticky">
        <div v-if="now / 1000 < event.start" class="timer">{{difference}}</div>
        <div class="namefield">{{ event.name }}</div>
        <div v-if="now / 1000 > event.start && now / 1000 < event.end" class="timer">{{difference}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .eventcard-container {
    display: flex;
    flex-direction: row;
    height: 54px;
    max-height: 54px;
  }

  .spacer {
    opacity: 0;
  }

  .eventcard-body {
    display: flex;
    flex-direction: row;
    padding: 0px 12px;
    gap: 12px;
  }

  .eventcard {
    border-radius: 12px; 
    color: black;
    background-color: white;
    padding: 12px 0px;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

  .namefield {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    z-index: 2;
  }

  .timer {
    background-color: grey;
    border-radius: 4px;
    color: orange;
    padding: 2px 4px 2px 4px;
    z-index: 2;
    white-space: nowrap;
  }

  .fading {
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 67%, rgba(255,255,255,0) 100%);
  }
</style>
