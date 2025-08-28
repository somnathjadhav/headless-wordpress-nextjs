#!/bin/bash

# Restore script for globals.css
# This script can restore the file from the most recent backup

CSS_FILE="src/app/globals.css"
BACKUP_DIR="backups/css"

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Backup directory not found: $BACKUP_DIR"
    exit 1
fi

# Find the most recent backup
LATEST_BACKUP=$(ls -t "${BACKUP_DIR}/globals_*.css" 2>/dev/null | head -n 1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "❌ No backups found in $BACKUP_DIR"
    exit 1
fi

echo "📋 Available backups:"
ls -la "${BACKUP_DIR}/globals_*.css" | head -n 10

echo ""
echo "🔄 Restoring from: $LATEST_BACKUP"

# Create a backup of current file before restoring
if [ -f "$CSS_FILE" ]; then
    CURRENT_BACKUP="${BACKUP_DIR}/current_before_restore_$(date +"%Y%m%d_%H%M%S").css"
    cp "$CSS_FILE" "$CURRENT_BACKUP"
    echo "📦 Current file backed up to: $CURRENT_BACKUP"
fi

# Restore the file
cp "$LATEST_BACKUP" "$CSS_FILE"

# Verify restoration
if cmp -s "$LATEST_BACKUP" "$CSS_FILE"; then
    echo "✅ File restored successfully!"
    echo "📄 Restored file size: $(wc -c < "$CSS_FILE") bytes"
else
    echo "❌ Restoration verification failed!"
    exit 1
fi

