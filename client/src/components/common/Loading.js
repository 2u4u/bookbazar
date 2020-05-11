import React from 'react';
import styles from "./loading.module.scss";

function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div className={styles.text}>Loading</div>
      </div>
    </div>
  );
};

export default Loading;
