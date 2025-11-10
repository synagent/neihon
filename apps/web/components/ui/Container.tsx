import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: ContainerProps<T>) {
  const Component = (as || "div") as ElementType;
  return (
    <Component className={cn("mx-auto w-full max-w-6xl px-4 md:px-6", className)} {...rest}>
      {children}
    </Component>
  );
}
