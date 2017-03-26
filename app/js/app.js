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

//
UserManagement.init();

// UserManagement.login();



document.getElementById("btn-download").onclick = function(){
  console.log("clicked download");
  var anchor = document.querySelector( '#download' );
  var toggle = document.querySelector('btn-download');
  var options = { speed: 1000, easing: 'easeInOutCubic' };
  smoothScroll.animateScroll( anchor, toggle, options );
};
