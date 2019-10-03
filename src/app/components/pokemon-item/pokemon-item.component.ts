import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon: any;
  isSelected = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  onChange() {
    if (this.isSelected === true) {
      if (!this.pokemonService.addToSelectedPokemons(this.pokemon)) {
      } else {
      }
    }
  }

}
