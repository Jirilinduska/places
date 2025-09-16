import { Button } from "@mui/material"

type Props = {
    loading?: boolean
    size: "large" | "medium" | "small"
    text: string
    href?: string
    onClick?: () => void
}

export const AppButton = ({ loading, size, text, href, onClick } : Props) => {
  return (
    <Button
        loading={loading}
        size={size}
        variant="contained"
        href={href}
        onClick={onClick}
        sx={{ bgcolor: "black" }}
    >
        {text}
    </Button>
  );
};