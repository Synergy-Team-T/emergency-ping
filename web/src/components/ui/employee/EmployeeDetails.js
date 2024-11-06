import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";

const textColor = {
  SAFE: "text-green-500 text-3xl font-medium",
  NOT_SAFE: "text-red-600 text-3xl font-medium",
  PENDING: "text-grey-600 text-3xl font-medium",
};

const statusText = {
  SAFE: 'Marked as Safe and ready to  work',
  NOT_SAFE: 'Marked as unsafe and could not work',
  PENDING: 'No Status yet and will mark as unsafe if could not send a status immediately'
}

const UserDetails = ({ userDetails, onSendStatus }) => {
  const [modalType, setModalType] = useState();

  //type - NOT_SAFE/SAFE
  const handleOnClickHelp = (type) => {
    setModalType((prev) => (!prev ? type : undefined));
  };

  const handleClickSend = async () => {
    await onSendStatus(modalType)
    handleOnClickHelp();
  }

  return (
    <div className="w-3/4 h-[100%] flex flex-col relative border rounded-[0.22rem]">
      <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">
        Emplyee Status
      </div>
      <div className="flex gap-6 flex-col items-center justify-center p-4">
        <img
          src={userDetails.profilePic}
          alt="User"
          class="w-48 h-48 rounded-full"
        />
        <div className="flex gap-2 flex-col items-center justify-center">
          <div className={textColor[userDetails.status.status]}>
            {userDetails.status.status.includes(['_']) ? userDetails.status.status.split('_').join(' ') : userDetails.status.status}
          </div>
          <div className="text-b font-bold text-center">{statusText[userDetails.status.status]}</div>
        </div>

        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <CustomButton
            type="secondary"
            size="large"
            className="w-full max-w-md"
            onClick={() => handleOnClickHelp("SAFE")}
          >
            I AM SAFE
          </CustomButton>
          <CustomButton
            type="primary"
            size="large"
            className="w-full max-w-md"
            onClick={() => handleOnClickHelp("NOT_SAFE")}
          >
            I AM NOT SAFE
          </CustomButton>
        </div>
      </div>
      <CustomModal
        visible={!!modalType}
        onClose={handleOnClickHelp}
        title={modalType === "NOT_SAFE" ? "I am Not Safe" : "I am Safe"}
        footer={[
          <CustomButton key="cancel" onClick={handleOnClickHelp}>
            Cancel
          </CustomButton>,
          <CustomButton key="submit" type="primary" onClick={handleClickSend}>
            Send
          </CustomButton>,
        ]}
      >
        {modalType === "NOT_SAFE"
          ? "Are you sure you are not safe and could not work?"
          : "Are you sure you are safe?"}
      </CustomModal>
    </div>
  );
};

export default UserDetails;
