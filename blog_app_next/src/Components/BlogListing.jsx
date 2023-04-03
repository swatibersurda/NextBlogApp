import styles from "../styles/Home.module.css"
export const BlogListing = ({ products }) => {
  return (
    <div>
      {products?.length > 0 &&
        products.map((item) => {
          return <div key={item.id} className={`${styles.parentListDiv}`}>
            <div className={`${styles.imageDiv}`}>
            <img src={item.image} width={"100%"} height={"100%"}/>
            </div>
            <div className={`${styles.contentDiv}`}>
                <h3 className={`${styles.familly}`}>{item.title}</h3>
                <p className={`${styles.colorFamilly}`}>{item.content}</p>
            </div>
          </div>;
        })}
    </div>
  );
};
