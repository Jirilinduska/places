"use client";

import { createReport } from "@/app/actions"
import { ReportReason } from "@/interfaces/interfaces"
import { Box, Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useState } from "react"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  open: boolean
  onClose: () => void
  postID: string
}

type NewReport = {
  reason: ReportReason
  comment: string
}

export const ModalCreateReport = ({ open, onClose, postID } : Props) => {

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [newReport, setNewReport] = useState<NewReport>({
    reason: "spam",
    comment: ""
  })

  const handleSubmit = async() => {
    setLoading(true)
    const res = await createReport(postID, newReport.reason, newReport.comment)
    if(res.success) {
      enqueueSnackbar("Report submitted", { variant: "success" })
      onClose()
    } else {
      enqueueSnackbar(res.errMsg, { variant: "error" })
    }
    setLoading(false)
  }

  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={style}>

            <Typography fontWeight={600} mb={2} color="black" textAlign="center">Select report reason</Typography>


            <FormControl>
              <RadioGroup
                value={newReport.reason}
                onChange={(e) => setNewReport((prev) => ({ ...prev, reason: e.target.value as ReportReason }))}
              >
                <FormControlLabel className="text-black" color="black" value="spam" control={<Radio />} label="Spam" />
                <FormControlLabel className="text-black" value="wrong_location" control={<Radio />} label="Wrong Location" />
                <FormControlLabel className="text-black" value="inappropriate_photo" control={<Radio />} label="Inappropriate Photo" />
                <FormControlLabel className="text-black" value="duplicate" control={<Radio />} label="Duplicate" />
                <FormControlLabel className="text-black" value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Comment"
              fullWidth
              multiline
              rows={3}
              value={newReport.comment}
              onChange={(e) => setNewReport(prev => ({ ...prev, comment: e.target.value }))}
              sx={{ mt: 2 }}
            />

            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mt={4}>
                <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    Submit
                </Button>
                <Button
                    fullWidth
                    color="error"
                    variant="outlined"
                    onClick={onClose}
                    loading={loading}
                >
                    Close
                </Button>
            </Box>
        </Box>
    </Modal>
  );
};