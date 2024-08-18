import { Skeleton, Stack } from "@mui/material";
import React from "react";

export const LoadingTable = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" animation="wave" width={"20%"} height={60} />
      <Stack direction="row" spacing={2} justifyContent={"space-between"}>
        <Skeleton
          variant="rounded"
          animation="wave"
          width={"40%"}
          height={60}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          width={"20%"}
          height={60}
        />
      </Stack>
      <Skeleton
        variant="rounded"
        animation="wave"
        width={"100%"}
        height={450}
      />
    </Stack>
  );
};
