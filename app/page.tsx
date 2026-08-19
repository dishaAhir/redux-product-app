"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearProductBeingEdited } from "@/store/features/products/productSlice";
import ProductForm from "@/Components/productsform/productsform";
import Modal from "@/Components/modal/modal";
import ProductList from "@/Components/productlist/productlist";
import styles from "./page.module.scss";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const productBeingEdited = useSelector(
    (state: RootState) => state.products.productBeingEdited,
  );

  useEffect(() => {
    if (productBeingEdited) {
      setShowForm(true);
    }
  }, [productBeingEdited]);

  const closeForm = () => {
    setShowForm(false);
    dispatch(clearProductBeingEdited());
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          Add Product
        </button>
      </div>

      {showForm && (
        <Modal onClose={closeForm}>
          <ProductForm closeForm={closeForm} />
        </Modal>
      )}

      <ProductList />
    </>
  );
}
