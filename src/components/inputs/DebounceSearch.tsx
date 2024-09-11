import { useEffect, useState } from "react";
import clsx from "clsx";

type Props = {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function DebounceSearch(props: Props) {
  const { onSearch, placeholder = "Search...", className } = props;

  const [searchText, setSearchText] = useState("");
  const [enableSearch, setEnableSearch] = useState(false);

  useEffect(() => {
    if (!enableSearch && !searchText) return;

    setEnableSearch(true);

    const timeoutId = setTimeout(() => {
      onSearch(searchText);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [searchText, enableSearch]);

  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className={clsx(
        "form-input h-[38px] md:w-[320px] placeholder:text-sm placeholder:font-light placeholder:text-white-dark",
        className
      )}
      placeholder={placeholder}
    />
  );
}
