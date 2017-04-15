// file is edited by the build process to point to dev or prod value, see gulpfile.js

// dev and prod lists
const dev_AUTH0_CLIENT_ID = 'ZavYd2LZRm8iF1TH3iE4Hu76XYeh7OH2';
const dev_AUTH0_DOMAIN = 'drumscore-dev.eu.auth0.com';
const dev_DSE_GET_LICENSE_URL = 'https://sja5mclnha.execute-api.eu-west-1.amazonaws.com/dev/licenses/';
const dev_PAYPAL_BUY_NOW_URL = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
const dev_PAYPAL_NOTIFY_URL = 'https://sja5mclnha.execute-api.eu-west-1.amazonaws.com/dev/payments/paypal';
const dev_PAYPAL_ACCOUNT = 'alan-facilitator@whiteware.org';

const prod_AUTH0_CLIENT_ID = 'k3CauTTm89JUxldE3Md43qDwDtSZksH5';
const prod_AUTH0_DOMAIN = 'drumscore.eu.auth0.com';
const prod_DSE_GET_LICENSE_URL = 'https://sja5mclnha.execute-api.eu-west-1.amazonaws.com/prod/licenses/';
const prod_PAYPAL_BUY_NOW_URL = 'https://www.paypal.com/cgi-bin/webscr';
const prod_PAYPAL_NOTIFY_URL = 'https://sja5mclnha.execute-api.eu-west-1.amazonaws.com/prod/payments/paypal';
const prod_PAYPAL_ACCOUNT = 'alan@whiteware.org';

// below values edited by build process, searches for "_STAGE = dev_" and replaces with prod as needed
const AUTH0_CLIENT_ID_STAGE = dev_AUTH0_CLIENT_ID;
const AUTH0_DOMAIN_STAGE = dev_AUTH0_DOMAIN;
const DSE_GET_LICENSE_URL_STAGE = dev_DSE_GET_LICENSE_URL;
const PAYPAL_BUY_NOW_URL_STAGE = dev_PAYPAL_BUY_NOW_URL;
const PAYPAL_NOTIFY_URL_STAGE = dev_PAYPAL_NOTIFY_URL;
const PAYPAL_ACCOUNT_STAGE = dev_PAYPAL_ACCOUNT;
