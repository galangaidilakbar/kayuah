FROM dunglas/frankenphp

# Install PostgreSQL extension and dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql
