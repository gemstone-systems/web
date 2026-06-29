import { defineLexiconConfig } from "@atcute/lex-cli";

export default defineLexiconConfig({
    generate: {
        files: ["lexicons/**/*.json"],
        outdir: "src/lib/_GENERATED_/lexicons/",
        imports: ["@atcute/atproto"],
    },
});
