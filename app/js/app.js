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

// Set up authentication
UserManagement.init();

// UserManagement.login();

// set up animated scrolling
var dsScrollTo = function scrollT(target, btn) {
  // console.log("in scrollTo "+target+" "+btn);
  var toggle = document.querySelector( btn );
  var anchor = document.querySelector( target );
  var options = { speed: 1000, easing: 'easeInOutCubic' };
  smoothScroll.animateScroll( anchor, toggle, options );
  window.history.pushState({}, undefined, target  );
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
