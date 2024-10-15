import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={styles.loader}></div>
    </div>
  );
}
export default Loader;
