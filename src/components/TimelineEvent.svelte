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

	$: event_started = new Date().getTime() >= new Date(event.date_start).getTime();

	$: time_to_start = () => {
		const now = new Date().getTime();
		const start = new Date(event.date_start).getTime();
		const end = new Date(event.date_end).getTime();
		if (now >= start && now <= end && event.end_unkown) return 'Unknown';
		let compare = 0;
		if (now < start) compare = start;
		else if (now < end) compare = end;
		if (compare != 0) {
			let diff = compare - now;
			let days = Math.floor(diff / (1000 * 60 * 60 * 24));
			let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			if (days > 0) {
				return `${days}D ${hours}H`;
			} else {
				return `${hours}H ${minutes}M `;
			}
		} else return '';
	};
</script>

<button
	on:click={open_details}
	class="event"
	style="
        --event_offset: {width_day * get_offset(event, anchor_date)}px;
        --event_width: {width_day * get_duration(event)}px;
		--event_type_colour: {event.expand.event_type.colour};"
>
	<div class="event_label sticky">
		{#if !event_started}
			<div class="time_chip">{time_to_start()}</div>
		{/if}
		<div class="event_name">
			{event.name}
		</div>
		{#if event_started}
			<div class="time_chip">{time_to_start()}</div>
		{/if}
	</div>
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
		background-color: var(--event_type_colour);
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border: 4px black solid;
		padding: 8px 0px;
		z-index: 2;
		transition: transform 0.4s ease-in-out;

		box-shadow: 4px 4px 1px 0px var(--dark);
	}

	.event:hover {
		transform: scale(1.025);
		z-index: 3;
	}

	.event_label {
		padding: 0px 8px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 8px;
	}

	.event_name {
		color: var(--dark);
		font-size: calc(var(--height_day) / 2);
	}

	.time_chip {
		background-color: var(--light);
		padding: 4px;
		border: 3px solid var(--dark);
		font-size: 12px;
		min-width: fit-content;
		height: fit-content;
	}
</style>
