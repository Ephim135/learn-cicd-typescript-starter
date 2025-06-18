import { getAPIKey } from "src/api/auth";
import { describe, it, expect } from "vitest";

describe("getAPIKey", () => {
  it("returns null if authorization header is missing", () => {
    const headers = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null if authorization header is not a string", () => {
    const headers = { authorization: undefined };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null if authorization header does not start with 'ApiKey'", () => {
    const headers = { authorization: "Bearer abc123" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null if authorization header has no token", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns the API key if header is correctly formatted", () => {
    const headers = { authorization: "ApiKey my-secret-key" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  it("returns only the second part even if there are more segments", () => {
    const headers = { authorization: "ApiKey part1 part2" };
    expect(getAPIKey(headers)).toBe("part1");
  });
});
