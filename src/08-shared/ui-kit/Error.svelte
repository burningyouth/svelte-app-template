<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--gap-300);
    min-height: var(--height);
  }

  div > p {
    color: var(--colors-error);
  }
</style>

<script lang="ts">
  export let message = "";
  export let title = "Упс, произошла ошибка!";
  export let height = "25vh";
</script>

<div style="--height: {height}">
  <h2>{title}</h2>
  {#if message}<p>{message}</p>{/if}
  <slot />
</div>
