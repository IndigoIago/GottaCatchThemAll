
# CatchEmAll
Meet interesting new people, capture them, and enjoy the social web you deserve.


## Team

  - __Product Owner__: Aaron Melocik & Jim O’Brien
  - __Scrum Master__: Iago Wandalsen-Prates
  - __Development Team Members__: Wesley Pascual

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- AngularJS


## Development

### Installing Dependencies
You’ll need to have some things installed:
<a href=http://nodejs.org/>NodeJS</a>
<a href=http://www.mongodb.org/downloads>MongoDB</a>


Run these to ensure your globals are up-to-date:
```sh 
sudo npm install -g yo      // for yeoman generators
sudo npm install -g bower   // for bower package management
sudo npm install -g nodemon // for nodemon server refreshing
sudo npm install -g generator-angular // ?????
sudo npm install -g generator-angular-fullstack // for yeoman fullstack generator
sudo npm install -g express??? 
```

We’ll install the MEAN stack from the <a href=” https://github.com/DaftMonk/generator-angular-fullstack“>canon instructions</a>:

```sh
mkdir my-new-project && cd $_ // create and CD into new dir
```

```sh
yo angular-fullstack CatchEmAll // run the yeoman generator with app name
```

Now is a good time to start running the ```shmongod``` process.
Next, you can run:
```sh
grunt              // for building
grunt serve        // for preview
grunt serve:dist   // for preview of the built app
```

##MORE TO COME, including SUPPORTED CONFIGURATIONS (Jade, Sass, ngRoute, Facebook oAuth… This can all be done in a yeoman install!##
```sh
```


From within the application directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

