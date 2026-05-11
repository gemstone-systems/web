import { useEffect } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";

export const useModalMousedownEffect = ({
    setShowModal,
    modalRef,
}: {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    modalRef: RefObject<HTMLDivElement | null>;
}) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                setShowModal(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
};
