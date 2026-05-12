import { LogLevels, createConsola } from "consola";

const logger = createConsola({
    level: import.meta.env.DEV ? LogLevels.debug : LogLevels.warn,
});

export default logger;
