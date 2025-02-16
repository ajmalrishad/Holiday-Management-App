# Holiday Management Application

This is a full-stack application that fetches and displays holiday data from the **Calendarific API**. Users can select a country and year to view holidays, search by holiday name, filter by type, and view holiday details.

## Features
- Fetch holidays from Calendarific API based on user-selected country and year.
- Cache holiday data for 24 hours to reduce API calls.
- Search for holidays by name.
- Filter holidays by type (National, Religious, etc.).
- Date range picker to filter holidays within a specific period.
- Pagination for better navigation.
- Mobile-friendly, responsive UI using Tailwind CSS.

## Technologies Used
- **Backend:** Django, Django REST Framework, SQLite, Calendarific API, Caching
- **Frontend:** React (Create React App), Axios, Tailwind CSS

---

## Setup Instructions

### **1. Clone the Repository**
```sh
git clone [Your GitHub Repo URL]
cd holiday-management-app
```

## **Backend Setup (Django)**

### **2. Set Up a Virtual Environment**
```sh
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
```

### **3. Install Dependencies**
```sh
pip install -r requirements.txt
```

### **4. Set Up Environment Variables**
Create a `.env` file inside the backend project and add your Calendarific API key:
```ini
CALENDARIFIC_API_KEY=your_api_key_here
```

### **5. Apply Migrations & Run Server**
```sh
python manage.py migrate
python manage.py runserver
```

Backend will run at: **http://127.0.0.1:8000/**

### **6. API Endpoints**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/holidays/` | `GET` | Fetch holidays for a given country and year (with caching). |
| `/api/holidays/search/` | `GET` | Search for a holiday by name. |

---

## **Frontend Setup (React)**

### **7. Navigate to Frontend Directory**
```sh
cd frontend
```

### **8. Install Dependencies**
```sh
npm install
```

### **9. Set Up Environment Variables**
Create a `.env` file in the frontend root directory and add the backend API URL:
```ini
REACT_APP_BACKEND_URL=http://127.0.0.1:8000/api
```

### **10. Start the Frontend Server**
```sh
npm start
```
Frontend will run at: **http://localhost:3000/**

---

## **Usage**
1. Open the application in your browser.
2. Select a **Country** and **Year** from the dropdown.
3. Click **Search** to fetch holiday data.
4. Use the **search bar** to find specific holidays by name.
5. Click on any holiday to view its details in a modal.
6. Use filters for **holiday type** and **date range** (Bonus Features).
7. Navigate through holidays using pagination if there are more than 10 results.

---

## **Challenges Faced & Improvements**
- **Caching:** Implemented Django caching to reduce unnecessary API calls.
- **Error Handling:** Ensured the app gracefully handles API errors and invalid user inputs.
- **UI/UX:** Designed a clean and responsive interface with Tailwind CSS.

---


