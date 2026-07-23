"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProductCard from "../productcard/productcard";
import styles from "./productlist.module.scss";

export default function ProductList() {

  const products = useSelector(
    (state: RootState) => state.products.products
  );

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          description={product.description}
        />
      ))}
    </div>
  );
}