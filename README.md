# smtable-react 📊

[![npm version](https://img.shields.io/npm/v/smtable-react.svg)](https://www.npmjs.com/package/smtable-react)
[![License](https://img.shields.io/npm/l/smtable-react.svg)](https://github.com/samiNedjai/smtable-react/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/samiNedjai/smtable-react.svg)](https://github.com/samiNedjai/smtable-react/stargazers)

**smtable-react** est un composant React de tableau simple et personnalisable avec tri, pagination et sélection du nombre de lignes. 🚀

---

## ✨ **Caractéristiques**
✔️ **Tri des colonnes** (ascendant / descendant)  
✔️ **Pagination dynamique**  
✔️ **Sélecteur du nombre d’entrées affichées**  
✔️ **Facile à intégrer avec des données JSON**  
✔️ **Léger et performant**  

---

## 📦 **Installation**
Ajoute **smtable-react** à ton projet avec npm ou yarn :

```sh
npm install smtable-react
# ou
yarn add smtable-react
```
## 📌 Utilisation

Voici un exemple simple pour afficher une modale :

```jsx
import React from "react";
import Table from "smtable-react";

const columns = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email" }
];

const data = [
  { firstName: "John", lastName: "Doe", email: "john@example.com" },
  { firstName: "Jane", lastName: "Smith", email: "jane@example.com" }
];

export default function App() {
  return (
    <div>
      <h2>Employee List</h2>
      <Table columns={columns} data={data} pageSizeOptions={[5, 10, 20]} />
    </div>
  );
}
```
## 📌 Props disponibles

| Props           | Type   | Description                                      | Défaut      |
|----------------|--------|--------------------------------------------------|-------------|
| **colum**      | `Array` | Liste des colonnes du tableau (`id`, `label`)   | `[]`        |
| **data**       | `Array` | Données à afficher dans le tableau              | `[]`        |
| **pageSizeOptions** | `Array` | Options de taille de page pour la pagination | `[5, 10, 20]` |

## 📌 Prérequis

Avant d'utiliser **smtable-react**, assure-toi d'avoir :

- **Node.js** : >= 18.0.0
- **React** : >= 19.0.0
- **ReactDOM** : >= 19.0.0
- **prop-types** : >= 15.0.0


## 📌 Développement

Si tu veux modifier ou contribuer au projet, suis ces étapes :

### Cloner le repo GitHub :

```sh
git https://github.com/samiNedjai/smtable-react.git
```

### Installer les dépendances :

```sh
npm install
```

### Lancer le projet en mode développement :

```sh
npm run dev
```

### Créer une version et publier sur npm :

```sh
npm version patch
npm publish
```

## 📌 Liens utiles

- **npm** : [https://www.npmjs.com/package/smtable-react](https://www.npmjs.com/package/smtable-react)
- **GitHub** : [https://github.com/samiNedjai/smtable-react](https://github.com/samiNedjai/smtable-react)
- **Issues** : [Signaler un bug](https://github.com/samiNedjai/smtabe-react/issues)

## 📌 Licence

Ce projet est sous licence **MIT**. 📜

Tu peux l'utiliser et le modifier librement ! 😊
