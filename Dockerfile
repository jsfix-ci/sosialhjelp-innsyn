# FIXME: Replace with "node" (latest) when https://github.com/nodejs/node/issues/29239 is resolved
FROM node:12.9.0 as node-builder
ADD / /source
WORKDIR /source

ENV CI=true

RUN npm ci && npm run test && npm run build

FROM navikt/pus-decorator
ENV APPLICATION_NAME=sosialhjelp-innsyn
ENV HEADER_TYPE=WITH_MENU
ENV FOOTER_TYPE=WITHOUT_ALPHABET
ENV CONTEXT_PATH=/sosialhjelp/innsyn/
COPY --from=node-builder /source/build /app
