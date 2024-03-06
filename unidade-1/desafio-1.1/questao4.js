const prompt = require("prompt-sync")({ sigint: true });

class Aluno {
  Matricula;
  Nome;
  P1 = 0;
  P2 = 0;
  NF = 0;

  constructor(Matricula, Nome) {
    this.Matricula = Matricula;
    this.Nome = Nome;
  }

  calcularNotaFinal() {
    this.NF = +((this.P1 + this.P2) / 2).toFixed(1);
  }
}

class Turma {
  #alunos = [];

  constructor(alunos) {
    this.#alunos = alunos;
  }

  get alunos() {
    return this.#alunos;
  }

  inserirAluno(aluno) {
    const alunoAlreadyExists = this.#alunos.find(
      (alunoTurma) => alunoTurma.Matricula == aluno.Matricula
    );

    if (!alunoAlreadyExists) {
      this.#alunos.push(aluno);
    }

    this.#alunos.sort((a, b) => {
      return a.Nome.localeCompare(b.Nome)
    })
  }

  removerAluno(MatriculaAluno) {
    this.#alunos = this.#alunos.filter(aluno => aluno.Matricula != MatriculaAluno);
  }

  atribuirNotaP1(Matricula, nota) {
    const alunoIndice = this.#alunos.findIndex(
      (alunoTurma) => alunoTurma.Matricula == Matricula
    );

    this.#alunos[alunoIndice].P1 = +nota.toFixed(1);
    this.#alunos[alunoIndice].calcularNotaFinal();
  }

  atribuirNotaP2(Matricula, nota) {
    const alunoIndice = this.#alunos.findIndex(
      (alunoTurma) => alunoTurma.Matricula == Matricula
    );

    this.#alunos[alunoIndice].P2 = +nota.toFixed(1);
    this.#alunos[alunoIndice].calcularNotaFinal();
  }
}

const turma = new Turma([]);

let executeLoop = 1;
while (executeLoop != 0) {
  console.log("Escolha uma opção:");
  console.log("1 - Adicionar aluno");
  console.log("2 - Remover aluno");
  console.log("3 - Atribuir nota");
  console.log("Outra - Sair");
  const option = Number(prompt("Opção: "));

  switch (option) {
    case 1:
      const alunoNome = prompt("Nome do aluno: ");
      const alunoMatricula = prompt("Matrícula: ");
      const novoAluno = new Aluno(alunoMatricula, alunoNome);

      turma.inserirAluno(novoAluno);
      console.table(turma.alunos);

      break;
    case 2:
      const matriculaAlunoRemover = prompt("Matrícula do aluno: ")
      turma.removerAluno(matriculaAlunoRemover)
      console.table(turma.alunos);

      break;
    case 3:
      console.log("A qual nota deseja atribuir: ")
      console.log("1 - P1")
      console.log("2 - P2")
      const opcaoNota = prompt("Opção: ")

      const matriculaAlunoNota = prompt("Matrícula do aluno: ")
      const notaAluno = +prompt("Nota do aluno: ")
      if (opcaoNota == "1") {
        turma.atribuirNotaP1(matriculaAlunoNota, notaAluno)
      } else if (opcaoNota == "2") {
        turma.atribuirNotaP2(matriculaAlunoNota, notaAluno)
      }
      console.table(turma.alunos);

      break;
    default:
      console.log("Saindo...");
      executeLoop = 0;
  }
}