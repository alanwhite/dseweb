# Drum Score Editor Web
This is the front end for the next generation web presence for Drum Score Editor, the world's most efficient score writing tool for rudimental drumming, using derivatives of the Swiss Basel notation, e.g. Scottish Pipe Band Drumming.

This is as much a learning exercise for me, in how to leverage modern tools and techniques for delivering web content, as well as providing the online home for downloading, licensing and discovering Drum Score Editor. The custom back end services required are provided by AWS Lambda functions (see https://github.com/alanwhite/dseapi).

Please feel free to contribute to the code, or provide me with feedback to help improve the experience for everyone, and my learning!

## Structure

* src - contains all the source css, javascript and html
  * css - contains the site specific css plus the Zurb Foundation core
  * images - all images used in the site
  * js - site specific javascript plus Zurb Foundation scripts
  * index.html - the single page used by the site

* build - destination for the final assembled site - distribution occurs from here

* gulpfile.js - using gulp for the first time to minify and build for different stages, e.g. dev and prod pointing at different API endpoints

* serverless.yml - configuration file for sls to manage the AWS Cloudformation template and deploy the site to AWS S3 & Cloudfront for edge distribution

* serverless-single-page-app-plugin - used by sls to help deploy the site. It may not be relevant much longer as we build out the tool chain

Various other standard files and folders have their usual meaning, e.g. node_modules and so on.

## Functionality

Authentication - handled by using the Auth0.com services
Payments - handled via PayPal webascr button & back end API
Licenses - storage and encryption handled via back end API

The site provides static information & links to download & install Drum Score Editor for macOS and Windows. Further information on the functional difference between the free version and the licensed version is provided.

Should a user decide to purchase a license the flow is first to sign in (uses Auth0), then purchase the license via the PayPal button. On transaction completion a license is cut by the back end code and is available to view and download from this site. Currently the user needs to refresh the page to refresh the list of licenses - that's a todo item!

## Contact

Drum Score Editor is on facebook at https://facebook.com/DrumScoreEditor, and twitter as \@DrumScoreEditor. Or old fashioned email at alan@whiteware.org.

This website will replace https://www.drumscore.scot (production) and https://uat.drumscore.scot (User Acceptance Testing) when done.
