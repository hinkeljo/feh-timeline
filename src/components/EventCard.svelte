<script lang="ts">
	import type { FehEvent } from '../interfaces/FehEvent';
	import { openModal } from 'svelte-modals';
	import Modal from './TimelineEventModal.svelte';

	export let event: FehEvent;

	function open_details() {
		openModal(Modal, { event: event });
	}
</script>

<button
	on:click={open_details}
	class="event"
	style="--event_type_colour: {event.expand.event_type.colour};"
>
	<div class="event_label">
		<h2 class="dark no-bold">{event.name}</h2>
	</div>
</button>

<style scoped>
	.event {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		background-color: var(--event_type_colour);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 4px var(--dark) solid;
		padding: 8px 0px;
		transition: all 0.4s ease-in-out;
		box-shadow: 2px 2px 1px 0px var(--dark);

		width: 736px;
	}

	.event:hover {
		box-shadow: 4px 4px 1px 0px var(--dark);
	}

	.event_label {
		padding: 9px 8px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}

	h2 {
		text-align: center;
	}

	@media screen and (max-width: 799px) {
		.event {
			width: 100%;
		}
	}
</style>
