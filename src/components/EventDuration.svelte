<script lang="ts">
	import type { FehEvent } from "../interfaces/FehEvent";

    export let event: FehEvent;
</script>

<div class="row">
    <div class="column">

    </div>
    to
    <div class="column">

    </div>
</div>

<style scoped>
    .row {
        display: flex;
        flex-direction: row;
    }

    .column {
        display: flex;
        flex-direction: column;
    }
</style>