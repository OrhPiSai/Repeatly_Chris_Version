# Use official Python image
FROM python:3.11

# Set working directory in the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application to the container
COPY . .

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV PATH="/app/venv/bin:$PATH"

# Expose Flask default port
EXPOSE 5000

# Run the Flask app using Gunicorn with 4 workers for better performance
CMD ["gunicorn", "-b", "0.0.0.0:5000", "--workers=4", "app:app"]
