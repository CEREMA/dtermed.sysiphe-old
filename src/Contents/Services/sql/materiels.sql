SELECT 
	* 
FROM 
	sysiphe.affectations 
    right join materiels on materiels.IDMATERIEL=affectations.IDMATERIEL
    right join fournisseurs on materiels.IDFOURNISSEUR=fournisseurs.IDFOURNISSEUR
    right join modeles on materiels.IDMODELE=modeles.IDMODELE
    right join marques on marques.IDMARQUE=modeles.IDMARQUE
    right join familles on familles.IDFAMILLE=modeles.IDFAMILLE