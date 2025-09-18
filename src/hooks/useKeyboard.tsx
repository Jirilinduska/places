import { useEffect } from "react"

export const useKeyboard = (open: boolean, setImgIndex: React.Dispatch<React.SetStateAction<number>>) => {
    useEffect(() => {
      const keyDown = (e: KeyboardEvent) => {
        if (!open) return
        if (e.key === "ArrowRight") {
          setImgIndex(1)
        } else if (e.key === "ArrowLeft") {
          setImgIndex(0)
        }
      }
      window.addEventListener("keydown", keyDown)
      return () => window.removeEventListener("keydown", keyDown)
    }, [ open, setImgIndex ] )
}
  