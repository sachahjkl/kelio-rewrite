{
  description = "Reproducible checks for kelio-rewrite";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    semgrep-rules = {
      url = "github:semgrep/semgrep-rules";
      flake = false;
    };
  };

  outputs =
    { nixpkgs, semgrep-rules, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      checks = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          nodeModules = pkgs.importNpmLock.buildNodeModules {
            npmRoot = ./.;
            nodejs = pkgs.nodejs;
          };
          npmCheck =
            name: command:
            pkgs.stdenvNoCC.mkDerivation {
              inherit name;
              npmDeps = nodeModules;
              src = ./.;
              nativeBuildInputs = [
                pkgs.nodejs
                pkgs.importNpmLock.hooks.linkNodeModulesHook
              ];
              buildPhase = command;
              installPhase = "touch $out";
            };
        in
        {
          actionlint =
            pkgs.runCommand "actionlint"
              {
                nativeBuildInputs = [ pkgs.actionlint ];
              }
              ''
                actionlint -config-file ${./.github/actionlint.yaml} ${./.github/workflows/ci.yml}
                touch $out
              '';
          oxfmt = npmCheck "oxfmt" "npm run format:check";
          oxlint = npmCheck "oxlint" "npm run lint";
          semgrep =
            pkgs.runCommand "semgrep"
              {
                nativeBuildInputs = [ pkgs.semgrep ];
                SEMGREP_SEND_METRICS = "off";
                SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
              }
              ''
                export HOME="$TMPDIR"
                semgrep scan --metrics off --config ${semgrep-rules}/javascript --error ${./.}
                touch $out
              '';
        }
      );

      formatter = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        pkgs.writeShellScriptBin "nix-fmt" ''
          if [ "$#" -eq 0 ]; then
            set -- flake.nix
          fi
          exec ${pkgs.nixfmt}/bin/nixfmt "$@"
        ''
      );
    };
}
