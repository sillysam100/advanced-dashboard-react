import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

interface ReloadPagePopupProps {
  reloadPage: () => void;
}

export default function ReloadPagePopup({ reloadPage }: ReloadPagePopupProps) {
  return (
    <div className="absolute top-0 left-0 right-0">
      <div className="flex align-middle items-center justify-center">
        <div className="mt-3">
          <div className="alert alert-error mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Connection to server lost!</span>
            <button className="btn ml-2" onClick={reloadPage}>
              Reload
              <FontAwesomeIcon icon={faSync} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
