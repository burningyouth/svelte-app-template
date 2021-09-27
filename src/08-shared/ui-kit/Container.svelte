<style>
  div {
    width: 100%;
    max-width: var(--width);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--gap-400);
    padding-right: var(--gap-400);
  }

  @media (max-width: 500px) {
    div {
      padding-left: var(--gap-300);
      padding-right: var(--gap-300);
    }
  }

  .disableGutters {
    padding-left: 0;
    padding-right: 0;
  }
</style>

<script lang="ts">
  const widthToVar = {
    xs: "var(--breakpoint-xs)",
    sm: "var(--breakpoint-sm)",
    md: "var(--breakpoint-md)",
    lg: "var(--breakpoint-lg)",
    xl: "var(--breakpoint-xl)",
  };
  export let width: BasicBreakpoints = "lg";
  export let disableGutters = false;
</script>

<div {...$$restProps} style="--width: {widthToVar[width]}" class:disableGutters>
  <slot />
</div>
