# 📚 Book Collection Manager

## Overview

Book Collection Manager is a web application that helps you organize and track your personal book collection. With this tool, you can:

- Add books to your collection using ISBN numbers
- Rate and review books you've read
- Track your reading progress
- Organize books by status (reading, completed, planned)
- Add personal notes to books
- Sort and filter your collection

The application is built with Node.js, Express.js, and PostgreSQL, with a responsive Bootstrap interface.

## Features

- **Book Management**: Add, edit, and delete books from your collection
- **ISBN Lookup**: Automatically fetch book details using ISBN numbers
- **Reading Progress**: Track current page and reading status
- **Rating System**: Rate books on a 5-star scale
- **Review System**: Write detailed reviews and personal notes
- **Sorting**: Organize books by title, rating, or date added
- **Responsive Design**: Works on all devices from desktop to mobile

## Technology Stack

- **Frontend**: HTML5, CSS3, EJS, Bootstrap 5, Font Awesome
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ISBN Lookup**: Open Library API

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)
- pgAdmin 4

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/book-collection-manager.git
   cd book-collection-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Create a new PostgreSQL database
   - Run the SQL commands [Queries](queries.sql) to set up the schema:

5. **Run the application**:
   ```bash
   node index.js
   ```

6. **Access the application**:
   Open your browser and visit [http://localhost:3000](http://localhost:3000)

## Usage

1. **Add a new book**:
   - Click "Add New Book" in the navigation
   - Enter the ISBN number of the book
   - Fill in additional details (optional)
   - Click "Add Book"

2. **View your collection**:
   - The home page displays all your books
   - Use the sort dropdown to organize by title, rating, or date
   - Click on any book to view details

3. **Edit book details**:
   - Navigate to a book's details page
   - Click "Edit" to modify information
   - Click "Edit Notes" to add personal notes

4. **Track reading progress**:
   - Set the status (Reading, Completed, Plan to Read)
   - Update current page as you read
   - Add a date when you finished reading

## Database Configuration

After creating the database, you'll need to populate it with some initial data. Run these queries [Queries](queries.sql) in your PostgreSQL database:


## Dependencies

The application uses the following key dependencies:

- **express**: Web framework for Node.js
- **ejs**: Templating engine for views
- **pg**: PostgreSQL client for Node.js
- **body-parser**: Access to body data
- **axios**: HTTP client for API requests
- **bootstrap**: Frontend framework
- **font-awesome**: Icon library

All dependencies are listed in the `package.json` file.

## Troubleshooting

If you encounter issues:

1. **Database connection problems**:
   - Verify your PostgreSQL service is running
   - Test your database connection with `psql`

2. **Installation issues**:
   - Run `npm audit fix` to resolve dependency vulnerabilities
   - Delete `node_modules` and run `npm install` again

3. **Application not starting**:
   - Check for port conflicts (another service using port 3000)
   - Verify Node.js version with `node -v` (should be v18+)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For any questions or issues, please open an issue on GitHub.