$(() => {
    // const loader = window.loader;

    window.baseUrl = "/api/";
    const root = null;
    const useHash = false;

    // loader.init();

    let router = new Navigo(root, useHash);

    // routing
    router
        .on(controllers.nav.initial)
        .resolve();
});