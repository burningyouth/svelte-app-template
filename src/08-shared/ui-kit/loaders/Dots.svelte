<style>
  @keyframes loader {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.5;
    }

    50% {
      transform: scale(1.5);
      opacity: 1;
    }
  }

  div {
    display: inline-flex;
    gap: var(--gap-200);
  }

  .loader-item {
    animation-duration: 1s;
    animation-name: loader;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
    background-color: var(--circular-color);
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .loader-item:nth-of-type(2) {
    animation-delay: 0.25s;
  }

  .loader-item:nth-of-type(3) {
    animation-delay: 0.5s;
  }
</style>

<script lang="ts">
  const colorToVar = {
    primary: "var(--colors-grey-800)",
    secondary: "var(--colors-grey-500)",
    tertiary: "var(--colors-grey-200)",
  };

  export let color: "primary" | "secondary" | "tertiary" = "primary";
</script>

<div {...$$restProps} style="--circular-color: {colorToVar[color]}">
  <span class="loader-item"></span>
  <span class="loader-item"></span>
  <span class="loader-item"></span>
</div>
