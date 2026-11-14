import test from "node:test";
import assert from "node:assert/strict";
import { configuredSiteOrigin, safeLocalRedirectPath } from "../src/lib/auth-helpers.ts";

test("auth callback accepts a local dashboard path", () => {
  assert.equal(safeLocalRedirectPath("/dashboard?welcome=1"), "/dashboard?welcome=1");
});

test("auth callback rejects absolute and protocol-relative redirects", () => {
  assert.equal(safeLocalRedirectPath("https://example.com"), "/dashboard");
  assert.equal(safeLocalRedirectPath("//example.com"), "/dashboard");
});

test("auth callback rejects backslash and control-character paths", () => {
  assert.equal(safeLocalRedirectPath("/\\example.com"), "/dashboard");
  assert.equal(safeLocalRedirectPath("/dashboard\nSet-Cookie:evil"), "/dashboard");
});

test("auth callback falls back for missing or malformed destinations", () => {
  assert.equal(safeLocalRedirectPath(null), "/dashboard");
  assert.equal(safeLocalRedirectPath("dashboard"), "/dashboard");
});

test("configured site origin accepts HTTPS and local development only", () => {
  assert.equal(configuredSiteOrigin("https://autween.example"), "https://autween.example");
  assert.equal(configuredSiteOrigin("http://localhost:3000"), "http://localhost:3000");
  assert.equal(configuredSiteOrigin("http://autween.example"), null);
});

test("configured site origin rejects credentials, paths and malformed values", () => {
  assert.equal(configuredSiteOrigin("https://user:pass@autween.example"), null);
  assert.equal(configuredSiteOrigin("https://autween.example/path"), null);
  assert.equal(configuredSiteOrigin("not-a-url"), null);
  assert.equal(configuredSiteOrigin(undefined), null);
});
