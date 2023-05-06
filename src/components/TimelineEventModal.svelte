<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import type { FehEvent } from '../interfaces/FehEvent';
	import ModalBody from './ModalBody.svelte';
	import Button from './Button.svelte';
	import EventTypeChip from './EventTypeChip.svelte';

	export let isOpen: boolean;
	export let event: FehEvent;

	$: start = new Date(event.date_start).toLocaleString('de-DE');
	$: end = new Date(event.date_end).toLocaleString('de-DE');
</script>

{#if isOpen}
	<ModalBody>
		<h2>{event.name}</h2>
		<EventTypeChip event_type={event.expand.event_type}></EventTypeChip>
		<p>Starts: {start}</p>
		<p>Ends: {end}</p>
		<Button onClick={closeModal}>OK</Button>
	</ModalBody>
{/if}

<style scoped>
</style>
