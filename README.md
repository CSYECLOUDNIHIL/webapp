# assignment3


General Requirements
API Format: All API request and response payloads must be in JSON format.

No UI: The application should focus solely on the backend. No user interface (UI) should be implemented.

HTTP Status Codes: All API calls should return the appropriate HTTP status codes to indicate the result of the request.

Code Quality: The code quality of the application should be maintained at the highest standards. Unit and/or integration tests should be implemented to ensure code reliability.

Bootstrapping Database
Automatic Database Setup: The application should automatically bootstrap the database at startup. This includes creating or updating the schema, tables, indexes, sequences, and other database objects.

No Manual SQL Scripts: Manual database setup using SQL scripts is not allowed. ORM (Object-Relational Mapping) frameworks such as Hibernate (for Java), SQLAlchemy (for Python), or Sequelize (for Node.js) are recommended for managing database operations.

Users & User Accounts
CSV Data Source: Account information should be loaded from a CSV file located at /opt/user.csv. The application should read this file at startup and create user accounts based on the CSV data.

User Account Creation: User accounts should be created based on the information provided in the CSV file. If an account already exists, no updates should be made. Deletion of accounts is not supported.

Password Hashing: User passwords must be securely hashed using BCrypt before storing them in the database.

Immutable Fields: Users should not be allowed to set values for account_created and account_updated fields. Any values provided for these fields should be ignored.

Authentication Requirements
Token-Based Authentication: Users must provide a basic authentication token when making API calls to authenticated endpoints. Only Token-Based authentication is supported; Session Authentication is not.
API Implementation
Create Assignment
Any authenticated user can create an assignment.

Assignment points must be between 1 and 10.

Update Assignment
Only the user who created the assignment can update it.

Users can use either the PUT API for updates.

Delete Assignment
Only the user who created the assignment can delete it.

Users should not be able to set values for assignment_created and assignment_updated fields. Any values provided for these fields must be ignored.

Git & GitHub
GitHub Subscription
All students must subscribe to the GitHub Team plan.
Create & Setup GitHub Repository
Create a new private GitHub repository for the web application in the GitHub organization you created.

The repository name should be "webapp."

Update the README.md file in your repository with the following content:

Prerequisites for building and deploying the application locally.
Build and deployment instructions for the web application.
Fork the GitHub repository into your namespace for development work.

All web application code should reside in this repository.

Add an appropriate .gitignore file to your repository to exclude unnecessary files. You can find useful .gitignore templates here.

GitHub Repository Branch Protection Rules
Implement branch protection rules for your GitHub repository. Protect the main branch as follows:
Require pull request reviews before merging.
Disallow force pushes.
Require status checks to pass before merging (for CI).
Implement Continuous Integration (CI) with GitHub Actions
Add a GitHub Actions workflow to run integration tests for the application with each pull request. Pull requests can only be merged if the workflow executes successfully.

Implement Status Checks for GitHub branch protection to prevent users from merging a pull request when the GitHub Actions workflow run fails.

The CI check should run the integration tests for the /healthz endpoint.

Implement Integration Tests
Implement integration tests (not unit tests) for the /healthz endpoint. Test for success criteria, and there's no need to test for failures.


