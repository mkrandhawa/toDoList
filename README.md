# toDoList
Basic To-Do List 

This Git repository houses an interactive to-do list web application that leverages MongoDB to store user data efficiently. The application enables users to manage tasks seamlessly and create custom pages for improved organization. By appending "/pageName" at the end of the URL, users can easily create personalized pages, with the given page name becoming the title of the new list. MongoDB integration ensures secure and reliable data storage, enhancing the overall user experience.
---
Features:

Add and Remove To-Do Items: Users can effortlessly add new tasks to the to-do list and remove completed or irrelevant entries, ensuring efficient task tracking and management.

MongoDB Data Storage: User data, including to-do lists and custom pages, is stored securely in MongoDB, providing a scalable and reliable solution for data management.

Custom Page Creation: The application empowers users to create personalized pages by specifying the desired page name in the URL. This feature enables users to categorize tasks according to their preferences, ensuring a tailored experience.
---

Setup Instructions:

Clone the repository using the following command:

bash

git clone <repository_url.git>
Navigate to the repository folder:

vbnet

cd interactive-to-do-list
Install the required dependencies:

npm install
---
Set up MongoDB:

Install MongoDB on your system.
Create a new database for the application, e.g., "todo_app_db".
Configure the MongoDB connection URI in the app.js file.

---
Run the application locally:
node app.js
Access the application in your web browser by visiting http://localhost:3000.








