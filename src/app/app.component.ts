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
    alpha: null,
    beta: 5.183,
    epsilon: null,
    miu: 1.22,
    f: 122200000,
    sigma: 0.028030256653737033,
  });

  submit() {
    let epsilon_r : any = this.valuesForm.value.epsilon
    let sigma : any = this.valuesForm.value.sigma
    let alpha : any = this.valuesForm.value.alpha
    let beta : any = this.valuesForm.value.beta
    let f : any = this.valuesForm.value.f
    let mu_r : any = this.valuesForm.value.miu

    if (alpha == null && epsilon_r == null){
      console.log('alpha y epsilon vacios')
      beta ??= 0; sigma ??= 0; mu_r ??= 0; f ??= 0

      this.w = 2 * Math.PI * f

      this.t = 1 / f

      let mu = mu_r * this.miu_0

      let calculo_epsilon = (((4*Math.pow(beta, 4)/(Math.pow(this.w, 4)*Math.pow(mu, 2)))-(Math.pow(sigma, 2)/Math.pow(this.w, 2)))*Math.pow(this.w, 2)*mu)/(4*Math.pow(beta, 2))
      this.despeje_1_formula = '\\epsilon = \\frac{(\\frac{4\\beta^4}{\\omega^4\\mu^2}-\\frac{\\sigma^2}{\\omega^2})\\omega^2\\mu}{4\\beta^2} = ' + calculo_epsilon +
        ' \\\\ \\frac{\\epsilon}{\\epsilon_{0}} = \\epsilon_{r} =' + calculo_epsilon / this.epsilon_0

      epsilon_r = calculo_epsilon / this.epsilon_0
      this.tdp = sigma / (this.w * this.epsilon_0 * epsilon_r)

      let calculo_alpha = this.w * Math.sqrt((mu_r * this.miu_0 * epsilon_r * this.epsilon_0)/2 * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_2_formula = '\\alpha = \\omega\\sqrt{\\frac{\\mu\\epsilon}{2}(\\sqrt{1+(tdp)^2}-1)} = ' + calculo_alpha

      this.lamda = 2 * Math.PI / beta
      this.delta = 1 / calculo_alpha
      this.v_phase = this.w / beta
      this.calcular_valores_eta(sigma, calculo_epsilon, mu_r * this.miu_0)
    }

    if (alpha == null && mu_r == null){
      console.log('alpha y mu vacios')
      epsilon_r ??= 0; beta ??= 0; sigma ??= 0; f ??= 0

      this.w = 2 * Math.PI * f
      this.tdp = sigma / (this.w * this.epsilon_0 * epsilon_r)
      this.t = 1 / f

      let calculo_mu = (2 * beta * beta) / ((this.w * this.w * this.epsilon_0 * epsilon_r) * (Math.sqrt(1 + (this.tdp * this.tdp)) + 1))
      this.despeje_1_formula = '\\mu = \\frac{2 \\beta^2}{\\omega^2[\\sqrt{1+(\\frac{\\sigma}{\\omega\\epsilon})^2}+1]} = ' + calculo_mu +
        '\\\\ \\mu_{r} = \\frac{\\mu}{\\mu_{0}} = ' + calculo_mu / this.miu_0

      mu_r = calculo_mu / this.miu_0

      let calculo_alpha = this.w * Math.sqrt((mu_r * this.miu_0 * epsilon_r * this.epsilon_0)/2 * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_2_formula = '\\alpha = \\omega\\sqrt{\\frac{\\mu\\epsilon}{2}(\\sqrt{1+(tdp)^2}-1)} = ' + calculo_alpha

      this.lamda = 2 * Math.PI / beta
      this.delta = 1 / calculo_alpha
      this.v_phase = this.w / beta
      this.calcular_valores_eta(sigma, epsilon_r * this.epsilon_0, calculo_mu)
    }

    if (alpha == null && beta == null){
      console.log('alpha y beta vacios')
      epsilon_r ??= 0; sigma ??= 0; mu_r ??= 0; f ??= 0

      this.w = 2 * Math.PI * f
      this.tdp = sigma / (this.w * this.epsilon_0 * epsilon_r)
      this.t = 1 / f

      let calculo_alpha = this.w * Math.sqrt((mu_r * this.miu_0 * epsilon_r * this.epsilon_0)/2 * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_1_formula = '\\alpha = \\omega\\sqrt{\\frac{\\mu\\epsilon}{2}(\\sqrt{1+(tdp)^2}-1)} = ' + calculo_alpha
      let calculo_beta = this.w * Math.sqrt((mu_r * this.miu_0 * epsilon_r * this.epsilon_0)/2 * (Math.sqrt(1 + (this.tdp * this.tdp)) + 1))
      this.despeje_2_formula = '\\beta = \\omega\\sqrt{\\frac{\\mu\\epsilon}{2}(\\sqrt{1+(tdp)^2}+1)} = ' + calculo_beta

      this.lamda = 2 * Math.PI / calculo_beta
      this.delta = 1 / calculo_alpha
      this.v_phase = this.w / calculo_beta
      this.calcular_valores_eta(sigma, epsilon_r * this.epsilon_0, mu_r * this.miu_0)
    }

    if (mu_r == null && sigma == null){
      console.log('mu y sigma vacios')
      alpha ??= 0; beta ??= 0; epsilon_r ??= 0; f ??= 0

      this.w = 2 * Math.PI * f
      this.tdp = Math.sqrt(Math.pow(((alpha * alpha) + (beta * beta)) / ((beta * beta) - (alpha * alpha)), 2) - 1)
      this.lamda = 2 * Math.PI / beta
      this.t = 1 / f
      this.delta = 1 / alpha
      this.v_phase = this.w / beta

      let epsilon = epsilon_r * this.epsilon_0
      let calculo_sigma = this.w * epsilon * this.tdp
      this.despeje_1_formula = ' \\\\  \\sigma = \\omega*\\epsilon*(tdp)' +
        '\\\\ \\sigma = \\omega*\\epsilon* \\sqrt{(\\frac{\\alpha^2+\\beta^2}{\\beta^2-\\alpha^2})^2-1} = ' + calculo_sigma
      let calculo_mu = (2 * alpha * alpha) / ((this.w * this.w * epsilon) * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_2_formula = '\\mu = \\frac{2 \\alpha^2}{\\epsilon\\omega^2[\\sqrt{1+(\\frac{\\sigma}{\\omega\\epsilon})^2}-1]} = ' + calculo_mu +
        '\\\\ \\mu_{r} = \\frac{\\mu}{\\mu_{0}} = ' + calculo_mu / this.miu_0
      this.calcular_valores_eta(calculo_sigma, epsilon, calculo_mu)
    }

    if (epsilon_r == null && sigma == null) {
      console.log('epsilon y sigma vacios')
      alpha ??= 0; beta ??= 0; mu_r ??= 0; f ??= 0

      this.w = 2 * Math.PI * f
      this.tdp = Math.sqrt(Math.pow(((alpha * alpha) + (beta * beta)) / ((beta * beta) - (alpha * alpha)), 2) - 1)
      this.lamda = 2 * Math.PI / beta
      this.t = 1 / f
      this.delta = 1 / alpha
      this.v_phase = this.w / beta

      let epsilon = (2 * alpha * alpha) / ((this.w * this.w * mu_r * this.miu_0) * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_1_formula = '{\\epsilon = \\frac{2\\alpha^2}{\\omega^2\\mu(\\sqrt{1+tdp^2}-1)}} = ' + epsilon +
        ' \\\\ \\frac{\\epsilon}{\\epsilon_{0}} = \\epsilon_{r} =' + epsilon / this.epsilon_0
      let calculo_sigma = this.w * epsilon * this.tdp
      this.despeje_2_formula = ' \\\\ \\sigma = \\omega*\\epsilon*(tdp) = ' + calculo_sigma
      this.calcular_valores_eta(calculo_sigma, epsilon, mu_r * this.miu_0)
    }
  }

  calcular_valores_eta(sigma: number, epsilon: number, miu: number) {
    let jw = math.multiply(math.complex('i'), this.w)
    jw = math.multiply(jw, miu)
    const jwe = math.add(sigma, math.multiply(math.complex('i'), math.multiply(this.w, epsilon)))
    const added = math.divide(jw, jwe)
    this.eta = math.sqrt(added as math.Complex).toString()
    this.norm_eta = Math.sqrt(miu / epsilon) / Math.pow(1 + Math.pow(sigma / (this.w * epsilon), 2), 1 / 4)
    this.angle_eta_radians = Math.atan(sigma / (this.w * epsilon)) / 2
    this.angle_eta = this.angle_eta_radians * 180 / Math.PI
  }

}
