import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface DeleteProductProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({open,onClose,onDelete,}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <h2>Are you sure you want to delete?</h2>
        <button onClick={onDelete}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </Box>
    </Modal>
  );
};

export default DeleteProduct;
