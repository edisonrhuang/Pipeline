# Introduction #

Pipeline is a website designed to streamline the process of obtaining jobs and connections. We understand the challenges of navigating the job market, which is why Pipeline is a platform designed to bridge the gap between talented candidates and prospective employers. Pipeline offers a user-friendly interface where candidates can enter personal and academic information with ease and connect directly with employers seeking their skills and expertise.

# Getting Started

To run the project, here is how you can get started!

### MySQL Installation ###

1. First install [MySQL Workbench](https://dev.mysql.com/downloads/windows/installer/8.0.html) using the provided link and select the first download option.
2. When you install, select the custom install and select the latest MySQL server and MySQL workbench (under the applications tab)
3. Keep everything else as default, and make sure to set a password and remember it.
4. Load MySQL Workbench and load your default connection and enter your password from before

### Database Setup ###

To setup the database, open and run the `schema.sql` within the `sql/` directory. This schema can be rerun at any point in time to reset the database to the default iteration.

### Project Setup

1. Clone the project onto your own device.

2. Run `npm i` once in the `Pipeline/` directory, once in the `Pipeline/frontend` directory, and once in the `Pipeline/backend` directory.

   - This will install all the required packages from each of the `package.json`.

3. Create 2 `.env` files.

   - One `.env` file in the `Pipeline/backend/` directory following this format:

     ```
     # DATABASE
     DB_HOST='localhost'
     DB_DATABASE='pipeline_database'
     DB_USER='your_username'          # <--- Change this line
     DB_PASSWORD='your_password'      # <--- Change this line
     
     # CORS
     CORS_ORIGIN='http://localhost:3000'
     ```

   - One `.env` file in the `Pipeline/frontend/` directory following this format:

     ```
     # REACT APP
     REACT_APP_API_HOST='http://localhost:5002'
     ```

4. To run the project, return to the `Pipeline/` directory and run `npm run dev`
   - This can be done because the `package.json` file in the `Pipeline/` directory contains a script that runs an installed package called `concurrently`. `concurrently` allows you to run both the front and backend code concurrently in one terminal.
5. `localhost:3000/login` should automatically load in your browser and you can begin to play around with the website!
