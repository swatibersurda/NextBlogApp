import Link from "next/link";
import styles from "../styles/Home.module.css";
export const BlogListing = ({ products }) => {
  return (
    <div>
      {products?.length > 0 &&
        products.map((item) => {
          return (
            <Link
              href={`/individualPostPage/${item._id}`}
              key={item._id}
              className={`${styles.linkNone}`}
            >
              <div className={`${styles.parentListDiv}`}>
                <div className={`${styles.imageDiv}`}>
                  <img src={item.image} width={"100%"} height={"100%"} />
                </div>
                <div className={`${styles.contentDiv}`}>
                  <h3 className={`${styles.familly}`}>Title: {item.title}</h3>
                  <div className={styles.blogListing}>
                    <p className={`${styles.colorFamilly}`}>{item.content}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};
