<style>
  .root {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap-100);
    padding: 0 var(--gap-200);
    background-color: rgba(0, 0, 0, 0.025);
    border: 1px solid var(--colors-grey-200);
    color: var(--colors-grey-500);
    border-radius: 12px;
    font-size: 0.85rem;
    text-transform: capitalize;
    transition: border-color 0.05s ease-in;
    cursor: pointer;
  }

  .root * {
    line-height: 1;
  }

  .root:focus {
    outline: none;
    border-color: var(--colors-grey-500);
  }

  .chip--close-icon {
    color: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Close from "./icons/Close.svelte";

  export let removable = false;
  const dispatch = createEventDispatcher();

  const onRemoveClick = () => {
    dispatch("remove");
  };
</script>

<button {...$$props} on:click class="root {$$props.class}">
  <slot>Undefined</slot>
  {#if removable}
    <button
      {...$$props}
      on:click="{onRemoveClick}"
      tabindex="-1"
      class="chip--close-icon">
      <Close />
    </button>
  {/if}
</button>
