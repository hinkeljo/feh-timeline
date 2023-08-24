<script lang="ts">
	import feh from '$lib/assets/feh.webp';
	import over from '$lib/assets/over.jpg';
	import EventCard from '../../components/EventCard.svelte';
	import type { FehEvent } from '../../interfaces/FehEvent.js';
	import { fetchEvents } from '../../remote/api.js';

	async function loadContent() {
		const events = await fetchEvents();
		const filtered = getEventAtNextReset(events);

		return {
			events: filtered
		};
	}

	function getEventAtNextReset(events: FehEvent[]) {
		let now = new Date();
		//now = new Date(now.getTime() - (24 * 60 * 60 * 1000 * 4));
		const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

		return events.filter((event) => {
			const startDate = new Date(event.date_start);
			return startDate >= now && startDate <= twentyFourHoursFromNow;
		});
	}

	let load = loadContent();
</script>

<div class="scroll">
	<div class="content">
		{#await load}
			<img class="feh" src={feh} alt="Feh, the messenger owl" />
		{:then data}
			{#if data.events.length <= 0}
				<img class="over" src={over} alt="It's over." />
			{:else}
				<h1>Content at next reset:</h1>
				{#each data.events as event}
					<EventCard {event} />
				{/each}
			{/if}
		{/await}
	</div>
</div>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;

		min-height: 100svh;
		width: 100%;

		padding: 32px;
	}

	.over {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	h1 {
		padding-bottom: 8px;
	}

	.scroll {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.feh {
		animation-name: spin;
		animation-duration: 1500ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
