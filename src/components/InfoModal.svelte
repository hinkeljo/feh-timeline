<script lang="ts">
	import { openModal } from 'svelte-modals';
	import Button from './Button.svelte';
	import ButtonLink from './ButtonLink.svelte';
	import LocaleSelection from './LocaleSelection.svelte';
	import ModalBody from './ModalBody.svelte';
	import Modal from './FeedbackModal.svelte';

	export let isOpen: boolean;

	function openFeedback() {
		openModal(Modal, {});
	}
</script>

{#if isOpen}
	<ModalBody>
		<h2>About</h2>
		<LocaleSelection />
		<Button onClick={openFeedback}>Feedback</Button>
		<ButtonLink href={'https://github.com/hinkeljo/feh-timeline'} inNewTab={true}>GitHub</ButtonLink
		>
	</ModalBody>
{/if}

<style scoped>
</style>
