$(document).foundation();



// cookie nonsense
window.addEventListener("load", function(){

  window.cookieconsent.initialise({
    "palette": {
      "popup": { "background": "#252e39" },
      "button": {
        "background": "transparent",
        "text": "#14a7d0",
        "border": "#14a7d0"
      }
    },
    "position": "bottom-right",
    "content": {
      "message": "The crazy EU cookie law says I have to show you this. This website uses cookies - if you don't like that then please leave the site."
    }
  });

  UserManagement.handleAuthentication();
});

var clipboard = new Clipboard('#clippy');

// set up paypal url depending on stage
document.getElementById("paypal-url").action = PAYPAL_BUY_NOW_URL_STAGE;
document.getElementById("paypal-notify").value = PAYPAL_NOTIFY_URL_STAGE;
document.getElementById("paypal-account").value = PAYPAL_ACCOUNT_STAGE;

var returnURL = window.location.origin + "/#licensing";
document.getElementById("paypal-return-url").value = returnURL;
// console.log(returnURL);

// set up animated scrolling
var dsScrollTo = function scrollT(target, btn) {
  // console.log("in scrollTo "+target+" "+btn);
  var toggle = document.querySelector( btn );
  var anchor = document.querySelector( target );
  var options = { speed: 1000, easing: 'easeInOutCubic' };
  smoothScroll.animateScroll( anchor, toggle, options );
  window.history.pushState({}, undefined, target  );
};

// align view to current auth state
var btnAuth = document.getElementById("btn-auth");
var divLicenseLogin = document.getElementById("license-login");
var divLicenseLogout = document.getElementById("license-logout");

// DRY setup app for logged in user
function setupUser() {
  btnAuth.textContent="Sign Out";
  var profile = JSON.parse(localStorage.getItem('profile'));
  var userID = profile.sub;
  document.getElementById("paypal-user").value = userID;
  divLicenseLogout.style.display = 'block';
  divLicenseLogin.style.display = 'none';
  LicenseMgmt.licGet();
}

// Set up authentication
var authHook = {
  loginSuccess: function() {
    setupUser();
    dsScrollTo('#licensing','btn-licensing');
  },

  loginFail: function() {

  },

  logoutSuccess: function() {
    btnAuth.textContent="Sign In";
    divLicenseLogin.style.display = 'block';
    divLicenseLogout.style.display = 'none';

    // clear license detail
    LicenseMgmt.clearLicenseTable();
  }
};

UserManagement.init(authHook);

// set up Sign In / Out button depending on login state
const jwtToken = localStorage.getItem('idToken');
if (jwtToken) {
  // check if token expired
  var jwtParts = jwtToken.split('.');
  var payload = JSON.parse(atob(jwtParts[1]));

  if (payload.exp && (payload.exp > Date.now() / 1000)) {
    // console.log('existing token not expired');
    setupUser();
  } else {
    console.log("login expired: new login required");
    UserManagement.logout();
  }
} else {
  divLicenseLogout.style.display = 'none';
}

btnAuth.onclick = function() {
  if ( btnAuth.textContent == "Sign Out") {
    UserManagement.logout();
  } else {
    UserManagement.login();
  }
};

// other button initial routing
document.getElementById("btn-license-login").onclick = function() {
  btnAuth.click();
};

document.getElementById("btn-license-signout").onclick = function() {
  btnAuth.click();
};

document.getElementById("btn-download").onclick = function() {
  dsScrollTo('#download','btn-download');
};

document.getElementById("btn-more").onclick = function(){
  dsScrollTo('#more-info','btn-more');
};

document.getElementById("btn-licensing").onclick = function(){
  dsScrollTo('#licensing','btn-licensing');
};
