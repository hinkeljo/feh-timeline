<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import type { FehEvent } from '../interfaces/FehEvent';
	import ModalBody from './ModalBody.svelte';
	import Button from './Button.svelte';
	import EventTypeChip from './EventTypeChip.svelte';
	import EventDuration from './EventDuration.svelte';

	export let isOpen: boolean;
	export let event: FehEvent;
</script>

{#if isOpen}
	<ModalBody>
		<h2>{event.name}</h2>
		<EventTypeChip event_type={event.expand.event_type} />
		<EventDuration {event} />
		<Button onClick={closeModal}>OK</Button>
	</ModalBody>
{/if}

<style scoped>
</style>
