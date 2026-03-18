const fs = require("node:fs/promises");
const path = require("node:path");

const snkModule = require("@ali1416/snk");

const snk =
  typeof snkModule === "function"
    ? snkModule
    : snkModule?.default ?? snkModule?.snk;

if (typeof snk !== "function") {
  throw new Error(
    `Cannot load @ali1416/snk as a function. Keys: ${Object.keys(snkModule || {}).join(", ")}`
  );
}

(async () => {
  const username = process.env.GITHUB_REPOSITORY_OWNER;
  if (!username) {
    throw new Error("GITHUB_REPOSITORY_OWNER is not set.");
  }

  const outDir = path.resolve("assets");
  await fs.mkdir(outDir, { recursive: true });

  const result = await snk(username, 3);

  await fs.writeFile(path.join(outDir, "github-snake.svg"), result[1], "utf8");
  await fs.writeFile(path.join(outDir, "github-snake-dark.svg"), result[2], "utf8");

  console.log(`Generated snake assets for ${username}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});