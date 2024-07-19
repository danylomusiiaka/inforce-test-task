import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Comment } from "../interfaces/Comment";
import {
  getComments,
  addComment,
  deleteComment,
} from "../services/commentService";

interface CommentsModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  open,
  onClose,
  productId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    if (open) {
      loadComments();
    }
  }, [open, productId]);

  const loadComments = async () => {
    if (productId) {
      const allComments = await getComments();

      const filteredComments = allComments.filter(
        (comment) => comment.productId === productId
      );
      setComments(filteredComments);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    const comment: Comment = {
      _id: "",
      productId,
      description: newComment,
      date: new Date().toISOString(),
    };

    await addComment(comment);
    setNewComment("");
    loadComments();
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id);
    loadComments();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box" sx={{ p: 4, bgcolor: "background.paper" }}>
        <h2>Comments</h2>
        <TextField
          fullWidth
          label="Add Comment"
          variant="outlined"
          margin="normal"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          sx={{ mt: 2 }}
        >
          Add Comment
        </Button>
        <div>
          {comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.date}</p>
              <p>{comment.description}</p>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default CommentsModal;
