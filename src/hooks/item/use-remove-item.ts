import { useAppDispatch } from "@hooks/redux/redux-hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { toast } from "react-toastify";

interface useRemoveItemProps {
  onRemove: (dispatch: Dispatch) => Promise<void>;
  successMessage: string;
}

interface useRemoveItemReturnType {
  openConfirm: boolean;
  handleOpenConfirm: () => void;
  handleCloseConfirm: () => void;
  handleRemoveItem: () => void;
}

const useRemoveItem = ({
  onRemove,
  successMessage
}: useRemoveItemProps): useRemoveItemReturnType => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleRemoveItem = (): void => {
    dispatch(onRemove)
      .then(() => {
        handleCloseConfirm();
        toast.success(successMessage);
      })
      .catch((error: string) => {
        toast.error(error);
      });
  };

  return {
    openConfirm,
    handleOpenConfirm,
    handleCloseConfirm,
    handleRemoveItem
  };
};

export default useRemoveItem;
