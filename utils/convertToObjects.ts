/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 *
 * @param leanDocument - The Mongoose lean document to be converted.
 * @returns A plain JavaScript object that is a serializable representation of the input document.
 */
export function convertToSerializableObject<T extends Record<string, any>>(
  leanDocument: T
): T {
  const result: Record<string, any> = { ...leanDocument };

  for (const key of Object.keys(result)) {
    const value = result[key];
    if (value && typeof value === "object" && value.toJSON && value.toString) {
      result[key] = value.toString();
    }
  }

  return result as T;
}
