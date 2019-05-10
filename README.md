## Zendesk Data Search CLI Tool

![build](https://api.travis-ci.org/JeanMarcGoepfert/search.svg?branch=master) [![codecov](https://codecov.io/gh/JeanMarcGoepfert/search/branch/master/graph/badge.svg)](https://codecov.io/gh/JeanMarcGoepfert/search)

### Running

**Docker:**

1. [Install Docker](https://www.docker.com/get-started)
2. Build the image: `docker build --tag zen .`
3. Run `docker run -it zen node ./`

**Locally:**

1. Install node v10.15.3 ([NVM can be used to manage node versions](https://github.com/nvm-sh/nvm))
2. Install dependencies with `npm install`
3. Run `node ./`

Type `exit` to exit at any time

Type `help` to get help for current step

### Run Tests

`npm run test`

### Run Code Coverage Report

`npm run coverage`

### Run Linter

`npm run lint`

### Approach Taken

At a high level, the search is implemented in memory using seperate [inverted indexes](https://en.wikipedia.org/wiki/Inverted_index) for each dataset, the indexes are keyed by field name and string value, each string value key contains a list of numbers representing the indexes of the matching rows in the original datasets.

For a user dataset:

```
users = [
  {id: "1", name: "john"},
  {id: "2", name: "jane"}
]
```

the following index is created:

```
DB: {
  users = {
    id: {
      "1": [0],
      "2": [1]
    },
    name: {
      "john": [0],
      "jane": [1]
    }
  }
}
```

Given the data model ("users"), the field ("name"), and the search value ("john"), we can get a reference to all matches for that value with a space complexity of O(1).

`DB["users"]["name"]["john"]` results with: `[0]`

All matching items can then be looked up by index in the original dataset, which is also stored in memory:

`users[0]` results in `{id: "1", name: "john"}`

**Related Data**

The same concept as above is reused to get related data.

Given the following related data sets:

```
users = [
  { name: "john", organization_id: "1" },
]
organizations = [
  { id: "1", name: "zendesk"}
]
```

Which results in the following indexes:

```
DB: {
  users: {
    name: { "john": [0] },
    organization_id: { "1": [0] },
  },
  organizations: {
    id: { "1": [0] },
    name: { "zendesk": [0] }
  }
}

```

We get our matches given the model, field, and value:

`DB["users"]["name"]["john"]` which results in `[0]`

Which we use to lookup the original dataset:

`users[0]` which results in `{name: "john", organization_id: "1"}`

For this result, we query on the organizations index with the foreign key value we now have ("1") and the known primary key of organizations (
"id"):

`index["organizations"]["id"]["2"]` which results in `[{id: "1", name: "zendesk"}]`

We then combine this data and return it to the consumer as something like:

```
{row: {name: "john", ...},  related: {organizations: [{name: "zendesk", ...}]}
```

### How it works

The app is split into 2 primary parts, the data layer, and the presentation layer.

On initialization, the JSON files are read into memory, and a seperate object is created for each set (user, orgs and tickets).

On creations, the objects store the original dataset (in memory), and generate and store (in memory) an inverted index (as described above) of their dataset.

The presentation layer is then initialized, which prompts the user for:

- The search type (users, orgs, or tickets)
- The field to search on (name, description, etc)
- The value to search for

Based on the users responses to these prompts, the object matching the search type looks up it's index with the given field and value, which will return a list of matches. We then iterate over the list of matches and query the other objects with the relevant primary/foreign key combos (as shown above).

We then print the results, and re-initialize the prompt recursively.

### Trade Offs

**Simplicity for Speed**

A more straightforward approach to the data layer would have been to simply filter through the entire dataset every time a user does a search. I opted away from this as I don't believe this would scale well from a performance point of view as the dataset grows larger.

**Memory for Speed**

This approach not only stores all the original datasets in memory, but also a seperate index structure for each dataset. Being a command line tool, the target audience of this app will likely be using relatively modern computers, however given enough data, this would eventually become a problem. Some optimizations could be made, such as writing each inverse tree to disk on initialization, and loading only the relevant data on each search, but I feel the current approach can get a lot of mileage before further optimizations are necessary.

### Screenshot

![Imgur](https://i.imgur.com/bTOT3Bx.png)
