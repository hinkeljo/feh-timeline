<script lang="ts">
	import type { FehEvent } from '../interfaces/FehEvent';
	import { get_duration, get_offset } from '../utils/EventUtils';
	import { openModal } from 'svelte-modals';
	import Modal from './TimelineEventModal.svelte';
	import { slide } from 'svelte/transition';

	export let event: FehEvent;
	export let anchor_date: string;
	export let width_day: number;
	export let has_immediate_followup: boolean = false;

	let card: HTMLElement;

	function open_details() {
		openModal(Modal, { event: event });
	}

	$: event_started = new Date().getTime() >= new Date(event.date_start).getTime();
	$: event_ended = new Date().getTime() >= new Date(event.date_end).getTime();

	$: time_to_start = () => {
		const now = new Date().getTime();
		const start = new Date(event.date_start).getTime();
		const end = new Date(event.date_end).getTime();
		if (now >= start && now <= end && event.end_unknown) return '???';
		let compare = 0;
		if (now < start) compare = start;
		else if (now < end) compare = end;
		//if(now >= end) return "It's over"
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

	$: show_chip = () => {
		if (!card) return false;
		if (event_ended) return false;
		return card.offsetWidth >= width_day * 5;
	};

	let hovered = false;
</script>

{#if event.end_unknown}
	<div
		class="shadow"
		class:hovered={hovered}
		style="
	--width_day: {width_day}px;
	--event_offset: {width_day * get_offset(event, anchor_date)}px;
	--event_width: {width_day * get_duration(event)}px;
	--event_type_colour: {event.expand.event_type.colour};"
	/>
{/if}
<button
	bind:this={card}
	on:click={open_details}
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	class="event"
	class:no_border_right={has_immediate_followup}
	class:end_unknown={event.end_unknown}
	class:its_over={event_ended}
	style="
        --event_offset: {width_day * get_offset(event, anchor_date)}px;
        --event_width: {width_day * get_duration(event)}px;
		--event_type_colour: {event.expand.event_type.colour};"
>
	<div class="event_label sticky">
		{#if !event_started && show_chip()}
			<div class="time_chip" transition:slide>{time_to_start()}</div>
		{/if}
		<div class="event_name">
			{event.name_short == '' ? event.name : event.name_short}
		</div>
		{#if event_started && show_chip()}
			<div class="time_chip" transition:slide>{time_to_start()}</div>
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
		border: 4px var(--dark) solid;
		padding: 8px 0px;
		z-index: 2;
		transition: all 0.4s ease-in-out;

		box-shadow: 2px 2px 1px 0px var(--dark);
	}

	.event:hover {
		box-shadow: 4px 4px 1px 0px var(--dark);
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

	.its_over {
		opacity: 0.9;
		filter: grayscale(50%);
	}

	.its_over:hover {
		opacity: 1;
		filter: grayscale(0%);
	}

	.no_border_right {
		border-right: none;
	}

	.end_unknown {
		-webkit-mask-image: linear-gradient(to right, var(--event_type_colour) 75%, transparent 100%);
		mask-image: linear-gradient(to right, var(--event_type_colour) 75%, transparent 100%);
	}

	.shadow {
		all: unset;
		box-sizing: border-box;
		position: absolute;
		top: calc(var(--width_day) - 2px);
		left: calc(var(--event_offset) + 2px);
		width: var(--event_width);
		height: 4px;
		z-index: 2;
		background-color: var(--dark);
		transition: all 0.4s ease-in-out;
		-webkit-mask-image: linear-gradient(to right, var(--event_type_colour) 75%, transparent 100%);
		mask-image: linear-gradient(to right, var(--event_type_colour) 75%, transparent 100%);
	}

	.shadow.hovered {
		left: calc(var(--event_offset) + 4px);
		height: 6px;
	}
</style>
