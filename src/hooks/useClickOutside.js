import { useCallback, useEffect } from "react";

export function useClickOutside(ref, fn) {
    const handleClick = useCallback(
        e => {
            if (ref.current && !ref.current?.contains(e.target)) {
                fn();
            }
        },
        [fn, ref]
    );

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handleClick]);
}
