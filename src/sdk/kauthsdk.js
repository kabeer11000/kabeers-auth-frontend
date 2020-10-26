window.kauth = () => {
    const state = {
        makeAuthURI: (p) => `/auth/authorize?client_id=${this.state.client_id}&scope=${this.state.client_id}&response_type=code&redirect_uri={encodeURIComponent(req.protocol + '://' + req.get('host') + '/app/callback')}&state={makeid(10)}&nonce={makeid(10)}&prompt={req.query.prompt || 'chooser'}`
    };
    return ({
        init: ({
                   client_id,
                   scope,
                   redirect_uri,
                   state = window.crypto.getRandomValues(new Uint32Array(1)).join(),
                   nonce = window.crypto.getRandomValues(new Uint32Array(1)).join()
               }) => this.state = {client_id, redirect_uri, scope, state, nonce},
        prompt: ({
                     container
                 }) => {
            window.console.warn("Prompt Sign in Has Its Own Basic Info Scopes. Please Consider `redirect` or `render` for Custom Scopes");
            container.innerHTML = `<div><iframe src=""`
            window.addEventListener('message', e => {
                console.log(e.origin); // outputs "http://www.example.com/"
                console.log(e.data.msg); // outputs "works!"
                if (e.origin === 'https://example1.com') {
                    // do something
                } else if (e.origin === 'https://example2.com') {
                    // do something else
                }
            }, false);
        },
    })
}
window.kauth().init({
    client_id: "123456789"
});
window.kauth().prompt({
    container: document.createElement("div")
})
