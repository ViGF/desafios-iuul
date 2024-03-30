import fs from "node:fs/promises";
import { OperationErrors, OperationStatus } from "./OperationErrors.js";
import { UserArchive } from "../@types/UserArchive.js";
import { IRead } from "../interfaces/IRead.js";
import { IFile } from "../interfaces/IFile.js";

export class ReadFile implements IRead {
  private _users: UserArchive[] = [];

  constructor(private fileReceived: IFile) {}

  async canRead() {
    try {
      const fileStat = await fs.stat(this.fileReceived.path);
      const isFile = fileStat.isFile();

      if (!isFile) {
        return {
          status: OperationStatus.FAILURE,
          errors: [OperationErrors.FILE_NOT_EXITS],
        };
      }

      return {
        status: OperationStatus.SUCCESS,
      };
    } catch (error) {
      return {
        status: OperationStatus.FAILURE,
        errors: [OperationErrors.FILE_NOT_EXITS],
      };
    }
  }

  async read() {
    const result = await this.canRead();

    if (result.status != OperationStatus.SUCCESS) {
      return {
        status: result.status,
        errors: result.errors,
      };
    }

    const archive = await fs.readFile(this.fileReceived.path, {
      encoding: "utf-8",
    });

    try {
      this._users = JSON.parse(archive);

      return {
        status: OperationStatus.SUCCESS,
      };
    } catch (error) {
      return {
        status: OperationStatus.FAILURE,
        errors: [OperationErrors.FILE_NOT_CONTAINS_ARRAY],
      };
    }
  }

  *iterator() {
    for (let u of this.users) yield u;
  }

  get users() {
    return this._users;
  }
}
