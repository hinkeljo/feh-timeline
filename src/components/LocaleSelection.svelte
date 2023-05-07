<script lang="ts">
	import { onMount } from 'svelte';
    import { locale, localeOptions } from '../stores/stores';
	import Toggle from './Toggle.svelte';

    let toggles: Toggle[] = [];

    function onSelected(toggle: Toggle, value: string) {
        locale.set(value);
        localStorage.setItem('locale', value);

        // set all other toggles to false
        toggles.forEach((t) => {
            if(t != toggle) {
                t.setTo(false);
            }
        });
    }

    function selectInitial() {
        let i = 0; 
        for(const localeOption of localeOptions) {
            if(localeOption.value == $locale) {
                toggles[i].setTo(true);
                return; 
            } else {
                i++;
            }
        }
    }

    onMount(() => {
        selectInitial();
    });
</script>

<div class="container">
    <h3>Locale</h3>
    <div class="row">
        {#each localeOptions as localeOption, i}
            <Toggle 
                bind:this={toggles[i]}
                label={localeOption.name} 
                onChange={(toggled) => {if(toggled) onSelected(toggles[i], localeOption.value)}}>
            </Toggle>
        {/each}
    </div>
</div>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .row {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }
</style>