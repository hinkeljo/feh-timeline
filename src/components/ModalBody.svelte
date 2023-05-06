<script>
	import { fly } from "svelte/transition";
</script>

<div role="dialog" class="modal" transition:fly={{ y: 100 }} on:introstart on:outroend>
    <div class="contents">
        <slot></slot>
    </div>
</div>

<style scoped>
    .modal {
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		min-width: 240px;
		max-width: 90vw;
		padding: 16px;
		background: var(--light);
		display: flex;
		flex-direction: column;
		gap: 18px;
		justify-content: space-between;
		pointer-events: auto;
		box-shadow: 6px 6px 1px 0px var(--dark);
	}
</style>