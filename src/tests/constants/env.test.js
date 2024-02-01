const env = require("../../constants/ENV");
const isValidHostname = require("../../utils/validateHostName");

describe("Validate environment variables", () => {
  it("should contain all mandatory keys", () => {
    const expected = [
      "MONGODB_HOST",
      "MONGODB_USER",
      "MONGODB_PASSWORD",
      "MONGODB_DATABASE",
    ];

    expect(expected).toEqual(Object.keys(env));
  });

  it("should contain all mandatory keys value", () => {
    expect(env.MONGODB_HOST).toBeTruthy();
    expect(env.MONGODB_DATABASE).toBeTruthy();
  });

  it("should contain valid host name", () => {
    expect(isValidHostname(env.MONGODB_HOST)).toBeTruthy();
  });
});
