SELECT DISTINCT
	*
FROM 
	affectations 
    left join materiels on materiels.IDMATERIEL=affectations.IDMATERIEL
    left join fournisseurs on materiels.IDFOURNISSEUR=fournisseurs.IDFOURNISSEUR
    left join modeles on materiels.IDMODELE=modeles.IDMODELE
    left join marques on marques.IDMARQUE=modeles.IDMARQUE
    left join familles on familles.IDFAMILLE=modeles.IDFAMILLE
	left join bpclight_agents on bpclight_agents.kage=affectations.IDUTILISATEUR
    left join utilisateurs on utilisateurs.IDUTILISATEUR=affectations.IDUTILISATEUR
	left join bpclight_unites on bpclight_agents.kuni=bpclight_unites.kuni
    left join unites on unites.IDUNITE=utilisateurs.IDUNITE
	left join bpclight_subdis on bpclight_agents.ksub=bpclight_subdis.ksub
	left join bpclight_etablissements on bpclight_etablissements.kets=bpclight_unites.kets
LIMIT 0,100