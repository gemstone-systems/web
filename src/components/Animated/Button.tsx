import { motion } from "motion/react";
import { useState } from "react";
import type { Transition, Variants } from "motion/react";
import type { MouseEventHandler, ReactNode } from "react";

export const Button = ({
    className,
    onClick,
    icon,
    iconVariants = {
        rest: { rotate: 0 },
        active: { rotate: [0, -10, 10, -10, 10, 0, 0, 0] },
    },
    iconTransitions = { duration: 0.3, ease: "easeInOut" },
    iconPosition = "left",
    iconClassName = "text-accent",
    label,
    labelClassName = "text-accent",
    underlineClassName = "bg-accent",
    disabled = false,
}: {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    iconVariants?: Variants;
    iconTransitions?: Transition;
    iconClassName?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    labelClassName?: string;
    label: string;
    underlineClassName?: string;
    disabled?: boolean;
}) => {
    const [isIconWiggle, setIsIconWiggle] = useState(false);

    const iconElement = icon && (
        <motion.div
            variants={iconVariants}
            initial="rest"
            transition={iconTransitions}
            className={iconClassName}
            animate={isIconWiggle ? "active" : "rest"}
        >
            {icon}
        </motion.div>
    );

    return (
        <motion.button
            onClick={onClick}
            className={`flex items-center gap-2 pl-2 ${className}`}
            initial="initial"
            whileHover={disabled ? undefined : "hover"}
            onHoverStart={() => !disabled && setIsIconWiggle(true)}
            onAnimationComplete={() => setIsIconWiggle(false)}
            disabled={disabled}
        >
            {iconPosition === "left" && iconElement}
            <motion.div className="relative inline-block">
                <p className={labelClassName}>{label}</p>
                <motion.span
                    className={`absolute bottom-1 left-0 h-0.25 w-full origin-center ${underlineClassName}`}
                    variants={{
                        initial: { scaleX: 0 },
                        hover: { scaleX: 1 },
                    }}
                    transition={{
                        type: "spring",
                        duration: 0.2,
                        bounce: 0.3,
                    }}
                />
            </motion.div>
            {iconPosition === "right" && iconElement}
        </motion.button>
    );
};
