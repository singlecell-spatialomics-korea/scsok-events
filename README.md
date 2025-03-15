# IEUM

> IEUM - an open-source conference management system for scientific meetings

## Overview

IEUM is an open-source platform for organizing scientific conferences. It manages abstract submissions, event registrations, and offers customizable workflows for event organizers.

In contrast to other systems, IEUM is designed to integrate seamlessly with an existing static website. For example:

```
Static Website                IEUM
+-----------------+         +------------------------------+
|                 |         |                              |
| Event 1 Detail  | <-----> | Registration Page for Event 1|----+
|                 |         |                              |    |
+-----------------+         +------------------------------+    |
                                                                |
+-----------------+         +------------------------------+    |    +-------------------+
|                 |         |                              |    |    |                   |
| Event 2 Detail  | <-----> | Registration Page for Event 2|----+--->| IEUM User & Event |
|                 |         |                              |    |    | Registration      |
+-----------------+         +------------------------------+    |    |                   |
                                                                |    +-------------------+
+-----------------+         +------------------------------+    |
|                 |         |                              |    |
| Event 3 Detail  | <-----> | Registration Page for Event 3|----+
|                 |         |                              |
+-----------------+         +------------------------------+
```

## Features

- **Multi-conference support**
- **Abstract submission & review** with voting system
- **Custom registration forms**
- **Role-based access control**
- **Speaker and attendee management**

## Tech Stack

- **Backend**: Python/Django Ninja/Allauth
- **Frontend**: SvelteKit
- **Database**: PostgreSQL
- **Containerization**: Docker

## Installation

```bash
# Clone repository
git clone https://github.com/ieum-org/ieum.git
cd ieum

# Using Docker compose
docker compose up -d # Debug
# or
docker compose up -f compose-release.yml -d # Release

# Or manual setup
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Quick Start

1. Create a .env file. Define all variables in `compose.yml` or `compose-release.yml`.
2. Create superuser.
3. Login via Django Admin at http://127.0.0.1:9080/[DJANGO_ADMIN_PAGE_NAME]
4. Access admin page at http://127.0.0.1:9080/[ADMIN_PAGE_NAME]
5. Create a conference
6. Configure event settings

## Documentation
TBA

## License
GNU AGPL 3. See LICENCE.
