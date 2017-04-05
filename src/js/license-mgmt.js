var LicenseMgmt = {

  populateLicenseTable: function(licenses) {
    var licenseTable = document.getElementById("license-table");
    var licBody = licenseTable.getElementsByTagName('tbody')[0];
    for (var i in licenses ) {
      console.log(licenses[i].token);
      var row = licBody.insertRow(i);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = licenses[i].token;
    }
  },

  clearLicenseTable: function() {
    var licenseTable = document.getElementById("license-table");
    var licBody = licenseTable.getElementsByTagName('tbody')[0];
    var licRows = licBody.length;
    for ( var i in licRows ) {
      licBody.deleteRow(0);
    }
  },

  licGet: function() {
    console.log("set up the ajax call");
    // populate the correct div with license detail
    var profile = JSON.parse(localStorage.getItem('profile'));
    var token = profile.sub.substring(7);

    $.ajax({
      url: 'https://sja5mclnha.execute-api.eu-west-1.amazonaws.com/dev/licenses/58dc1f657e89a40270feef49',

      beforeSend: function(request) {
        request.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('idToken'));
      },
      data: { "apiVersion" : 1 },

      success: function(msg) {
        console.log("GET completed: "+msg);
        if ( msg.apiVersion ) {
          if ( msg.apiVersion == 1 ) {
            var licThanks = document.getElementById("license-thanks");
            var numLicenses = msg.licenses.length;
            if ( numLicenses == 0 ) {
              licThanks.textContent = "Please consider financially supporting Drum Score Editor "+
                "by purchasing a license";
            } else {
              LicenseMgmt.populateLicenseTable(msg.licenses);
            }
          } else {
            console.log("unexpected API version "+msg.apiVersion+" received");
            alert("Failed to format license data from server");
          }
        } else {
          console.log("malformed API response: no apiVersion returned");
          alert("Failed to retrieve license data from server");
        }
      }

    });
  }



}
