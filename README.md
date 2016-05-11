# Data Quality Dashboard

Data Quality Dashboard provides access to, and displays statistics on, a collection of published data. This collection of data is logically related: for example, data published by a single government department, or a group of departments.

The Data Quality Dashboard has been developed in order to display data quality information on the 25K spend data published by the UK Government. The Dashboard can be used for any published collection of data by following a few key steps.

## Local development

```
# Get the code
<<<<<<< HEAD
git clone https://github.com/okfn/data-quality-dashboard.git

# Install the dependencies
npm install

# Build the sources and run the server
npm run develop

# Just build the sources
npm run build

# Just run the server
npm run start

# View the app in your browser
open http://localhost:3000/
```

See the `scripts` section in `package.json` for more available commands.

Read on for details.

## Application

The Data Quality Dashboard is a Node.js application written in ES6, largely using Express and React.

The `app.backend` module renders the basic views (using React on the server) and is responsible for preparing the data as JSON by parsing the CSV database. It also provides some simple routes for standard pages like FAQ and About.

The `app.ui` module is a React-Redux application for displaying the data to the user.

The codebase is written in Node.js-style CommonJS, using ES6 syntax. The `app.ui` code is bundled by Browserify, and `app.backend` is transformed using Babel at runtime.

### Remote deployment

We push to Heroku, and a `postinstall` script ensures that `app.ui` is bundled before the app is served.

## Data

The Data Quality Dashboard reads data from a flat file storage, with data written to CSV and JSON. Any publicly available file storage will do, as long as the file naming and data structure of the files is consistent.

Currently, we run the database for the UK Spend Publishing Dashboard from a public repository on GitHub. This gives easy access to the files, and enables a version history of the database.

As GitHub does not support CORS, we then use a proxy that does - [RawGit](https://rawgit.com/).

When the application loads, it reads the data from the database, parses the content to JSON, and stores the new data representation as JSON. This JSON representation is accessible via an API endpoint that the frontend app uses.

To configure the database, the application needs to know the base path as a URL.

For example:

* `https://rawgit.com/okfn/data-quality-uk-25k-spend/master/data`

By default, the application expects to find at that base the following files:

* `instance.json`: Basic metadata for the instance
* `sources.csv`: The list of data sources that are assessed for quality
* `publishers.csv`: The list of publishers that produce these datasources
* `results.csv`: The results as found by SPD-Admin
* `performance.csv`: The performance as found by SPD-Admin
* `runs.csv`: A log of the results run against these resources

Of course, each of these files must conform to a certain datastructure - think of them as tables in a database. As long as you conform to the structure and expected data within that structure, it does not matter how the database is actually produced.

For how to change the database see the [Configure database](#configure-database) section.

## Schema

The Data Quality Dashboard expects the following schema.

### instance.json

A single object with the following fields:

* `name`: The name of this dashboard
* `admin`: The email address of the administrator of this dashboard
* `validator_url`: The URL to a GoodTables API endpoint (eg: `https://goodtables.okfnlabs.org/api/run`)
* `last_modified`: Time when the data was last modified. Should be updated before each database deploy.

### sources.csv

A CSV with the following columns:

* `id`: A unique identifier for this data source.
* `publisher_id`: The unique identifier of the publisher this data source belongs to.
* `title`: A title for this data source.
* `data`: The permalink URL for this data source.
* `format`: The file format for this data source.
* `last_modified`: The timestamp that indicates when this data source was last modified.
* `period_id`: The publication period of the data source.
* `schema`: The permalink URL for the schema that this data source should be validated against (if any).

### publishers.csv

A CSV with the following columns:

* `id`: A unique identifier for this publisher.
* `title`: A proper title for this publisher.
* `type`: A signifying type for this publisher.
* `homepage`: The homepage of this publisher as a URL.
* `contact`: The contact person for this publisher.
* `email`: The contact email for this publisher.
* `parent_id`: The parent publisher for this publisher (nested publishers).

### results.csv

A CSV with the following columns:

* `id`: A unique identifier for this result.
* `source_id`: The identifier for the data source in this result.
* `publisher_id`: The identifier for the publisher in this result.
* `period_id`: The publication period of this result's data source.
* `score`: The score for this result.
* `data`: The permalink URL for this result's data source.
* `schema`: The permalink URL for this result's data source schema (if any).
* `summary`: A summary of this result.
* `run_id`: The identifier of the run in which this result was generated.
* `timestamp`: The timestamp for this result.
* `report`: The base URL to a more detailed report

### performance.csv

A CSV with the following columns:

* `publisher_id`: The identifier for the publisher.
* `period_id`: The time span for the analysis.
* `files_count`: Number of files published during the above mentioned time span.
* `score`: Score for the above mentioned files.
* `valid`: How many of the above mentioned files are valid.
* `files_count_to_date`: Total number of files published up to this period.
* `score_to_date`: Score of all the files published up to this period.
* `valid_to_date`: Number of valid files from all published up to this period.

### runs.csv

A CSV with the following columns:

* `id`
* `timestamp`
* `total_score`


## Configure database

The database can be configured through the following environment variables:

* `DATABASE_LOCATION`: Base URL for the files.
* `PUBLISHER_TABLE`: Name of the file containing the publishers (relative to the DATABASE_LOCATION).

Following this pattern, you can also configure `SOURCE_TABLE`, `RUN_TABLE`, `PERFORMANCE_TABLE` and `INSTANCE_TABLE`.

## Tooling

In order to generate the result set for a Data Quality Dashboard, we build a command line utility that is designed to be run by a developer at regular intervals (as relevant for the data being assessed). This tool, [Data Quality CLI](https://github.com/okfn/data-quality-cli) is configurable to use in assessing data quality based on metrics of:

* Timeliness
* Structural Validity
* Schema Validity

Note that, like the Data Quality Dashboard itself, the CLI has currently only been tested on the UK 25K spend data.
