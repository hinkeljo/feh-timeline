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
        flex-direction: column;
    }

    .checkbox {
        width: 24px;
        height: 24px;
        border: 2px black solid;
        border-radius: 4px;
        background-color: white;
        margin: 0px 12px;
    }

    .checked {
        background-color: black;
    }
</style>