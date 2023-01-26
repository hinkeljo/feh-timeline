<script setup lang="ts">
    import type { EventCategory } from "@/classes/EventCategory";
import { RefreshService } from "@/classes/RefreshService";
    import { computed, ref } from "@vue/reactivity";
    import type { ComputedRef } from "vue";

    const props = defineProps<{
        eventdata: EventCategory[],
    }>();

    const categories: ComputedRef<string[]> = computed(() => {
        let result: string[] = [];
        props.eventdata.forEach(element => {
            result.push(element.name);
        });
        return result; 
    });

    const menuOpen = ref(false);

    function toggleMenu(): void {
        menuOpen.value = !menuOpen.value; 
    }

    function toggleFilter(event: any, category: EventCategory) {
        const checked = event.target.checked;
        category.visible = checked; 
        RefreshService.Instance.refresh(); 
    }
</script>

<template>
    <div class="filter text-normal" 
        v-if="categories.length > 0"
        @click="toggleMenu()">
        <img class="filter-icon" src="../assets/icon_filter.svg" />
        Filter
    </div>
    <div class="menu" :class="[menuOpen == true ? 'menu_open' : 'menu_close']">
        <div v-for="category in eventdata" class="category-check">
            <input class="checkbox" type="checkbox" checked @change="toggleFilter($event, category)">
            <div>{{category.name}}</div>
        </div>
    </div>
</template>

<style scoped>
    .filter {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
    }

    .filter-icon {
        width: 24px;
        height: 24px;
    }

    .menu {
        position: absolute;
        top: 34px;
        right: -12px;
        color: black;
        background-color: orange;
        z-index: 98;
        white-space: nowrap;
        animation: opacity
    }

    .menu_open {
        visibility: visible;
    }

    .menu_close {
        visibility: hidden;
    }

    .category-check {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: 6px;
        padding: 3px 12px;
        font-size: 18px;
    }

    .checkbox {
        width: 18px;
        height: 18px;
    }
</style>
