import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Link href={"/pokemon-zukan"}>
          <Button variant="contained" color="secondary">
            Pokemon zukan
          </Button>
        </Link>
      </Box>
    </main>
  );
}
