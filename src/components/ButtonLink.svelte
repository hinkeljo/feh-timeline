<script lang="ts">
    export let href: string;
    export let inNewTab: boolean = false;
</script>

<a href={href} target={inNewTab ? "_blank" : "_self"}>
	<slot />
</a>

<style scoped>
	a {
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

		transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
	}

	a:hover {
		background-color: var(--dark);
		color: var(--light);
	}
</style>
