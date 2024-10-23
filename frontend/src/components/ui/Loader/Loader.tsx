import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className="flex items-center justify-center absolute top-1/2 right-1/2">
      <div className={styles.loader}></div>
    </div>
  );
}
