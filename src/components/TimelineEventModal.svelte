<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
	import type { FehEvent } from '../interfaces/FehEvent';
	import ModalBody from './ModalBody.svelte';

	export let isOpen: boolean;
	export let event: FehEvent;

	$: start = new Date(event.date_start).toLocaleString('de-DE');
	$: end = new Date(event.date_end).toLocaleString('de-DE');
</script>

{#if isOpen}
	<ModalBody>
		<h2>{event.name}</h2>
		<p>{event.expand.event_type.name}</p>
		<p>Starts: {start}</p>
		<p>Ends: {end}</p>
		<div class="actions">
			<button on:click={closeModal}>OK</button>
		</div>
	</ModalBody>
{/if}

<style>
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
