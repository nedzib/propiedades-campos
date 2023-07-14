import { Component } from '@angular/core';
import { ElementRef, ViewChild} from '@angular/core';
import { Hash } from 'crypto';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.sass']
})
export class ParticipanteComponent {

  @ViewChild('triangulo') triangulo!: ElementRef;
  @ViewChild('cuadrado') cuadrado!: ElementRef;
  @ViewChild('circulo') circulo!: ElementRef;
  @ViewChild('hexagono') hexagono!: ElementRef;
  @ViewChild('cilindro') cilindro!: ElementRef;

  valor_a: number = 0
  valor_b: number = 0
  valor_c: number = 0

  hash_1: string = ""
  hash_2: string = ""

  recuperar_secreto() {
    let numeros_entrada: any = this.entradas()
    let operacion = ''
    numeros_entrada.forEach((element: any) => {
      operacion += element[0].split('_')[1]
    })
    this.seleccion_operacion(operacion, numeros_entrada[0][1], numeros_entrada[1][1], numeros_entrada[2][1])
  }


  seleccion_operacion(operacion: String, numero_1: number, numero_2: number, numero_3: number) {
    switch (operacion) {
      case '123':
        this.operacion_123(numero_1, numero_2, numero_3);
        break;
      case '124':
        this.operacion_124(numero_1, numero_2, numero_3);
        break;
      case '125':
        this.operacion_125(numero_1, numero_2, numero_3);
        break;
      case '134':
        this.operacion_134(numero_1, numero_2, numero_3);
        break;
      case '135':
        this.operacion_135(numero_1, numero_2, numero_3);
        break;
      case '145':
        this.operacion_145(numero_1, numero_2, numero_3);
        break;
      case '234':
        this.operacion_234(numero_1, numero_2, numero_3);
        break;
      case '235':
        this.operacion_235(numero_1, numero_2, numero_3);
        break;
      case '245':
        this.operacion_245(numero_1, numero_2, numero_3);
        break;
      case '345':
        this.operacion_345(numero_1, numero_2, numero_3);
        break;
      default:
        break;
    }
  }

  operacion_123(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/2, numero_1*(-5/2)*1, numero_1*3]
    let q2 = [numero_2*Math.pow(1, 2)*-1, numero_2*4*1 , numero_2*-3]
    let q3 = [numero_3*Math.pow(1, 2)/2, numero_3*(-3/2)*1, numero_3*1]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_124(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 124 with the given parameters
  }

  operacion_125(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 125 with the given parameters
  }

  operacion_134(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 134 with the given parameters
  }

  operacion_135(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 135 with the given parameters
  }

  operacion_145(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 145 with the given parameters
  }

  operacion_234(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 234 with the given parameters
  }

  operacion_235(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 235 with the given parameters
  }

  operacion_245(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 245 with the given parameters
  }

  operacion_345(numero_1: number, numero_2: number, numero_3: number) {
    // Handle case 345 with the given parameters
  }

  entradas() {
    let triangulo = this.triangulo.nativeElement.value
    let cuadrado = this.cuadrado.nativeElement.value
    let circulo = this.circulo.nativeElement.value
    let hexagono = this.hexagono.nativeElement.value
    let cilindro = this.cilindro.nativeElement.value

    let hash = {
      'triangulo_1': '',
      'cuadrado_2': '',
      'circulo_3': '',
      'hexagono_4': '',
      'cilindro_5': ''
    }
    hash['triangulo_1'] = triangulo
    hash['cuadrado_2'] = cuadrado
    hash['circulo_3'] = circulo
    hash['hexagono_4'] = hexagono
    hash['cilindro_5'] = cilindro

    let respuesta = Object.entries(hash).filter(([key, value]) => value !== '');
    if (Object.values(respuesta).length < 3) {
      alert("Debes ingresar al menos 3 valores");
      return
    }
    if (Object.values(respuesta).length > 3) {
      respuesta = respuesta.slice(0, 3);
    }

    respuesta.map((element: any) => {
      element[1] = Math.cbrt(element[1]).toString()
    })

    return respuesta
  }

  recuperar_claves() {
    let numero_1 = Math.pow(this.valor_a + this.valor_c, 2)
    let numero_2 = Math.pow(this.valor_b + this.valor_c, 2)

    this.hash_1 = this.hashString(numero_1)
    this.hash_2 = this.hashString(numero_2)
  }

  hashString(str: number): string {
    const sha256 = require('crypto-js/sha256');
    return sha256(str.toString()).toString();
  }

}
