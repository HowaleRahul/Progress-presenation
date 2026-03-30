(function () {
    var totalSlides = 18;
    var match = window.location.pathname.match(/slide(\d+)\.html$/i);

    if (!match) {
        return;
    }

    var currentSlide = Number(match[1]);
    var slideContainer = document.querySelector(".slide-container");

    if (window.top === window.self) {
        window.location.replace("presentation.html?slide=" + currentSlide);
        return;
    }

    if (slideContainer) {
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.margin = "0";
        document.body.style.display = "flex";
        document.body.style.alignItems = "center";
        document.body.style.justifyContent = "center";
        document.body.style.overflow = "hidden";
        slideContainer.style.flexShrink = "0";
    }

    function notifyParent() {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage(
                {
                    type: "slide-ready",
                    slide: currentSlide,
                    totalSlides: totalSlides
                },
                "*"
            );
        }
    }

    if (document.readyState === "complete") {
        notifyParent();
    } else {
        window.addEventListener("load", notifyParent);
    }
})();
