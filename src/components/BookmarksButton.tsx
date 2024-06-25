import { TriangleDownIcon } from "@radix-ui/react-icons";
import { BookmarksPopover } from "./";
import { useEffect, useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".bookmarks-btn") && !target.closest(".bookmarks-popover")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover />}
    </section>
  );
}
