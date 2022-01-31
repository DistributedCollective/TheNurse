
# The thenurse Stack
* [KNEx.js](http://knexjs.org/)
* [NEST.js](https://nestjs.com/)
* [NExT.js](https://nextjs.org/)
* [TS](https://www.typescriptlang.org/)

* [GraphQL](https://graphql.org/)
* [Docker](https://www.docker.com/)



## Getting started
* Clone this repo and `cd` into it

Only needed to be run first time: 

```bash
$ docker network create traefik-public
$ docker network create thenurse-dev
```

```bash
`rm -rf client/dist && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -V --force-recreate`
```

Note: The `rm -rf client/dist` part is needed (for now, until we have a better solution) for deleting the files  nextjs generates.

Go to http://localhost:8080/api/migrate to have the latest migrations applied.
Go to http://localhost:8080/signup and create your first user.


## Debugging tips & tricks

* You can run just a service from the stack (for example if you want to connect to DB from some external GUI client), you can do it like this: `rm -rf client/dist/ && docker-compose -f docker-compose.yml -f docker-compose.dev.yml run  --service-ports postgres` - make sure you expose the service ports to the host using the [ports directive](https://docs.docker.com/compose/compose-file/#ports)

## Docker & docker-compose cheatsheet

### Docker image re-building from scratch
There are moments in the dev/test flow when the docker images need to be rebuilt (after installing new packages for example). AAdding the `--build` parameter to the docker-compose command will usually be enough. For example:

`rm -rf client/dist/ && time docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build --abort-on-container-exit --renew-anon-volumes --force-recreate`

When that's not enough, try one of the things below.

### Docker caching
Docker can be surprising at caching stuff. Caching anonymous volumes was totally unexpected for me. 

Read the docs of all the commands that you intend to run on your systems, because these **can and will have side effects** on your systems!

Here are some commands that clear all kind of caches:

* `docker system prune` - this might take a while, because it says it clears everything.
* `docker rmi $(docker image ls -a)` - tries to remove all the local images.

### Documentation

There is some [frontend](https://github.com/DistributedCollective/TheNurse/thenurse/tree/master/client) / [backend](https://github.com/DistributedCollective/TheNurse/thenurse/tree/master/server) documentation written so you can debug things more thoroughly when they don't go as expected.