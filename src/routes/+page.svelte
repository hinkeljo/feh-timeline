<script>
	import Timeline from '../components/Timeline.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Timeline months={data.months} event_data={data.event_data} anchor_date={data.anchor_date} />
