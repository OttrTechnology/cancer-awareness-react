import { useRef } from "react";
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
import { useOnClickOutside } from "usehooks-ts";
import { useGameContext } from "hooks";
import styles from "./Share.module.scss";

interface Props {
  toggleShare: () => void;
}

export const Share = ({ toggleShare }: Props) => {
  const { shareSupported, handleCopyLink, clipboardSupported, copied } =
    useGameContext();

  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, toggleShare);

  return (
    <div className={styles.mainWrapper}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div className="flex flex-col gap-6 lg:gap-8 ">
          <div className="flex justify-between">
            <div className={styles.shareText}>Share with</div>

            <button onClick={toggleShare}>
              <BiX className={styles.closeBtn} />
            </button>
          </div>

          <div className="flex justify-between">
            {clipboardSupported && (
              <div className={styles.shareContainer}>
                <button onClick={handleCopyLink}>
                  <div className={styles.shareButton}>
                    <BiLink className={styles.shareIcon} />
                  </div>
                </button>

                <div className="ca-body--sm whitespace-nowrap">
                  {shareSupported ? "Share" : copied ? "Copied" : "Copy Link"}
                </div>
              </div>
            )}

            <div className={styles.shareContainer}>
              <FacebookShareButton url={import.meta.env.VITE_BASE_URL}>
                <div className={styles.shareButton}>
                  <BiLogoFacebook className={styles.shareIcon} />
                </div>
              </FacebookShareButton>

              <div className="ca-body--sm">Facebook</div>
            </div>

            <div className={styles.shareContainer}>
              <LinkedinShareButton url={import.meta.env.VITE_BASE_URL}>
                <div className={styles.shareButton}>
                  <BiLogoLinkedin className={styles.shareIcon} />
                </div>
              </LinkedinShareButton>

              <div className="ca-body--sm">LinkedIn</div>
            </div>

            <div className={styles.shareContainer}>
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
