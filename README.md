# Safe
## _THIQA technical tests_


Le but de l’exercice est de réaliser un service de type REST qui gère des coffres-forts.
Il pourra accepter des requêtes de multiples clients HTTP permettant de :

- créer des coffres
- lister les coffres
- récupérer et afficher un coffre préçis
- supprimer un coffre
- ajouter des éléments à un coffre
- supprimer des éléments d'un coffre

## Routes

le serveur comporte 6 routes differentes.

- post /safe
- get /safe
- get /safe/{id du coffre}
- delete /safe/{id du coffre}
- post /safe/{id du coffre}/addItems
- post /safe/{id du coffre}/removeItems

# post /safe

Permet de créer un coffre. l'utilisateur doit __obligatoirement__ fournir un __password__ dans le body qui lui sera demander pour toute autre action concernant son coffre.
il peut ajouter lors de sa création 3 objets dans le body:
- gold (int)
- key
- documents

une fois le coffre enregistré, le serveur renvera à l'utilisateur l'id de son coffre qu'il devras utiliser dans ses futur requètes.

_code d'erreur 201 : succès_
_code d'erreur 400 : échec_

# get /safe

Le serveur renvera en réponse la liste de tous les coffres enregistrés.

_code d'erreur 200 : succès_
_code d'erreur 400 : échec_

# get /safe/{id du coffre}

Le serveur renvera en réponse le coffre corespondant à l'id envoyé en paramètre.
L'utilisateur devras fournir dans le body de la requète le __password__ utilisé lors de la création du coffre.

_code d'erreur 200 : succès_
_code d'erreur 400 : échec_

# delete /safe/{id du coffre}

Le serveur suprimera le coffre corespondant à l'id envoyé en paramètre.
L'utilisateur devras fournir dans le body de la requète le __password__ utilisé lors de la création du coffre.

_code d'erreur 204 : succès_
_code d'erreur 400 : échec_

# post /safe/{id du coffre}/addItems

Cette route permet à l'utilisateurs d'ajouter des objets à son coffre.
L'utilisateur devras fournir dans le body de la requète le __password__ utilisé lors de la création du coffre.
il peut ajouter ces 3 objets dans le body pour les ajouter à son coffre:
- gold (int)
- key
- documents _(l'utilisateur ne peut pas ajouter 2 fois le même document dans son coffre)_

_code d'erreur 204 : succès_
_code d'erreur 400 : échec_

# post /safe/{id du coffre}/removeItems

Cette route permet à l'utilisateurs de supprimer des objets à son coffre.
L'utilisateur devras fournir dans le body de la requète le __password__ utilisé lors de la création du coffre.
il peut ajouter ces 3 objets dans le body pour les supprimer de son coffre:
- gold (int) _(l'utilisateur ne peut pas supprimer plus de gold qu'il n'en a dans son coffre)_
- key _(l'utilisateur devras indiquer la position de la key à supprimer. ex -> {3, 5, 7} -> delete 2 -> {3, 7})_
- documents _(l'utilisateur devras indiquer le titre du documents à supprimer)_

_code d'erreur 204 : succès_
_code d'erreur 400 : échec_
