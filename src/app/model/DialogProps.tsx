import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface DialogProps {
    header: string;
    message: string | ReactNode;
    errorStatus: boolean;
  }