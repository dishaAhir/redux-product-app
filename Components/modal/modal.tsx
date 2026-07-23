"use client";

import styles from "./modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  children,
  onClose,
}: ModalProps) {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}