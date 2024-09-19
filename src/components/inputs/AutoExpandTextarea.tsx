import { RefObject, TextareaHTMLAttributes, useEffect } from "react";
import clsx from "clsx";

type Props = {
  textareaRef: RefObject<HTMLTextAreaElement>;
};

export default function AutoExpandTextarea(
  props: Props & TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const { textareaRef, className, ...attribute } = props;

  useEffect(() => {
    const autoExpand = (el: HTMLElement) => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    };
    const textareaElm = textareaRef.current;

    if (textareaElm) {
      textareaElm!.addEventListener("input", () =>
        autoExpand(textareaElm as HTMLElement)
      );
    }

    return () => {
      textareaElm!.removeEventListener("input", () =>
        autoExpand(textareaElm as HTMLElement)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className={clsx("w-full px-2 py-1 border rounded", className)}
      {...attribute}
    />
  );
}
