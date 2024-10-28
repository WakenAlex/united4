<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Colectăm datele din formular
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    // Verificăm datele
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Setăm un cod de răspuns 400 (bad request) și ieșim.
        http_response_code(400);
        echo "Vă rugăm să completați formularul și să încercați din nou.";
        exit;
    }

    // Setăm adresa de e-mail recipientă.
    $recipient = "office@united4.ro";

    // Setăm subiectul e-mailului
    $subject = "Mesaj nou de la: $name";

    // Construim corpul e-mailului
    $email_content = "Nume: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mesaj:\n$message\n";

    // Construim header-ele e-mailului
    $email_headers = "From: $name <$email>";

    // Trimitem e-mailul
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Setăm un cod de răspuns 200 (okay)
        http_response_code(200);
        echo "Vă mulțumim! Mesajul dumneavoastră a fost trimis.";
    } else {
        // Setăm un cod de răspuns 500 (internal server error) dacă ceva nu a mers bine.
        http_response_code(500);
        echo "Oops! Ceva nu a mers bine, nu am putut trimite mesajul.";
    }

} else {
    // Nu este o cerere POST, setăm un cod de răspuns 403 (forbidden)
    http_response_code(403);
    echo "A apărut o problemă cu trimiterea, vă rugăm să încercați din nou.";
}
?>