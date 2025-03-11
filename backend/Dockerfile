FROM python:3.13-slim

RUN apt-get update && apt-get install -y netcat-openbsd
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
RUN python manage.py collectstatic --noinput

CMD ["bash", "scripts/start.sh"]