"use strict";

// DESIGN FIRST SLIDESHOW

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.querySelectorAll(".header__slide");
  let dots = document.querySelectorAll(".header__dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

///////////////////////////////////////////////////////////////////////////////
// DESIGN SECOND SLIDESHOW - CUSTOMERS

$(window).on("load", function () {
  // Carousel Slider //

  let elemWidth =
    (100 * parseFloat($(".customers__listBox li").css("width"))) /
    parseFloat($(".customers__containerBox").parent().css("width")); // Width of each element
  let elemPerPage = parseInt(100 / elemWidth); // Elements per page

  let marginLeft = 0;
  let count = 0;

  let totalElem = $(".customers__listBox li").length; // Number of total elements
  let numSlides = Math.ceil(totalElem / elemPerPage); // Number of slides

  if (totalElem > elemPerPage) {
    $(".arrow.back").on("click", function () {
      // Go back

      if (marginLeft < 0) {
        count--;
        marginLeft = marginLeft + 100;

        $("ul.customers__listBox").animate(
          {
            marginLeft: marginLeft + "%",
          },
          1500
        );
      }
    });

    $(".arrow.forward").on("click", function () {
      // Go forward

      count++;

      if (count < numSlides) {
        if (marginLeft <= 0) {
          marginLeft = marginLeft - 100;

          $("ul.customers__listBox").animate(
            {
              marginLeft: marginLeft + "%",
            },
            1500
          );
        }
      } else {
        count--;
      }
    });
  }

  // Open infoBox //

  for (
    let i = 0;
    i < $(".customers__listBox li .customers__content").length;
    i++
  ) {
    $($(".customers__listBox li .customers__content")[i]).on(
      "click",
      function () {
        $(".customers__infoBox li").addClass("hidden");

        if ($($(".customers__infoBox li")[i]).hasClass("hidden")) {
          $($(".customers__infoBox li")[i]).removeClass("hidden");
        } else {
          $($(".customers__infoBox li")[i]).addClass("hidden");
        }
      }
    );
  }
});

////////////////////////////////////////////////////////////
// DESIGN THIRD SLIDESHOW - TESTUMONIALS

//slider setup and controls
function Slider($slider, options) {
  var indActive;
  var $sliderView = $slider.children(".testimonials__slider-view");
  var slides = $sliderView.children(".testimonials__slide").toArray();
  var indicators = "";
  var options = options || {};

  if (typeof options.loop === "undefined") options.loop = true;

  //initialize slides
  if (slides.length > 0) {
    indActive = $sliderView.children(".testimonials__slide.active").index();
    $(slides).each(function (index) {
      var pos = 100 * (index - indActive);
      var active = indActive === index ? "active" : "";
      $(this).css("left", pos + "%");

      //corresponding indicator
      indicators += '<span class="indicator ind-';
      indicators += index;
      indicators += " ";
      indicators += active;
      indicators += '"></span>';
    });

    $slider.children(".testimonials__indicator").append(indicators);
  } else {
    throw new Error("There are no slides");
  }

  var changeSlide = function ($slider, slides, $currSlide, $targetSlide) {
    var indCurr = $currSlide.index();
    var indTarget = $targetSlide.index();
    var $slideInd = $slider.children(".testimonials__indicator");

    $slider.addClass("sliding");

    $(slides).each(function (index) {
      var pos = 100 * (index - indTarget);
      var valOpacity = index === indTarget ? 1 : 0.6;

      $(this).css({ left: pos + "%", opacity: valOpacity });
    });

    //update indicators
    $slideInd.children(".ind-" + indCurr).removeClass("active");
    $slideInd.children(".ind-" + indTarget).addClass("active");

    setTimeout(function () {
      $currSlide.removeClass("active");
      $targetSlide.addClass("active");

      $slider.removeClass("sliding");
    }, 440);
  };

  //go to next slide
  var nextSlide = function ($slider, slides, $currSlide, options) {
    var activeInd = $currSlide.index();
    var targetSlide;

    if (activeInd === slides.length - 1) {
      //current slide is last slide (go to first if loop else no action)
      if (options.loop) {
        //set target as first slide
        targetSlide = slides[0];
      } else {
        //prevent slide
        return false;
      }
    } else {
      //set target as next slide
      targetSlide = slides[activeInd + 1];
    }

    //change slide
    changeSlide($slider, slides, $currSlide, $(targetSlide));
  };

  //go to previous life
  var prevSlide = function ($slider, slides, $currSlide, options) {
    var activeInd = $currSlide.index();
    var targetSlide;

    if (activeInd === 0) {
      //current slide is first slide (go to last if loop else no action)
      if (options.loop) {
        //set target as last slide
        targetSlide = slides[slides.length - 1];
      } else {
        //prevent slide
        return false;
      }
    } else {
      //set target as previous slide
      targetSlide = slides[activeInd - 1];
    }

    //change slide
    changeSlide($slider, slides, $currSlide, $(targetSlide));
  };

  //indicator/navigator buttons
  $slider.on("click", ".indicator", function () {
    //prevent glitches or conflicts
    if ($slider.hasClass("sliding")) return false;

    //get: current slide & target slide
    var $currSlide = $sliderView.children(".testimonials__slide.active");
    var indTarget = $(this).index();
    var targetSlide = slides[indTarget];

    changeSlide($slider, slides, $currSlide, $(targetSlide));
  });
}

$(".testimonials__slider").each(function (index) {
  Slider($(this));
});
