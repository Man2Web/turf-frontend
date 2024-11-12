import { Collapse, CollapseProps } from "antd";
import React from "react";
import { UserDetailsFormData } from "../../../utils/types/user/userDetailsBookingForm";

const UserAutofillForm = ({
  getValues,
  setUserDataExists,
}: {
  getValues: () => UserDetailsFormData;
  setUserDataExists: (data: boolean) => void;
}) => {
  const {
    fName,
    lName,
    email,
    phonenumber,
    address,
    city,
    state,
    country,
    pincode,
  } = getValues();

  const userDetailsAccordionData = (
    <div className="d-flex justify-content-between col-12">
      <div className="col-10">
        <p className="font-weight-bold mb-0">
          {fName} {lName}
        </p>
        <p className="mb-0">{email}</p>
        <p className="mb-0">{phonenumber}</p>
        <p className="mb-0">{address}</p>
        <p className="mb-0">
          {city}, {state}, {country}, {pincode}
        </p>
      </div>
      <div className="col-2">
        <a
          onClick={() => {
            setUserDataExists(false);
          }}
        >
          Edit
        </a>
      </div>
    </div>
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Address Autofilled",
      children: <p>{userDetailsAccordionData}</p>,
    },
  ];

  return (
    <Collapse
      className="mt-2"
      expandIconPosition="right"
      items={items}
      defaultActiveKey={["1"]}
    />
  );
};

export default UserAutofillForm;
