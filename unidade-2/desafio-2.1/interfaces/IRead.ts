import { OperationReturn } from "../@types/OperationReturns.js";
import { UserArchive } from "../@types/UserArchive.js";

export interface IRead {
  canRead: () => Promise<OperationReturn>;
  read: () => Promise<OperationReturn>;
  iterator: () => Generator<UserArchive, void, unknown>;
  users: UserArchive[]
}
