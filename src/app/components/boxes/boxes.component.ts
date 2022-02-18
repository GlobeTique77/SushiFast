import { Component, OnInit } from '@angular/core';
import { Boxe } from 'src/app/model/interfaces/boxe';
import { SushiService } from 'src/app/service/sushi/sushi.service';
import { LigneCommande } from 'src/app/classes/ligne-commande';
import { FormControl, FormGroup } from '@angular/forms';
import { Commande, BoxeCommande } from 'src/app/classes/commande';



@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})

export class BoxesComponent implements OnInit {

  title = 'sushifast';
  boxes: any = [];

  boxe: Boxe = {
    id: 0,
    nom: '',
    pieces: 0,
    composition: [],
    saveurs: [],
    prix: 0.0,
    image: ''
  };

  commandes: LigneCommande[];
  allCommandes: Commande[];
  totalCommande: number = 0.0;
  boxesCommandees = Array();
  boxeCommande: BoxeCommande[];

  showModal: boolean = false;
  commandeForm!: FormGroup;


  constructor(public sushiService: SushiService) {
    this.commandes = [];
    this.boxeCommande = [];
    this.allCommandes = JSON.parse(String(localStorage.getItem("Commandes") || '[]'));
  }

  ngOnInit() {
    this.fetchBoxes()
    this.commandeForm = new FormGroup({
      client: new FormControl(),
      });
     
  }

  fetchBoxes() {
    return this.sushiService.getBoxes().subscribe((data: {}) => {
      this.boxes = data;
      // console.log(data);
    })
  }

  plus(index: number) {
    const nomsBoxesCommandees = this.commandes.map(value => value.nomPlateau);
    const panier: any | Map<string, number> = new Map();
    nomsBoxesCommandees.forEach(nomBoxeCommandee => (panier.set(nomBoxeCommandee, (panier.get(nomBoxeCommandee) || 0) + 1)))
    if (panier.get(this.boxes[index].nom) == 1) {
      for (let i = 0; i < this.commandes.length; i++) {
        if (this.commandes[i].nomPlateau == this.boxes[index].nom) {
          this.commandes[i].quantite++;
          this.commandes[i].prix = this.commandes[i].quantite * this.boxes[index].prix;
          this.commandes[i].prix = Math.round(1000 * this.commandes[i].prix) / 1000;
        }
      }
    }
    else {
      let numCommande = Math.floor(Math.random() * (99 + 1));
      let uneLigne = new LigneCommande(this.boxes[index].image, this.boxes[index].nom, 1, this.boxes[index].prix);
      this.commandes.push(uneLigne);
    }
    this.totalCommande = (this.totalCommande + this.boxes[index].prix);
    this.totalCommande = Math.round(1000 * this.totalCommande) / 1000;
  }

  moins(index: number) {
    const nomsBoxesCommandees = this.commandes.map(value => value.nomPlateau);
    const panier: any | Map<string, number> = new Map();
    nomsBoxesCommandees.forEach(nomBoxeCommandee => (panier.set(nomBoxeCommandee, (panier.get(nomBoxeCommandee) || 0) + 1)))
    if (panier.get(this.boxes[index].nom) == 1) {
      for (let i = 0; i < this.commandes.length; i++) {
        if (this.commandes[i].nomPlateau == this.boxes[index].nom && this.commandes[i].quantite > 0) {
          this.commandes[i].quantite--;
          this.commandes[i].prix = this.commandes[i].quantite * this.boxes[index].prix;
          this.commandes[i].prix = Math.round(1000 * this.commandes[i].prix) / 1000;
        }
        console.log(this.commandes);
        if (this.commandes[i].quantite == 0) {
          this.commandes.splice(i, 1);
        }
        console.log(this.commandes);
      }
      this.totalCommande = this.totalCommande - this.boxes[index].prix;
      this.totalCommande = Math.round(1000 * this.totalCommande) / 1000;
    }
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
      // console.log(this.showModal);
    }
  }

  commander() {
    for (let i = 0; i < this.commandes.length; i++) {
      this.boxesCommandees.push(new BoxeCommande(this.commandes[i].nomPlateau, this.commandes[i].quantite, this.commandes[i].prix));
    }
    let uneCommande = new Commande(this.commandeForm.value.client, this.boxesCommandees, this.totalCommande, false, false)

    
    this.allCommandes.push(uneCommande);
    this.commandes = [];
    this.boxesCommandees = [];
    this.totalCommande = 0;
    this.commandeForm.value.client = '';
    let tabItems = JSON.stringify(this.allCommandes);
    localStorage.setItem('Commandes', tabItems);
  }

}
