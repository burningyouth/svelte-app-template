<script lang="ts">
  import { Route, Router } from "svelte-routing";

  import RepositoriesListPage from "../02-pages/RepositoryListPage/RepositoriesListPage.svelte";
  import Layout from "../03-templates/Layout.svelte";
  import ErrorPage from "../08-shared/ui-kit/Error.svelte";
  import Button from "../08-shared/ui-kit/Button.svelte";
  import RepositoryDetailPage from "../02-pages/RepositoryDetailPage.svelte";

  export let theme: "light" | "dark" = "light";
</script>

<Layout>
  <Router>
    <Route path="/">
      <RepositoriesListPage />
    </Route>

    <Route path="/repository/:repoName" let:params>
      <RepositoryDetailPage repoName="{params.repoName}" />
    </Route>

    <Route path="*">
      <ErrorPage title="Такой страницы не существует">
        <Button
          on:click="{() => {
            history.back();
          }}"
          >Вернуться назад
        </Button>
      </ErrorPage>
    </Route>
  </Router>
</Layout>
