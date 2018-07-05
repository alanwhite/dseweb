// Manages all authentication actions for users

const AUTH0_CALLBACK_URL = window.location.href;

var webAuth;

var UserManagement = {

  hook: '',

  init: function(userHook) {

    hook = userHook;

    // initialize auth0 lock
    // var options = {
      // auth: {
        // responseType: 'token',
       //  params: {scope: 'openid name email'}
      // }
    // };

    // lock = new Auth0Lock(AUTH0_CLIENT_ID_STAGE, AUTH0_DOMAIN_STAGE, options);
    webAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN_STAGE,
      clientID: AUTH0_CLIENT_ID_STAGE,
      responseType: 'token id_token',
      audience: 'https://' + AUTH0_DOMAIN_STAGE + '/userinfo',
      scope: 'openid profile email',
      redirectUri: AUTH0_CALLBACK_URL
    });

    // Listening for the authenticated event
    // lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      // lock.getUserInfo(authResult.accessToken, function(error, profile) {
        // if (error) {
          // console.error('Something went wrong: ', err);
          // alert('Something went wrong, check the Console errors'); // eslint-disable-line no-alert
          // return;
        // }

        // console.log(authResult.idToken); // this is the JWT
        // localStorage.setItem('accessToken', authResult.accessToken);
        // localStorage.setItem('idToken', authResult.idToken);
        // localStorage.setItem('profile', JSON.stringify(profile));
        // hook.loginSuccess();
      // });
    // });
  },

  handleAuthentication: function() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          // Now you have the user's information
          localStorage.setItem('accessToken', authResult.accessToken);
          localStorage.setItem('idToken', authResult.idToken);
          localStorage.setItem('profile', JSON.stringify(user));
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
    // webAuth.popup.authorize({ }, function(err, authResult) {
      //do something
      // if (err) {
        // console.error('Something went wrong: ', err);
        // alert('Something went wrong, check the Console errors'); // eslint-disable-line no-alert
        // return;
      // }

      // console.log(authResult.idToken); // this is the JWT
      // localStorage.setItem('accessToken', authResult.accessToken);
      // localStorage.setItem('idToken', authResult.idToken);
      // localStorage.setItem('profile', JSON.stringify(profile));
      // hook.loginSuccess();
    // });
  },

  logout: function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    hook.logoutSuccess();
  }

};
