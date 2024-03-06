const prompt = require("prompt-sync")({ sigint: true });

const verifyName = (name) => {
  return name.length >= 5;
};

const verifyCPF = (cpf) => {
  return cpf.length == 11;
};

const formatCPF = (cpf) => {
  return cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4")
}

const verifyBirthdayDate = (birthdayDate) => {
  const [birthdayDay, birthdayMonth, birthdayYear] = birthdayDate.split("/");
  const actualYear = new Date().getFullYear();
  const age = actualYear - birthdayYear;

  return age >= 18;
};

const formatIncome = (income) => {
  return Number(income.replace(",", ".")).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

const verifyStatus = (status) => {
  const availableStatus = ["C", "S", "V", "D"];

  return availableStatus.includes(status.toUpperCase());
};

const verifyDependents = (dependents) => {
  return dependents >= 0 && dependents <= 10;
};

let name = prompt("Nome: ");
while (!verifyName(name)) {
  console.log("O nome deve ter pelo menos 5 caracteres!");
  name = prompt("Nome: ");
}

let cpf = prompt("CPF: ");
while (!verifyCPF(cpf)) {
  console.log("O CPF deve ter exatamente 11 dígitos!");
  cpf = prompt("CPF: ");
}

let birthdayDate = prompt("Data de Nascimento (DD/MMA/AAAA): ");
while (!verifyBirthdayDate(birthdayDate)) {
  console.log("É necessário ter pelo menos 18 anos!");
  birthdayDate = prompt("Data de Nascimento (DD/MMA/AAAA): ");
}

let income = prompt("Valor: ");

let status = prompt("Estado Civil (C, S, V, D): ");
while (!verifyStatus(status)) {
  console.log("Informe uma opção válida!");
  status = prompt("Estado Civil (C, S, V, D): ");
}

let dependents = Number(prompt("Dependentes (0 a 10): "));
while (!verifyDependents(dependents)) {
  console.log("Só é possível possuir de 0 à 10 dependentes!");
  dependents = Number(prompt("Dependentes (0 a 10): "));
}

console.log("Informações cadastradas!");
console.log("Nome:", name);
console.log("CPF:", formatCPF(cpf));
console.log("Data de Nascimento:", birthdayDate);
console.log("Valor:", formatIncome(income));
console.log("Estado Civil:", status);
console.log("Dependentes:", dependents);
