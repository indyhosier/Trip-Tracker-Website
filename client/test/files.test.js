import { describe, expect, it, jest } from "@jest/globals";
import * as jsonFileSchema from '../schemas/TripFile';
import {
  downloadFile,
  getFileExtension,
  isValidJson
} from "../src/utils/files";

const fileText = JSON.stringify({
  place1: "stuff",
  place2: "stuff",
  place3: "stuff"
});
const fileName = "file.json";
const fileType = "application/json";

URL.createObjectURL = jest.fn(() => {
  return { href: "" };
});
URL.revokeObjectURL = jest.fn();

jest.useFakeTimers();
describe("files", () => {
  it("Has the correct calls when downloading", () => {
    downloadFile(fileText, fileName, fileType);
    jest.runAllTimers();
    expect(URL.createObjectURL.mock.calls.length).toEqual(1);
    expect(URL.revokeObjectURL.mock.calls.length).toEqual(1);
  });

  it("Returns the extension correctly", () => {
    const extension = getFileExtension("file.json");
    expect(extension).toEqual("json");
  });

  it("Tests schema correctly", () => {
    const obj = {
        places: [{latitude: '40.1', longitude: '20.1'}]
    };
    expect(isValidJson(jsonFileSchema, obj)).toBe(true);
  });
});
