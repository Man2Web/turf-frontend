import { Button, Card, Modal } from "antd";
import React from "react";

const CouponsModal = ({
  totalPrice,
  toggleModal,
  setToggleModal,
  couponsData,
  addCoupon,
}: {
  totalPrice: number;
  toggleModal: boolean;
  setToggleModal: (data: boolean) => void;
  couponsData: Coupon[];
  addCoupon: (value: string) => void;
}) => {
  console.log(couponsData);
  console.log(totalPrice);
  return (
    <Modal
      title="Available Coupons"
      open={toggleModal}
      centered={true}
      footer={null}
      onCancel={() => setToggleModal(false)}
    >
      {couponsData.map((coupon, index) => (
        <Card
          className="mb-2"
          key={index}
          size="small"
          title={coupon.coupon_code}
          extra={
            <Button
              onClick={() => {
                if (totalPrice <= Number(coupon.min_amount)) {
                  addCoupon(coupon.coupon_code);
                  setToggleModal(false);
                }
              }}
              color="primary"
              disabled={totalPrice >= Number(coupon.min_amount)}
            >
              Add Coupon
            </Button>
          }
        >
          <p>{coupon.coupon_label}</p>
        </Card>
      ))}
      {couponsData.length === 0 && <p>No Coupons Available for this court</p>}
    </Modal>
  );
};

export default CouponsModal;
