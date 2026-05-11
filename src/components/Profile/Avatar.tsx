import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Avatar = ({
    uri,
    className = "outline-accent h-10 rounded-full min-w-10 outline",
}: {
    uri: string | undefined;
    className?: string;
}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [uri]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <AnimatePresence>
                {(!loaded || !uri) && (
                    <motion.div
                        key="skeleton"
                        className="bg-overlay0 absolute inset-0 min-w-24 animate-pulse"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <motion.img
                key={uri}
                src={uri}
                onLoad={() => setLoaded(true)}
                className="size-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                alt={`Your profile picture found at ${uri}`}
            />
        </div>
    );
};
