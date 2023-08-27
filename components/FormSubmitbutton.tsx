"use client";
import React, { ComponentProps } from "react";

// its always better to use interfacers instead of types unless we are going to use this type.
// here we are going to extend this type

type FormSubmitbuttonProps = {
  children: React.ReactNode;
  className?: String;
} & ComponentProps<"button">;

function FormSubmitbutton({ children, className }: FormSubmitbuttonProps) {
  return (<button
  className={`${className}`}>{children}</button>

)}

export default FormSubmitbutton;
