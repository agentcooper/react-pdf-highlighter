For developers
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
-----------------

The application is built using **React**, a JavaScript library for building user interfaces. The architecture is **component-based**, which promotes reusability and maintainability.

Main Components
---------------

*Github repository link: `installation guide <https://github.com/shlee87/pdf-highlighter>`_ 


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


Development Timeline
-----------------

1. **Research Phase (March 17 - March 30):** During this phase, I conducted research to identify the features that the application would need and formulated a plan on how to implement them.

2. **Building Basic Features (March 31 - April 13):**
   
   - *External PDF Link Retrieval:* This feature allows the application to fetch and display a PDF using an external link.
   - *Local File Loading:* This feature enables users to upload and view a PDF from their local file system.

3. **Building Annotation Features (April 14 - April 27):**

   - *Annotating:* This feature allows users to make annotations on the PDF.
   - *Editing Annotations:* With this feature, users can edit their existing annotations.
   - *Deleting Annotations:* This feature lets users remove any annotations they no longer need.

4. **Building Advanced Features (April 28 - May 11):**

   - *Saving Annotations to Local Storage:* This feature allows the application to save annotations in the local storage for future access.
   - *Search Feature for Annotations:* This feature enables users to search through their annotations.

5. **Debugging and Documentation (May 12 - May 17):** In the final phase, I focused on debugging the application to ensure its smooth operation and writing comprehensive documentation to help users understand how to use the application.
