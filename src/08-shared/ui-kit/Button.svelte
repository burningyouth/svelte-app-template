<style>
  button {
    border: none;
    border-radius: var(--border-radius-100);
    padding: var(--gap-200) var(--gap-300);
    font-size: 0.8rem;
    cursor: pointer;
    color: var(--colors-blue-300);
    text-transform: uppercase;
    font-weight: 500;
    background-color: transparent;
  }

  button:hover {
    background-color: #1d809d09;
  }

  button:active {
    background-color: #1d809d12;
  }

  button:focus {
    outline: 1px solid #1d809d12;
  }
</style>

<button {...$$restProps} on:click>
  <slot />
</button>
