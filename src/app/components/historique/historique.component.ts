import { Component, OnInit } from '@angular/core';
import { LigneCommande } from 'src/app/classes/ligne-commande';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  allCommandes = [];
  detailsCommande = [];
  showModal: boolean = false;
  nomClient: string = '';
  prixCommande: number = 0;
  commandeVide: boolean = false;



  ngOnInit(): void {
    this.allCommandes = JSON.parse(String(localStorage.getItem("Commandes")));
    console.log(this.allCommandes);
    if (this.allCommandes.length == 0) {
      this.commandeVide = true;
      console.log(this.commandeVide);
    }
  }

  delete(index: number) {
    let arrayDataCommande = JSON.parse(String(localStorage.getItem("Commandes")));
    //console.log(arrayDataCommande.length);
    arrayDataCommande.splice(index, 1);
    localStorage.setItem('Commandes', JSON.stringify(arrayDataCommande));
    this.allCommandes = arrayDataCommande;
    if (this.allCommandes.length == 0) {
      this.commandeVide = true;
      console.log(this.commandeVide);
    }
  }

  affModal(i: number) {
    if (this.showModal) {
      this.showModal = false;
    } else {
      this.showModal = true;
      this.detailsCommande = this.allCommandes[i]['composition'];
      this.nomClient = this.allCommandes[i]['client'];
      this.prixCommande = this.allCommandes[i]['prixTotal'];
    }
  }

}
