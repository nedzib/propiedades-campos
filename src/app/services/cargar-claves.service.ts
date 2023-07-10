import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarClavesService {

  ejercicio_1 = {
    hash_1: "",
    hash_2: "",
    numero_a: 0,
    numero_b: 0,
    numero_c: 0
  }

  constructor() { }

  set_hashes_ejercicio_1(hash_1: string, hash_2: string) {
    this.ejercicio_1.hash_1 = hash_1
    this.ejercicio_1.hash_2 = hash_2
  }

  set_numeros_ejercicio_1(numero_a: number, numero_b: number, numero_c: number) {
    this.ejercicio_1.numero_a = numero_a
    this.ejercicio_1.numero_b = numero_b
    this.ejercicio_1.numero_c = numero_c
  }

  get_ejercicio_1() {
    return this.ejercicio_1
  }

}
