export class Commande {
    constructor(
        public client: string,
        public composition: BoxeCommande[],
        public prixTotal: number,
        public servie: boolean,
        public payee: boolean,
    ) {} 
}

export class BoxeCommande {
    constructor(
        public nom: string,
        public quantite: number,
        public prix: number
    ) { }
}
