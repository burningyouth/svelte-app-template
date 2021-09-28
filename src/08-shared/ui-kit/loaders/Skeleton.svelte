<style>
  div {
    position: relative;
    width: var(--width);
    height: var(--height);
    background-color: var(--colors-grey-200);
    border-radius: var(--border-radius-100);
    overflow: hidden;
  }

  div::after {
    content: "";
    display: block;
    position: absolute;
    left: -100%;
    top: 0;
    height: var(--height);
    width: var(--width);
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--colors-grey-100) 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  div.round {
    border-radius: 50%;
    height: var(--width);
  }

  @keyframes load {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }
</style>

<script lang="ts">
  export let width = "100%";
  export let height = "1em";
  export let round = false;
</script>

<div style="--width: {width}; --height: {height};" class:round></div>
