import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { BounceBasketball01Icon } from "../../../utils/icons/icons";

const Loader = ({
  loader,
  loadingDescription,
}: {
  loader: boolean;
  loadingDescription: string;
}) => {
  const [percentage, setPercentage] = useState<number>();
  const [spinning, setSpinning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeOut: NodeJS.Timeout;
    if (loader) {
      setSpinning(true);
      let ptg = 10;
      interval = setInterval(() => {
        ptg += 5;
        setPercentage(ptg);
        if (ptg > 120) {
          clearInterval(interval);
          setSpinning(false);
          setPercentage(0);
        }
      }, 100);
    } else {
      timeOut = setTimeout(() => {
        setSpinning(false);
        setPercentage(0);
      }, 500);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeOut);
    };
  }, [loader]);

  return (
    <Spin
      indicator={<BounceBasketball01Icon />}
      spinning={spinning}
      percent={percentage}
      tip={loadingDescription}
      fullscreen
    />
  );
};

export default Loader;
