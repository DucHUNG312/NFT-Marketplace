import { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import Form from "../accountPage/Form/Form";
import styles from "../styles/account.module.css";
import images from "../img";

const Account = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={styles.account}>
      <div className={styles.account_info}>
        <h1>Profile settings</h1>
        <p>
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>

      <div className={styles.account_box}>
        <div className={styles.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={images.upload}
            alt="account upload"
            width={150}
            height={150}
            className={styles.account_box_img_img}
          />
          <p className={styles.account_box_img_para}>Change Image</p>
        </div>
        <div className={styles.account_box_form}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Account;
