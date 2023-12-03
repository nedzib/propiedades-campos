import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as math from 'mathjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'proyecto-criptografia';

  w_formula = '2\\pi f'
  t_formula = '\\frac{1}{f}'
  lamda_formula = '\\frac{2\\pi}{\\beta}'
  eta_formula = '\\sqrt{\\frac{j\\omega\\mu}{\\sigma+j\\omega\\epsilon}}'
  norm_eta_formula = '\\frac{\\sqrt{\\frac{\\mu}{\\epsilon}}}{[1+(\\frac{\\sigma}{\\omega\\epsilon})^2]^\\frac{1}{4}}'
  angle_eta_formula = '\\frac{1}{2}\\tan^-1{(\\frac{\\sigma}{\\omega\\epsilon})}'
  delta_formula = '\\frac{1}{\\alpha}'
  v_phase_formula = '\\frac{\\omega}{\\beta}'
  tdp_formula = '\\sqrt{(\\frac{\\alpha^2+\\beta^2}{\\beta^2-\\alpha^2})^2-1} \\quad \\textrm{ó} \\quad \\frac{\\sigma}{\\omega\\epsilon}'
  despeje_1_formula = ''
  despeje_2_formula = ''

  w = 0
  t = 0
  lamda = 0
  eta: any = 0
  norm_eta = 0
  angle_eta = 0
  angle_eta_radians = 0
  delta = 0
  v_phase = 0
  tdp = 0

  epsilon_0 = Math.pow(10, -9) / (36 * Math.PI)
  miu_0 = 1.256637061e-6

  constructor(private formBuilder: FormBuilder) { }

  valuesForm = this.formBuilder.group({
    alpha: 3.5,
    beta: 7.2,
    epsilon: null,
    miu: 1.2,
    f: 180.709e6,
    sigma: null,
  });

  submit() {
    let epsilon = this.valuesForm.value.epsilon
    let sigma = this.valuesForm.value.sigma
    let alpha = this.valuesForm.value.alpha
    let beta = this.valuesForm.value.beta
    let f = this.valuesForm.value.f
    let miu = this.valuesForm.value.miu

    console.log(this.valuesForm.value)

    if (epsilon == null && sigma == null) {
      console.log('epsilon y sigma vacios')
      if (alpha == null) {
        alpha = 0
      }
      if (beta == null) {
        beta = 0
      }
      if (miu == null) {
        miu = 0
      }
      if (f == null) {
        f = 0
      }

      // Calculamos conocidos
      this.w = 2 * Math.PI * f
      this.tdp = Math.sqrt(Math.pow(((alpha * alpha) + (beta * beta)) / ((beta * beta) - (alpha * alpha)), 2) - 1)
      this.lamda = 2 * Math.PI / beta
      this.t = 1 / f
      this.delta = 1 / alpha
      this.v_phase = this.w / beta

      let epsilon_completo = (2 * alpha * alpha) / ((this.w * this.w * miu * this.miu_0) * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_1_formula = '{\\epsilon = \\frac{2\\alpha^2}{\\omega^2\\mu(\\sqrt{1+tdp^2}-1)}} = ' + epsilon_completo +
        ' \\\\ \\frac{\\epsilon}{\\epsilon_{0}} = \\epsilon_{r} =' + epsilon_completo / this.epsilon_0
      let calculo_sigma = this.w * epsilon_completo * this.tdp
      this.despeje_2_formula = ' \\\\ \\sigma = \\omega*\\epsilon*(tdp) = ' + calculo_sigma

      // Calculamos finales
      this.calcular_valores_eta(calculo_sigma, epsilon_completo, miu * this.miu_0)
    }
  }

  calcular_valores_eta(sigma: number, epsilon_completo: number, miu: number) {
    let jw = math.multiply(math.complex('i'), this.w)
    jw = math.multiply(jw, miu)
    const jwe = math.add(sigma, math.multiply(math.complex('i'), math.multiply(this.w, epsilon_completo)))
    const added = math.divide(jw, jwe)
    this.eta = math.sqrt(added as math.Complex).toString()
    this.norm_eta = Math.sqrt(miu / epsilon_completo) / Math.pow(1 + Math.pow(sigma / (this.w * epsilon_completo), 2), 1 / 4)
    this.angle_eta_radians = Math.atan(sigma / (this.w * epsilon_completo)) / 2
    this.angle_eta = this.angle_eta_radians * 180 / Math.PI
  }

}
