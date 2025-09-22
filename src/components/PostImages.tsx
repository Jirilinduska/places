"use client";

import { useKeyboard } from "@/hooks/useKeyboard"
import { Box, Modal } from "@mui/material"
import { useState } from "react"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export const PostImages = ({ images, height }:{ images: string[], height: string }) => {

    const [open, setOpen] = useState(false)
    const [imgIndex, setImgIndex] = useState<number>(0)

    useKeyboard(open, setImgIndex)

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={images.length === 1 ? "center" : "space-between"}
      gap={images.length === 1 ? 0 : 1}
      my={4}
    >
      <Box 
        width={images.length === 1 ? "100%" : "50%"}
        height={height} 
        sx={{ cursor: "pointer" }} 
        onClick={() => {
            setOpen(true)
            setImgIndex(0)
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={images[0]}
          alt={images[0]}
        />
      </Box>
      {images.length > 1 && 
        <Box 
            width="50%" 
            height={height}
            sx={{ cursor: "pointer" }}
            onClick={() => {
                setOpen(true)
                setImgIndex(1)
            }}
        >
            <img
                className="w-full h-full object-cover"
                src={images[1]}
                alt={images[1]}
            />
        </Box>}

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <img
                    className="w-full h-full object-contain"
                    src={images[imgIndex]}
                    alt={images[imgIndex]}
                />
                {images.length > 1 &&
                    <Box mt={1} display="flex" alignItems="center" justifyContent="center" gap={2}> 
                        <Box onClick={() => setImgIndex(0)} bgcolor={imgIndex === 0 ? "black" : "gray"} sx={{ cursor: "pointer" }} width="15px" height="15px" borderRadius="50%"></Box>
                        <Box onClick={() => setImgIndex(1)} bgcolor={imgIndex === 1 ? "black" : "gray"} sx={{ cursor: "pointer" }} width="15px" height="15px" borderRadius="50%"></Box>
                    </Box>
                }
            </Box>
        </Modal>
    </Box>

    
  );
};
