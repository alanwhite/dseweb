// Manages all authentication actions for users

const AUTH0_CALLBACK_URL = window.location.href;

var webAuth;

var UserManagement = {

  hook: '',

  init: function(userHook) {

    hook = userHook;
    console.log("hook established "+hook);

    webAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN_STAGE,
      clientID: AUTH0_CLIENT_ID_STAGE,
      responseType: 'token id_token',
//      audience: 'https://' + AUTH0_DOMAIN_STAGE + '/userinfo',
      scope: 'openid profile email',
      redirectUri: AUTH0_CALLBACK_URL
    });

  },

  handleAuthentication: function() {
    webAuth.parseHash(function(err, authResult) {
      console.log("handling hash");
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          // Now you have the user's information
          localStorage.setItem('accessToken', authResult.accessToken);
          localStorage.setItem('idToken', authResult.idToken);
          localStorage.setItem('profile', JSON.stringify(user));
          console.log(hook);
          hook.loginSuccess();
        });
      } else if (err) {
          console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
    });
  },

  login: function() {
    webAuth.authorize();
  },

  logout: function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    hook.logoutSuccess();
  }

};
