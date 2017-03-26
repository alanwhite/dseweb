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


// scroll to download view
document.getElementById("btn-download").onclick = function(){
  console.log("clicked download");
  var anchor = document.querySelector( '#download' );
  var toggle = document.querySelector('btn-download');
  var options = { speed: 1000, easing: 'easeInOutCubic' };
  smoothScroll.animateScroll( anchor, toggle, options );
  window.history.pushState({}, undefined, '#download'  );
};

document.getElementById("btn-more").onclick = function(){
  console.log("clicked more-info");
  var anchor = document.querySelector( '#more-info' );
  var toggle = document.querySelector('btn-more');
  var options = { speed: 1000, easing: 'easeInOutCubic' };
  smoothScroll.animateScroll( anchor, toggle, options );
};

document.getElementById("btn-licensing").onclick = function(){
  console.log("clicked licensing");
  var anchor = document.querySelector( '#licensing' );
  var toggle = document.querySelector('btn-licensing');
  var options = { speed: 1000, easing: 'easeInOutCubic' };
  smoothScroll.animateScroll( anchor, toggle, options );
};
