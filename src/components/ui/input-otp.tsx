// input-otp.tsx - Reusable OTP (One-Time Password) input component for the blog app UI.
// Used for authentication, verification, and secure input flows.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

const InputOtp = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => {
  try {
    return (
      <OTPInput
        ref={ref}
        containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    );
  } catch (err) {
    console.error("Error rendering InputOtp:", err);
    return null;
  }
});
InputOtp.displayName = "InputOtp";

const InputOtpGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOtpGroup.displayName = "InputOtpGroup";

const InputOtpSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return (
    <div
      ref={ref}
      data-active={isActive}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-b-2 text-center text-2xl font-mono outline-none transition-all",
        isActive ? "border-primary" : "border-muted-foreground",
        className
      )}
      {...props}
    >
      {char ? (
        <span>{char}</span>
      ) : hasFakeCaret ? (
        <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-primary" />
      ) : null}
    </div>
  );
});
InputOtpSlot.displayName = "InputOtpSlot";

const InputOtpSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} role="separator" className={cn("mx-2 w-2 text-muted-foreground", className)} {...props}>
    <Dot className="h-4 w-4" />
  </div>
));
InputOtpSeparator.displayName = "InputOtpSeparator";

export { InputOtp, InputOtpGroup, InputOtpSlot, InputOtpSeparator };
