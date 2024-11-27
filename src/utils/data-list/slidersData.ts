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

export const getUserBookingSliderData = (upcomingBookingsCount: number) => {
  return {
    settings: {
      adaptiveHeight: false,
      slidesToShow: 3, // Default: up to 3 slides
      slidesToScroll: upcomingBookingsCount > 2 ? 2 : upcomingBookingsCount,
      infinite: false,
    },
    responsive: [
      {
        adaptiveHeight: false,
        breakpoint: 3000, // Screens between 992px and 1200px will show 2 slides
        settings: {
          slidesToShow: 3,
          slidesToScroll:
            upcomingBookingsCount >= 2 ? 2 : upcomingBookingsCount,
          infinite: false,
        },
      },
      {
        breakpoint: 992, // For medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 480, // For small mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false, // Disable arrows on smaller screens
        },
      },
    ],
  };
};

export const loginSliderSettings = {
  infinite: true,
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const gridCardSliderSettings = {
  dots: false,
  infinite: true,
  autoplay: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
