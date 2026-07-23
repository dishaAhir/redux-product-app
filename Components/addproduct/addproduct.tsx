"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProductForm from "../productsform/productsform";
import styles from "./addproduct.module.scss";

export default function AddProduct() {
  const [showForm, setShowForm] = useState(false);

  // Redux માંથી Editing Product લાવો
  const editingProduct = useSelector(
    (state: RootState) => state.products.editingProduct,
  ); 

  // Edit button પર click થાય એટલે Popup Open થશે
  useEffect(() => {
    if (editingProduct) {
      setShowForm(true);
    }
  }, [editingProduct]);

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.addBtn} onClick={() => setShowForm(true)}>
        Add Product
        
      </button>

      {showForm && (
        <div className={styles.overlay} onClick={closeForm}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeForm}>
              <X size={22} />
            </button>

            <ProductForm closeForm={closeForm} />
          </div>
        </div> 
      )}
    </div>
  );
}
