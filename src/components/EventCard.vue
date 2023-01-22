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
      //if(minutes > 0) result = result + ' ' + minutes + 'm'; 
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
    <div 
      class="eventcard" 
      :class="[
        now / 1000 > event.start && now / 1000 < event.end ? 'eventcard_background_active' : 'eventcard_background_inactive',
        event.unkown_end ? 'fading' : ''
      ]" 
      v-bind:style="style_card">
      <div class="eventcard-body sticky">
        <div v-if="now / 1000 < event.start" class="timer timer_left">{{difference}}</div>
        <div class="namefield">{{ event.name }}</div>
        <div v-if="now / 1000 > event.start && now / 1000 < event.end" class="timer timer_right">{{difference}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .eventcard-container {
    display: flex;
    flex-direction: row;
  }

  .spacer {
    opacity: 0;
  }

  .eventcard-body {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 0px 12px;
    margin: -24px -24px;
  }

  .eventcard {
    color: black;
    display: flex;
    flex-direction: row;
    gap: 12px;
    border-image: url(../assets/background_event.png);
    border-width: 36px;
    border-style: solid;
    border-image-slice: 49% 49% fill;
    height: 0px;
  }

  .eventcard_background_active {
    border-image: url(../assets/background_event.png);
    border-width: 36px;
    border-style: solid;
    border-image-slice: 49% 49% fill;
  }

  .eventcard_background_inactive {
    border-image: url(../assets/background_event_inactive.png);
    border-width: 36px;
    border-style: solid;
    border-image-slice: 49% 49% fill;
  }

  .namefield {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    line-height: 26px;
    font-weight: bold;
    font-family: 'Helvetica';
    color: white;
    -webkit-text-stroke: 1px black;
    z-index: 3;
  }

  .timer {
    z-index: 2;
    white-space: nowrap;
    display: flex;
    align-items: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    -webkit-text-stroke: 1px black;
    padding: 0px 22px;
  }

  .timer_left {
    border-image: url(../assets/background_timer_red.png);
    border-image-width: auto auto;
    border-style: solid;
    border-image-slice: 49% 49% fill;
  }

  .timer_right {
    border-image: url(../assets/background_timer_green.png);
    border-image-width: auto auto;
    border-style: solid;
    border-image-slice: 49% 49% fill;
  }

  .fading {
    -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 67%, rgba(0,0,0,0) 100%);
    mask-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 67%, rgba(0,0,0,0) 100%);
  }
</style>
