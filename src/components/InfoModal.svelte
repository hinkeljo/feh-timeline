<script lang="ts">
	import ModalBody from "./ModalBody.svelte";

    export let isOpen: boolean;


</script>

{#if isOpen}
	<ModalBody>
		<h2>About</h2>
	</ModalBody>
{/if}

<style scoped>

</style>