#!/bin/bash

# Deploy script for Render - handles existing database

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if database needs baseline
echo "🔍 Checking database migration status..."

# Try to get migration status
if npx prisma migrate status 2>&1 | grep -q "Database schema is not empty"; then
    echo "⚠️  Database is not empty, baselining..."
    # Mark the initial migration as applied
    npx prisma migrate resolve --applied 20250812100401_init
    echo "✅ Database baselined successfully"
fi

# Deploy any pending migrations
echo "🏗️  Deploying migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️  Building application..."
npm run build

echo "🎉 Deployment completed successfully!"
