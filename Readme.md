# Finance Dashboard UI

A responsive, interactive frontend dashboard built for tracking and understanding financial activity. This project was developed as an assignment for the Frontend Developer Intern role at Zorvyn.

## 🚀 Tech Stack
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **Icons:** Lucide React
* **State Management:** React Context API

## ✨ Features
* **Dashboard Overview:** Displays total balance, income, and expenses using dynamic summary cards.
* **Data Visualizations:** Features a time-based Line Chart for cash flow trends and a categorical Pie Chart for expense breakdowns.
* **Interactive Transactions Table:** Users can view recent transactions, search by category or date, and filter data seamlessly.
* **Role-Based Access Control (RBAC):** Simulated frontend roles. 
  * **Viewers** can only browse and search data.
  * **Admins** have the ability to add new transactions and delete existing ones.
* **Data Persistence:** Utilizes browser `localStorage` to save transaction state between page reloads.
* **Financial Insights:** Automatically calculates and displays the highest spending category and total income streams.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Approach & Architecture
I prioritized a clean, modular component structure to ensure readability and scalability. 
* **Global State:** I opted for the React Context API over Redux or Zustand. For a project of this scope, Context provides a lightweight and native solution to pass down the RBAC `role` and `transactions` data without unnecessary boilerplate.
* **Styling Strategy:** Tailwind CSS was used to rapidly prototype the UI while maintaining consistent design tokens (colors, spacing, typography). 

## 💻 Setup Instructions

1. **Clone the repository** (or unzip the project folder).
2. **Navigate to the project directory:**
   ```bash
   cd finance-dashboard
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser and visit the URL provided in the terminal (usually `http://localhost:5173`).**         

---
