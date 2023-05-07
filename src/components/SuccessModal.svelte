<script lang="ts">
	import { closeAllModals } from 'svelte-modals';
	import Button from './Button.svelte';
	import ModalBody from './ModalBody.svelte';

	export let isOpen: boolean;

	function close() {
		closeAllModals();
	}
</script>

{#if isOpen}
	<ModalBody>
		<h2>Success</h2>
        <Button onClick={close}>Ok</Button>
	</ModalBody>
{/if}
