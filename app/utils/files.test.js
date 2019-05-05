const { expect } = require("chai");
const { readJSONFiles, readJSON } = require("./files");
const json = require("../../test/mockValidJson.json");

describe("readJSON", () => {
  describe("when file exists and is valid json", () => {
    it("returns a promise with parsed json data", () => {
      return readJSON("test/mockValidJson.json", result => {
        expect(result).to.deep.equal(json);
      });
    });
  });

  describe("when file exists and is not valid json", () => {
    it("return a failed promise with an error", () => {
      return readJSON("test/mockInvalidJson.json").catch(error => {
        expect(error).to.exist;
      });
    });
  });

  describe("when file does not exist", () => {
    it("return a failed promise with an error", () => {
      return readJSON("nonExistantFile.json").catch(error => {
        expect(error).to.exist;
      });
    });
  });
});

describe("readJSONFiles", () => {
  describe("when files exists and are valid json", () => {
    it("returns a promise with parsed json data", () => {
      return readJSONFiles([
        "test/mockValidJson.json",
        "test/mockValidJson.json"
      ]).then(result => {
        expect(result[0]).to.deep.equal(json);
        expect(result[1]).to.deep.equal(json);
      });
    });
  });

  describe("when file exists and is not valid json", () => {
    it("return a failed promise with an error", () => {
      return readJSONFiles([
        "test/mockInvalidJson.json",
        "test/mockValidJson.json"
      ]).catch(error => {
        expect(error).to.exist;
      });
    });

    describe("when file does not exist", () => {
      it("return a failed promise with an error", () => {
        return readJSONFiles([
          "test/mockInvalidJson.json",
          "test/mockValidJson.json"
        ]).catch(error => {
          expect(error).to.exist;
        });
      });
    });
  });
});
