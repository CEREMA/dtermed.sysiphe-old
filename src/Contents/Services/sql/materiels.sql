SELECT DISTINCT
			materiels.IDMATERIEL,
			_BLOB,
			affectations.IDAFFECTATION,
			NOINVT,
			SN NOSERIE,
			NOTESMATERIEL,
			DATELIVRAISON,
			CARACT1,
			CARACT2,
			CARACT3,
			CARACT4,
			IDGARANTIE,
			NOCOMMANDE,
			NOFACTURE,
			DATEFACTURE,
			REFORME,
			DATEREFORME,
			SENSIBLE,
			modeles.modele,
			familles.FAMILLE,
			familles.IDFAMILLE,
			modeles.MODELE,
			modeles.IDMODELE,
			marques.MARQUE,
			marques.IDMARQUE,
			fournisseurs.FOURNISSEUR,
			fournisseurs.IDFOURNISSEUR,
			affectations.IDSYSIPHE,
			affectations.IDUTILISATEUR,
			affectations.DATEENTREE,
			affectations.DATESORTIE,
			IFNULL(COALESCE(concat(bpclight_agents.nom," ",bpclight_agents.prenom),utilisateurs.NOMUTILISATEUR),"A ATTRIBUER") Affectation,
			IFNULL(COALESCE(bpclight_unites.libunic,unites.UNITE),"A ATTRIBUER") Unite,
			IFNULL(bpclight_subdis.libsubc,"-") Service,
			bpclight_etablissements.libets Etablissement
FROM 
	materiels
    LEFT JOIN affectations on affectations.IDMATERIEL=materiels.IDMATERIEL
    LEFT JOIN fournisseurs on fournisseurs.IDFOURNISSEUR=materiels.IDFOURNISSEUR
    LEFT JOIN modeles on modeles.IDMODELE=materiels.IDMODELE
	LEFT JOIN marques on marques.IDMARQUE=modeles.IDMARQUE    
	LEFT JOIN familles on familles.IDFAMILLE=modeles.IDFAMILLE    
    LEFT JOIN bpclight_agents on bpclight_agents.kage=affectations.IDUTILISATEUR
    LEFT JOIN utilisateurs on utilisateurs.IDUTILISATEUR=affectations.IDSYSIPHE
	LEFT JOIN bpclight_unites on bpclight_unites.kuni=bpclight_agents.kuni
	LEFT JOIN bpclight_subdis on bpclight_subdis.ksub=bpclight_agents.ksub
	LEFT JOIN bpclight_etablissements on bpclight_etablissements.kets=bpclight_unites.kets
	LEFT JOIN unites on unites.IDUNITE=utilisateurs.IDUNITE
WHERE
	affectations.IDSTATUT=0
	AND
	materiels.IDMATERIEL={idmateriel}
ORDER BY
	DATESORTIE desc