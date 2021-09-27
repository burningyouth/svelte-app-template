<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  div > p {
    color: var(--colors-error);
  }
</style>

<script lang="ts">
  export let error: Error;
</script>

{#if error}
  <div>
    <p>Что-то пошло не так: {error.message}</p>
  </div>
{/if}
