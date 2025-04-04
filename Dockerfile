FROM dunglas/frankenphp:php8.4

# Install system dependencies
RUN apt-get update && \
    apt-get install -y ca-certificates unzip libexif-dev curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN install-php-extensions \
    exif \
    pdo_pgsql \
    mbstring \
    zip \
    gd \
    intl \
    pcntl \
    opcache \
    tokenizer

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Bun securely (example; check latest install method)
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

WORKDIR /app

# Copy PHP dependencies and install
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy JS dependencies and install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy application
COPY . .

# Build JS assets
RUN bun run build

# Finalize PHP setup
RUN composer dump-autoload --optimize && \
    php artisan optimize && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

EXPOSE 80 443
