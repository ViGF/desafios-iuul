//Retorno genérico dos Controllers
type ControllerReturn<T> = {
  status: number;
  errors?: number[];
  result?: T;
}