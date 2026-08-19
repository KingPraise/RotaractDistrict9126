/**
 * Custom Typed Assertion Library for Rotaract District 9126 E2E Test Suite
 */

export class AssertionError extends Error {
  public actual?: any;
  public expected?: any;

  constructor(message: string, actual?: any, expected?: any) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function assert(condition: boolean, message: string = 'Assertion failed'): void {
  if (!condition) {
    throw new AssertionError(message);
  }
}

export function expectEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual !== expected) {
    const defaultMsg = `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, expected);
  }
}

export function expectNotEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual === expected) {
    const defaultMsg = `Expected value NOT to equal ${JSON.stringify(expected)}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, expected);
  }
}

export function expectDeepEqual(actual: any, expected: any, message?: string): void {
  const actualStr = JSON.stringify(sortKeys(actual));
  const expectedStr = JSON.stringify(sortKeys(expected));

  if (actualStr !== expectedStr) {
    const defaultMsg = `Expected deep equality.\nActual:   ${actualStr}\nExpected: ${expectedStr}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, expected);
  }
}

function sortKeys(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sortKeys);
  const sorted: Record<string, any> = {};
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = sortKeys(obj[key]);
  }
  return sorted;
}

export function expectTruthy(actual: any, message?: string): void {
  if (!actual) {
    const defaultMsg = `Expected truthy value but received ${JSON.stringify(actual)}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, true);
  }
}

export function expectFalsy(actual: any, message?: string): void {
  if (actual) {
    const defaultMsg = `Expected falsy value but received ${JSON.stringify(actual)}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, false);
  }
}

export function expectMatch(actual: string, pattern: RegExp | string, message?: string): void {
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  if (!regex.test(actual)) {
    const defaultMsg = `Expected "${actual}" to match pattern ${regex}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, pattern);
  }
}

export function expectArrayContains<T>(array: T[], item: T | ((el: T) => boolean), message?: string): void {
  let found = false;
  if (typeof item === 'function') {
    found = array.some(item as (el: T) => boolean);
  } else {
    found = array.includes(item);
  }

  if (!found) {
    const defaultMsg = `Expected array to contain item ${JSON.stringify(item)}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, array, item);
  }
}

export function expectArrayLength<T>(array: T[], expectedLength: number, message?: string): void {
  if (array.length !== expectedLength) {
    const defaultMsg = `Expected array length to be ${expectedLength}, but got ${array.length}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, array.length, expectedLength);
  }
}

export function expectGreaterThanOrEqual(actual: number, expected: number, message?: string): void {
  if (actual < expected) {
    const defaultMsg = `Expected ${actual} to be >= ${expected}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, expected);
  }
}

export function expectLessThanOrEqual(actual: number, expected: number, message?: string): void {
  if (actual > expected) {
    const defaultMsg = `Expected ${actual} to be <= ${expected}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, expected);
  }
}

export function expectDefined<T>(actual: T | undefined | null, message?: string): asserts actual is T {
  if (actual === undefined || actual === null) {
    const defaultMsg = `Expected value to be defined and not null, but got ${actual}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actual, 'defined');
  }
}

export function expectTypeOf(actual: any, expectedType: 'string' | 'number' | 'boolean' | 'object' | 'function' | 'undefined', message?: string): void {
  const actualType = typeof actual;
  if (actualType !== expectedType) {
    const defaultMsg = `Expected typeof ${actualType} to be ${expectedType}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, actualType, expectedType);
  }
}

export async function expectThrowsAsync(
  fn: () => Promise<any>,
  expectedError?: string | RegExp,
  message?: string
): Promise<void> {
  let threw = false;
  let caughtError: any = null;

  try {
    await fn();
  } catch (err: any) {
    threw = true;
    caughtError = err;
  }

  if (!threw) {
    const defaultMsg = 'Expected asynchronous function to throw an error, but it resolved successfully';
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg);
  }

  if (expectedError) {
    const errorMsg = caughtError?.message || String(caughtError);
    if (typeof expectedError === 'string') {
      if (!errorMsg.includes(expectedError)) {
        const defaultMsg = `Expected error message "${errorMsg}" to contain "${expectedError}"`;
        throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, errorMsg, expectedError);
      }
    } else if (expectedError instanceof RegExp) {
      if (!expectedError.test(errorMsg)) {
        const defaultMsg = `Expected error message "${errorMsg}" to match pattern ${expectedError}`;
        throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, errorMsg, expectedError);
      }
    }
  }
}

export function expectSchemaValid<T>(
  data: any,
  validator: (d: any) => { valid: boolean; errors?: string[] },
  message?: string
): asserts data is T {
  const result = validator(data);
  if (!result.valid) {
    const errorDetails = result.errors ? `: ${result.errors.join(', ')}` : '';
    const defaultMsg = `Schema validation failed${errorDetails}`;
    throw new AssertionError(message ? `${message}: ${defaultMsg}` : defaultMsg, data, result);
  }
}
