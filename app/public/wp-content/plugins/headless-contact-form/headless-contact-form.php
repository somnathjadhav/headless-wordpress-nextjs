<?php
/**
 * Plugin Name: Headless Contact Form Handler
 * Description: Handles contact form submissions from headless frontend
 * Version: 1.0.0
 * Author: Headless WP
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class HeadlessContactForm {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('init', array($this, 'create_contact_submissions_table'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    public function create_contact_submissions_table() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'contact_submissions';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(20),
            company varchar(100),
            message text NOT NULL,
            ip_address varchar(45),
            user_agent text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            status varchar(20) DEFAULT 'new',
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    public function register_rest_routes() {
        register_rest_route('headless/v1', '/contact', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_contact_submission'),
            'permission_callback' => '__return_true',
            'args' => array(
                'name' => array(
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'email' => array(
                    'required' => true,
                    'type' => 'string',
                    'format' => 'email',
                    'sanitize_callback' => 'sanitize_email',
                ),
                'phone' => array(
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'company' => array(
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'message' => array(
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field',
                ),
            ),
        ));
    }
    
    public function handle_contact_submission($request) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'contact_submissions';
        
        // Get request parameters
        $name = $request->get_param('name');
        $email = $request->get_param('email');
        $phone = $request->get_param('phone');
        $company = $request->get_param('company');
        $message = $request->get_param('message');
        
        // Basic validation
        if (empty($name) || empty($email) || empty($message)) {
            return new WP_Error('missing_fields', 'Required fields are missing', array('status' => 400));
        }
        
        if (!is_email($email)) {
            return new WP_Error('invalid_email', 'Invalid email address', array('status' => 400));
        }
        
        // Check for spam (basic rate limiting)
        $recent_submissions = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $table_name WHERE email = %s AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)",
            $email
        ));
        
        if ($recent_submissions > 3) {
            return new WP_Error('rate_limit', 'Too many submissions from this email', array('status' => 429));
        }
        
        // Get IP address and user agent
        $ip_address = $this->get_client_ip();
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        
        // Insert into database
        $result = $wpdb->insert(
            $table_name,
            array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'company' => $company,
                'message' => $message,
                'ip_address' => $ip_address,
                'user_agent' => $user_agent,
                'status' => 'new',
            ),
            array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
        );
        
        if ($result === false) {
            return new WP_Error('database_error', 'Failed to save submission', array('status' => 500));
        }
        
        $submission_id = $wpdb->insert_id;
        
        // Send email notification (optional)
        $this->send_email_notification($name, $email, $phone, $company, $message, $submission_id);
        
        return array(
            'success' => true,
            'message' => 'Contact form submitted successfully',
            'submission_id' => $submission_id,
        );
    }
    
    private function get_client_ip() {
        $ip_keys = array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR');
        foreach ($ip_keys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                        return $ip;
                    }
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    }
    
    private function send_email_notification($name, $email, $phone, $company, $message, $submission_id) {
        $admin_email = get_option('admin_email');
        $site_name = get_bloginfo('name');
        
        $subject = "New Contact Form Submission - $site_name";
        
        $body = "A new contact form submission has been received:\n\n";
        $body .= "Submission ID: $submission_id\n";
        $body .= "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Phone: " . ($phone ?: 'Not provided') . "\n";
        $body .= "Company: " . ($company ?: 'Not provided') . "\n";
        $body .= "Message:\n$message\n\n";
        $body .= "Submitted at: " . current_time('Y-m-d H:i:s') . "\n";
        
        $headers = array('Content-Type: text/plain; charset=UTF-8');
        
        wp_mail($admin_email, $subject, $body, $headers);
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Contact Submissions',
            'Contact Submissions',
            'manage_options',
            'contact-submissions',
            array($this, 'admin_page'),
            'dashicons-email-alt',
            30
        );
    }
    
    public function admin_page() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'contact_submissions';
        
        // Handle status updates
        if (isset($_POST['action']) && $_POST['action'] === 'update_status' && isset($_POST['submission_id'])) {
            $submission_id = intval($_POST['submission_id']);
            $new_status = sanitize_text_field($_POST['new_status']);
            
            $wpdb->update(
                $table_name,
                array('status' => $new_status),
                array('id' => $submission_id),
                array('%s'),
                array('%d')
            );
        }
        
        // Get submissions
        $submissions = $wpdb->get_results(
            "SELECT * FROM $table_name ORDER BY created_at DESC"
        );
        
        ?>
        <div class="wrap">
            <h1>Contact Form Submissions</h1>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($submissions as $submission): ?>
                        <tr>
                            <td><?php echo esc_html($submission->id); ?></td>
                            <td><?php echo esc_html($submission->name); ?></td>
                            <td><?php echo esc_html($submission->email); ?></td>
                            <td><?php echo esc_html($submission->phone ?: '-'); ?></td>
                            <td><?php echo esc_html($submission->company ?: '-'); ?></td>
                            <td><?php echo esc_html(wp_trim_words($submission->message, 10)); ?></td>
                            <td>
                                <form method="post" style="display: inline;">
                                    <input type="hidden" name="action" value="update_status">
                                    <input type="hidden" name="submission_id" value="<?php echo $submission->id; ?>">
                                    <select name="new_status" onchange="this.form.submit()">
                                        <option value="new" <?php selected($submission->status, 'new'); ?>>New</option>
                                        <option value="read" <?php selected($submission->status, 'read'); ?>>Read</option>
                                        <option value="replied" <?php selected($submission->status, 'replied'); ?>>Replied</option>
                                        <option value="spam" <?php selected($submission->status, 'spam'); ?>>Spam</option>
                                    </select>
                                </form>
                            </td>
                            <td><?php echo esc_html($submission->created_at); ?></td>
                            <td>
                                <button type="button" onclick="viewMessage(<?php echo $submission->id; ?>, '<?php echo esc_js($submission->message); ?>')">
                                    View Full Message
                                </button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <script>
        function viewMessage(id, message) {
            alert('Submission ID: ' + id + '\n\nMessage:\n' + message);
        }
        </script>
        <?php
    }
}

// Initialize the plugin
new HeadlessContactForm();


