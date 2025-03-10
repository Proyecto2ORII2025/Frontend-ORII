import React from 'react';
import { CircularProgress } from "@heroui/progress";

export default function Progress() {
  return (
    <div className="flex justify-center items-center">
      <CircularProgress aria-label="Loading..." size="lg" color="primary" />
    </div>
  );
}