import { cp } from "fs/promises";
import { resolve } from "path";
import type { Options } from "tsup";

const config: Options = {
  entry: ["index.ts"],
  dts: true,
  format: ["iife", "cjs", "esm"],
  async onSuccess() {
    await cp(
      resolve(__dirname, "dist/index.d.ts"),
      resolve(__dirname, "dist/index.d.cts")
    );
  },
};

export default config;
