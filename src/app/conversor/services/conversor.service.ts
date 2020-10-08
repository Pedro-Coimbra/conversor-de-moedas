import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  Conversao,
  ConversaoResponse
} from '../models';
@Injectable()
export class ConversorService {

  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=2519e63edd6a82412b33d4c732ae6ad6";
  constructor(private http: HttpClient) { }
  /**
   * Realiza a chamada para a API de conversão de moedas.
   */
  converter(conversao: Conversao): Observable<any> {

    let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    return this.http
      .get(this.BASE_URL + params);
  }
  /**
   * Retorna a cotação para dado uma response.
   */
  cotacaoPara(conversaoResponse: ConversaoResponse,
    conversao: Conversao): number {
    if (conversaoResponse === undefined) {
      return 0;
    }
    return conversaoResponse.rates[conversao.moedaPara];
  }
  /**
   * Retorna a cotação de dado uma response.
   */
  cotacaoDe(conversaoResponse: ConversaoResponse,
    conversao: Conversao): string {
    if (conversaoResponse === undefined) {
      return '0';
    }
    return (1 / conversaoResponse.rates[conversao.moedaPara])
      .toFixed(4);
  }
  /**
   * Retorna a data da cotação dado uma response.
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }
    return conversaoResponse.date;
  }
}