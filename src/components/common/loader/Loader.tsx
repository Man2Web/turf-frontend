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
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeOut);
    };
  }, [loader]);

  const CustomDescription = ({ description }: { description: string }) => (
    <p className="text-success fw-semibold">{description}</p>
  );

  return (
    <Spin
      className="custom-spinner-background"
      indicator={<BounceBasketball01Icon />}
      spinning={spinning}
      percent={percentage}
      tip={<CustomDescription description={loadingDescription} />}
      fullscreen
    />
  );
};

export default Loader;
