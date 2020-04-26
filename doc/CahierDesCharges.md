# Cahier des charges de Sentin'Ailes

## ÉLÉMENTS DE CONTEXTE
Vieillissement de la population, souhait de fin de vie à domicile mais isolement social, manque de solidarités de voisinage, éloignement des familles …
**Constat** d’un manque de coordination des intervenants liés à :
- Une méconnaissance interprofessionnelle des différents services/prestations à domicile mises en place au bénéfice des personnes
- Des situations de chevauchement des intervenants sans articulation ou trop concentrés sur certaines plages de la journée
- Une méconnaissance des ruptures/interruptions de droits consécutifs à des hospitalisations séjours en centres de repos...


## OBJECTIFS DU PROJET

### Stratégique
Améliorer la coordination des intervenants au domicile des personnes âgées ou handicapées dépendantes pour améliorer la réactivité et l’efficacité des prises en charge et renforcer la sécurité au domicile des personnes

### Opérationnel
Mettre en place et déployer sur le territoire communal un applicatif de gestion et de coordination des intervenants à domicile sur des supports fixes (ordinateurs) ou mobiles (tablettes, smartphones) utilisables par les professionnels des secteurs sociaux et médico-sociaux et par les aidants.

Faire connaître aux usagers bénéficiaires des services à leurs familles ou à ceux qui les suppléent les plages de disponibilité ou d’indisponibilité de leur calendrier quotidien, hebdomadaire ou mensuel ; l’application n’ayant pas pour objectif d’être un agenda personnel, elle ne doit pas être utilisée comme tel.

## PUBLIC CIBLE
* **Bénéficiaires** : personnes (fresnoises dans un premier temps) âgées ou handicapées, en situation de dépendance, vivant à domicile et bénéficiant d’un ensemble de services et prestations.
* **Intervenants** : professionnels issus de structures de soins et d’aide à domicile qui ne communiquent pas systématiquement entre elles.
* **Personnes de confiance** : famille, aidants, voisins, gardien, autres
* **Organismes employeurs des intervenants** : associations d’aide à domicile, SAAD, SIAD, etc.

## PARTENAIRES ASSOCIÉS
1. **Pilotage et conception** : CCAS/Ville de Fresnes, association Human’App de l’école d’ingénieurs EFREI Paris (conceptrice de l’applicatif)
2. **Utilisation** : bénéficiaires, familles et aidants, agents du CCAS (agents du portage de repas, agents sociaux…), aides à domicile et auxiliaires de vie (AFADAR ou autre structure), infirmières du SISID, autres intervenants sociaux et médico-sociaux

## CHAMPS & DOMAINES D’APPLICATION
1. Organisation du quotidien du bénéficiaire
    - Calendrier des évènements (rendez-vous)
    - Prise de rendez-vous
2. Accès aux informations des utilisateurs (bénéficiaires et intervenants liés par un administrateur tiers)
    - Informations de contact
    - Notes laissées par d’autres intervenants (dans le cas d’un bénéficiaire)


## Règles générales d'utilisation
1. Identification individuelle par login (adresse email) et mot de passe (soumis à des règles de sécurité minimales)
2. Accessibilité de l’application pour :
    - Les bénéficiaires
    - Les intervenants
3. Liberté de compléter les champs avec un minimum de champs obligatoires
    - Nom
    - Prénom
    - Adresse
    - Téléphone
    - Contact d’un tiers (personne de confiance)
4. Ajout de personnes de confiance pour les bénéficiaires
5. Accès limité aux informations, **droits d’accès accordés par un administrateur tiers**
6. Données à caractère médical
    - Exclues du champ d’application
    - Les notes personnelles ne doivent pas contenir de données médicales (par accord de la charte d’utilisation)
7. Rédaction d’une charte d’utilisation répondant à toutes les caractéristiques énoncées ci-dessus
8. Désignation d’un DPO (Data Privacy Officer) **conformément au RGPD**
9. Site administrateur séparé pour :
    - Gestion des inscrits : Ajout d’adresse email autorisées pour l’inscription 
    - Ajout de liens entre bénéficiaires et intervenants
    - Suppression de liens entre bénéficiaires et intervenants

## Caractéristique technique
1. Disponibilité sur PC fixe ou portable, indépendamment du système d’exploitation et du navigateur (à l’exception d’Internet Explorer sauf pour les versions 9, 10 et 11)
2. Disponibilité sur tous les navigateurs web
    - Google Chrome, Firefox, Safari, Microsoft Edge, Opera, …
    - Internet Explorer 9, 10 et 11, les autres versions sont hors de garantie de support (car obsolètes et désuètes). Human’App n’est pas dans la capacité de tester le support sur ce navigateur
