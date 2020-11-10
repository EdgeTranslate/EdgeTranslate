# Contributing to Edge Translate

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

## How to get started

- Fork the repository and run `npm install`.
- Read project document in [wiki](../../wiki/document)
- Read [project](../../projects/2), select a target in 'next version todo'
- Start a pull request to EdgeTranslate

## develop build

develop build for chrome: `npm run dev:chrome`

develop build for firefox: `npm run dev:firefox`

## production build

production build for chrome: `npm run build:chrome`

production build for firefox: `npm run build:firefox`

## pack to .zip file

chrome: `npm run pack:chrome`

firefox: `npm run pack:firefox`

## Testing

`npm run test` to run test.

## Branch strategy

`master`: only contain stable code of the project

`develop`: the only branch to develop. All of new commits should be pushed to this branch and then merged to `master` branch when they're stable.

`fftf`: It maintains a version only for firefox browser without Google Analytics and webpage translation because of the security policy of firefox addon store.

**Before pushing your local repository, please pull rebase first to avoid explicit branch merge on single branch.**

We use [commitizen](https://www.npmjs.com/package/commitizen) to normalize our commit records. So before you commit your local change, install `commitizen` globally through the command `npm install commitizen -g`. Then, you can commit through the command `git commit`. **Hint**: your commit messages must meet the requirement of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) or you are unable to commit successfully.

