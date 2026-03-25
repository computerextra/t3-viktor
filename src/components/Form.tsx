"use client";

import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { Field, FieldContent, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { useState } from "react";

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

const FormInput = ({
  className,
  label,
  loading,
}: {
  className?: string;
  label: string;
  loading: boolean;
}) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        className={cn(className)}
        disabled={loading}
        id={field.name}
        name={field.name}
        // value={field.state.value}
        defaultValue={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

const FormNumberInput = ({
  className,
  label,
  loading,
}: {
  className?: string;
  label: string;
  loading: boolean;
}) => {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        className={cn(className)}
        disabled={loading}
        id={field.name}
        name={field.name}
        // value={field.state.value}
        defaultValue={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(parseInt(e.target.value))}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

const FormSwitch = ({
  label,
  loading,
}: {
  label: string;
  loading: boolean;
}) => {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Switch
        disabled={loading}
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

const FormTextarea = ({
  className,
  label,
  loading,
}: {
  className?: string;
  label: string;
  loading: boolean;
}) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        disabled={loading}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        className={cn("min-h-30", className)}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

const FormSelect = ({
  label,
  loading,
  data,
}: {
  label: string;
  loading: boolean;
  data: Array<{ label: string; value: string }>;
}) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field orientation={"vertical"} data-invalid={isInvalid}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldContent>
      <Select
        disabled={loading}
        name={field.name}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        <SelectTrigger
          id={field.name}
          aria-invalid={isInvalid}
          className="min-2-[120px]"
        >
          <SelectValue placeholder="Bitte wählen..." />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          {data.map((x, idx) => (
            <SelectItem key={idx} value={x.value}>
              {x.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};

const FormDateInput = ({
  className,
  label,
  loading,
}: {
  className?: string;
  label: string;
  loading: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const field = useFieldContext<Date | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field className="w-44">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={loading}
            variant={"outline"}
            id={field.name}
            className="justify-start font-normal"
          >
            {field.state.value
              ? field.state.value.toLocaleDateString()
              : "Bitte wählen..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            defaultMonth={field.state.value}
            disabled={loading}
            captionLayout="dropdown"
            onSelect={(e) => {
              field.handleChange(e);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormInput,
    FormNumberInput,
    FormSwitch,
    FormTextarea,
    FormSelect,
    FormDateInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
