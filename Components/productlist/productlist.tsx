import { mockData } from "@/data/mockdata";
import Productcard from "../productcard/productcard";
import styles from "./productlist.module.scss";

export default function ProductList() {
  return (
    <div className={styles.container}>
      {mockData.map((product) => (
        <Productcard
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