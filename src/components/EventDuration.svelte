<script lang="ts">
	import { onMount } from 'svelte';
	import type { FehEvent } from '../interfaces/FehEvent';
	import { locale } from '../stores/stores';

	export let event: FehEvent;

	$: start = new Date(event.date_start).toLocaleString($locale);
	$: end = event.end_unknown ? 'Unknown' : new Date(event.date_end).toLocaleString($locale);

	let elapsed_percent = 0;

	function calculateElpasedTime() {
		const elapsed =
			(new Date().getTime() - new Date(event.date_start).getTime()) /
			(new Date(event.date_end).getTime() - new Date(event.date_start).getTime());
		elapsed_percent = elapsed * 100;
	}

	onMount(() => {
		setTimeout(() => {
			calculateElpasedTime();
		}, 100);
	});
</script>

<div class="column" style="--elapsed: {elapsed_percent}%">
	<div class="row">
		<p><b>Starts:</b></p>
		<p>{start}</p>
	</div>
	<div class="row">
		<p><b>Ends:</b></p>
		<p>{end}</p>
	</div>
</div>

<style scoped>
	.column {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 4px;
	}
</style>
