import { Button } from "@mui/material"

type Props = {
    loading?: boolean
    size: "large" | "medium" | "small"
    text: string
    href?: string
}

export const AppButton = ({ loading, size, text, href } : Props) => {
  return (
    <Button
        loading={loading}
        size={size}
        variant="contained"
        href={href}
        sx={{ bgcolor: "black" }}
    >
        {text}
    </Button>
  );
};