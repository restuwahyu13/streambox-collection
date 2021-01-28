## BUILD STAGE ONE

FROM node:14-alpine as streambox-collection
COPY package*.json \
  .editorconfig \
  .gitignore \
  .npmignore \
  .prettierrc \
  .travis.yml \
  config.ts \
  jest.config.ts \
  Makefile ./
COPY ./ /app
RUN apk add make \
  && make install

## BUILD STAGE TWO

FROM streambox-collection
COPY --from=streambox-collection ./ /app
WORKDIR /app
RUN make build