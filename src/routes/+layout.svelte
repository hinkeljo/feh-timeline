<script lang="ts">
	import { Modals, closeModal } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import { locale, localeOptions } from '../stores/stores';
	import { browser } from '$app/environment';

	if (browser) {
		// check if local storage has locale preference set
		let storeLocale = localStorage.getItem('locale');
		if (storeLocale != null) {
			if (localeOptions.filter((option) => option.value == storeLocale).length > 0) {
				locale.set(storeLocale);
			} else {
				localStorage.removeItem('locale');
			}
		} else {
			localStorage.setItem('locale', $locale);
		}
	}
</script>

<slot />
<Modals>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div slot="backdrop" class="backdrop" transition:fade|local on:click={closeModal} />
</Modals>

<style>
	:root {
		--light: #ffffff;
		--dark: #000000;
	}

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
