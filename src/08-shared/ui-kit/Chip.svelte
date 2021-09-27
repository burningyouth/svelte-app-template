<style>
  .chip {
    display: inline-block;
    padding: var(--gap-100) var(--gap-200);
    background-color: rgba(0, 0, 0, 0.025);
    border: 1px solid var(--colors-grey-200);
    color: var(--colors-grey-500);
    border-radius: 12px;
    font-size: 0.85rem;
  }

  .chip:first-letter {
    text-transform: uppercase;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let removable = false;
  const dispatch = createEventDispatcher();

  const onRemoveClick = () => {
    dispatch("remove");
  };
</script>

<span {...$$props} on:click class="chip"
  ><slot>Undefined</slot>
  {#if removable}<span on:click="{onRemoveClick}">X</span>{/if}</span>
