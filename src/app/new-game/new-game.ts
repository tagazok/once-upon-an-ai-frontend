import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './new-game.html',
  styleUrl: './new-game.scss',
})
export class NewGame {
  private router = inject(Router);
  
  serverUrl: string = '';

  newGameForm = new FormGroup({
    name: new FormControl(''),
    class: new FormControl(''),
    race: new FormControl(''),
    gender: new FormControl(''),
  });

  constructor() {
    const url = localStorage.getItem('url');
    if (url) {
      this.serverUrl = url;
    }
  }
  races: string[] = [
    'Aasimar',
    'Dragonborn',
    'Dwarf',
    'Elf',
    'Gnome',
    'Goliath',
    'Halfling',
    'Human',
    'Orc',
    'Tiefling',
  ];

  classes: string[] = [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard',
  ];

  genders: string[] = ['man', 'woman', 'no gender'];

  async start() {
    debugger;
    const prompt = `The player's name is ${this.newGameForm.value.name} and you can welcome them to the game. 
The player is a ${this.newGameForm.value.gender} ${this.newGameForm.value.race} ${this.newGameForm.value.class}.
Describe the surroundings of the player and create an atmosphere that the player can bounce off of. 
Don't make more than 100 words.`;

    try {
      const response = await fetch(`${this.serverUrl}/inquire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        this.router.navigate(['/game', "pouet"]);
      }
    } catch (error) {
      console.error('Request error:', error);
    } finally {
      // redirect to game page
    }
  }
}
