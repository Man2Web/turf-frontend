import { Button, Card, Modal } from "antd";
import React from "react";

const CouponsModal = ({
  toggleModal,
  setToggleModal,
  couponsData,
  addCoupon,
}: {
  toggleModal: boolean;
  setToggleModal: (data: boolean) => void;
  couponsData: Coupon[];
  addCoupon: (value: string) => void;
}) => {
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
          key={index}
          size="small"
          title={coupon.coupon_code}
          extra={
            <Button
              onClick={() => {
                addCoupon(coupon.coupon_code);
                setToggleModal(false);
              }}
              color="primary"
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
