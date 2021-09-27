<script lang="ts">
  import { Route, Router } from "svelte-routing";

  import ListPage from "../02-pages/ListPage.svelte";
  import Layout from "../03-templates/Layout.svelte";

  export let theme: "light" | "dark" = "light";
</script>

<Layout>
  <Router>
    <Route path="/">
      <ListPage />
    </Route>
  </Router>
</Layout>
