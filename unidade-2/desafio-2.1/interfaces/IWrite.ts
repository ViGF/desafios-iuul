import { OperationReturn } from "../@types/OperationReturns.js"

export interface IWrite {
  write: (content: string, endLine?: string) => Promise<OperationReturn>
  start: () => Promise<OperationReturn>
  end: () => Promise<OperationReturn>
}