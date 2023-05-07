<script lang="ts">
	import { closeModal, openModal } from 'svelte-modals';
	import Button from './Button.svelte';
	import ButtonLink from './ButtonLink.svelte';
	import LocaleSelection from './LocaleSelection.svelte';
	import ModalBody from './ModalBody.svelte';
	import { sendFeedback } from '../remote/api';
	import SuccessModal from './SuccessModal.svelte';
	import ErrorModal from './ErrorModal.svelte';

	export let isOpen: boolean;

	function close() {
		closeModal();
	}

	let subject: string = '';
	let message: string = '';

	$: valid = subject.length > 0 && message.length > 0;

	let sending = false; 
	async function send() {
		if(sending) return;
		sending = true;
		let success = await sendFeedback(subject, message);
		if (success) {
			sending = false;
			openModal(SuccessModal, {});
		} else {
			sending = false;
			openModal(ErrorModal, {});
		}
	}
</script>

{#if isOpen}
	<ModalBody>
		<h2>Send Feedback</h2>
		<p>If you spot an error, feel free to send me feedback and maybe I will correct it.</p>
		<div class="input">			<h3>Subject *</h3>
			<input type="text" bind:value={subject} />
		</div>
		<div class="input">
			<h3>Message *</h3>
			<textarea bind:value={message} />
		</div>
		<Button onClick={send} disabled={!valid}>Send</Button>
		<Button onClick={close}>Cancel</Button>
	</ModalBody>
{/if}

<style scoped>
	.input {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	input,
	textarea {
		all: unset;
		border: 4px var(--dark) solid;
		padding: 4px;
	}
</style>
