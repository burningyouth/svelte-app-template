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

  .social a {
    font-size: 1.75rem;
    color: var(--colors-grey-500);
  }

  .social a:focus,
  .social a:hover {
    outline: none;
    color: var(--colors-grey-800);
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
  import Telegram from "../08-shared/ui-kit/icons/Telegram.svelte";
  import Whatsapp from "../08-shared/ui-kit/icons/Whatsapp.svelte";
  import Github from "../08-shared/ui-kit/icons/Github.svelte";
  import Email from "../08-shared/ui-kit/icons/Email.svelte";
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
        <div class="social">
          {#if value.email}<a
              href="mailto:{value.email}"
              target="_blank"
              title="Email">
              <Email />
            </a>{/if}
          {#if value.url}<a href="{value.url}" target="_blank" title="Github">
              <Github />
            </a>{/if}
          <a
            href="https://msng.link/o/?burningyouth=tg"
            target="_blank"
            title="Telegram">
            <Telegram />
          </a>
          <a href="https://wa.me/79178424366" target="_blank" title="Whatsapp">
            <Whatsapp />
          </a>
        </div>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </Container>
{:catch error}
  <Error error="{error}" />
{/await}
