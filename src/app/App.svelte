<script lang="ts">
  import { viewer } from "../shared/github/viewer";
  import Dots from "../shared/ui-kit/loaders/Dots.svelte";
  import Circular from "../shared/ui-kit/loaders/Circular.svelte";

  export let theme: "light" | "dark" = "light";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="{theme === 'light' ? '/css/light.css' : '/css/dark.css'}" />
</svelte:head>

<main>
  <Circular color="var(--colors-grey-500)" size="md" />
  <Dots />
  {#await viewer}
    <p>waiting for the promise to resolve!...</p>
  {:then value}
    <h1>Hello {value.viewer.login}</h1>
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</main>
