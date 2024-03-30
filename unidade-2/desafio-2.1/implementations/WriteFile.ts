import fs from "node:fs/promises";
import path from "node:path";
import { DateTime } from "luxon";
import { UserValidationResult } from "../@types/UserValidationResult.js";
import { OperationErrors, OperationStatus } from "./OperationErrors.js";
import { IWrite } from "../interfaces/IWrite.js";
import { IFile } from "../interfaces/IFile.js";

export class WriteFile implements IWrite {
  constructor(private fileReceived: IFile) {}

  //erros-DDMMAAAA-HHMMSS.json
  private static fileName() {
    return `erros-${DateTime.now().toFormat(
      "ddMMyyyy"
    )}-${DateTime.now().toFormat("hhmmss")}.json`;
  }

  //Delimita o início do arquivo, escreve a abertura do Array ([)
  async start() {
    return await this.write("\[", "\n");
  }

  //Delimita o fim do arquivo, escreve o fechamento do array (])
  async end() {
    return await this.write("\]", "");
  }

  //Escreve cada item no arquivo
  async write(content: string | string, endLine: string = ", \n") {
    const filePath = path.resolve(
      this.fileReceived.dirname,
      WriteFile.fileName()
    );

    try {
      await fs.appendFile(filePath, content + endLine, {
        encoding: "utf-8",
      });

      return {
        status: OperationStatus.SUCCESS,
      };
    } catch (error) {
      return {
        status: OperationStatus.FAILURE,
        errors: [OperationErrors.UNABLE_TO_WRITE_FILE],
      };
    }
  }
}
