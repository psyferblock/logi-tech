"use client";
import React, { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

// its always better to use interfacers instead of types unless we are going to use this type.
// here we are going to extend this type

type FormSubmitbuttonProps = {
  children: React.ReactNode;
  className?: String;
} & ComponentProps<"button">;

function FormSubmitbutton({
  children,
  className,
  ...props
}: FormSubmitbuttonProps) {
  
  
  // the useFormStatus hook automatically hooks to the parent form of the submit button. it gives us a few values
  // pending is the loading state.
  const { pending } = useFormStatus();
  return (
    <button
      className={`${className} btn btn-primary`}
      type="submit"
      disabled={pending}
    >
      {/* daisy ui gives us a loading spinner as the component so we can use the pending format of hte hook to engage witht the page  */}
      {pending && <span className="loading-spinner"></span>}
      {children}
    </button>
  );
}

export default FormSubmitbutton;
