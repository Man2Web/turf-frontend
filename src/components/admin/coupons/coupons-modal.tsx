import { Button, Card, Modal } from "antd";
import React from "react";

const CouponsModal = ({
  totalPrice,
  couponsModal,
  setCouponsModal,
  couponsData,
  addCoupon,
}: {
  totalPrice: number;
  couponsModal: boolean;
  setCouponsModal: (data: boolean) => void;
  couponsData: Coupon[];
  addCoupon: (value: string) => void;
}) => {
  return (
    <Modal
      title="Available Coupons"
      open={couponsModal}
      centered={true}
      footer={null}
      onCancel={() => setCouponsModal(false)}
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
                if (totalPrice >= Number(coupon.min_amount)) {
                  addCoupon(coupon.coupon_code);
                  setCouponsModal(false);
                }
              }}
              color="primary"
              disabled={totalPrice <= Number(coupon.min_amount)}
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
