# Use the official FrankenPHP image with PHP 8.4
FROM dunglas/frankenphp:php8.4

# Install system dependencies and PHP extensions
RUN apt-get update && \
    apt-get install -y ca-certificates unzip libexif-dev curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN install-php-extensions \
    exif \
    pdo_pgsql \
    mbstring \
    zip \
    gd \
    intl \
    pcntl \
    opcache

# Install latest Composer from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy composer files and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy application files
COPY . .

# Finalize PHP dependencies and run Laravel optimizations
RUN composer dump-autoload --optimize && \
    composer install --no-dev && \
    php artisan optimize && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# Install JS dependencies and build assets
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile && \
    bun run build

EXPOSE 80 443
