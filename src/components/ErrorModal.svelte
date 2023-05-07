<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import Button from './Button.svelte';
	import ModalBody from './ModalBody.svelte';

	export let isOpen: boolean;

	function close() {
		closeModal();
	}
</script>

{#if isOpen}
	<ModalBody>
		<h2 class="error">Error</h2>
		<p>Something went wrong. <br /> Please try again later</p>
		<Button onClick={close}>Ok</Button>
	</ModalBody>
{/if}
