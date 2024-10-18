<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form inputs and sanitize them
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate inputs
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Recipient email
        $to = 'jeff.caldwell@myaiteam.com';
        // Subject
        $subject = 'New Encrypted Message from ' . $name;
        // Message body
        $body = "Alias: $name\nEmail: $email\n\nEncrypted Message:\n$message";
        // Headers
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            // Success message
            echo '<script>alert("Your message has been sent successfully."); window.location.href = "index.html";</script>';
        } else {
            // Error message
            echo '<script>alert("There was an error sending your message. Please try again."); window.history.back();</script>';
        }
    } else {
        // Missing fields
        echo '<script>alert("Please fill in all fields."); window.history.back();</script>';
    }
} else {
    // Redirect to the homepage if accessed without form submission
    header('Location: index.html');
    exit();
}
?>
