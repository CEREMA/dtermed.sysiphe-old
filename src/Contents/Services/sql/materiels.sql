SELECT DISTINCT	materiels.NOINVT,SN,NOTESMATERIEL,DATELIVRAISON,CARACT1,CARACT2,CARACT3,CARACT4,modeles.modele,fournisseurs.FOURNISSEUR,affectations.IDSYSIPHE,affectations.IDUTILISATEUR,IFNULL(COALESCE(concat(bpclight_agents.nom,' ',bpclight_agents.prenom),utilisateurs.NOMUTILISATEUR),"A ATTRIBUER") Affectation
FROM 
	materiels
    LEFT JOIN affectations on affectations.IDMATERIEL=materiels.IDMATERIEL
    LEFT JOIN fournisseurs on fournisseurs.IDFOURNISSEUR=materiels.IDFOURNISSEUR
    LEFT JOIN modeles on modeles.IDMODELE=materiels.IDMODELE
    LEFT JOIN bpclight_agents on bpclight_agents.kage=affectations.IDUTILISATEUR
    LEFT JOIN utilisateurs on utilisateurs.IDUTILISATEUR=affectations.IDSYSIPHE
WHERE
	affectations.IDSTATUT=1
ORDER BY NOINVT