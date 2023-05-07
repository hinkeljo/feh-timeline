<script lang="ts">
	import { onMount } from 'svelte';
	import type { FehEventCategory } from '../interfaces/FehEventCategory';
	import type { Month } from '../interfaces/Month';
	import TimelineEvent from './TimelineEvent.svelte';
	import { browser } from '$app/environment';
	import { openModal } from 'svelte-modals';
	import FilterModal from './TimelineFilterModal.svelte';
	import Button from './Button.svelte';
	import InfoButton from './InfoButton.svelte';
	import type { FehEvent } from '../interfaces/FehEvent';
	import { fly } from 'svelte/transition';

	export let anchor_date: string;
	export let months: Month[];
	export let event_data: FehEventCategory[];

	let header: HTMLDivElement;

	let width_day = 48;
	let height_day = 48;
	$: row_gap = height_day / 3;

	$: amount_days = () => {
		let days = 0;
		months.forEach((month) => {
			days += month.days;
		});
		return days;
	};

	$: current_offset = () => {
		let anchor = new Date(anchor_date);
		let current = new Date();
		let diff_ms = current.valueOf() - anchor.valueOf();
		let diff_days = diff_ms / (1000 * 60 * 60 * 24);
		return diff_days * width_day;
	};

	$: timeline_height = () => {
		let rows_amount = 0;
		event_data.forEach((category) => {
			rows_amount += category.rows.length;
		});
		return rows_amount * (height_day + row_gap);
	};

	function open_filter() {
		openModal(FilterModal, {
			eventData: event_data,
			onChange: () => {
				// reassign array to trigger reactivity
				event_data = [...event_data];
			}
		});
	}

	function has_immediate_followup(row: FehEvent[], event: FehEvent) {
		// check if the next element in the row has the same start date as the events end date
		let index = row.indexOf(event);
		if (index < row.length - 1) {
			let next_event = row[index + 1];
			return next_event.date_start === event.date_end;
		}
	}

	onMount(() => {
		// scroll to current_offset
		if (browser) {
			let offset = current_offset() - window.innerWidth / 2;
			window.scrollTo(offset, 0);
		}
	});
</script>

<div
	class="timeline"
	style="--width_day: {width_day}px; --height_day: {height_day}px; --row_gap: {row_gap}px;"
>
	<div class="timeline_header sticky" bind:this={header}>
		<div class="row sticky">
			<h1>FEH Timeline</h1>
		</div>
		<div class="month_list">
			{#each months as month}
				<div class="month">
					<div class="month_label sticky"><h2>{month.name}</h2></div>
					<div class="day_list">
						{#each Array(month.days) as _, i}
							<div class="day">
								{i + 1}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="day_separator_container">
		{#each Array(amount_days()) as _, i}
			<div
				class="day_separator"
				style="left: {(i + 1) * width_day - 1}px; height: {timeline_height()}px;"
			/>
		{/each}
		<div class="current_time" style="left: {current_offset()}px; height: {timeline_height()}px;" />
	</div>
	{#each event_data as category}
		{#if category.shown}
			{#each category.rows as row}
				<div class="event_row" transition:fly={{ x: 100 }}>
					{#each row as event}
						<TimelineEvent
							{event}
							{anchor_date}
							{width_day}
							has_immediate_followup={has_immediate_followup(row, event)}
						/>
					{/each}
				</div>
			{/each}
		{/if}
	{/each}
</div>
<div class="button_bar">
	<Button onClick={open_filter}>Filter</Button>
	<InfoButton />
</div>

<style scoped>
	.timeline {
		display: flex;
		flex-direction: column;
		gap: var(--row_gap);
		margin-bottom: calc(var(--height_day) * 2);
		border-bottom: 2px var(--dark) solid;
		width: fit-content;
	}

	.timeline_header {
		top: 0px;
		z-index: 4;
		background-color: var(--light);
		width: fit-content;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: fit-content;
		padding-left: 12px;
		gap: 24px;
	}

	h1 {
		width: fit-content;
	}

	.month_list {
		display: flex;
		flex-direction: row;
	}

	.month {
		display: flex;
		flex-direction: column;
		height: calc(2 * var(--height_day));
	}

	.month_label {
		height: var(--height_day);
		font-size: 1.5em;
		font-weight: bold;
		width: fit-content;
		padding: 0px 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.day_list {
		display: flex;
		flex-direction: row;
	}

	.day {
		width: var(--width_day);
		height: var(--width_day);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 4;

		border-top: 2px var(--dark) solid;
		border-bottom: 2px var(--dark) solid;
		border-left: 1px var(--dark) solid;
		border-right: 1px var(--dark) solid;

		font-size: 18px;
		font-weight: bold;
		color: var(--dark);
	}

	.day_separator_container {
		position: relative;
		z-index: 1;
		height: 0px;
		margin-top: calc(-1 * var(--row_gap));
	}

	.day_separator {
		position: absolute;
		z-index: 1;
		top: 0px;
		width: 2px;
		background-color: var(--dark);
	}

	.current_time {
		position: absolute;
		z-index: 4;
		top: 0px;
		left: 0px;
		width: 4px;
		background-color: red;
		transform: translateX(2px);
	}

	.event_row {
		position: relative;
		height: var(--width_day);
	}

	.button_bar {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 5;
		display: flex;
		flex-direction: row;
		gap: 12px;
	}
</style>
