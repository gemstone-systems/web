import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

export const useModalEscapeEffect = ({
    setShowModal,
}: {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowModal(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);
};
