## Midwest Access Coalition site

### How to contribute:

* Fork or clone the repo
```sh
git clone https://github.com/MidwestAccessCoalition/firebase_site.git
# or if you have an ssh key set up with Github:
git clone git@github.com:MidwestAccessCoalition/firebase_site.git
```
* Install gem dependencies
```sh
bundle install
```

* Install firebase CLI tools (if you don't already have them)
```sh
npm install -g firebase-tools
```

* Create feature branch
```
git checkout master
git pull
git checkout -b YOUR_BRANCH_NAME
```
* When ready to merge to master, open a PR [here](https://github.com/MidwestAccessCoalition/firebase_site/compare) by selecting `master` as the base branch and your feature branch as the compare branch.
* Report new issues [here](https://github.com/MidwestAccessCoalition/firebase_site/issues/new).

## Local dev
```
firebase serve
```

## Deploy
```
firebase deploy
```
This will deploy whatever branch you're on locally.

Navigate to {{url}}
