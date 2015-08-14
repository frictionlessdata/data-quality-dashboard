---
layout: page
title: About
---

The Spend Publishing Dashboard tracks the timeliness and quality of the spend data published by UK Government Departments and Local Authorities as part of their transparency commitments.

Based on the analysis of several thousand individual data files published by more than thirty departments, it provides a simple and easy to understand overview of performance on key metrics such as:

* Timeliness: are departments publishing data (at all) and doing so in a timely manner?
* Quality: are departments publishing "good" data, that is, well structured and in the standard, prescribed format?

The goal of the dashboard is to support (and drive) improvement in the quality of expenditure data published by government entities -be it local authorities, departments or others. Specifically, it aims to:

* Enable policy-makers and public able to see how departments and local authorities are performing against mandated publication requirements
* Allow identification of best-practice (and worst-practice) for learning and improvement
* Provide a starting point for those looking to acquire and consolidate data for their own work and analysis (for example, we have a list of the nearly 12,000 spend related files published by UK government departments)

As part of the development of the dashboard we have also created various related tools including an [online service "GoodTables"][goodtables] that allows users to check the quality of their spend data files (CSV or XLS files) by validating them against existing government recommendations such as HMT recommendations for Departments and the Local Government Transparency Code.

[goodtables]: http://goodtables.okfnlabs.org/

## Background

The UK leads the world in terms of the publication of [open data][od] on public finances. Fiscal transparency and provision of open data in this area are seen as central to the government's transparency and open data strategy, helping to promote government efficiency and effectiveness and empowering citizens with an understanding of where their tax money goes.

Data is published on spending at both the national and the local level along with related budgetary and financial data. Specifically, the Government requires regular publication of detailed, transactional, expenditure information by departments and local authorities - that is, information on all individual spending items from monthly mobile phones contracts to major software systems.

At the national level, information on expenditure over £25k is one of the few mandated datasets that Departments must publish. Similarly at the local level, the [Local Government Transparency Code][transparency-code] requires publication of spending over £500 on a quarterly basis. Specifically paragraph 19, requires publication of itemised spending over £500 on a quarterly basis on items such as individual invoices, grant payments, expense payments, payments for goods and services, rent, credit notes over £500, and transactions with other public bodies. Paragraph 42 recommends - but does not mandate - extending this to publishing on a monthly basis covering all items over £250 and including the total amount spent on remuneration over the period, as well as classifying expenditure using the Chartered Institute of Public Finance and Accountancy Service Reporting Code of Practice to enable comparability between local authorities.

[transparency-code]: https://www.gov.uk/government/publications/local-government-transparency-code-2014

[od]: http://okfn.org/open

## The Problem

However, whilst the volume of data being is impressive the quality is often less so. Poor quality data greatly reduces the usability and value of the data released - for business, for researchers, for journalists, for citizens and for government itself. Specific quality issues include:

* Format: Data is frequently not provided in the recommended format - in fact, data even from the same source is often published in a variety of formats and structures spread over many files. For example, the GLA publishes their spend data in over 65 different CSV files which between them are formatted in nearly 30 different ways! This means that any user of the data must spend, literally, several days cleaning this data up in order to have a single consolidated set of data.
* Timeliness: expenditure data is often not published by departments or local authorities on a timely basis. For example, the UK Departmental Spending Report on data.gov.uk shows that less than 15% of departments have published up to date spending data and some departments are more than 6 months out of date. This obviously substantially reduces the value of the data to many potential users both inside and outside government.
* Missing “codings”: most interesting uses of spending data involving aggregating individual transactions by particular attribute - for example, calculating how much was spent with a given supplier involves summing all transactions with a particular supplier or calculating spend on training would involve summing all transactions coded as being related to training. However, many published datasets lack reliable codings. In particular, most spend data does not identify suppliers with a unique identifier such as a company number even within a single data file (let alone across data files from different publishers). Similarly, most spend data does not include any useful classification of transactions such as a code from a chart of accounts or a project code (such as included in HMT PESA data). This means data users must engage in the laborious (and error-prone) task of normalising and enhancing data (for example, attempting to correct variant spellings of the same company name or adding classifiers to expenditure).
* Unconsolidated: data is published in individual files on a monthly or quarterly basis per department or local authority. However, most uses of the data involve access to more consolidated data (for example, one wants to see spending over a period of time (rather than for just one month) or to compare across departments or authorities).

Lastly, though not a data quality issue in the narrow sense, we would add:

* Usability: many (potential) users of spending data will struggle when presented with a simple page containing dozens of CSV files. Providing a simple browser and/or visualisations of the spend data is not hard to do and would greatly enhance the usability of the spending data to a large set of actual or potential users including policy-makers and citizens (whilst also encouraging people who wanted to dig deeper into the raw data to do so). Note: provision of these kind of interfaces is often directly dependent on resolving the previously mentioned quality issues (e.g. you can’t provide a useful visualisation without consolidated data that has useful codings).

## The Dashboard

We need to drive and support improvements in the quality and usability of spending data. This Spend Publishing Dashboard is

In particular, the Spend Publ
exists to provide a simple and easy-to-understand overview of how 

Like all good simple visual representations it is based on large amounts of behind the scenes work.



## FAQs

### Is the project free/open-source

Yes, all code is free/open-source software and is published 

### Is the data open?

Yes, all the data we have produced including a database of all spending files and their quality is open and published online.

### Why are local authorities not included?

We intend to cover local authorities spend data publication. However, unlike departmental spending which is centralized on data.gov.uk and easily locatable due to consistent tagging, local authority spending is spread across hundreds of local authority websites in the UK. Tracking down the thousands of different data files ultimately has proved too resource intensive for our limited funding. However, it is something we are focused on for the future.


