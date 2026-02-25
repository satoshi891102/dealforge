"use client";

import { toast } from "sonner";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function showToast(
  variant: ToastVariant,
  message: string,
  options?: ToastOptions
) {
  const actionConfig = options?.action
    ? { label: options.action.label, onClick: options.action.onClick }
    : undefined;

  const base = {
    description: options?.description,
    duration: options?.duration ?? 4000,
    action: actionConfig,
  };

  switch (variant) {
    case "success":
      return toast.success(message, base);
    case "error":
      return toast.error(message, base);
    case "warning":
      return toast.warning(message, base);
    case "info":
      return toast.info(message, base);
  }
}

export function useToast() {
  return {
    success: (message: string, options?: ToastOptions) =>
      showToast("success", message, options),
    error: (message: string, options?: ToastOptions) =>
      showToast("error", message, options),
    warning: (message: string, options?: ToastOptions) =>
      showToast("warning", message, options),
    info: (message: string, options?: ToastOptions) =>
      showToast("info", message, options),
    dismiss: toast.dismiss,
  };
}
