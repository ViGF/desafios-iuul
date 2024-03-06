const prompt = require("prompt-sync")({ sigint: true });
const Vertice = require("./Vertice-class");

class Triangulo {
  #vertice_a;
  #vertice_b;
  #vertice_c;

  constructor(vert_a, vert_b, vert_c) {
    const segment_ab = this.#calculate_segment(vert_a, vert_b);
    const segment_bc = this.#calculate_segment(vert_b, vert_c);
    const segment_ca = this.#calculate_segment(vert_c, vert_a);

    if (
      Math.abs(segment_bc - segment_ca) < segment_ab &&
      segment_ab < segment_bc + segment_ca &&
      Math.abs(segment_ab - segment_ca) < segment_bc &&
      segment_bc < segment_ab + segment_ca &&
      Math.abs(segment_ab - segment_bc) < segment_ca &&
      segment_ca < segment_ab + segment_bc
    ) {
      this.#vertice_a = vert_a;
      this.#vertice_b = vert_b;
      this.#vertice_c = vert_c;
    } else {
      throw new Error("Os vértices informados não formam um triângulo");
    }
  }

  get vert_a() {
    return this.#vertice_a;
  }

  get vert_b() {
    return this.#vertice_b;
  }

  get vert_c() {
    return this.#vertice_c;
  }

  #calculate_segment(vert_a, vert_b) {
    const segment = vert_a.distancia(vert_b);

    return segment;
  }

  get segment_ab() {
    const segment_ab = this.#calculate_segment(this.vert_a, this.vert_b);

    return segment_ab;
  }

  get segment_bc() {
    const segment_bc = this.#calculate_segment(this.vert_b, this.vert_c);

    return segment_bc;
  }

  get segment_ca() {
    const segment_ca = this.#calculate_segment(this.vert_c, this.vert_a);

    return segment_ca;
  }

  get perimetro() {
    const perimeter = this.segment_ab + this.segment_bc + this.segment_ca;

    return perimeter;
  }

  get area() {
    const area = this.perimetro / 2;

    return area;
  }

  tipo() {
    if (
      this.segment_ab == this.segment_bc &&
      this.segment_bc == this.segment_ca
    ) {
      return "equilátero";
    } else if (
      this.segment_ab !== this.segment_bc &&
      this.segment_bc !== this.segment_ca &&
      this.segment_ab !== this.segment_ca
    ) {
      return "escaleno";
    } else {
      return "isósceles";
    }
  }

  equals(triangulo) {
    const segments = [this.segment_ab, this.segment_bc, this.segment_ca];

    if (
      segments.includes(triangulo.segment_ab) &&
      segments.includes(triangulo.segment_bc) &&
      segments.includes(triangulo.segment_ca)
    ) {
      return true;
    }

    return false;
  }

  clone() {
    const clone = new Triangulo(this.vert_a, this.vert_b, this.vert_c);

    return clone;
  }
}

const triangulos = [];

for (let i = 0; i < 3; i++) {
  const vertices = [];
  console.log(`Triângulo ${i + 1}`);

  for (let j = 0; j < 3; j++) {
    const vert_1_x = prompt(`Vértice ${j + 1} (x): `);
    const vert_1_y = prompt(`Vértice ${j + 1} (y): `);

    const vertice = new Vertice(Number(vert_1_x), Number(vert_1_y));

    vertices.push(vertice);
  }

  const novoTriangulo = new Triangulo(vertices[0], vertices[1], vertices[2]);
  triangulos.push(novoTriangulo);
  console.log(`Triângulo ${triangulos.length} criado!`);
}

let executeLoop = 1;
while (executeLoop != 0) {
  console.log()
  console.log("Escolha uma opção:");
  console.log("1 - Verificar igualdade entre triângulos");
  console.log("2 - Calcular área");
  console.log("3 - Calcular perímetro");
  console.log("4 - Ver tipo do triângulo");
  console.log("5 - Clonar triângulo");
  console.log("Outra - Sair");
  const option = Number(prompt("Opção: "));

  switch (option) {
    case 1:
      const triangulo1Numero = prompt("Número do 1º triângulo: ");
      const triangulo2Numero = prompt("Número do 2º triângulo: ");
      const isEquals = triangulos[triangulo1Numero - 1].equals(
        triangulos[triangulo2Numero - 1]
      );

      if (isEquals) {
        console.log("Os triângulos são iguais!");
      } else {
        console.log("Os triângulos não são iguais!");
      }

      break;
    case 2:
      const trianguloNumeroArea = prompt("Número do triângulo: ");
      console.log(triangulos[trianguloNumeroArea - 1].area);

      break;
    case 3:
      const trianguloNumeroPerimetro = prompt("Número do triângulo: ");
      console.log(triangulos[trianguloNumeroPerimetro - 1].perimetro);

      break;
    case 4:
      const trianguloNumeroTipo = prompt("Número do triângulo: ");
      const trianguloTipo = triangulos[trianguloNumeroTipo - 1].tipo();

      console.log(`O triângulo é ${trianguloTipo}`);
      break;
    case 5:
      const trianguloNumeroClonar = prompt("Número do triângulo que deseja clonar: ")
      const trianguloClonado = triangulos[trianguloNumeroClonar - 1].clone()
      triangulos.push(trianguloClonado)
      console.log(`Número do novo triângulo:`, triangulos.length)

      break;
    default:
      console.log("Saindo...");
      executeLoop = 0;
  }
}
