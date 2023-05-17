How to install AnnoPDF
=====================

This section documents how to setup a development environment for AnnoPDF

Installing AnnoPDF on a local machine
-------------------------------------

Prerequisites
#############

You will need:

* `git <https://git-scm.com/>`_
* `React.js <https://react.dev/>`_

Building
########

To build AnnoPDF for development:

.. code-block:: sh

   git clone 'https://github.com/shlee87/pdf-highlighter.git'
   cd pdf-highlighter/AnnoPDF
   npm install
   npm start

You now have a development built. 





Running AnnoPDF
---------------------------------------------


To run your development client in
a browser follow these steps.

#. open a chrome browser.
#. go to 'http://localhost:3000/react-pdf-highlighter/'


AnnoPDF Architecture
====================

The application is built using **React**, a JavaScript library for building user interfaces. The architecture is **component-based**, which promotes reusability and maintainability.

Main Components
---------------
The main components and files of the application are as follows:

- **index.tsx:** This is the entry point of the application. It renders the main **App** component into a DOM node.

- **App.tsx:** This is the main component of the application that controls the primary state and handles interactions related to highlights, such as adding, editing, and deleting. It also handles the loading of different PDFs either by URL or file upload. The state in this component includes the current URL of the PDF document and the array of highlights.

- **Sidebar.tsx:** This component represents the sidebar on the application interface, where the highlights are listed. It handles displaying, searching, and editing of highlights. It also provides the UI for loading a PDF via a URL or file upload.

- **react-pdf-highlighter components:** The application uses several components from the **react-pdf-highlighter** library, including PdfLoader, PdfHighlighter, Tip, Highlight, Popup, and AreaHighlight. These components handle the loading of the PDF document, the highlighting of the text and area on the document, and the popups that show when a highlight is selected.

- **HighlightPopup:** This component displays the text comment and a delete button for each highlight when it's selected.

- **Spinner.tsx:** This is a small component that displays a loading spinner while the PDF document is loading. It's rendered by the **PdfLoader** component from the **react-pdf-highlighter** library during the loading process.

Application State and Persistence
---------------------------------
The application state is managed locally within the React components, primarily within the **App** component. The state includes the URL of the PDF document and the array of highlights. The **App** component passes down parts of its state and its state handling functions as props to the child components.

The application also uses the **LocalStorage Web API** to persist the highlights across browser sessions.


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