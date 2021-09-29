<style>
  .about {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap-200);
    padding-top: var(--gap-400);
  }

  .about--viewer-info {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: var(--gap-200);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--gap-400);
    padding: var(--gap-400) 0;
    height: calc(100% - 128px);
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

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .container {
    position: relative;
    max-width: var(--breakpoint-md);
    padding: 0 var(--gap-300);
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }

  @media (max-width: 620px) {
    .about {
      padding-top: var(--gap-300);
    }

    .about--viewer-info {
      gap: var(--gap-100);
    }

    .content {
      gap: var(--gap-300);
      padding: var(--gap-300) 0;
    }
  }
</style>

<script lang="ts">
  import { viewer } from "../07-entities/viewer";
  import Avatar from "../08-shared/ui-kit/Avatar.svelte";
  import Telegram from "../08-shared/ui-kit/icons/Telegram.svelte";
  import Whatsapp from "../08-shared/ui-kit/icons/Whatsapp.svelte";
  import Github from "../08-shared/ui-kit/icons/Github.svelte";
  import Email from "../08-shared/ui-kit/icons/Email.svelte";
  import Error from "../08-shared/ui-kit/Error.svelte";
  import Dots from "../08-shared/ui-kit/loaders/Dots.svelte";
  import { link } from "svelte-routing";
</script>

<main class="container">
  {#await viewer}
    <div class="loader">
      <Dots />
    </div>
  {:then value}
    <section class="about">
      <a href="/repository/{value.name}" use:link>
        <Avatar src="{value.avatarUrl}" alt="{value.login}" />
      </a>
      <div class="about--viewer-info">
        <h2>
          {value.name}
        </h2>
        <span class="about--viewer-info--bio">{value.bio}</span>
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
    </section>
    <section class="content">
      <slot />
    </section>
  {:catch error}
    <Error message="{error.message}" height="100%" />
  {/await}
</main>
