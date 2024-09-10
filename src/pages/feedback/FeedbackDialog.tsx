import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useForm } from "react-hook-form";
import NonLocaleInputField from "../../components/formComponents/NonLocaleInputField";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { replyFeedback } from "../../api/feedback";
import { CircularProgress } from "@mui/material";

export default function FeedbackDialog({ feedback, open, handleClose }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
  });

  const { t } = useTranslation();
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const body = {
      reply: data.reply,
      subject: data.subject,
    };
    try {
      const response = await replyFeedback(feedback._id, body);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(t("toast.error"));
    }
    setSubmitting(false);
    toast.success(t("toast.sendReplySuccess"));
    reset();
    handleClose();
  };

  const handleDialogClose = () => {
    reset();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={open}
        onClose={handleDialogClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>{t("feedbackDialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "black" }}>
            {t("feedbackDialog.playerName")}
          </DialogContentText>
          <DialogContentText sx={{ marginBottom: "1rem" }}>
            {feedback
              ? feedback.player.fullName
                ? feedback.player.fullName
                : "N/A"
              : ""}
          </DialogContentText>
          <DialogContentText sx={{ color: "black" }}>
            Feedback
          </DialogContentText>
          <DialogContentText sx={{ marginBottom: "1rem" }}>
            {feedback ? feedback.content : ""}
          </DialogContentText>
          <DialogContentText sx={{ color: "black" }}>
            {t("feedbackDialog.inputFields.replyTitle")}
          </DialogContentText>
          <NonLocaleInputField
            name="subject"
            minRows={1}
            length={50}
            control={control}
            errors={errors}
            fieldLabel={t("feedbackDialog.inputFields.replyTitle")}
          />
          <DialogContentText sx={{ color: "black" }}>
            {t("feedbackDialog.inputFields.replyContent")}
          </DialogContentText>
          <NonLocaleInputField
            name="reply"
            minRows={5}
            multiline={true}
            control={control}
            errors={errors}
            fieldLabel={t("feedbackDialog.inputFields.replyContent")}
          />
          <DialogActions>
            <Button onClick={handleClose}>{t("feedbackDialog.cancel")}</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} /> : null}
            >
              {t("feedbackDialog.send")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
