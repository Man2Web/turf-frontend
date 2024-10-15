export const featuredVenuesSlider = {
  dots: false,
  autoplay: false,
  slidesToShow: 4,
  margin: 20,
  speed: 100,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 776,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export const userBookingsSliderOptions = {
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2, // Scroll one slide at a time for smoother experience
  responsive: [
    {
      breakpoint: 1200, // For larger screens
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 992, // For medium screens
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768, // For tablets
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // For small mobile screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Disable arrows on smaller screens
      },
    },
  ],
};
