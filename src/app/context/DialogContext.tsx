import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

type DialogData = {
  ID: string;
  Header: string;
  Type: "error" | "info" | "warning" | "success";
  Message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
} | null;

type DialogContextType = {
  dialog: DialogData;
  showDialog: (dialogData: DialogData) => void;
  closeDialog: () => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dialog, setDialog] = useState<DialogData>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showDialog = (dialogData: DialogData) => {
    setDialog(dialogData);
  };

  const closeDialog = () => {
    setDialog(null);
  };

  useEffect(() => {
    if (dialog && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialog]);

  return (
    <DialogContext.Provider
      value={{ dialog, showDialog, closeDialog, dialogRef }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
