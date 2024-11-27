import React from "react";
import {
  BadmintonIcon,
  Basketball01Icon,
  CricketBatIcon,
  FootballIcon,
  SwimmingIcon,
  TableTennisBatIcon,
  TennisBallIcon,
  ThreeDots,
} from "./icons";

export const getIconsBySport = (sport: string, iconSize?: number) => {
  switch (sport) {
    case "Basketball":
      return (
        <Basketball01Icon height={iconSize || 14} width={iconSize || 14} />
      );
    case "Cricket":
      return <CricketBatIcon height={iconSize || 14} width={iconSize || 14} />;
    case "Tennis":
      return <TennisBallIcon height={iconSize || 14} width={iconSize || 14} />;
    case "Badminton":
      return <BadmintonIcon height={iconSize || 14} width={iconSize || 14} />;
    case "Football":
      return <FootballIcon height={iconSize || 14} width={iconSize || 14} />;
    case "Swimming":
      return <SwimmingIcon height={iconSize || 14} width={iconSize || 14} />;
    case "Squash":
      return (
        <TableTennisBatIcon height={iconSize || 14} width={iconSize || 14} />
      );
    default:
      return <ThreeDots />;
  }
};
