// form.tsx - Reusable Form components for the blog app UI.
// Provides form context, field, label, control, description, and message components for forms.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
// Remove the incorrect import:
// import { Form as FormPrimitive } from "radix-ui"

// The main Form component is FormProvider from react-hook-form
const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    try {
      const id = React.useId()

      return (
        <FormItemContext.Provider value={{ id }}>
          <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
      )
    } catch (err) {
      console.error("Error rendering FormItem:", err)
      return null
    }
  }
)
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    // useFormField must be called at the top level
    const { error, formItemId } = useFormField();
    try {
      return (
        <Label
          ref={ref}
          className={cn(error && "text-destructive", className)}
          htmlFor={formItemId}
          {...props}
        />
      );
    } catch (err) {
      console.error("Error rendering FormLabel:", err);
      return null;
    }
  }
);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // useFormField must be called at the top level
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    try {
      return (
        <Slot
          ref={ref}
          id={formItemId}
          aria-describedby={
            !error
              ? `${formDescriptionId}`
              : `${formDescriptionId} ${formMessageId}`
          }
          aria-invalid={!!error}
          {...props}
        />
      );
    } catch (err) {
      console.error("Error rendering FormControl:", err);
      return null;
    }
  }
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    // useFormField must be called at the top level
    const { formDescriptionId } = useFormField();
    try {
      return (
        <p
          ref={ref}
          id={formDescriptionId}
          className={cn("text-sm text-muted-foreground", className)}
          {...props}
        />
      );
    } catch (err) {
      console.error("Error rendering FormDescription:", err);
      return null;
    }
  }
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  // useFormField must be called at the top level
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;
  if (!body) {
    return null;
  }
  try {
    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {body}
      </p>
    );
  } catch (err) {
    console.error("Error rendering FormMessage:", err);
    return null;
  }
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
