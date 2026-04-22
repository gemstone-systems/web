{ lib, buildNpmPackage }:

buildNpmPackage {
  pname = "gemstone-web";
  version = "0.0.1";

  src = ./.;

  npmDepsHash = lib.fakeHash;

  meta = {
    description = "decentralised workplace app for web";
    homepage = "https://github.com/gemstone-systems/web";
    license = lib.licenses.mit;
    maintainers = with lib.maintainers; [ ];
    mainProgram = "example";
  };
}
