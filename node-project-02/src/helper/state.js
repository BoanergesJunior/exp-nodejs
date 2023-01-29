import { writeFileData } from "./file.js";

(async function initState() {
  const initialState = {
    nextId: 1,
    grades: []
  }

  await writeFileData(initialState);
}())
