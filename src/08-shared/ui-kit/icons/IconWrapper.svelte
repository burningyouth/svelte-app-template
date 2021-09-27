<script lang="ts">
  export let color: Color = "currentColor";
  export let size = "1em";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  height="{size}"
  viewBox="0 0 24 24"
  width="{size}"
  fill="{color}"
  {...$$restProps}
  on:click>
  <slot />
</svg>
