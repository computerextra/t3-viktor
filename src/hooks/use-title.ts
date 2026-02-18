import * as React from "react";

export function useTitle(title: string | undefined) {
  React.useEffect(() => {
    if (title) {
      document.title = title + " · Viktor";
    } else {
      document.title = "Viktor";
    }
  }, [title]);
}
