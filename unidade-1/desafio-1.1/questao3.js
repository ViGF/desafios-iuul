const prompt = require("prompt-sync")({ sigint: true });
const Vertice = require("./Vertice-class");

class Poligono {
  #vertices;

  constructor(vertices) {
    if (vertices.length < 3) {
      throw new Error("Um polígono dever ter pelo menos 3 vértices");
    }

    this.#vertices = vertices;
  }

  addVertice(v) {
    const verticeAlreadyExists = this.#vertices.find((vertice) =>
      vertice.equals(v)
    );

    if (verticeAlreadyExists) {
      return false;
    }

    this.#vertices.push(v);
    return true;
  }

  get perimetro() {
    let perimeter = 0;
    for (let index = 0; index < this.#vertices.length; index++) {
      let segment = 0;

      if (index == this.#vertices.length - 1) {
        segment = this.#vertices[0].distancia(this.#vertices[index]);
      } else {
        segment = this.#vertices[index].distancia(this.#vertices[index + 1]);
      }

      perimeter += segment;
    }

    return perimeter;
  }

  get qtdVertices() {
    return this.#vertices.length;
  }
}

const vertices = [];

console.log("Criação do polígono: ");
const qtdeVertices = Number(prompt("Quantos vértices deseja criar: "));

for (let j = 0; j < qtdeVertices; j++) {
  const vert_1_x = prompt(`Vértice ${j + 1} (x): `);
  const vert_1_y = prompt(`Vértice ${j + 1} (y): `);

  const vertice = new Vertice(Number(vert_1_x), Number(vert_1_y));

  vertices.push(vertice);
}

const poligono = new Poligono(vertices);

let executeLoop = 1;
while (executeLoop != 0) {
  console.log();
  console.log("Escolha uma opção:");
  console.log("1 - Adicionar vértice");
  console.log("2 - Calcular perímetro");
  console.log("3 - Ver quantidade de vértices");
  console.log("Outra - Sair");
  const option = Number(prompt("Opção: "));

  switch (option) {
    case 1:
      const novoVert_x = prompt("Novo vértice (x): ")
      const novoVert_y = prompt("Novo vértice (y): ")
      const novoVertice = new Vertice(novoVert_x, novoVert_y)

      if (poligono.addVertice(novoVertice)) {
        console.log("Vértice adicionado!")
      } else {
        console.log("O vértice já existe!")
      }

      break;
    case 2:
      console.log("Perímetro do polígono:", poligono.perimetro)
      break;
    case 3:
      console.log("Vértices no polígono:", poligono.qtdVertices)
      break;
    default:
      console.log("Saindo...");
      executeLoop = 0;
  }
}
