const PORT = process.env.PORT || 5000;
const ERROR_CODES = {
  invalidFeedURL: 'feedURL must be an absolute URL',
  invalidRSSFile: "feedURL isn't a valid RSS file",
  feedURLNotFound: 'feedURL address not found',
  internalServerError: 'internal server error',
};

module.exports = { PORT, ERROR_CODES };
