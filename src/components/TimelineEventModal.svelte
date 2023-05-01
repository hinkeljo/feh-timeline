<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import type { FehEvent } from '../interfaces/FehEvent';

	export let isOpen: boolean;
	export let event: FehEvent;

	$: start = new Date(event.date_start).toLocaleString('de-DE');
	$: end = new Date(event.date_end).toLocaleString('de-DE');
</script>

{#if isOpen}
	<div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
		<div class="contents">
			<h2>{event.name}</h2>
			<p>{event.expand.event_type.name}</p>
			<p>Starts: {start}</p>
			<p>Ends: {end}</p>
			<div class="actions">
				<button on:click={closeModal}>OK</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		min-width: 240px;
		border-radius: 6px;
		padding: 16px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	h2 {
		text-align: center;
		font-size: 24px;
	}

	p {
		text-align: center;
		margin-top: 16px;
	}

	.actions {
		margin-top: 32px;
		display: flex;
		justify-content: flex-end;
	}
</style>
