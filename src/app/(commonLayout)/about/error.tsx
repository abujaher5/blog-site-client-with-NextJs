"use client";

import { useEffect } from "react";

const AboutError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // pass this error to a logger if logger available

    console.error(error);
  }, []);
  return (
    <div>
      <h2>Something went wrong : Please try again..</h2>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
};

export default AboutError;
