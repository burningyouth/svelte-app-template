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
    background-color: var(--colors-grey-300);
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

<script></script>

<div {...$$restProps}>
  <span class="loader-item"></span>
  <span class="loader-item"></span>
  <span class="loader-item"></span>
</div>
