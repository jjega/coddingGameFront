# coding-game

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

Avant de lancer le projet, jouez les ligne de code suivante coté serveur
```bash
knex migrate:latest --env development
knex seed:run --env development 
```

Le projet ce lance sur le port 4000 Si vous souhaitez passer par un autre port, chnagez le dans le package.json