<script lang="ts">
    import Svg from '@components/Svg.svelte';

    export let href: string;
    export let size = 6;
    export let className = '';
</script>

<a aria-label="go back to previous page" {href} class={className}>
    <Svg src="/icons/IconArrowLeftSolid.svg" {size} color="#ffeba7" />
</a>