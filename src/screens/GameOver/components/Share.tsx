import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useClipboard } from "hooks";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  BiX,
  BiLink,
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTwitter,
} from "react-icons/bi";
import styles from "./Share.module.scss";

const shareData = {
  title: "Cancer Awareness",
  url: import.meta.env.VITE_BASE_URL,
};

export const Share = (props: { toggleShare: () => void }) => {
  const { clipboardSupported, copy, copied } = useClipboard();
  const [showShare, setShowShare] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, props.toggleShare);

  useEffect(() => {
    if ("canShare" in navigator && navigator.canShare(shareData)) {
      setShowShare(true);
    } else {
      setShowShare(false);
    }
  }, []);

  const handleButtonClick = () => {
    if (showShare) {
      navigator.share(shareData).catch((error) => {
        console.error("Error sharing:", error);
      });
    } else {
      copy(import.meta.env.VITE_BASE_URL);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div ref={ref} className={styles.wrapper}>
        <div className="flex flex-col gap-8 ">
          <div className="flex justify-between">
            <div className={styles.shareText}>Share with</div>

            <button onClick={props.toggleShare}>
              <BiX className={styles.closebtn} />
            </button>
          </div>

          <div className="flex justify-between">
            {clipboardSupported && (
              <div className="flex flex-col items-center gap-2 w-20">
                <button onClick={handleButtonClick}>
                  <div className={styles.shareButton}>
                    <BiLink className={styles.shareIcon} />
                  </div>
                </button>
                <div className="ca-body--sm whitespace-nowrap">
                  {showShare ? "Share" : copied ? "Copied" : "Copy Link"}
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-2 w-20">
              <FacebookShareButton url={import.meta.env.VITE_BASE_URL}>
                <div className={styles.shareButton}>
                  <BiLogoFacebook className={styles.shareIcon} />
                </div>
              </FacebookShareButton>
              <div className="ca-body--sm">Facebook</div>
            </div>

            <div className="flex flex-col items-center gap-2 w-20">
              <LinkedinShareButton url={import.meta.env.VITE_BASE_URL}>
                <div className={styles.shareButton}>
                  <BiLogoLinkedin className={styles.shareIcon} />
                </div>
              </LinkedinShareButton>
              <div className="ca-body--sm">LinkedIn</div>
            </div>

            <div className="flex flex-col items-center gap-2 w-20">
              <TwitterShareButton url={import.meta.env.VITE_BASE_URL}>
                <div className={styles.shareButton}>
                  <BiLogoTwitter className={styles.shareIcon} />
                </div>
              </TwitterShareButton>
              <div className="ca-body--sm">Twitter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
