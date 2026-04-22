{
  mkShellNoCC,

  # extra tooling
  eslint_d,
  prettierd,
  nodejs_24,
  pnpm,
  typescript,
  typescript-language-server,
  prettier,

  callPackage,
}:
let
  defaultPackage = callPackage ./default.nix { };
in
mkShellNoCC {
  inputsFrom = [ defaultPackage ];

  packages = [
    eslint_d
    prettierd
    nodejs_24
    pnpm
    typescript
    typescript-language-server
    prettier
  ];
}
