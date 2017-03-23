SELECT 
	*
FROM 
	affectations 
    right join materiels on materiels.IDMATERIEL=affectations.IDMATERIEL
    right join fournisseurs on materiels.IDFOURNISSEUR=fournisseurs.IDFOURNISSEUR
    right join modeles on materiels.IDMODELE=modeles.IDMODELE
    right join marques on marques.IDMARQUE=modeles.IDMARQUE
    right join familles on familles.IDFAMILLE=modeles.IDFAMILLE
	right join bpclight_agents on bpclight_agents.kage=affectations.IDUTILISATEUR
    right join utilisateurs on utilisateurs.IDUTILISATEUR=affectations.IDUTILISATEUR
	right join bpclight_unites on bpclight_agents.kuni=bpclight_unites.kuni
    right join unites on unites.IDUNITE=utilisateurs.IDUNITE
/*	right join bpclight_subdis on bpclight_agents.ksub=bpclight_subdis.ksub
	right join bpclight_etablissements on bpclight_etablissements.kets=bpclight_unites.kets*/