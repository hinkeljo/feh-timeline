<script lang="ts">
	export let onClick: () => void;
	export let disabled = false; 
</script>

<button on:click={onClick} {disabled}>
	<slot />
</button>

<style scoped>
	button {
		all: unset;
		cursor: pointer;
		box-sizing: border-box;
		height: 48px;
		background-color: var(--light);
		color: var(--dark);
		font-size: 18px;
		padding: 8px 20px;
		text-align: center;
		border: 4px var(--dark) solid;
		box-shadow: 2px 2px 1px 0px var(--dark);

		transition: all 0.4s ease-in-out;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button:hover {
		background-color: var(--dark);
		color: var(--light);
		box-shadow: 4px 4px 1px 0px var(--dark);
	}
</style>
