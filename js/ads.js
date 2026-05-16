document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // FUNCTION TO LOAD AD
  // ===============================
  function loadAd(containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const adScript = document.createElement("script");

    adScript.src = "https://quge5.com/88/tag.min.js";
    adScript.dataset.zone = "239970";
    adScript.async = true;
    adScript.setAttribute("data-cfasync", "false");

    container.appendChild(adScript);

  }


  // ===============================
  // LOAD ADS IN DIFFERENT SECTIONS
  // ===============================
  loadAd("top-ad");

  loadAd("course-ad");

  loadAd("footer-ad");

});
