"use client";

import { useDispatch } from "react-redux";
import {
  deleteProduct,
  setProductBeingEdited,
} from "@/store/features/products/productSlice";
import styles from "./productcard.module.scss";

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export default function ProductCard({
  id,
  name,
  image,
  description,
}: ProductCardProps) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      setProductBeingEdited({
        id,
        name,
        image,
        description,
      }),
    );
  };

  const renderAction = () => (
    <div className={styles.buttonGroup}>
      <button className={styles.editBtn} onClick={handleEdit}>
        Edit
      </button>

      <button
        className={styles.deleteBtn}
        onClick={() => dispatch(deleteProduct(id))}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <h2>{name}</h2>
      <p>{description}</p>
      {renderAction()}
    </div>
  );
}


