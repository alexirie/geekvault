import { useState } from "react";

export default function useToast() {
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (msg, duration = 2500) => {
    setToast({ visible: true, message: msg });

    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, duration);
  };

  return {
    toast,
    showToast
  };
}
