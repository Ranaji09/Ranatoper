(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

 <script>
        let timer;
        let timeLeft = 30;

        function openNote(file) {
            let btn = document.getElementById("downloadBtn");
            btn.href = file;
            btn.classList.add("disabled");
            btn.innerText = "Download (Wait 30 sec)";

            clearInterval(timer);
            timeLeft = 30;

            timer = setInterval(() => {
                document.getElementById("timerText").innerText =
                    "Download in: 0:" + (timeLeft < 10 ? "0" : "") + timeLeft;
                timeLeft--;
                if (timeLeft < 0) {
                    clearInterval(timer);
                    document.getElementById("timerText").innerText = "Download Enabled!";
                    btn.classList.remove("disabled");
                    btn.innerText = "Download Now";
                }
            }, 1000);

            const canvas = document.getElementById("pdfViewer");
            const context = canvas.getContext("2d");

            pdfjsLib.getDocument(file).promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const viewport = page.getViewport({ scale: 1.5 });
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                        document.getElementById("spinner").classList.remove("show");
                    });
                });
            }).catch(err => {
                const iframe = document.getElementById("viewerFallback");
                if (!iframe) {
                    const f = document.createElement("iframe");
                    f.id = "viewerFallback";
                    f.src = file;
                    f.width = "100%";
                    f.height = "500px";
                    f.style.border = "1px solid #ddd";
                    f.style.borderRadius = "10px";
                    canvas.replaceWith(f);
                }
                document.getElementById("spinner").classList.remove("show");
            });
        }

        function searchNotes() {
            let input = document.getElementById("searchInput").value.toLowerCase();
            let items = document.querySelectorAll("#notesList li");
            items.forEach(item => {
                item.style.display = item.innerText.toLowerCase().includes(input) ? "" : "none";
            });
        }

        function filterCategory(category) {
            let items = document.querySelectorAll("#notesList li");
            items.forEach(item => {
                item.style.display = category === "all" || item.getAttribute("data-category") === category ? "" : "none";
            });
        }

        // Block right-click, select, drag, keys
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('dragstart', e => e.preventDefault());
        document.addEventListener('keydown', function (e) {
            if (e.key === "F12" || (e.ctrlKey && ['s', 'S'].includes(e.key)) || (e.ctrlKey && e.shiftKey && ['I', 'i'].includes(e.key))) {
                e.preventDefault();
            }
        })
