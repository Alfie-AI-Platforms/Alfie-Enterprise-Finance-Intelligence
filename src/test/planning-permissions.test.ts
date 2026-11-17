import { describe, expect, it } from "vitest";
import { canApproveForecast, canPlanning, canPublish } from "@/lib/planning-data";

describe("planning role permissions", () => {
  it("VP Finance can approve and publish forecasts", () => {
    expect(canPlanning("VP Finance", "approveForecast")).toBe(true);
    expect(canPlanning("VP Finance", "publishForecast")).toBe(true);
  });

  it("FP&A Analyst can prepare but not approve forecasts", () => {
    expect(canPlanning("FP&A Analyst", "prepareForecast")).toBe(true);
    expect(canPlanning("FP&A Analyst", "approveForecast")).toBe(false);
  });

  it("FP&A Director approval authority stops at a 1.5 percent revenue change", () => {
    expect(canApproveForecast("FP&A Director", 1.2)).toBe(true);
    expect(canApproveForecast("FP&A Director", 1.8)).toBe(false);
    expect(canApproveForecast("VP Finance", 1.8)).toBe(true);
  });

  it("CFO can approve but cannot prepare forecasts", () => {
    expect(canApproveForecast("CFO", 4.0)).toBe(true);
    expect(canPlanning("CFO", "prepareForecast")).toBe(false);
  });

  it("publishing requires an approved review and the publish permission", () => {
    expect(canPublish("VP Finance", "Approved")).toBe(true);
    expect(canPublish("VP Finance", "Pending Approval")).toBe(false);
    expect(canPublish("FP&A Director", "Approved")).toBe(false);
  });
});
