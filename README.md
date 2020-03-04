# inventory-management-rn
react-native project for inventory management app

<p>
 
  master :
  <a href="https://travis-ci.com/djunicode/inventory-management-rn">
    <img src="https://travis-ci.com/djunicode/inventory-management-rn.svg?branch=master" alt="master build status" />
  </a>

 prod:
  <a href="https://travis-ci.com/djunicode/inventory-management-rn">
    <img src="https://travis-ci.com/djunicode/inventory-management-rn.svg?branch=prod" alt="prod build status" />
  </a>
 
</p>

# Contribution Guidelines

1. Fork this repo
2. Clone your forked repo `git clone`
3. Add the main unicode repo as upstream `git remote add upstream {url}`
4. Make your changes and push to your(forked) repo.
5. Create a pull request from github to main unicode repo.

To get some changes from unicode repo `git pull upstream`

__*NOBODY SHOULD DIRECTLY PUSH TO THE UNICODE REPO.*__

There will be 2 branches
- master
- prod

_Apart from the 2 branches above you can create as many branches as you want._

__*NOBOBY SHOULD MAKE PULL REQUEST TO MASTER BRANCH. All changes should be made to prod.*__


# Folder structure
```
src
 |- screens (screen lvl components)
 |- controllers (business logic)
 |- config (configuration file e.g colors etc)
 |- components (helper components)
```

_Apart from this you can create any folders if you want._

