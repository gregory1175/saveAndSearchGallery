import { useState } from "react";
import style from "./toggleButton.module.scss";

type ToggleButtonProps = {
  click: () => void;
  disabled: boolean;
};

function ToggleButton({ click, disabled }: ToggleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      click();
    }
  };

  return (
    <button
      className={`${style["toggle-btn"]} ${isOpen ? style["open"] : ""}`}
      onClick={toggleMenu}
      disabled={disabled}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <path
          className={`${style["line"]} ${style["line1"]}`}
          d="M 2 2.5 L 19 2.5"
        />
        <path
          className={`${style["line"]} ${style["line2"]}`}
          d="M 2 9.423 L 20 9.423"
        />
        <path
          className={`${style["line"]} ${style["line3"]}`}
          d="M 2 16.346 L 20 16.346"
        />
      </svg>
    </button>
  );
}

export default ToggleButton;
