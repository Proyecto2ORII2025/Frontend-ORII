import React from 'react';
import { CircularProgress } from "@heroui/progress";

export default function Progress() {
  return (
    <div className="w-full h-3/4 flex items-center justify-center">
      <CircularProgress aria-label="Loading..." size="lg" color="primary" />
    </div>
  );
}