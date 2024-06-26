import { App } from "./app.ts";

async function main() {
    const app = new App();
    await app.listen()
}

main();