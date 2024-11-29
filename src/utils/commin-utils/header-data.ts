import { all_routes } from "../../router/all_routes";

const routes = all_routes;

export const superHeaderData = [
  {
    tittle: "Book A Court",
    showAsTab: false,
    separateRoute: true,
    routes: routes.ListingList,
    hasSubRoute: false,
    showSubRoute: false,
  },
];

export const adminHeaderData = [
  {
    tittle: "Courts",
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: "Add Court",
        routes: routes.addCourt,
        hasSubRoute: false,
        showSubRoute: false,
      },
      {
        menuValue: "Courts List",
        routes: routes.allCourt,
        hasSubRoute: false,
        showSubRoute: false,
      },
    ],
  },
  {
    tittle: "Book A Court",
    showAsTab: false,
    separateRoute: true,
    hasSubRoute: false,
    showSubRoute: false,
    routes: routes.ListingList,
  },
];

export const userHeaderData = [
  {
    tittle: "Book A Court",
    showAsTab: false,
    separateRoute: true,
    hasSubRoute: false,
    showSubRoute: false,
    routes: routes.ListingList,
  },
];

export const publicHeaderData = [
  // {
  //   tittle: "Home",
  //   showAsTab: false,
  //   separateRoute: true,
  //   routes: routes.home,
  //   hasSubRoute: false,
  //   showSubRoute: false,
  // },
  // {
  //   tittle: "Book A Court",
  //   showAsTab: false,
  //   separateRoute: true,
  //   routes: routes.ListingList,
  //   hasSubRoute: false,
  //   showSubRoute: false,
  // },
];
