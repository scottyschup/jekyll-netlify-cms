## Midwest Access Coalition site

### How to contribute:

* Fork or clone the repo
```
git clone https://github.com/MidwestAccessCoalition/firebase_site.git
# or if you have an ssh key set up with Github:
git clone git@github.com:MidwestAccessCoalition/firebase_site.git
```
* Install gem dependencies
```
bundle install
```

* Install firebase CLI tools (if you don't already have them)
```
npm update
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
firebase login
```
If you don't have the login credentials, contact nicole@midwestaccesscoalition.org to receive them through LastPass.

If you don't have LastPass installed, you can do so [here](https://lastpass.com/misc_download2.php).
```
firebase serve
```
If you run `firebase serve` and get this error message: `Error: Unable to authorize access to project mac-site`, then try running `firebase use --add` and select `mac-site` when prompted. If `mac-site` doesn't appear as an option, then contact <nicole@midwestaccesscoalition.org>.

## Deploy
```
firebase deploy
```
This will deploy whatever branch you're on locally to production.

Navigate to {{url}}
