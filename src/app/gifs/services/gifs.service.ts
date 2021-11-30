import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private API_KEY = '7bF9631PZyGG68PUzirO17S2CT1zuLTV';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];


  // PETICIONES CON FETCH
      // fetch('https://api.giphy.com/v1/gifs/search?api_key=7bF9631PZyGG68PUzirO17S2CT1zuLTV&q=dragon ball z&limit=10')
    //   .then(resp => {
    //     resp.json().then(data => {
    //       console.log(data);
    //     })
    //   })


  constructor(private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    console.log(this.resultados);
  }

  get historial () {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    this.validarTexto(query);

    const params = new HttpParams()
          .set('api_key',this.API_KEY)
          .set('limit','10')
          .set('q',query);
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((response) => {
        console.log(response.data);
        this.resultados = response.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      });
  }

  validarTexto(query:string) {
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
  }
}
