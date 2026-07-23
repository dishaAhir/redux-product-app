"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  addProduct,
  updateProduct,
  clearEditingProduct,
} from "@/store/features/products/productSlice";
import styles from "./productsform.module.scss";

type Props = {
  closeForm: () => void;
};

export default function ProductForm({ closeForm }: Props) {
  const dispatch = useDispatch();

  const editingProduct = useSelector(
    (state: RootState) => state.products.editingProduct
  );

  const [name, setName] = useState("");
  const [image, setImage] = useState("/products/place-holder-image.jpg");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setImage(editingProduct.image);
      setDescription(editingProduct.description);
    }
  }, [editingProduct]);

  const resetForm = () => {
    setName("");
    setImage("/products/place-holder-image.jpg");
    setDescription("");
    dispatch(clearEditingProduct());
    closeForm();
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (editingProduct) {
      dispatch(
        updateProduct({
          id: editingProduct.id,
          name,
          image,
          description,
        })
      );
    } else {
      dispatch(
        addProduct({
          id: Date.now(),
          name,
          image,
          description,
        })
      );
    }

    resetForm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <label>Product Name</label>

        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Product Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setImage(URL.createObjectURL(file));
            }
          }}
        />

        <label>Description</label>

        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.buttonGroup}>
          <button
            className={styles.addBtn}
            onClick={handleSubmit}
          >
            {editingProduct ? "Update Product" : "Add Product"}
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
          <img
            src={image}
            alt={name}
            width="100%"
            height="250"
          />
        </div>

        <p>{name || "Image Title"}</p>
      </div>
    </div>
  );
}