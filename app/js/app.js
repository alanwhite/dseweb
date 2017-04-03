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

// licGet = function() {
//   console.log("set up the ajax call");
//   // populate the correct div with license detail
//   var profile = JSON.parse(localStorage.getItem('profile'));
//   var token = profile.sub.substring(7);
//
//   $.ajax({
//     url: 'https://sja5mclnha.execute-api.eu-west-1.amazonaws.com/dev/licenses/58dc1f657e89a40270feef49',
//
//     beforeSend: function(request) {
//       request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('idToken'));
//     },
//     data: { "apiVersion" : 1 },
//
//     success: function(msg) {
//       console.log("GET completed: "+msg);
//       if ( msg.apiVersion ) {
//         if ( msg.apiVersion == 1 ) {
//           var licThanks = document.getElementById("license-thanks");
//           var numLicenses = msg.licenses.length;
//           if ( numLicenses == 0 ) {
//             licThanks.textContent = "Please consider financially supporting Drum Score Editor "+
//               "by purchasing a license";
//           } else {
//             populateLicenseTable(msg.licenses);
//           }
//         } else {
//           console.log("unexpected API version "+msg.apiVersion+" received");
//           alert("Failed to format license data from server");
//         }
//       } else {
//         console.log("malformed API response: no apiVersion returned");
//         alert("Failed to retrieve license data from server");
//       }
//     }
//
//   });
// }
//
// populateLicenseTable = function(licenses) {
//   var licenseTable = document.getElementById("license-table");
//   var licBody = licenseTable.getElementsByTagName('tbody')[0];
//   for (var i in licenses ) {
//     console.log(licenses[i].token);
//     var row = licBody.insertRow(i);
//     var cell1 = row.insertCell(0);
//     cell1.innerHTML = licenses[i].token;
//   }
// }
//
// clearLicenseTable = function() {
//   var licenseTable = document.getElementById("license-table");
//   var licBody = licenseTable.getElementsByTagName('tbody')[0];
//   var licRows = licBody.length;
//   for ( var i in licBody ) {
//     licBody.deleteRow(i);
//   }
// }

UserManagement.init(authHook);

btnAuth.onclick = function() {
  if ( btnAuth.textContent == "Sign Out") {
    UserManagement.logout();
  } else {
    UserManagement.login();
    // localStorage.setItem('idToken','fred');
    // authHook.loginSuccess();
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
