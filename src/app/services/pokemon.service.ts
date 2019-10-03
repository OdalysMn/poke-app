import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ResponseInterface} from '../models/response.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  URL = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  selectedPokemons = [];
  constructor(private httpClient: HttpClient) { }

  getPokemons(offset = 0) {
    return this.httpClient
      .get(`${this.URL}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map(result => {
          return result['results'];
        }),
        map(pokemons => {
          return pokemons.map((pokemon, index) => {
            pokemon.image = this.getPokemonImage(offset + index + 1);
            pokemon.pokeIndex = offset + index + 1;
            return pokemon;
          });
        })
      );
  }

  findPokemon(search) {
    return this.httpClient.get(`${this.URL}/pokemon/${search}`).pipe(
      map(pokemon => {
        pokemon['image'] = this.getPokemonImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }

  getPokemonImage(index) {
    return `${this.imageUrl}${index}.png`;
  }

  getPokemonDetails(index) {
    return this.httpClient.get(`${this.URL}/pokemon/${index}`).pipe(
      map(pokemon => {
        let sprites = Object.keys(pokemon['sprites']);
        pokemon['images'] = sprites
          .map(spriteKey => pokemon['sprites'][spriteKey])
          .filter(img => img);
        return pokemon;
      })
    );
  }

  getSelectedPokemons() {
    return this.selectedPokemons;
  }

  addToSelectedPokemons(pokemon) {
    if (this.selectedPokemons.length < 10 ) {
      this.selectedPokemons.push(pokemon);
      return true;
    } else {
      return false;
    }
  }
}
