```markdown
# Products App (Frontend)

This is the frontend for a full-stack CRUD application, built with React, Vite, and TypeScript. It features a responsive UI, light/dark modes, and a complete role-based access system where "Admins" can manage products and users, while "Users" and guests can only view products.

## ✨ Features

* **Full CRUD UI:** Create, Read, Update, and Delete products.
* **User Authentication:** Login and Register pages with `react-hot-toast` notifications.
* **Role-Based Access Control:**
    * Guests and Users can view products and analytics.
    * Admins see "Add Product", "Edit", and "Delete" buttons.
    * Admin-only pages (`/analytics`, `/users`) are protected by a private route.
* **User Management Page:** Admins can view a responsive table of all users and change their roles (User/Admin).
* **Analytics Page:** A simple dashboard that calculates total products, average price, etc.
* **Light/Dark Mode:** A theme-switching context and toggle in the navbar that remembers the user's preference in `localStorage`.
* **Responsive Design:**
    * Sticky navbar with a hamburger menu for mobile.
    * Responsive product grid.
    * Responsive (horizontally scrollable) table for User Management.
* **Modals:** Custom-built modals (using pure CSS) for creating/editing products and confirming deletions.

---

## 🛠️ Tech Stack

* **Framework:** React
* **Build Tool:** Vite
* **Language:** TypeScript
* **Styling:** CSS Modules (No libraries, pure CSS)
* **Routing:** `react-router-dom`
* **API Client:** `axios`
* **State Management:** React Context API (`AuthContext`, `ThemeContext`)
* **Notifications:** `react-hot-toast`

---

## 🚀 Local Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/my-crud-frontend.git](https://github.com/your-username/my-crud-frontend.git)
    cd my-crud-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the Backend:**
    This frontend requires the **[Products App API](https://github.com/your-username/my-crud-backend)** to be running. Please follow the setup instructions in that repository first.

4.  **Create `.env` file:**
    Create a `.env` file in the root of the project to point to your backend server.

    ```ini
    # .env.example
    
    # URL for your running backend (local or deployed on Render)
    VITE_BACKEND_URL=http://localhost:4000/api
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will be running at `http://localhost:5173` (or a similar port).

---

## 📜 Available Scripts

* **`npm run dev`:** Starts the Vite development server with hot-reloading.
* **`npm run build`:** Bundles the app for production into the `/dist` folder.
* **`npm run preview`:** Serves the production build locally to test it.

---

## 📁 Project Structure

The `src` folder is organized to be scalable and easy to maintain.
src/ ├── components/ │ ├── AdminRoute.tsx # Protects routes for Admins only │ ├── ConfirmDeleteModal.tsx # Modal for "Are you sure?" │ ├── ConfirmModal.module.css # Styles for delete modal │ ├── Form.module.css # Styles for Login/Register forms │ ├── Modal.module.css # Styles for Create/Edit modal │ ├── Navbar.tsx # Main responsive navbar │ ├── Navbar.module.css # Styles for navbar │ ├── ProductCard.tsx # Component for a single product │ ├── ProductCard.module.css # Styles for product card │ └── ProductFormModal.tsx # Modal for Create/Edit forms │ ├── context/ │ ├── AuthContext.tsx # Global state for user, token, role, isLoading │ └── ThemeContext.tsx # Global state for theme (light/dark) │ ├── hooks/ │ ├── useAuth.ts # Custom hook for easy AuthContext access │ └── useTheme.ts # Custom hook for easy ThemeContext access │ ├── pages/ │ ├── AnalyticsPage.tsx # Admin page for product stats │ ├── AnalyticsPage.module.css │ ├── LoginPage.tsx # Login page │ ├── ProductsPage.tsx # Main page, shows product grid │ ├── ProductsPage.module.css │ ├── RegisterPage.tsx # Registration page │ ├── UserManagementPage.tsx # Admin page for managing user roles │ └── UserManagementPage.module.css │ ├── services/ │ └── api.ts # Centralized axios client with auth interceptor │ ├── types/ │ └── index.ts # All TypeScript types (User, Product, etc.) │ ├── App.tsx # Main app component with router ├── index.css # Global CSS reset and CSS Variables (for themes) └── main.tsx # React entry point (renders App with Providers)