var LicenseMgmt = {

  populateLicenseTable: function(licenses) {
    var licenseTable = document.getElementById("license-table");
    var licBody = licenseTable.getElementsByTagName('tbody')[0];
    for (var i in licenses ) {
      console.log(licenses[i].token);
      var tokenDetail = JSON.parse(licenses[i].token);
      var row = licBody.insertRow(i);
      var cell0 = row.insertCell(0);
      cell0.innerHTML = tokenDetail.txn;
      var cell1 = row.insertCell(1);
      cell1.innerHTML = '<button class="button hollow" id="clippy" data-clipboard-text="'+
                              tokenDetail.token+
                              '"><i class="fa fa-clipboard" aria-hidden="true"></i> Copy to clipboard'+
                              '</button>';
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

    var profile = localStorage.getItem('profile');
    var account = JSON.parse(profile).sub;

    $.ajax({
      url: DSE_GET_LICENSE_URL_STAGE+encodeURI(account),

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
            if ( numLicenses === 0 ) {
              licThanks.textContent = "Please consider financially supporting Drum Score Editor "+
                "by purchasing a license";
            } else {
              licThanks.textContent = "Thank you for financially supporting Drum Score Editor ";
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

};
