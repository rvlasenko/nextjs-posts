interface DateFormatOptions {
  dateStyle: "full" | "long" | "medium" | "short";
  timeStyle: "full" | "long" | "medium" | "short";
}

export function formatDate(date: string | number | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  } as DateFormatOptions).format(new Date(date));
}
