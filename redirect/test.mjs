import assert from "node:assert/strict";
import worker from "./worker.js";

const go = (path, referer) =>
  worker.fetch(new Request(`https://x${path}`, { headers: referer ? { Referer: referer } : {} })).headers.get("Location");

assert.equal(go("/discussions", "https://github.com/Kludex/python-multipart/blob/main/CONTRIBUTING.md"), "https://github.com/Kludex/python-multipart/discussions");
assert.equal(go("/security/policy", "https://github.com/Kludex/starlette/security/policy"), "https://github.com/Kludex/starlette/security/policy");
assert.equal(go("/", "https://github.com/Kludex/uvicorn"), "https://github.com/Kludex/uvicorn");
assert.equal(go("//evil.com", "https://github.com/Kludex/uvicorn"), "https://github.com/Kludex/uvicorn//evil.com");
assert.equal(go("/discussions", "https://github.com/evil/repo"), "https://github.com/Kludex");
assert.equal(go("/discussions", null), "https://github.com/Kludex");
console.log("ok");
