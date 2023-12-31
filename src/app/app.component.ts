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
  mu_0 = 1.256637061e-6

  constructor(private formBuilder: FormBuilder) { }

  valuesForm = this.formBuilder.group({
    alpha: 3.183,
    beta: 5.183,
    epsilon: 2.0937671721895996,
    mu: 1.22,
    f: 122200000,
    sigma: 0.028030256653737033,
  });

  submit() {
    let epsilon_r : any = this.valuesForm.value.epsilon
    let sigma : any = this.valuesForm.value.sigma
    let alpha : any = this.valuesForm.value.alpha
    let beta : any = this.valuesForm.value.beta
    let f : any = this.valuesForm.value.f
    let mu_r : any = this.valuesForm.value.mu

    let mu = 0
    let epsilon = 0

    if (mu_r != null){
      mu = mu_r * this.mu_0
    }

    if (epsilon_r != null){
      epsilon = epsilon_r * this.epsilon_0
    }

    if (f != null){
      this.calcular_dependientes_frecuencia(f)
    }

    if (mu_r == null && epsilon_r == null){
      alpha ??= 0; beta ??= 0; sigma ??= 0; f ??= 0

      this.tdp = Math.sqrt(Math.pow(((alpha * alpha) + (beta * beta)) / ((beta * beta) - (alpha * alpha)), 2) - 1)

      epsilon = Math.sqrt((Math.pow(sigma, 2))/((Math.pow(((alpha * alpha) + (beta * beta)) / ((beta * beta) - (alpha * alpha)), 2) - 1)*Math.pow(this.w, 2)))
      this.despeje_1_formula = '\\epsilon = \\sqrt{\\frac{\\sigma^2}{[(\\frac{\\beta^2+\\alpha^2}{\\beta^2-\\alpha^2})^2-1]\\omega^2}} = ' + epsilon +
        ' \\\\ \\frac{\\epsilon}{\\epsilon_{0}} = \\epsilon_{r} =' + epsilon / this.epsilon_0
      mu = Math.sqrt((4*Math.pow(alpha, 2)*Math.pow(beta, 2)*(Math.pow(alpha, 2)+Math.pow(beta, 2)))/(Math.pow(sigma, 2)*Math.pow(this.w, 2)*(Math.pow(alpha, 2)+Math.pow(beta, 2)+Math.pow(sigma, 2))))
      this.despeje_2_formula = '\\mu = \\sqrt{\\frac{4\\alpha^2\\beta^2(\\alpha^2+\\beta^2)}{\\sigma^2\\omega^2(\\alpha^2+\\beta^2)}} = ' + mu +
        '\\\\ \\mu_{r} = \\frac{\\mu}{\\mu_{0}} = ' + mu / this.mu_0
    }

    if (beta == null){

      if (f == null){
        this.w = Math.sqrt((4*Math.pow(alpha, 4))/(((Math.pow(sigma/epsilon, 2))-(4*Math.pow(alpha, 2)/(mu*epsilon)))*Math.pow(mu,2)*Math.pow(epsilon,2)))
        this.despeje_1_formula = '\\omega = \\sqrt{\\frac{4\\alpha^2\\epsilon^2\\mu^2}{\\sigma^2(\\alpha^2+\\sigma^2)}} = ' + this.w +
          '\\\\ f = \\frac{\\omega}{2\\pi} = ' + this.w / (2 * Math.PI)
      }

      if (epsilon_r == null){
        epsilon = (((Math.pow(sigma, 2)/Math.pow(this.w, 2))-(4*Math.pow(alpha, 4)/(Math.pow(this.w, 4)*Math.pow(mu, 2))))*Math.pow(this.w, 2)*mu)/(4*Math.pow(alpha, 2))
        this.despeje_1_formula = '\\epsilon = \\frac{(\\frac{\\sigma^2}{\\omega^2}-\\frac{4\\alpha^4}{\\omega^4\\mu^2})\\omega^2\\mu}{4\\alpha^2} = ' + epsilon +
          ' \\\\ \\frac{\\epsilon}{\\epsilon_{0}} = \\epsilon_{r} =' + epsilon / this.epsilon_0
      }

      if (sigma == null){
        sigma = Math.sqrt(((4*Math.pow(alpha, 4)/(Math.pow(this.w, 4)*Math.pow(mu,2)*Math.pow(epsilon,2)))+(4*Math.pow(alpha, 2)/(Math.pow(this.w, 2)*mu*epsilon)))*Math.pow(this.w, 2)*Math.pow(epsilon,2))
        this.despeje_1_formula = '\\sigma = \\sqrt{\\frac{4\\alpha^4}{\\omega^4\\epsilon^2\\mu^2}+\\frac{4\\alpha^2}{\\omega^2\\mu\\epsilon}\\omega^2\\epsilon^2} = ' + sigma
      }

      this.tdp = sigma / (this.w * epsilon)

      if (mu_r == null){
        mu = (2 * alpha * alpha) / ((this.w * this.w * epsilon) * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
        this.despeje_1_formula = '\\mu = \\frac{2 \\alpha^2}{\\omega^2\\epsilon[\\sqrt{1+(\\frac{\\sigma}{\\omega\\epsilon})^2}-1]} = ' + mu +
          '\\\\ \\mu_{r} = \\frac{\\mu}{\\mu_{0}} = ' + mu / this.mu_0
      }

      if (alpha == null){
        let solucion_alpha = this.calcular_alpha_beta('alpha', mu, epsilon, this.tdp)
        this.despeje_1_formula = solucion_alpha.despeje
        alpha = solucion_alpha.calculo
      }

      let solucion_beta = this.calcular_alpha_beta('beta', mu, epsilon, this.tdp)
      this.despeje_2_formula = solucion_beta.despeje
      beta = solucion_beta.calculo
    }

    if (alpha == null && sigma == null){
      epsilon_r ??= 0; beta ??= 0; mu_r ??= 0; f ??= 0

      sigma = Math.sqrt(((4*Math.pow(beta, 4)/(Math.pow(this.w, 4)*Math.pow(mu,2)*Math.pow(epsilon,2)))-(4*Math.pow(beta, 2)/(Math.pow(this.w, 2)*mu*epsilon)))*Math.pow(this.w, 2)*Math.pow(epsilon,2))
      this.despeje_1_formula = '\\sigma = \\sqrt{\\frac{4\\beta^4}{\\omega^4\\epsilon^2\\mu^2}-\\frac{4\\beta^2}{\\omega^2\\mu\\epsilon}\\omega^2\\epsilon^2} = ' + sigma

      this.tdp = sigma / (this.w * epsilon)

      let solucion_alpha = this.calcular_alpha_beta('alpha', mu, epsilon, this.tdp)
      this.despeje_2_formula = solucion_alpha.despeje
      alpha = solucion_alpha.calculo
    }

    if (alpha == null && epsilon_r == null){
      beta ??= 0; sigma ??= 0; mu_r ??= 0; f ??= 0

      epsilon = (((4*Math.pow(beta, 4)/(Math.pow(this.w, 4)*Math.pow(mu, 2)))-(Math.pow(sigma, 2)/Math.pow(this.w, 2)))*Math.pow(this.w, 2)*mu)/(4*Math.pow(beta, 2))
      this.despeje_1_formula = '\\epsilon = \\frac{(\\frac{4\\beta^4}{\\omega^4\\mu^2}-\\frac{\\sigma^2}{\\omega^2})\\omega^2\\mu}{4\\beta^2} = ' + epsilon +
        ' \\\\ \\frac{\\epsilon}{\\epsilon_{0}} = \\epsilon_{r} =' + epsilon / this.epsilon_0

      epsilon_r = epsilon / this.epsilon_0
      this.tdp = sigma / (this.w * this.epsilon_0 * epsilon_r)

      let solucion_alpha = this.calcular_alpha_beta('alpha', mu, epsilon, this.tdp)
      this.despeje_2_formula = solucion_alpha.despeje
      alpha = solucion_alpha.calculo
    }

    if (alpha == null && mu_r == null){
      epsilon_r ??= 0; beta ??= 0; sigma ??= 0; f ??= 0

      this.tdp = sigma / (this.w * epsilon)

      mu = (2 * beta * beta) / ((this.w * this.w * epsilon) * (Math.sqrt(1 + (this.tdp * this.tdp)) + 1))
      this.despeje_1_formula = '\\mu = \\frac{2 \\beta^2}{\\omega^2\\epsilon[\\sqrt{1+(\\frac{\\sigma}{\\omega\\epsilon})^2}+1]} = ' + mu +
        '\\\\ \\mu_{r} = \\frac{\\mu}{\\mu_{0}} = ' + mu / this.mu_0

      mu_r = mu / this.mu_0

      let solucion_alpha = this.calcular_alpha_beta('alpha', mu, epsilon, this.tdp)
      this.despeje_2_formula = solucion_alpha.despeje
      alpha = solucion_alpha.calculo
    }

    if (mu_r == null && sigma == null){
      alpha ??= 0; beta ??= 0; epsilon_r ??= 0;

      this.tdp = Math.sqrt(Math.pow(((alpha * alpha) + (beta * beta)) / ((beta * beta) - (alpha * alpha)), 2) - 1)

      sigma = this.w * epsilon * this.tdp
      this.despeje_1_formula = ' \\\\  \\sigma = \\omega*\\epsilon*(tdp)' +
        '\\\\ \\sigma = \\omega*\\epsilon* \\sqrt{(\\frac{\\alpha^2+\\beta^2}{\\beta^2-\\alpha^2})^2-1} = ' + sigma
      mu = (2 * alpha * alpha) / ((this.w * this.w * epsilon) * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_2_formula = '\\mu = \\frac{2 \\alpha^2}{\\epsilon\\omega^2[\\sqrt{1+(\\frac{\\sigma}{\\omega\\epsilon})^2}-1]} = ' + mu +
        '\\\\ \\mu_{r} = \\frac{\\mu}{\\mu_{0}} = ' + mu / this.mu_0

    }

    if (epsilon_r == null && sigma == null) {
      alpha ??= 0; beta ??= 0;

      this.tdp = Math.sqrt(Math.pow(((alpha * alpha) + (beta * beta)) / ((beta * beta) - (alpha * alpha)), 2) - 1)

      epsilon = (2 * alpha * alpha) / ((this.w * this.w * mu) * (Math.sqrt(1 + (this.tdp * this.tdp)) - 1))
      this.despeje_1_formula = '{\\epsilon = \\frac{2\\alpha^2}{\\omega^2\\mu(\\sqrt{1+tdp^2}-1)}} = ' + epsilon +
        ' \\\\ \\frac{\\epsilon}{\\epsilon_{0}} = \\epsilon_{r} =' + epsilon / this.epsilon_0
      sigma = this.w * epsilon * this.tdp
      this.despeje_2_formula = ' \\\\ \\sigma = \\omega*\\epsilon*(tdp) = ' + sigma

    }

    this.calcular_lamda_delta_v_phase(beta, alpha, this.w)
    this.calcular_valores_eta(sigma, epsilon, mu)
  }

  calcular_valores_eta(sigma: number, epsilon: number, mu: number) {
    let jw = math.multiply(math.complex('i'), this.w)
    jw = math.multiply(jw, mu)
    const jwe = math.add(sigma, math.multiply(math.complex('i'), math.multiply(this.w, epsilon)))
    const added = math.divide(jw, jwe)
    this.eta = math.sqrt(added as math.Complex).toString()
    this.norm_eta = Math.sqrt(mu / epsilon) / Math.pow(1 + Math.pow(sigma / (this.w * epsilon), 2), 1 / 4)
    this.angle_eta_radians = Math.atan(sigma / (this.w * epsilon)) / 2
    this.angle_eta = this.angle_eta_radians * 180 / Math.PI
  }

  calcular_alpha_beta(property: string, mu: number, epsilon: number, tdp: number){
    let one = 0
    let sign = ''
    let prop = ''
    if (property == 'beta'){
      one = 1
      sign = '+'
      prop = 'beta'
    }
    else if(property == 'alpha')
    {
      one = -1
      sign = '-'
      prop = 'alpha'
    }
    let calculo = this.w * Math.sqrt((mu * epsilon)/2 * (Math.sqrt(1 + (tdp * tdp)) + one))
    let despeje = '\\' + prop + ' = \\omega\\sqrt{\\frac{\\mu\\epsilon}{2}(\\sqrt{1+(tdp)^2}' + sign + '1)} = ' + calculo
    return {
      calculo: calculo,
      despeje: despeje
    }
  }

  calcular_lamda_delta_v_phase(beta: number, alpha: number, omega: number){
    this.lamda = 2 * Math.PI / beta
    this.delta = 1 / alpha
    this.v_phase = omega / beta
  }

  calcular_dependientes_frecuencia(frecuencia: number){
    this.w = 2 * Math.PI * frecuencia
    this.t = 1 / frecuencia
  }

}
