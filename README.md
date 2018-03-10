# TODO MVC… with Ember.js 3.1 and TypeScript and decorators!

Let's learn how to use TypeScript in an Ember.js app!

## Prep

To make the workshop go as smoothly as possible and avoid as many hiccups as we can (especially given that conference WiFi can be spotty!), we have a few requests for some ahead-of-time setup!

### Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/en/)

### Task 1: Clone the app and install the dependencies:

```sh
$ git clone https://github.com/chriskrycho/emberconf.git
$ cd emberconf
$ git checkout setup
$ yarn install
```

Make sure you check out the `setup` tag before doing yarn install!

### Task 2: Editor Setup

You’ll also want your editor configured with TypeScript support. You should follow the setup instructions provided for your editor [on the Official TypeScript Wiki](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support). I (Chris) have managed to get them going fairly well following the links there even for the editors I don’t use myself, so thing should be pretty smooth for you, assuming you already know how to set up plugins in your editor or IDE of choice.

For VS Code, JetBrains IDEs, and Sublime Text, there are project files you can open directly in the root of the Git repository. The VS Code project file will also prompt you to install a set of helpful addons for doing Ember.js development.

(Note that we're not familiar enough with the setups for Vim or Emacs to be much help there, but between the three of us we have used each of Atom, VS Code, Sublime Text, and the JetBrains IDEs enough to help a little if something weird comes up during the course of the workshop.)

That’s it! Have the project and its dependencies set up and an editor ready, and you’ll be ready to go.
