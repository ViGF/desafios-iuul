import path from "path";
import { IFile } from "../interfaces/IFile.js";
import { OperationErrors, OperationStatus } from "./OperationErrors.js";

export class FileReceived implements IFile {
  private _path
  private _dirname

  constructor(fileName: string) {
    this._path = FileReceived.resolveFilePath(fileName)
    this._dirname = FileReceived.resolveFileDirname(fileName)
  }

  static validateFileName(path: string) {
    if (!path) {
      return {
        status: OperationStatus.FAILURE,
        errors: [OperationErrors.FILE_NOT_EXITS]
      }
    }
  }

  static resolveFilePath(file: string) {
    const pathResolved = path.resolve(file);

    return pathResolved;
  }

  static resolveFileDirname(file: string) {
    const dirname = path.dirname(this.resolveFilePath(file))

    return dirname
  }

  get path() {
    return this._path
  }

  get dirname() {
    return this._dirname
  }
}