<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap-200);
    margin: var(--gap-400) 0;
  }

  .viewer-info {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: var(--gap-200);
  }

  main {
    display: flex;
    flex-direction: column;
    gap: var(--gap-400);
  }

  :global(.main-content) {
    padding-bottom: var(--gap-400);
  }
</style>

<script lang="ts">
  import { viewer } from "../08-shared/github/viewer";
  import Avatar from "../08-shared/ui-kit/Avatar.svelte";
  import Container from "../08-shared/ui-kit/Container.svelte";
  import LoadingScreen from "../06-features/LoadingScreen.svelte";
  import Error from "../08-shared/ui-kit/Error.svelte";
</script>

{#await viewer}
  <LoadingScreen />
{:then value}
  <Container width="md" class="main-content">
    <header>
      <Avatar src="{value.avatarUrl}" alt="{value.login}" />
      <div class="viewer-info">
        <h3>{value.name}</h3>
        {value.bio}
      </div>
    </header>
    <main>
      <slot />
    </main>
  </Container>
{:catch error}
  <Error error="{error}" />
{/await}
