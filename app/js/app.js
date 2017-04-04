$(document).foundation()

// cookie nonsense
window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#252e39"
      },
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
  })
});

// set up animated scrolling
var dsScrollTo = function scrollT(target, btn) {
  // console.log("in scrollTo "+target+" "+btn);
  var toggle = document.querySelector( btn );
  var anchor = document.querySelector( target );
  var options = { speed: 1000, easing: 'easeInOutCubic' };
  smoothScroll.animateScroll( anchor, toggle, options );
  window.history.pushState({}, undefined, target  );
}

// align view to current auth state
var btnAuth = document.getElementById("btn-auth");
var divLicenseLogin = document.getElementById("license-login");
var divLicenseLogout = document.getElementById("license-logout");

const jwtToken = localStorage.getItem('idToken');
if (jwtToken) {
  btnAuth.textContent="Sign Out";
  divLicenseLogin.style.display = 'none';
  // check token and populate div with licenses
  LicenseMgmt.licGet();
} else {
  divLicenseLogout.style.display = 'none';
}

// Set up authentication
var authHook = {
  loginSuccess: function() {
    console.log("login was a success");
    btnAuth.textContent="Sign Out";
    divLicenseLogout.style.display = 'block';
    divLicenseLogin.style.display = 'none';
    LicenseMgmt.licGet();
    console.log("triggered the licenseGet() call");
    dsScrollTo('#licensing','btn-licensing');
  },

  loginFail: function() {

  },

  logoutSuccess: function() {
    console.log("logout was a success");
    btnAuth.textContent="Sign In";
    divLicenseLogin.style.display = 'block';
    divLicenseLogout.style.display = 'none';

    // clear license detail
    LicenseMgmt.clearLicenseTable();
  }
}

UserManagement.init(authHook);

btnAuth.onclick = function() {
  if ( btnAuth.textContent == "Sign Out") {
    UserManagement.logout();
  } else {
    UserManagement.login();
  }
}

// other button initial routing
document.getElementById("btn-license-login").onclick = function() {
  btnAuth.click();
}

document.getElementById("btn-license-signout").onclick = function() {
  btnAuth.click();
}

document.getElementById("btn-download").onclick = function() {
  dsScrollTo('#download','btn-download');
}

document.getElementById("btn-more").onclick = function(){
  dsScrollTo('#more-info','btn-more');
};

document.getElementById("btn-licensing").onclick = function(){
  dsScrollTo('#licensing','btn-licensing');
};
