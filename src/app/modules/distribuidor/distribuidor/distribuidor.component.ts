import { Component } from '@angular/core';
import { CargarClavesService } from 'src/app/services/cargar-claves.service';
import { imagenes, alfabeto } from './ascii_imagenes';
import { ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-distribuidor',
  templateUrl: './distribuidor.component.html',
  styleUrls: ['./distribuidor.component.sass']
})
export class DistribuidorComponent {

  // Ejercicio 1

  array = this.primeFactorsTo(9973)
  valor_a: number = 0
  valor_b: number = 0
  valor_c: number = 0
  numero_1: number = 0
  numero_2: number = 0
  hash_1: string = ""
  hash_2: string = ""
  cargar_claves: boolean = false

  // Ejercicio 2

  mostrar_numeros: boolean = false
  valor_c_2: number = 0
  mensaje_cifrado: string = ''

  // Ejercicio 3

  // si a es mayor a b
  // al mensaje mod 38 sumamos la suma de los digitos de c

  @ViewChild('texto_sin') myDiv!: ElementRef;

  constructor(
    public CargarClaves: CargarClavesService
  ){}

  set_c(valor: number) {
    console.log(valor)
    this.valor_c = valor
  }

  cifrar() {
    let texto_mod38 = this.texto_en_mod38()
    let digitos = this.sumar_digitos()
    let texto_previo = this.sumar_digitos_en_texto(texto_mod38, digitos)
    this.mensaje_cifrado = this.mod38_a_texto(texto_previo)
  }

  mod38_a_texto(texto: any) {
    let respuesta = ''
    for (var i = 0; i < texto.length; i++) {
      respuesta += Object.keys(alfabeto).find(key => alfabeto[key] === texto[i])
    }
    return respuesta
  }

  sumar_digitos_en_texto(texto: any, digitos: any) {
    let respuesta = []
    let numero_suma = this.valor_a > this.valor_b ? digitos[0] + digitos[1] + digitos[2] : -(digitos[0] + digitos[1] + digitos[2])
    for (var i = 0; i < texto.length; i++) {
      respuesta.push(this.reducir_numero(texto[i] + numero_suma))
    }
    return respuesta
  }

  texto_en_mod38() {
    let texto_sin_cifrar = this.myDiv.nativeElement.value || ''
    let respuesta = []
    for (var i = 0; i < texto_sin_cifrar.length; i++) {
      respuesta.push(alfabeto[texto_sin_cifrar.charAt(i).toUpperCase()])
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
    return [this.reducir_numero(nuevo_valor_a), this.reducir_numero(nuevo_valor_b), this.reducir_numero(nuevo_valor_c)]
  }

  reducir_numero(valor: number) {
    let numero = valor
    if (numero <= 0){
      while (numero <= 0) {
        numero += 38
      }
    }
    else {
      while (numero >= 38) {
        numero -= 38
      }
    }
    return numero
  }

  polinomio(valor: number) {
    return this.mostrar_numeros ? this.valor_a * Math.pow(valor, 2) + this.valor_b * valor + this.valor_c : ''
  }

  polinomio_elevado(valor: number) {
    return this.mostrar_numeros ? Math.pow(Number(this.polinomio(valor)), 3) : ''
  }

  cargar() {
    let num_1 = this.seleccionarAlAzar()
    let num_2 = this.seleccionarAlAzar()
    console.log("Este es A"+" "+ num_1 )
    console.log("Este es B" +" "+ num_2)

    this.valor_a = num_1
    this.valor_b = num_2

    this.CargarClaves.set_numeros_ejercicio_1(num_1, num_2, this.valor_c)

    this.numero_1 = Math.pow(num_1 + this.valor_c, 2)
    this.numero_2 = Math.pow(num_2 + this.valor_c, 2)
  }

  seleccionarAlAzar(){
    return this.array[Math.floor(Math.random()* this.array.length)]
  }

  generarHash(){
    this.hash_1 = this.hashString(this.numero_1)
    this.hash_2 = this.hashString(this.numero_2)
    if(this.cargar_claves){
      this.CargarClaves.set_hashes_ejercicio_1(this.hash_1, this.hash_2)
    }
  }

  primeFactorsTo(max: number){
    var store  = [], i, j, primes = [1];
    for (i = 2; i <= max; ++i)
    {
        if (!store [i])
          {
            primes.push(i);
            for (j = i << 1; j <= max; j += i)
            {
                store[j] = true;
            }
        }
    }
    return primes;
  }

  toggle_check() {
    this.cargar_claves = !this.cargar_claves
  }

  toggle_numeros() {
    this.mostrar_numeros = !this.mostrar_numeros
  }

  guardarArchivoDeTexto() {
    const a = document.createElement("a");
    const archivo = new Blob([this.valor_c.toString()], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = "Valor_C.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  guardarMensajeCifrado() {
    const a = document.createElement("a");
    const archivo = new Blob([this.mensaje_cifrado.toString()], { type: 'text/plain' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = "mensaje_cifrado.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  guardarSimbolosTexto() {
    console.log(imagenes.imagen_1)

    for (var i = 1; i < 6; i++) {
      const a = document.createElement("a");
      const array = Object.values(imagenes)[i-1] + this.polinomio_elevado(i).toString()
      const archivo = new Blob([array], { type: 'text/plain' });
      const url = URL.createObjectURL(archivo);
      a.href = url;
      a.download = "valor_polinomio_x_"+i.toString()+".txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  hashString(str: number): string {
    const sha256 = require('crypto-js/sha256');
    return sha256(str.toString()).toString();
  }

}
