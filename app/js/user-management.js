// Manages all authentication actions for users
// Fill in with your values
const AUTH0_CLIENT_ID = 'ZavYd2LZRm8iF1TH3iE4Hu76XYeh7OH2';
const AUTH0_DOMAIN = 'drumscore-dev.eu.auth0.com';
const AUTH0_CALLBACK_URL = window.location.href; // eslint-disable-line
const PUBLIC_ENDPOINT = 'https://5kaml809og.execute-api.eu-west-1.amazonaws.com/dev/nplay/hello';
const PRIVATE_ENDPOINT = 'https://5kaml809og.execute-api.eu-west-1.amazonaws.com/dev/nplay/private';


var lock;

var UserManagement = {

  hook: '',

  init: function(userHook) {

    hook = userHook;

    // initialize auth0 lock
    var options = {
      auth: {
        responseType: 'token',
        params: {scope: 'openid name email'}
      }
    };

    lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options);

    // Listening for the authenticated event
    lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          console.error('Something went wrong: ', err);
          alert('Something went wrong, check the Console errors'); // eslint-disable-line no-alert
          return;
        }

        console.log(authResult.idToken); // this is the JWT
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        hook.loginSuccess();
      });
    });
  },

  login: function() {
    lock.show();
  },

  logout: function() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    hook.logoutSuccess();
  }

};
