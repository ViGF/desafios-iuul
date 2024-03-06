const prompt = require("prompt-sync")({ sigint: true })
const Vertice = require("./Vertice-class");

const vertices = [];

for (let index = 0; index < 3; index++) {
  const vert_1_x = prompt(`Vértice ${index + 1} (x): `);
  const vert_1_y = prompt(`Vértice ${index + 1} (y): `);
  const vertice = new Vertice(Number(vert_1_x), Number(vert_1_y));

  vertices.push(vertice);
}

console.log("Vértices criados!");

let executeLoop = 1;
while (executeLoop != 0) {
  console.log();
  console.log("Escolha uma opção:");
  console.log("1 - Calcular distância euclidiana");
  console.log("2 - Mover o vértice");
  console.log("3 - Verificar se dois vertices são iguais");
  console.log("Outra - Sair");
  console.log();

  const option = Number(prompt("Opção: "));
  switch (option) {
    case 1:
      const vertice1Numero = prompt("Escolha o número do 1º vértice: ");
      const vertice2Numero = prompt("Escolha o número do 2º vértice: ");

      const distancia = vertices[vertice1Numero - 1].distancia(
        vertices[vertice2Numero - 1]
      );

      console.log(
        `Distância entre o vértices ${vertice1Numero} e ${vertice2Numero}: ${distancia}`
      );

      break;
    case 2:
      const verticeAMoverNumero = prompt(
        "Escolha o número do vértice para move-lo: "
      );
      const pos_x = prompt("Posição x: ");
      const pos_y = prompt("Posição y: ");
      vertices[verticeAMoverNumero - 1].move(pos_x, pos_y);

      console.log(
        `Vértice ${verticeAMoverNumero} movido para a posição: (${
          vertices[verticeAMoverNumero - 1].x
        }, ${vertices[verticeAMoverNumero - 1].y}).`
      );

      break;
    case 3:
      const vertice1EqualNumero = prompt("Escolha o número do 1º vértice: ");
      const vertice2EqualNumero = prompt("Escolha o número do 2º vértice: ");

      const equals = vertices[vertice1EqualNumero - 1].equals(
        vertices[vertice2EqualNumero] - 1
      );
      if (equals) {
        console.log(
          `Os vértices ${vertice1EqualNumero} e ${vertice2EqualNumero} são iguais.`
        );
      } else {
        console.log(
          `Os vértices ${vertice1EqualNumero} e ${vertice2EqualNumero} não são iguais.`
        );
      }

      break;
    default:
      console.log("Saindo...");
      executeLoop = 0;
  }
}