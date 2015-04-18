# Spend Publishing Dashboard

[![Build Status](https://travis-ci.org/okfn/spend-publishing-dashboard.svg)](https://travis-ci.org/okfn/spend-publishing-dashboard)
[![Coverage Status](https://coveralls.io/repos/okfn/spend-publishing-dashboard/badge.svg)](https://coveralls.io/r/okfn/spend-publishing-dashboard)

Spend Publishing Dashboard provides access to, and displays statistics on,
a collection of published data. This collection of data is logically related:
for example, data published by a single government department, or a group
of departments.

## Demo

We have an example dashboard deployed with dummy data:

[Example Spend Publishing Dashboard](example.dashboards.okfnlabs.org/)

## Get started

```
# get the code
git clone https://github.com/okfn/spend-publishing-dashboard.git .

# install the dependencies
npm install

# run the server
gulp

# deploy the app
gulp deploy
```

Read on for details.

## Application

The dashboard is a client-side application that hooks up to a static data repository
for its data.

Everything is written in Node-style CommonJS, and the distributed code is
transformed with browserify. This is an automated process, just run `gulp`
and the magic happens.

The code is developed using the [Flux](http://facebook.github.io/flux/)
application architecture. That means it implements a [unidirectional data flow](http://facebook.github.io/flux/docs/overview.html#structure-and-data-flow)
, and uses [React](https://facebook.github.io/react/) for the view layer.

### Local development

Use `gulp` to manage your local workflow.

### Remote deployment

Use `gulp deploy` to push the `dist/*` directory to GitHub Pages.


## Data

All dashboard data is stored in CSV files (with an additional configuration file
located with the data is in JSON). This data is located "elsewhere": any
publicly-accessible flat file storage or git server will do.

Currently, we are managing dashboard data in git repositories on GitHub,
which gives easy access to the files, and enables a version history of the data.

We then access that data via [RawGit](https://rawgit.com/), which provides a proxy
in front of GitHub with additional headers (including CORS, which we require).

RawGit works automatically with any GitHub repository. You do not need to do anything
except replace the GitHub domain with the RawGit one.

For example:

* https://**github.com**/okfn/spd-data-example/master

becomes:

* https://**rawgit.com**/okfn/spd-data-example/master

Data for a Spend Publishing Dashboard can be generated in any way, as long
as it conforms to the schema that is in use. At this stage of development,
there is not extensive documentation on the schema.

To learn more, please see the [SPD Example Data Repository](https://github.com/okfn/spd-data-example)
and the [SPD Admin CLI](https://github.com/okfn/spd-admin) that we use to run
statistical data over a set of publishers/data sources.
