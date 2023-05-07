<script lang="ts">
	export let toggled = false;
	export let onChange: (checked: boolean) => void;
	export let label: string;

	function toggle() {
		toggled = !toggled;
		onChange(toggled);
	}

    export function setTo(state: boolean) {
        toggled = state;
    }
</script>

<button on:click={toggle} class="toggle" class:toggled>
	<div class="label">{label}</div>
</button>

<style scoped>
	button {
		all: unset;
		cursor: pointer;
		display: flex;
		flex-direction: column;
        justify-content: center;
		align-items: center;
		gap: 12px;

        transition: all 0.4s ease-in-out;
	}

	.toggle {
		width: 32px;
		height: 32px;
		border: 3px var(--dark) solid;
		background-color: var(--light);
	}

	.toggled {
		background-color: var(--dark);
	}

	.label {
		font-size: 18px;
		font-weight: bold;
		color: var(--dark);
	}

    .toggled > .label {
        color: var(--light);
    }
</style>
