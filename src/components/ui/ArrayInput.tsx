"use client";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ArrayInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
}

const ArrayInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: ArrayInputProps<T>) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-wrap gap-2">
            {(field.value as string[])?.map((item: string, index: number) => (
              <div
                key={index}
                className="flex text-wrap items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
              >
                {item}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0"
                  onClick={() => {
                    const newValue = [...field.value];
                    newValue.splice(index, 1);
                    field.onChange(newValue);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <FormControl>
              <Input
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </FormControl>
            <Button
              type="button"
              onClick={() => {
                if (inputValue.trim()) {
                  field.onChange([...field.value, inputValue.trim()]);
                  setInputValue("");
                }
              }}
            >
              Add
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ArrayInput;