3. Utilisation d’un service cloud pour l’hébergement de l’application et de ses bases de données : Google Firebase
    - Tarification à l’usage en temps réel
    - Sécurité garantie par Google
    - Choix de la localisation du centre de données (conformément au RGPD)
    - Capacité d’adaptation à la charge d’usage (“scalable”) 
    - Console d’administration commun et non modifiable
    - Garantie de maintien en ligne, sauf en cas d’avarie majeure du centre de données
4.  Intégration de fonctionnalités d’accessibilité dans un souci d’ergonomie
    - Infobulles
    - Boutons d’informations
    - Navigation simplifiée (bouton retour, par exemple)
    - Utilisation de normes de design classiques et reconnues pour leur simplicité
5. Intégration de distinctions visuelles (code couleur, par exemple) afin de distinguer les différents types d’utilisateurs lorsqu’ils interagissent

## FONCTIONNALITÉS REQUISES

### 1. Carte d’identité du bénéficiaire
- Nom
- Prénom
- Adresse email (identifiant)
- Adresse
- Age (date de naissance)
- Situation familiale (isolé ou en couple)
- Personnes de confiance
- Numéro de téléphone

### 2. Calendrier
- Calendrier présentant les événements à venir
    - Événements proches
    - Événements par jour précis (sélection par un calendrier visuel)
    - Possibilité d’annuler un événement (ajout d’un délai minimum pour annulation défini par le créateur de l’événement) (améliorations possibles pour versions ultérieures)
- Système d’ajout d’événements
    - Possibilité de superposition des événements
    - Possibilité d’ajouter un événement, soumis à la validation de tous les concernés
    - Possibilité de valider un événement
    - Possibilité de refuser un événement
    - Définition d’un délai minimum pour annulation de l’événement 
- Système de rappel des événements
    - Par email ou SMS contenant systématiquement un lien hypertexte (cliquable) vers l’application (ATTENTION : l’envoi de SMS implique l’utilisation d’un service payant. Si cette fonctionnalité est adoptée, un devis sera produit et fourni par Human’App)
    - Éventuellement par notification sur les navigateurs compatibles et sous réserve d’acceptation des notifications par l’utilisateur

### 3. Contact
- Liste des contacts existant pour la prise en charge de la personne
    - Personnes de confiance (le cas échéant)
    - Médecin traitant
    - Intervenants sociaux et médico-sociaux
    - Aidants
    - Amis et relations de proximité
- Doivent apparaître les informations suivantes
    - Nom
    - Prénom
    - Qualité
    - Contact (email et téléphone)
    - Photo (optionnelle, mais recommandée pour les intervenants)


### 4. Notes personnelles
Les notes personnelles sont laissées sur le profil d’un bénéficiaire par ses intervenants ou par lui-même et concernent ses habitudes ou des détails importants à transmettre.
- Les notes personnelles doivent être consultables par tous les intervenants d’un même bénéficiaire
- Les notes personnelles doivent être consultables par le bénéficiaire qu’elles concernent
- Les notes personnelles peuvent être supprimées par le bénéficiaire qu’elles concernent, ceci à la responsabilité du bénéficiaire (avec confirmation de suppression) (un délai de suppression effective sera ajouté dans une version future)
- Une note personnelle peut être supprimée par l’utilisateur qui en est à l’origine
- Peuvent figurer dans les notes personnelles les données suivantes
    - Notes sur l’intervention réalisée
    - Habitudes et usages du bénéficiaire
    - Problématiques particulières du bénéficiaire
    - Autres problèmes engendrés par l’état de la personne et utiles à connaître par les autres utilisateurs (intervenants, entre autres utilisateurs liés)
- Ne doivent **PAS** figurer dans les notes personnelles les données suivantes
    - Informations à caractère médical
    - Données sensibles
    - Données ne relevant pas du cadre d’utilisation de l’application (voir charte d’utilisation)


### 5. Exercices
À intégrer dans le cadre du développement de l’application
- Les exercices favorisent le maintien des capacités cognitives
- Les exercices seront soumis à approbation de la mairie de Fresnes avant intégration à l’application

## RESSOURCES EXISTANTES
Possibilité de tester l’application sur un échantillon de personnes repérées bénéficiant déjà de services proposés par la mairie de Fresnes

## CONTRAINTES
- Évaluer des tarifs de la plateforme Google Firebase dans le cas d’une “utilisation normale” (à définir entre Human’App et la mairie de Fresnes)
- Définir un interlocuteur pour la maintenance technique
    - Il doit être familier des technologies suivantes
        - Google Firebase
        - Framework Angular de Google
    - Il bénéficiera d’une présentation faite par Human’App quant à l’administration de l’ensemble des moyens employés lors du développement de l’application
- Human’App proposera un design de chaque fonctionnalité de l’application avant d’en réaliser le développement afin de s’assurer de l’adéquation des intentions
