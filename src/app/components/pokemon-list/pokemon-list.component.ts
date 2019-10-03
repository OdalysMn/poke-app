import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  offset = 0;
  pokemons = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(loadMore = false, event?) {
    console.log('loadPokemons');
    console.log('offset: ', this.offset);
    if (loadMore) {
      this.offset += 25;
    }

    this.pokemonService.getPokemons(this.offset).subscribe(res => {
      this.pokemons = [...this.pokemons, ...res];

      if (event) {
        event.target.complete();
      }
    });
  }

  onSearchChange(event) {
    let value =  event.target.value;

    if (value === '') {
      this.offset = 0;
      this.loadPokemons();
      return;
    }

    this.pokemonService.findPokemon(value).subscribe(res => {
      this.pokemons = [res];
    }, err => {
      this.pokemons = [];
    });
  }

  saveSelectedPokemons() {

  }

}
