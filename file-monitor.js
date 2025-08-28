const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const CSS_FILE = 'src/app/globals.css';
const BACKUP_DIR = 'backups/css';
const CHECK_INTERVAL = 5000; // Check every 5 seconds

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

let lastModified = 0;
let lastSize = 0;

function checkFileIntegrity() {
    try {
        const stats = fs.statSync(CSS_FILE);
        const content = fs.readFileSync(CSS_FILE, 'utf8');
        
        // Check if file has been modified
        if (stats.mtime.getTime() !== lastModified || content.length !== lastSize) {
            console.log(`📝 File changed detected: ${CSS_FILE}`);
            
            // Validate CSS syntax (basic check)
            if (content.includes('@tailwind') && content.includes('@layer')) {
                console.log('✅ CSS syntax appears valid');
                
                // Create backup
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const backupFile = path.join(BACKUP_DIR, `globals_${timestamp}.css`);
                
                fs.writeFileSync(backupFile, content);
                console.log(`💾 Backup created: ${backupFile}`);
                
                // Update tracking
                lastModified = stats.mtime.getTime();
                lastSize = content.length;
                
                // Clean old backups (keep last 10)
                cleanupOldBackups();
            } else {
                console.log('⚠️  CSS syntax may be corrupted!');
            }
        }
    } catch (error) {
        console.error('❌ Error monitoring file:', error.message);
    }
}

function cleanupOldBackups() {
    try {
        const files = fs.readdirSync(BACKUP_DIR)
            .filter(file => file.startsWith('globals_') && file.endsWith('.css'))
            .map(file => ({
                name: file,
                path: path.join(BACKUP_DIR, file),
                time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);
        
        // Keep only the last 10 backups
        if (files.length > 10) {
            files.slice(10).forEach(file => {
                fs.unlinkSync(file.path);
                console.log(`🗑️  Removed old backup: ${file.name}`);
            });
        }
    } catch (error) {
        console.error('Error cleaning up backups:', error.message);
    }
}

// Initialize monitoring
console.log(`🔍 Starting file monitoring for: ${CSS_FILE}`);
console.log(`📁 Backups will be saved to: ${BACKUP_DIR}`);
console.log(`⏱️  Checking every ${CHECK_INTERVAL/1000} seconds`);
console.log('Press Ctrl+C to stop monitoring\n');

// Start monitoring
setInterval(checkFileIntegrity, CHECK_INTERVAL);

// Initial check
checkFileIntegrity();

