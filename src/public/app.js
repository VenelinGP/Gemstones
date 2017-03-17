$(() => {
    window.baseUrl = "/api/";
    const root = null,
        useHash = false;

    let router = new Navigo(root, useHash);
    router
        .on(controllers.home.initial)
        .resolve();
});