import { readFile, writeFile } from 'fs/promises'

const FILE_NAME = 'pedidos.json';

const readFileData = async () => {
  return JSON.parse(await readFile(FILE_NAME));
}

const writeFileData = async (data) => {
  await writeFile(FILE_NAME, JSON.stringify(data))
}

export {
  readFileData,
  writeFileData
}
