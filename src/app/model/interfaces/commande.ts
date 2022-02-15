interface BoxeCommande {
    nom: string,
    quantite: number,
    prix: number
}

export interface Commande {
    client: string,
    composition: BoxeCommande[],
    prixTotal: number
}