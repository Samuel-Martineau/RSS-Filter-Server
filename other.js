class XMLParseError extends Error {
  code = 'XMLPARSEERROR';

  constructor() {
    super();
  }
}

module.exports = { XMLParseError };
