<script lang="ts">
	import type { FehEventType } from '../interfaces/FehEventType';

	export let event_type: FehEventType;
</script>

<div class="event_type_chip" style="--event_type_colour: {event_type.colour};">
	{event_type.name}
</div>

<style scoped>
	.event_type_chip {
		border: 3px var(--dark) solid;
		width: fit-content;
		padding: 4px 8px;
		background-color: var(--event_type_colour);
	}
</style>
