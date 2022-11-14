FROM node:14.18.3

WORKDIR /api-loja-product

COPY . .

RUN yarn

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]