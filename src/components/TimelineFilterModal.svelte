<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { fly } from 'svelte/transition';
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
                <Checkbox checked={category.shown} label={category.name} onChange={(checked) => {
                    onValueChange(category, checked);
                }}></Checkbox>
            {/each}
        </div>
        <Button label="Close" onClick={close}></Button>
    </ModalBody>
{/if}

<style scoped>
    h2 {
        all: unset;
        text-align: center;
        font-size: 32px;
        font-weight: bold;
    }

    .categories {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
</style>
