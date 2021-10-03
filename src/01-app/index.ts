import App from "./App.svelte";
import { registerServiceWorker } from "../08-shared/serviceWorker/registration";

const app = new App({
  target: document.body,
  props: {
    theme: "light",
  },
});

registerServiceWorker();

export default app;
