<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import type { FehEventCategory } from '../interfaces/FehEventCategory';
	import ModalBody from './ModalBody.svelte';
	import Checkbox from './Checkbox.svelte';
	import Button from './Button.svelte';

	export let isOpen: boolean;
	export let eventData: FehEventCategory[];
	export let onChange: () => void;

	function close() {
		closeModal();
	}

	function onValueChange(category: FehEventCategory, checked: boolean) {
		category.shown = checked;
		onChange();
	}
</script>

{#if isOpen}
	<ModalBody>
		<h2>Filter</h2>
		<p>Choose which event categories to show.</p>
		<div class="categories">
			{#each eventData as category}
				<Checkbox
					checked={category.shown}
					label={category.name}
					colour={category.colour}
					onChange={(checked) => {
						onValueChange(category, checked);
					}}
				/>
			{/each}
		</div>
		<Button onClick={close}>Close</Button>
	</ModalBody>
{/if}

<style scoped>
	.categories {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
</style>
