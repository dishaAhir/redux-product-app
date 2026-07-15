import styles from "./productcard.module.scss";

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export default function Productcard({
  name,
  image,
  description,
}: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.image}
      />

      <h2 className={styles.title}>{name}</h2>

      <p className={styles.description}>{description}</p>

      <div className={styles.buttonGroup}>
        <button className={styles.editBtn}>Edit</button>

        <button className={styles.deleteBtn}>Delete</button>
      </div>
    </div>
  );
}