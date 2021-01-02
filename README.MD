# RSS Filter Server

> A simple web server that allows to filter RSS items from a feed on the fly

## How does it work?

It's entirely based on query parameters. Say you want to use [DistroWatch](https://distrowatch.com)'s Linux ISOs RSS feed, but you only want to keep some distros:

![syntax](./syntax.svg)

The URL is divided in three parts:

<span style="font-weight: bold; color: #0085FF;">Blue:</span> It's the URL of the server (see [Installation](#installation))

<span style="font-weight: bold; color: #8F00FF;">Purple:</span> It's the URL of the RSS feed. In this case, it's https://distrowatch.com/news/torrents.xml. Please note that it must be encoded as a URI component. In JavaScript, it's doable via [`encodeURIComponent(url)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/global_objects/encodeURIComponent)

<span style="font-weight: bold; color: #FF7A00;">Orange:</span> The filters that are applied to the title of the feed's items. There can be one or more _keep_. Each _keep_ is a blob, parsed by the [nanomatch](https://www.npmjs.com/package/nanomatch) library

## Installation

The Docker container for this project is deployed on Docker Hub, so you just need to run:

```bash
docker run -p 8080:8080 smartineau/rss-filter-server
```
