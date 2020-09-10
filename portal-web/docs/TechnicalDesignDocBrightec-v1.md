# Technical Design Doc

[Technical Design Docs at Brightec - Primer](https://docs.google.com/a/brightec.co.uk/document/d/1_t4GfTz8Nr3WHs2Hleeb3ek-pcx5o-LrH7IKj_spKVw/edit?usp=sharing)

You should be familiar with this primer before you read, or write, Brightec design docs. If you haven’t read the primer before, please take a look before reading this design doc.

## Contents

+ [Motivation](#motivation)
+ [Objective](#objective)
+ [Supporting Documents](#supporting-documents)
+ [Scope](#scope)
+ [Discovery](#discovery)
+ [Architecture](#architecture)
+ [Detailed Design](#detailed-design)
	- [Technologies & Frameworks](#technologies--frameworks)
	- [Testing](#testing)
+ [Cross-Cutting Concerns](#cross-cutting-concerns)
	- [Accessibility](#accessibility)
	- [Releases](#releases)
+ [Miscellaneous](#miscellaneous)
	- [References](#references)
	- [Other concerns](#other-concerns)

## Motivation

Portal Policies was commissioned by Natterbox to alleviate the rest of their team as they are trying to get another project finished.

## Objective

Portal Policies is a self contained piece of work rebuilding an existing tool that Natterbox has. Policies define the route that calls take which the client defines and manages.

Each policy has a start point (defines how a call comes into the policy) and an end point (how to end the call). In between these points are different components which take up define how the call is dealt with. 
 

## Supporting Documents

[API dos](https://sapien.stage.redmatter.com/v1/api/doc/)

[Sandbox](https://portal.natterbox-qa01.pub/graphql) (if we have been given access)

[Designs](zpl://project?pid=5e46881df92555aefc607f29)

## Scope

We are only developing the policies feature. 
### Product Roadmap

This is a rough roadmap as defined by Sam from Natterbox: 

- Get the policy list/browser page operating : https://app.zeplin.io/project/5e46881df92555aefc607f29/screen/5ec3eee0824fd12f625f777c
- Get the blank policy page in place, with the ability to save an empty policy to the backend : https://zpl.io/VQX56p9
- Get the support in place for the “Add Starting Point” entry option, we may break this up into a story for each option (Add Inbound Numbers, Add Extension... etc)
- Get the UI support in place for the right hand Features panel, with just the placeholders
- Get support for the Finish component - this gives something to connect to and actually allows us save “finished” policies : https://zpl.io/VOw9yvX
- Get the support for the ability to connect and disconnect components
- Then plug in the rest of the components one by one
- Tackle the Archiving / Version feature once the API supports it - I just realised this will need a design, I’ll mark it on the TODO list, no urgency considering on it
- Tackle the Permissions feature once the API supports it : https://zpl.io/29xEq5A
- Job done, have a virtual pint!”

## Discovery

The project uses [GraphQL](https://graphql.org/) and [Apollo](https://www.apollographql.com/docs/react/), it would be a good idea to be familiar with them before starting

## Architecture

We should aim to match the project's current patterns - potentially MVC but still unsure. GraphQL handles the data models and requests to the API (via a LazyQuery) thus no need for a repository pattern.

In order to run the project you first need to clone the [portal-api project](https://bitbucket.redmatter.com/projects/PORTAL/repos/portal-api/browse) using the Natterbox vpn. Then run the local server following the instructions in the readme.

## Detailed Design

### Technologies & Frameworks

The project uses Typescript and React. 

### Testing

We should aim to write small unit tests to test the features that we add to ensure that we everything works as expected. We should follow the given-when-then testing strategy. 

## Cross-Cutting Concerns


### Releases

We have agreed to push to their bitbucket repo regularly, the development flow will look like this: 
- Develop against the repo in the Brightec github following our usual process of small PRs.
- Once a Jira task is complete we will push our changes to a feature branch on their bitbucket and open a PR assigning either Jack or Sukesh to review. The commit message must follow this regex:
```
^(?:[^\r\n]{10,72})(?:$|(?:\n|\r\n)+$|(?:\n|\r\n){2}(?:[\s\S\w\W]*)$)
``` 

This means "the first line must be between 10 and 72 characters long, followed by 2 carriage returns, followed by any further descriptive text." This is most likely to ensure the PR title is not truncated.

## Miscellaneous

### Other concerns

We are using their Jira board and logging time against that board.

There will be a weekly backlog grooming session on Wednesdays.

You will need auth01 credentials to develop this product. Rhys (available in Lastpass just in case) and Steve current have credentials. 

We only have to support Chrome. 