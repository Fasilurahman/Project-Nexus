import * as React from "react";
import { Dialog as RadixDialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

// Dialog wrapper
const Dialog = ({ children, ...props }) => {
  return <RadixDialog {...props}>{children}</RadixDialog>;
};

// DialogHeader Component
const DialogHeader = ({ children, className = "" }) => {
  return <div className={cn("p-4 border-b", className)}>{children}</div>;
};

// DialogTitle Component
const DialogTitle = ({ children, className = "" }) => {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };
