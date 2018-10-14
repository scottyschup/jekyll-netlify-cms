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

## Local dev cycle
```
firebase login
```
If you don't have the login credentials, contact nicole@midwestaccesscoalition.org to receive them through LastPass.

If you don't have LastPass installed, you can do so [here](https://lastpass.com/misc_download2.php).

To run the firebase app locally:
```
# If you just need to view the site locally run
npm run serve

# Else if you plan on making changes to the site and want to see your changes update automatically, run the following and leave it open
npm run dev
```
If you see this error message: `Error: Unable to authorize access to project mac-site`, then try running `npm run add` and select `mac-site` when prompted. Give the project the alias "default".

If `mac-site` doesn't appear as an option, then contact <nicole@midwestaccesscoalition.org>.

## Deploy
To deploy to production, run:
```
npm run deploy
```
This will deploy whatever branch you're on locally to production. If this fails and mentions something about database rules, it likely means you don't have write access and should contact <nicole@midwestaccesscoalition.org>.

* Local URL: http://localhost:5000/
* Firebase URL: https://mac-site.firebaseapp.com

You can access the Firebase console at https://console.firebase.google.com/u/0/project/mac-site/overview.

The corresponding info for the development and staging environments is as follows:

### Development
* Deploy command: `npm run dev-deploy`
* URL: https://dev-site-9bb74.firebase.com

### Staging
* Deploy command: `npm run staging-deploy`
* URL: https://staging-f8acb.firebase.com

#### Love letter to Scott, from Scott
Dear Scott,  
As much as you may want to, do not remove the spaces between the two config files in each of the build commands in `package.json`. I.e.
```js
// GOOD
"build:dev": "bundle exec jekyll build --config _config.yml,config/development.yml"

// BAD
"build:dev": "bundle exec jekyll build --config _config.yml, config/development.yml"
```
I know you really want to change it. But leave it alone, man. It will break everything if you don't.

❤️,
Scott
