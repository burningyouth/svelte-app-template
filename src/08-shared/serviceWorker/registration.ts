export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/worker.js")
      .then((reg) => {
        // регистрация сработала
        console.log("Registration succeeded. Scope is " + reg.scope);
      })
      .catch((error) => {
        // регистрация прошла неудачно
        console.log("Registration failed with " + error);
      });

    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log(`The service worker sent me a message: ${event.data}`);
    });
  }
};
