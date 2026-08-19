"use client";

import { X } from "lucide-react";
import styles from "./modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={22} />
        </button>
        {children}
      </div>
    </div>
  );
}
