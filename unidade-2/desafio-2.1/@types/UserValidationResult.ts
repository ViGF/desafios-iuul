import { UserArchive } from "./UserArchive.js";

export interface UserFieldValidationResult {
  campo: string;
  mensagem: string;
}

export interface UserValidationResult {
  dados: UserArchive;
  erros: UserFieldValidationResult[];
}
