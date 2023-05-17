How to install StickIT
=====================

This section documents how to setup a development environment for StickIT.

Installing StickIT on a local machine
-------------------------------------

Prerequisites
#############

You will need:

* `git <https://git-scm.com/>`_
* `Node.js <https://nodejs.org/en/>`_ v6.3+
* `Amazon Web Service Account <https://aws.amazon.com>`_ 

Building
########

To build StickIT for development:

.. code-block:: sh

   git clone 'https://github.com/shlee87/public-sticky-notes-for-open-source-textbooks.git'
   cd public-sticky-notes-for-open-source-textbooks
   npm run build

You now have a development built. 





.. you'll need a local copy of either the Hypothesis Chrome extension or
.. h. Follow either :ref:`running-from-browser-ext` or
.. :ref:`running-from-h` below.
.. If you're only interested in making changes to the client (and not to h)
.. then running the client from the browser extension is easiest.


.. .. _running-from-browser-ext:

Running the Chrome extension
---------------------------------------------


To run your development client in
a browser follow these steps.

#. open a chrome browser.
#. go to chrome://extensions
#. click on "Load unpacked"
#. select the build folder in the public-sticky-notes-for-open-source-textbooks folder
#. click on the extension icon on the top right of the browser



StickIT Architecture
====================

Browser extension (Chrome extension): The front-end of the application, which allows users to annotate web content while browsing. It should be able to capture user annotations, such as highlights, comments, or tags, and send them to the back-end for storage and processing.

API Gateway: Acts as a "front door" for the back-end services, allowing the browser extension to communicate with the back-end securely and efficiently. API Gateway can be used to define RESTful APIs, manage access control, and handle request/response processing.

AWS Lambda functions: Serverless functions that handle various tasks, such as processing user annotations, managing user accounts, and retrieving annotations from the database. Lambda functions can be written in multiple languages (e.g., Python, Node.js) and are triggered by events, such as API Gateway requests.

AWS RDS: A managed relational database service that stores user data, including account information and annotations. RDS provides automatic backups, scaling, and maintenance, making it a suitable choice for this architecture. You could use a database engine like PostgreSQL or MySQL, depending on your preference and requirements.

AWS S3 (Optional): A storage service that can be used to store static assets like images or documents, if needed. For example, if the extension allows users to upload images as part of their annotations, those images could be stored in an S3 bucket.

AWS Cognito: A fully managed user authentication and authorization service that integrates seamlessly with other AWS services. Cognito handles user registration, login, and access control, allowing you to create secure and scalable applications. The Chrome extension communicates with Cognito for user authentication, and the authenticated user tokens are used to authorize requests to the back-end services.

Here's a summary of the components and their interactions:

The user interacts with the Chrome extension to create annotations.
The extension communicates with AWS Cognito for user authentication and registration.
The authenticated user tokens are used to authorize requests to the API Gateway.
The extension sends annotation data to the API Gateway.
API Gateway triggers the appropriate AWS Lambda function(s) to process the data.
Lambda functions interact with the RDS database to store or retrieve annotation data.
(Optional) Lambda functions store or retrieve static assets from S3, if needed.


Folders & files
====================
.. This sections explain how the folders and files are organized in StickIT.


.. Folders
.. ---------------------------------------------

.. public-sticky-notes-for-open-source-textbooks/sticky-chrome-extension
.. #####################################################################
.. this is a folder that has all files for the chrome extension.

.. public-sticky-notes-for-open-source-textbooks/docs
.. ##################################################
.. This folder houses all the files related to code documentation.

.. public-sticky-notes-for-open-source-textbooks/lambda
.. #####################################################
.. This folder contains function files for AWS lambda.



.. feature-related files
.. ---------------------------------------------

Sign up
########

Sign In
#######

Search
######

Highlight
#########

Note
####