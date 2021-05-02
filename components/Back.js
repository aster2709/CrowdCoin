import React from "react";
import { useRouter } from "next/router";

const Back = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-blue-400 underline ml-5"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default Back;
