<script lang="ts">
	import type { FehEvent } from '../interfaces/FehEvent';
	import { get_duration, get_offset } from '../utils/EventUtils';
	import { openModal } from 'svelte-modals';
	import Modal from './TimelineEventModal.svelte';

	export let event: FehEvent;
	export let anchor_date: string;
	export let width_day: number;

	function open_details() {
		openModal(Modal, { event: event });
	}
</script>

<button
	on:click={open_details}
	class="event"
	style="
        --event_offset: {width_day * get_offset(event, anchor_date)}px;
        --event_width: {width_day * get_duration(event)}px;"
>
	<div class="event_label sticky">{event.name}</div>
</button>

<style scoped>
	.event {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: 0px;
		left: var(--event_offset);
		width: var(--event_width);
		height: var(--height_day);
		background-color: white;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-radius: 24px;
		border: 5px black solid;
		padding: 12px 0px;
		z-index: 2;
		transition: transform 0.4s ease-in-out;
	}

	.event:hover {
		transform: scale(1.025);
		z-index: 3;
	}

	.event_label {
		font-size: 1.5em;
		padding: 0px 12px;
	}
</style>
