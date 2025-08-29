#!/bin/bash

# Headless WordPress Starter - Deployment Script
# This script helps deploy your headless WordPress starter package

set -e

echo "🚀 Headless WordPress Starter - Deployment Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ] || [ ! -d "public" ]; then
    print_error "This script must be run from the root of the headless-wp-starter directory"
    exit 1
fi

# Check if .env.local exists
if [ ! -f "frontend/.env.local" ]; then
    print_warning "frontend/.env.local not found. Please create it from env.example"
    echo "cp frontend/env.example frontend/.env.local"
    exit 1
fi

# Build frontend
print_status "Building frontend..."
cd frontend
npm run build
cd ..

print_status "Frontend build complete!"

# Check if wp-config.php exists
if [ ! -f "public/wp-config.php" ]; then
    print_warning "public/wp-config.php not found. Please create it from wp-config-sample.php"
    echo "cp public/wp-config-sample.php public/wp-config.php"
    echo "Then edit wp-config.php with your database settings"
    exit 1
fi

print_status "Deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload the 'public' folder to your WordPress hosting"
echo "2. Deploy the frontend to your hosting platform (Vercel, Netlify, etc.)"
echo "3. Update environment variables in production"
echo "4. Configure your domain and SSL"
echo ""
echo "📚 See docs/SETUP_GUIDE.md for detailed deployment instructions"




