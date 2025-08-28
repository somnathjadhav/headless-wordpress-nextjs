#!/bin/bash

# Backup script for globals.css
# This script creates timestamped backups and monitors file integrity

CSS_FILE="src/app/globals.css"
BACKUP_DIR="backups/css"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/globals_${TIMESTAMP}.css"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if source file exists
if [ ! -f "$CSS_FILE" ]; then
    echo "Error: $CSS_FILE not found!"
    exit 1
fi

# Create backup
cp "$CSS_FILE" "$BACKUP_FILE"

# Verify backup integrity
if cmp -s "$CSS_FILE" "$BACKUP_FILE"; then
    echo "✅ Backup created successfully: $BACKUP_FILE"
    
    # Keep only last 10 backups
    ls -t "${BACKUP_DIR}/globals_*.css" | tail -n +11 | xargs -r rm
    
    # Log the backup
    echo "$(date): Backup created - $BACKUP_FILE" >> "${BACKUP_DIR}/backup.log"
else
    echo "❌ Backup verification failed!"
    exit 1
fi

