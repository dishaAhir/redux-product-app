"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  addProduct,
  updateProduct,
  clearProductBeingEdited,
  setFormData,
} from "@/store/features/products/productSlice";
import styles from "./productsform.module.scss";

type Props = {
  closeForm: () => void;
};

export default function ProductForm({ closeForm }: Props) {
  const dispatch = useDispatch();

  const productBeingEdited = useSelector(
    (state: RootState) => state.products.productBeingEdited,
  );

  const { name, image, description } = useSelector(
    (state: RootState) => state.products.formData,
  );

  useEffect(() => {
    if (productBeingEdited) {
      dispatch(
        setFormData({
          name: productBeingEdited.name,
          image: productBeingEdited.image,
          description: productBeingEdited.description,
        }),
      );
    }
  }, [productBeingEdited, dispatch]);

  const resetForm = () => {
    dispatch(clearProductBeingEdited());
    closeForm();
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const product = {
      id: productBeingEdited?.id ?? Date.now(),
      name,
      image,
      description,
    };

    dispatch(productBeingEdited ? updateProduct(product) : addProduct(product));

    resetForm();
  };

  const renderForm = () => (
    <div className={styles.container}>
      <div className={styles.left}>
        <label>Product Name</label>

        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) =>
            dispatch(
              setFormData({
                name: e.target.value,
              }),
            )
          }
        />

        <label>Product Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              dispatch(
                setFormData({
                  image: URL.createObjectURL(file),
                }),
              );
            }
          }}
        />

        <label>Description</label>

        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) =>
            dispatch(
              setFormData({
                description: e.target.value,
              }),
            )
          }
        />

        <div className={styles.buttonGroup}>
          <button className={styles.addBtn} onClick={handleSubmit}>
            {productBeingEdited ? "Update Product" : "Add Product"}
          </button>

          <button
            className={styles.cancelBtn}
            type="button"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <h3>Image Preview</h3>

        <div className={styles.preview}>
          <img src={image} alt={name} width="100%" height="250" />
        </div>

        <p>{name || "Image Title"}</p>
      </div>
    </div>
  );

  return renderForm();
}
