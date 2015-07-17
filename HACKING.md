# Hacking Howtos

## How to update help text or labels on overview numbers

The big block the greet visitors with some numbers are modified from [``dashboard/src/scripts/utils/UIUtils.js``](https://github.com/okfn/spend-publishing-dashboard/blob/master/dashboard/src/scripts/utils/UIUtils.js)

In it there's a function called ``makeOverview`` which defines the items for both the main page as well as the publisher page. Adding a ``help`` key/value to the definition object will create a question mark with a toolbar.

## Howto update columns for the tables

The order, labels and help text for the table is defined for each of the pages, [``dashboard/src/scripts/components/pages/Main.react.js``](https://github.com/okfn/spend-publishing-dashboard/blob/master/dashboard/src/scripts/components/pages/Main.react.js) and [``dashboard/src/scripts/components/pages/Publisher.react.js``](https://github.com/okfn/spend-publishing-dashboard/blob/master/dashboard/src/scripts/components/pages/Publisher.react.js)

The ``render`` function of the main React class in each of these defines a variable called ``_columns`` which is an array defining the order of the keys in objects that can also include labels and help text.
