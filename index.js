const isAbsoluteUrl = require('is-absolute-url');
const fetch = require('node-fetch');
const express = require('express');
const nm = require('nanomatch');
const xml = require('xml2js');
const _ = require('lodash');

require('express-async-errors');
require('colors');

const { PORT, ERROR_CODES } = require('./constants');
const { XMLParseError } = require('./other');

const xmlParser = new xml.Parser();
const xmlBuilder = new xml.Builder();

const app = express();

app.get('/', async (req, res) => {
  try {
    const { feedURL, keep: rawKeep } = req.query;

    if (!feedURL || !isAbsoluteUrl(feedURL))
      return res.status(400).send(ERROR_CODES.invalidFeedURL);
    const keep = _.castArray(rawKeep);

    const feedXML = await fetch(feedURL).then((response) => response.text());
    const feed = await xmlParser.parseStringPromise(feedXML).catch(() => {
      throw new XMLParseError();
    });

    if (!feed?.rss?.channel?.[0]?.item)
      return res.status(400).send(ERROR_CODES.invalidRSSFile);

    const newFeed = _.cloneDeep(feed);
    _.remove(
      newFeed.rss.channel[0].item,
      (item) => !nm.any(item?.title?.[0] || '', keep),
    );
    const newFeedXML = xmlBuilder.buildObject(newFeed);

    res.send(newFeedXML);
  } catch (error) {
    if (error.code === 'ENOTFOUND')
      return res.status(400).send(ERROR_CODES.feedURLNotFound);
    else if (error.code === 'XMLPARSEERROR')
      return res.status(400).send(ERROR_CODES.invalidRSSFile);
    else {
      console.log(error);
      return res.status(500).send(ERROR_CODES.internalServerError);
    }
  }
});

app.listen(PORT, () =>
  console.log('Server started on port '.yellow + PORT.toString().blue.bold),
);
