import assert from "node:assert/strict";
import test from "node:test";

import {
  appointmentSchema,
  loginSchema,
  serviceUpdateSchema,
  signupSchema,
  strongPasswordSchema
} from "../src/schemas.js";

test("strong password policy accepts a representative strong password", () => {
  assert.equal(strongPasswordSchema.safeParse("ClinicPass9!").success, true);
});

test("strong password policy rejects weak passwords", () => {
  for (const value of ["short", "alllowercase9!", "ALLUPPERCASE9!", "NoNumber!!", "NoSymbol123"]) {
    assert.equal(strongPasswordSchema.safeParse(value).success, false, value);
  }
});

test("signup validation normalizes email and trims names", () => {
  const result = signupSchema.parse({
    fullName: "  Mohammad Farhat  ",
    email: "  USER@Example.COM ",
    phone: "70123456",
    password: "ClinicPass9!"
  });

  assert.equal(result.fullName, "Mohammad Farhat");
  assert.equal(result.email, "user@example.com");
});

test("login rejects malformed email addresses", () => {
  assert.equal(
    loginSchema.safeParse({ email: "not-an-email", password: "anything" }).success,
    false
  );
});

test("appointment validation enforces date/time shapes and note limits", () => {
  const valid = appointmentSchema.safeParse({
    fullName: "Mohammad Farhat",
    phone: "70123456",
    email: "m@example.com",
    serviceId: "service-1",
    preferredDate: "2026-10-15",
    preferredTime: "14:30",
    notes: "Routine appointment"
  });
  assert.equal(valid.success, true);

  const invalidDate = appointmentSchema.safeParse({
    fullName: "Mohammad Farhat",
    phone: "70123456",
    email: "m@example.com",
    serviceId: "service-1",
    preferredDate: "15/10/2026",
    preferredTime: "14:30"
  });
  assert.equal(invalidDate.success, false);

  const longNotes = appointmentSchema.safeParse({
    fullName: "Mohammad Farhat",
    phone: "70123456",
    email: "m@example.com",
    serviceId: "service-1",
    preferredDate: "2026-10-15",
    preferredTime: "14:30",
    notes: "x".repeat(801)
  });
  assert.equal(longNotes.success, false);
});

test("service updates reject impossible durations and negative prices", () => {
  assert.equal(serviceUpdateSchema.safeParse({ durationMinutes: 5 }).success, false);
  assert.equal(serviceUpdateSchema.safeParse({ priceFrom: -1 }).success, false);
  assert.equal(serviceUpdateSchema.safeParse({ durationMinutes: 60, priceFrom: 50 }).success, true);
});
