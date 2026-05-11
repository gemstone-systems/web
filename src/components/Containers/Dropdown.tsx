import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { useModalEscapeEffect } from "@/lib/hooks/useModalEscapeEffect";
import { useModalMousedownEffect } from "@/lib/hooks/useModalMousedownEffect";

export const DropdownModal = ({
    buttonComponent,
    children,
    className,
}: {
    buttonComponent: ReactNode;
    children: ReactNode;
    className?: string;
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useModalEscapeEffect({ setShowModal: setShowDropdown });
    useModalMousedownEffect({
        setShowModal: setShowDropdown,
        modalRef: dropdownRef,
    });

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                className="cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                {buttonComponent}
            </button>
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className={`absolute right-0 z-50 origin-top-right cursor-default shadow-xl ${className}`}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
