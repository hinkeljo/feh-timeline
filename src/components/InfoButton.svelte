<script lang="ts">
	import { openModal } from 'svelte-modals';
	import Modal from './InfoModal.svelte';

	function onClick() {
		openModal(Modal, {});
	}
</script>

<button on:click={onClick}> i </button>

<style scoped>
	button {
		all: unset;
		cursor: pointer;
		color: var(--dark);
		background-color: var(--light);
		width: 48px;
		height: 48px;
		text-align: center;
		font-size: 24px;
		font-weight: bold;

		box-sizing: border-box;
		border: 4px var(--dark) solid;

		transition: all 0.4s ease-in-out;

		box-shadow: 2px 2px 1px 0px var(--dark);
	}

	button:hover {
		color: var(--light);
		background-color: var(--dark);
		box-shadow: 4px 4px 1px 0px var(--dark);
	}
</style>
