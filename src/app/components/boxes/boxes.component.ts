import { Component, OnInit } from '@angular/core';
import { Boxe } from 'src/app/model/interfaces/boxe';
import { SushiService } from 'src/app/service/sushi/sushi.service';
import { LigneCommande } from 'src/app/classes/ligne-commande';



@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})

export class BoxesComponent implements OnInit {

  title = 'sushifast';
  boxes: any = [];

  boxe: any = {
    id: 0,
    nom: '',
    pieces: 0,
    composition: [],
    saveurs: [],
    prix: 0.0,
    image: ''
  };
 
  commandes: LigneCommande[];
  totalCommande: number = 0.0;

  showModal: boolean = false;

  constructor(public sushiService: SushiService) {
    this.commandes = [];

  }

  ngOnInit() {
    this.fetchBoxes()
  }

  fetchBoxes() {
    return this.sushiService.getBoxes().subscribe((data: {}) => {
      this.boxes = data;
      // console.log(data);
    })
  }

  plus(index: number) {
    // Exemple d'affectation
    let uneLigne = new LigneCommande(1, this.boxes[index].nom, 3);
    this.commandes.push(uneLigne);
    console.log("Plus :" + index + this.boxes[index].nom);

  }

  moins(index: number) {
    console.log("Moins :" + index);
  }

  affModal(i: number) {
    if (this.showModal) {
      this.showModal = false;
    } else {
      console.log("Modal indice :" + i);    
      console.log("Modal nom plateau :" + this.boxes[i].nom);
      this.boxe = this.boxes[i];
      this.showModal = true;
    }
  }

}
