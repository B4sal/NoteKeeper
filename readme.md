# NoteKeeper Project

## Prerequisites

- Python 3.x
- pip (Python package installer)
- MariaDB 10.5 or later

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd NoteKeeper
    ```

2. **Create a virtual environment:**
    ```bash
    python -m venv myenv
    myenv\Scripts\activate
    ```

3. **Install Django and other dependencies:**
    ```bash
    pip install django
    pip install djangorestframework
    ```

4. **Check Django version:**
    ```bash
    django-admin --version
    ```

## Database Setup


1. **Make migrations:**
    ```bash
    python manage.py makemigrations
    ```

2. **Apply migrations:**
    ```bash
    python manage.py migrate
    ```

## Running the Project

1. **Start the development server:**
    ```bash
    python manage.py runserver
    ```

2. **Open your browser and navigate to:**
    ```
    http://127.0.0.1:8000
    ```

## Additional Commands

- **Create a superuser for the admin site:**
    ```bash
    python manage.py createsuperuser
    ```

- **Collect static files:**
    ```bash
    python manage.py collectstatic
    ```

## Notes

- Ensure you have MySQL or MariaDB 10.5 or later installed and configured as per the `settings.py` file.
- Update the `DATABASES` settings in `settings.py` with your database credentials.