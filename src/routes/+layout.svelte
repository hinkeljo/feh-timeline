<script lang="ts">
	import { Modals, closeModal } from 'svelte-modals';
	import { fade } from 'svelte/transition';
</script>

<slot />
<Modals>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} />
</Modals>

<style scoped>
	.backdrop {
		position: fixed;
		z-index: 9;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
