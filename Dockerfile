## BUILD STAGE ONE

FROM node:14-alpine as grpc-message
WORKDIR /app
COPY package*.json \
  .coveralls.yml \
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

FROM grpc-message
WORKDIR /app
COPY --from=grpc-message ./ /app
RUN make build