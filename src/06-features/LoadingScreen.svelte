<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--height);
  }
</style>

<script>
  import Dots from "../08-shared/ui-kit/loaders/Dots.svelte";

  export let height = "100%";
</script>

<div style="--height: {height}">
  <Dots />
</div>
