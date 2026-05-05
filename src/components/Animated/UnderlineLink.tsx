import { motion } from "motion/react";
import type { ReactNode } from "react";

export const UnderlineLink = ({
    href,
    children,
    className = "text-accent",
    underlineColor = "bg-accent",
    target = "_self",
}: {
    href: string;
    children: ReactNode;
    className?: string;
    underlineColor?: string;
    target?: "_blank" | "_self" | "_parent" | "_top" | "_unfencedTop";
}) => {
    return (
        <motion.a
            href={href}
            className={`relative inline-block ${className}`}
            initial="initial"
            whileHover="hover"
            target={target}
        >
            {children}
            <motion.span
                className={`absolute bottom-1 left-0 h-0.25 w-full origin-center ${underlineColor}`}
                variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 },
                }}
                transition={{
                    type: "spring",
                    duration: 0.25,
                    bounce: 0.3,
                }}
            />
        </motion.a>
    );
};
