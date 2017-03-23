SELECT 
	*
FROM 
	affectations 
    right join materiels on materiels.IDMATERIEL=affectations.IDMATERIEL
    join fournisseurs on materiels.IDFOURNISSEUR=fournisseurs.IDFOURNISSEUR
    join modeles on materiels.IDMODELE=modeles.IDMODELE
    join marques on marques.IDMARQUE=modeles.IDMARQUE
    join familles on familles.IDFAMILLE=modeles.IDFAMILLE
	right join bpclight_agents on bpclight_agents.kage=affectations.IDUTILISATEUR
    right join utilisateurs on utilisateurs.IDUTILISATEUR=affectations.IDUTILISATEUR
	right join bpclight_unites on bpclight_agents.kuni=bpclight_unites.kuni
    right join unites on unites.IDUNITE=utilisateurs.IDUNITE