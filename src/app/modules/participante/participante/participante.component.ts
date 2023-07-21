import { Component } from '@angular/core';
import { ElementRef, ViewChild} from '@angular/core';
import { Hash } from 'crypto';
import { alfabeto } from './ascii_imagenes';

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

  @ViewChild('texto_sin') texto_sin!: ElementRef;
  @ViewChild('texto_original') texto_original!: ElementRef;

  valor_a: number = 0
  valor_b: number = 0
  valor_c: number = 0

  hash_1: string = ""
  hash_2: string = ""

  texto_decifrado: string = ''

  exportar_mensaje() {
    const a = document.createElement("a");
    const archivo = new Blob([this.texto_original.nativeElement.value.toString()], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = "mensaje_original.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  decifrar_mensaje() {
    console.log(this.valor_a, this.valor_b, this.valor_c)
    return this.valor_a > this.valor_b ? this.decifrar_mensaje_a_mayor() : this.decifrar_mensaje_b_mayor()
  }

  texto_sin_decifrar() {
    return this.texto_sin.nativeElement.value
  }

  decifrar_mensaje_a_mayor() {
    let texto_en_numeros: any = []
    this.texto_sin_decifrar().split('').forEach((element: any) => {
      texto_en_numeros.push(alfabeto[element])
    });

    let digitos = this.sumar_digitos()
    let ab = this.reducir_numero(digitos[0] + digitos[1])
    let c = this.reducir_numero(digitos[2])

    texto_en_numeros.map((element: any, index: any) => {
      texto_en_numeros[index] = this.reducir_numero(element - ab -c)
    })

    this.texto_decifrado = this.mod38_a_texto(texto_en_numeros)
  }

  decifrar_mensaje_b_mayor() {
    let texto_en_numeros: any = []
    this.texto_sin_decifrar().split('').forEach((element: any) => {
      texto_en_numeros.push(alfabeto[element])
    });

    console.log(texto_en_numeros)

    let digitos = this.sumar_digitos()
    let ab = this.reducir_numero(digitos[0] + digitos[1])
    let c = this.reducir_numero(digitos[2])

    texto_en_numeros.map((element: any, index: any) => {
      console.log(element, ab, c)
      texto_en_numeros[index] = this.reducir_numero(this.reducir_numero(element + ab) + c)
    })

    console.log(texto_en_numeros)

    this.texto_decifrado = this.mod38_a_texto(texto_en_numeros)
  }

  mod38_a_texto(texto: any) {
    let respuesta = ''
    for (var i = 0; i < texto.length; i++) {
      respuesta += Object.keys(alfabeto).find(key => alfabeto[key] === texto[i])
    }
    return respuesta
  }

  sumar_digitos() {
    let nuevo_valor_a = this.valor_a
            .toString()
            .split('')
            .map(Number)
            .reduce(function (a, b) {
                return a + b;
            }, 0);
    let nuevo_valor_b = this.valor_b
            .toString()
            .split('')
            .map(Number)
            .reduce(function (a, b) {
                return a + b;
            }, 0);
    let nuevo_valor_c = this.valor_c
            .toString()
            .split('')
            .map(Number)
            .reduce(function (a, b) {
                return a + b;
            }, 0);
    return [nuevo_valor_a, nuevo_valor_b, nuevo_valor_c]
  }

  reducir_numero(valor: number) {
    let numero = valor
    if (numero <= 0){
      while (numero <= 0) {
        numero += 38
      }
    }
    else {
      while (numero > 38) {
        numero -= 38
      }
    }
    return numero
  }

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
    console.log("valores de a,b y c"+ q4)

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_124(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/3, numero_1*(-2)*1, numero_1*(8/3)]
    let q2 = [numero_2*Math.pow(1, 2)*(-1/2), numero_2*(5/2) , numero_2*(-2)]
    let q3 = [numero_3*Math.pow(1, 2)/6, numero_3*(-1/2)*1, numero_3*(1/3)]
    console.log(numero_1,numero_2,numero_3)

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);
    console.log("valores de a,b y c"+ q4)

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_125(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/4, numero_1*(-7/4)*1, numero_1*(5/2)]
    let q2 = [numero_2*Math.pow(1, 2)*(-1/3), numero_2*2*1 , numero_2*(-5/3)]
    let q3 = [numero_3*Math.pow(1, 2)/12, numero_3*(-1/4)*1, numero_3*(1/6)]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_134(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/6, numero_1*(-7/6)*1, numero_1*2]
    let q2 = [numero_2*Math.pow(1, 2)*(-1/2), numero_2*(5/2)*1 , numero_2*-2]
    let q3 = [numero_3*Math.pow(1, 2)/3, numero_3*(-4/3)*1, numero_3*1]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_135(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/8, numero_1*(-1)*1, numero_1*(15/8)]
    let q2 = [numero_2*Math.pow(1, 2)*(-1/4), numero_2*(3/2)*1 , numero_2*(-5/4)]
    let q3 = [numero_3*Math.pow(1, 2)/8, numero_3*(-1/2)*1, numero_3*(3/8)]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_145(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/12, numero_1*(-3/4)*1, numero_1*(5/3)]
    let q2 = [numero_2*Math.pow(1, 2)*(-1/3), numero_2*2*1 , numero_2*(-5/3)]
    let q3 = [numero_3*Math.pow(1, 2)/4, numero_3*(-5/4)*1, numero_3*1]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_234(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/2, numero_1*(-7/2)*1, numero_1*6]
    let q2 = [numero_2*Math.pow(1, 2)*-1, numero_2*6*1 , numero_2*-8]
    let q3 = [numero_3*Math.pow(1, 2)/2, numero_3*(-5/2)*1, numero_3*3]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_235(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/3, numero_1*(-8/3)*1, numero_1*5]
    let q2 = [numero_2*Math.pow(1, 2)*(-1/2), numero_2*(7/2)*1 , numero_2*-5]
    let q3 = [numero_3*Math.pow(1, 2)/6, numero_3*(-5/6)*1, numero_3*1]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_245(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/6, numero_1*(-3/2)*1, numero_1*(10/3)]
    let q2 = [numero_2*Math.pow(1, 2)*(-1/2), numero_2*(7/2)*1 , numero_2*-5]
    let q3 = [numero_3*Math.pow(1, 2)/3, numero_3*(-2)*1, numero_3*(8/3)]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
  }

  operacion_345(numero_1: number, numero_2: number, numero_3: number) {
    let q1 = [numero_1*Math.pow(1, 2)/2, numero_1*(-9/2)*1, numero_1*10]
    let q2 = [numero_2*Math.pow(1, 2)*-1, numero_2*8*1 , numero_2*-15]
    let q3 = [numero_3*Math.pow(1, 2)/2, numero_3*(-7/2)*1, numero_3*6]

    let q4 = q1.map((value, index) => value + q2[index] + q3[index]);

    this.valor_a = q4[0]
    this.valor_b = q4[1]
    this.valor_c = q4[2]
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
