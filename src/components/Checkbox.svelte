<script lang="ts">
    export let checked: boolean = false;
    export let onChange: (checked: boolean) => void;
    export let label: string; 

    function onClick() {
        checked = !checked;
        onChange(checked);
    }
</script>

<button on:click={onClick}>
    <div class="checkbox" class:checked={checked}></div>
    <div class="label">{label}</div>
</button>

<style scoped>
    button {
        all: unset;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }

    .checkbox {
        width: 32px;
        height: 32px;
        border: 3px var(--dark) solid;
        background-color: var(--light);
    }

    .checked {
        background-color: var(--dark);
    }

    .label {
        font-size: 18px;
        color: var(--dark);
    }
</style>