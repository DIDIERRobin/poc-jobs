# POC – Orchestration des synchronisations DN → RAF

Ce dépôt contient un **POC comparatif** visant à évaluer deux approches d’orchestration de traitements asynchrones :
**RabbitMQ** et **Temporal**.

## Objectif
Simuler le traitement de **dossiers DN** modifiés :
- 1 dossier = 1 job
- récupération du dossier DN
- passage dans le mapper
- upload de fichiers
- envoi d’email
- mise à jour de la fondation

Le POC introduit volontairement :
- des lenteurs
- des erreurs aléatoires
- des crashs de workers
- des indisponibilités simulées (DN, upload, infra)

## Cas métier central
Lorsqu’un métier signale :
> “Ce dossier précis n’est pas passé”

le système doit permettre :
- d’identifier rapidement le job par **dossierId**
- de comprendre l’historique et le point de blocage
- de relancer le job de manière ciblée et sûre

## Périmètre
Même logique métier, deux implémentations :
- RabbitMQ (queue + consumer)
- Temporal (workflow + activities)

Le but n’est pas la performance, mais la **maîtrise opérationnelle**.