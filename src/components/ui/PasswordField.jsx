"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Field from "./Field";

const PasswordField = ({ label = "Password", name = "password", ...props }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Field label={label} name={name} type={visible ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="link-focus absolute right-3 top-9 text-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
      >
        {visible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
      </button>
    </div>
  );
};

export default PasswordField;
