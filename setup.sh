#1. create monorepo
npx create-turbo@latest

#2. create workspaces (packages)
cd packages 
mkdir foundation && cd foundation && yarn init -y
yarn create stencil

#3. create workspaces (apps)
cd apps 
yarn create vite docs --template vanilla-ts
npx sb init --builder @storybook/builder-vite --type html








## add foundation package
cd packages && yarn create vite foundation  --template vanilla-ts
cd foundation &&  yarn add -D sass


## create vite.config.js

# import { defineConfig } from 'vite';
# export default defineConfig({
#   build: {
#     rollupOptions: {
#       input: {
#         foundation: 'main.scss',
#         colors: 'styles/colors.scss',
#       },
#       output: {
#         entryFileNames: 'mds_[name].css',
#         chunkFileNames: 'mds_[name].css',
#         assetFileNames: 'mds_[name].[hash].css',
#       },
#     },
#   },
# });

## add stencil app
cd apps  &&  yarn create stencil  #component type
cd ui-stencil && npx sb init --type html  ## add storybook
## add this lines to .storybook/preview

# import { defineCustomElements } from '../loader';
# defineCustomElements();

