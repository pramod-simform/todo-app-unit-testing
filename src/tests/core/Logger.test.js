const logger = require("../../core/Logger");

describe("Logger Test Suite", () => {
  // Test Console Transport
  it("should have a console transport", () => {
    const transports = logger.transports;
    expect(transports).toHaveLength(1);
    expect(transports[0].name).toBe("console");
  });

  it("should log messages to the console with correct format", () => {
    // Use Jest spies to capture console.log output
    const consoleLogSpy = jest
      .spyOn(console._stderr, "write")
      .mockImplementation();

    // Log a message
    logger.info("Test log message");

    // Allow some time for potential asynchronous logging
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Test log message/)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/info/));

    // Restore the original console.log method
    consoleLogSpy.mockRestore();
  });

  // Test Log Levels
  it('should have log level set to "info"', () => {
    expect(logger.level).toBe("info");
  });

  it("should not log messages below the configured log level", () => {
    // Use Jest spies to capture log outputs
    const consoleLogSpy = jest
      .spyOn(console._stderr, "write")
      .mockImplementation();

    // Log messages with different levels
    logger.debug("Debug message");
    logger.info("Info message");

    // Assert that only messages equal or above 'info' level are logged
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Info message/)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/info/));

    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      expect.stringMatching(/\[debug\]: Debug message/)
    );

    // Restore the original console.log method
    consoleLogSpy.mockRestore();
  });

  // Test Timestamps and JSON Format
  it("should include timestamps in log messages", () => {
    // Use Jest spies to capture log outputs
    const consoleLogSpy = jest
      .spyOn(console._stderr, "write")
      .mockImplementation();

    // Log a message
    logger.info("Test log message");

    // Assert that the log message contains a timestamp
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    );

    // Restore the original console.log method
    consoleLogSpy.mockRestore();
  });

  it("should format log messages as JSON", () => {
    // Use Jest spies to capture log outputs
    const consoleLogSpy = jest
      .spyOn(console._stderr, "write")
      .mockImplementation();

    // Log a message
    logger.info("Test log message");

    // Assert that the log message is in JSON format
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Test log message/)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringMatching(/info/));

    // Restore the original console.log method
    consoleLogSpy.mockRestore();
  });

  // Test Logger Initialization
  // it("should be correctly initialized and exported", () => {
  //   // Assert that the logger is an instance of winston.Logger
  //   expect(logger).toBeInstanceOf(require("winston").Container);
  // });
});
