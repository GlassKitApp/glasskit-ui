import { defineConfig } from "vitest/config";

/**
 * Pure-unit suite — exercises the spatial-focus scoring (`scoreRect`)
 * and the sensor equality guards (`orientationEqual` / `motionEqual`)
 * without a DOM or any external service.
 */
export default defineConfig({
  test: {
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
});
