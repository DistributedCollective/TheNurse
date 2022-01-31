We are using a custom docker image for playwright because the [official image from microsoft](https://hub.docker.com/_/microsoft-playwright) ([github repo](https://github.com/microsoft/playwright/blob/master/docs/docker/Dockerfile.bionic)):
- comes with an older node version (12)
- we couldn't make the browser actually start

# Testing setup & configuration
We have a dedicated docker container for running the e2e tests (the one in folder e2e_tests). Even though this container has `depends_on: client`configured in `docker-compose.test.yml`, we are [not guaranteed the app from the client instance is fully started](https://docs.docker.com/compose/startup-order/) so we do the extra check in the `docker/entrypoint.sh` file using `curl`.

Jest hangs in Docker, while it works when ran on the host machine. Trying [this solution](https://stackoverflow.com/questions/48846142/jest-hangs-indefinitely-runs-no-tests).

Seems we have to add these options to `jest-playwright.config.js`:
```
launchOptions: {
  // chromiumSandbox: false,
  headless:  true

  }
```
Still not working, trying the fixing [steps from puppetteer](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker)

It looks like we're not able to make the collect coverage work for UI from a different container. That's because the source code is not available in the runner container. The UI code is instrumented, but it seems to me right now that nyc needs the source code to be able to generate the coverage report. Have a look at [this git tag](https://github.com/DistributedCollective/TheNurse/thenurse/releases/tag/e2e-dedicated-container-not-working) if you want to try and make it work.

# Github actions