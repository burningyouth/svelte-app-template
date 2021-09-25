<style>
  @keyframes loader-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loader-2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }

  @keyframes loader-3 {
    0% {
      -webkit-transform: rotate(-140deg);
    }
    50% {
      -webkit-transform: rotate(-160deg);
    }
    100% {
      -webkit-transform: rotate(140deg);
    }
  }

  div {
    position: relative;
    width: var(--circular-size);
    height: var(--circular-size);
    animation: loader-1 3s linear infinite;
  }

  .inner {
    content: "";
    position: absolute;
    width: 32px;
    height: 32px;
    clip: rect(
      0,
      var(--circular-size),
      var(--circular-size),
      calc(var(--circular-size) / 2)
    );
    animation: loader-2 1.5s linear infinite;
  }

  .inner::after {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
    border: 4px solid var(--circular-color);
    border-radius: 50%;
    clip: rect(
      0,
      var(--circular-size),
      var(--circular-size),
      calc(var(--circular-size) / 2)
    );
    animation: loader-3 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
</style>

<script lang="ts">
  const sizeToPx = {
    sm: "16px",
    md: "32px",
    lg: "48px",
  };

  export let color: Color = "var(--colors-grey-200)";
  export let size: "sm" | "md" | "lg" = "md";
</script>

<div style="--circular-color: {color}; --circular-size: {sizeToPx[size]}">
  <div class="inner"></div>
</div>
