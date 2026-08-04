Nexus Workspace - Smart Workspace Booking System

Nexus Workspace is a web application built using Django, HTML5, Tailwind CSS, and JavaScript (Fetch API). It allows users to view available workspace rooms, inspect pricing and details, and submit online bookings seamlessly.

🛠️ Tech Stack & Features

Backend: Python / Django (Views, ORM Models, SQLite Database)

Frontend: HTML5, Tailwind CSS, JavaScript (Async API calls)

Features: Dynamic Workspace Listing, Real-time Interactive Booking Modal, Automated Price Calculation, Full Django Admin Integration.

🚀 How to Run the Project

Clone the repository & enter the folder:

cd workspace_project


Activate the Virtual Environment:

Windows:

.venv\Scripts\activate


Mac/Linux:

source .venv/bin/activate


Apply Database Migrations (Optional if db.sqlite3 is included):

python manage.py migrate


Run the Development Server:

python manage.py runserver


Open the site in your browser:

Client Portal: http://127.0.0.1:8000/

Admin Panel: http://127.0.0.1:8000/admin

🔐 Admin Credentials

To manage workspaces or review submitted bookings directly:

Username: menna

Password: 1234 

🧪 Testing Scenarios for Evaluators

Here are 3 quick scenarios you can test to verify the functionality:

Scenario 1: Book an Existing Workspace

Navigate to http://127.0.0.1:8000/.

Click Book Now on any available workspace (e.g., Private Office or Premium Meeting Room).

Fill out the modal form (Full Name, Email Address, Date, and Duration in hours).

Click Confirm Booking.

You will see a success notification with the generated Booking ID.

Scenario 2: Verify Submitted Booking in Admin Dashboard

Go to http://127.0.0.1:8000/admin and log in with the admin credentials.

Click on Bookings under WORKSPACE_APP.

Verify that the booking you created in Scenario 1 appears in the database with the correct total price calculation (Price per hour × Hours).

Scenario 3: Add a New Workspace from Admin Panel

Inside the Admin Panel (/admin), click + Add next to Workspaces.

Enter workspace details (Name, Category, Price/hr, Capacity, Description, and check Is available).

Click SAVE.

Return to the home page (http://127.0.0.1:8000/) and refresh to see your new workspace displayed dynamically.
