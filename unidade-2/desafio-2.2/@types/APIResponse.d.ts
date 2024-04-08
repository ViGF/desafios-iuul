//Tipagem do retorno da API
type APIResponse = {
  result: "success" | "error";
  base_code?: string;
  target_code?: string;
  conversion_rate?: number;
  "error-type"?: string;
};
