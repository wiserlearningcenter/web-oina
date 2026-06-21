<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/PHPMailer/PHPMailer.php';
require __DIR__ . '/vendor/PHPMailer/SMTP.php';
require __DIR__ . '/vendor/PHPMailer/Exception.php';

function cms_smtp_file(): string
{
    return dirname(__DIR__) . '/data/system/smtp.json';
}

function cms_load_smtp_config(array $config): array
{
    $defaults = [
        'host' => 'mail.acropolis.org.do',
        'port' => 465,
        'secure' => 'ssl',
        'user' => 'smtp_user@acropolis.org.do',
        'password' => '',
        'from_email' => 'no-reply@acropolis.org',
        'from_name' => 'Nueva Acrópolis RD',
        'forms' => [
            'civis_solicitud' => [
                'to_email' => 'civis@acropolis.org',
                'to_name' => 'Civis Consulting',
                'subject_prefix' => '[CIVIS] Solicitud de propuesta',
                'copy_to_sender' => true,
            ],
        ],
    ];

    $file = cms_smtp_file();
    $stored = [];
    if (is_file($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $stored = $decoded;
        }
    }

    $merged = array_replace_recursive($defaults, $stored);
    if (empty($merged['password'])) {
        $merged['password'] = (string) ($config['smtp_password'] ?? '');
    }
    return $merged;
}

function cms_public_smtp_config(array $cfg): array
{
    return [
        'host' => $cfg['host'] ?? '',
        'port' => (int) ($cfg['port'] ?? 465),
        'secure' => $cfg['secure'] ?? 'ssl',
        'user' => $cfg['user'] ?? '',
        'passwordSet' => !empty($cfg['password']),
        'from_email' => $cfg['from_email'] ?? '',
        'from_name' => $cfg['from_name'] ?? '',
        'forms' => $cfg['forms'] ?? [],
    ];
}

function cms_save_smtp_config(array $next, bool $keepPasswordIfBlank = true): array
{
    $current = cms_load_smtp_config([]);
    $password = trim((string) ($next['password'] ?? ''));
    if ($password === '' && $keepPasswordIfBlank) {
        $password = (string) ($current['password'] ?? '');
    }

    $doc = [
        'host' => trim((string) ($next['host'] ?? $current['host'] ?? '')),
        'port' => (int) ($next['port'] ?? $current['port'] ?? 465),
        'secure' => trim((string) ($next['secure'] ?? $current['secure'] ?? 'ssl')),
        'user' => trim((string) ($next['user'] ?? $current['user'] ?? '')),
        'password' => $password,
        'from_email' => trim((string) ($next['from_email'] ?? $current['from_email'] ?? '')),
        'from_name' => trim((string) ($next['from_name'] ?? $current['from_name'] ?? '')),
        'forms' => [
            'civis_solicitud' => [
                'to_email' => trim((string) ($next['forms']['civis_solicitud']['to_email'] ?? $current['forms']['civis_solicitud']['to_email'] ?? '')),
                'to_name' => trim((string) ($next['forms']['civis_solicitud']['to_name'] ?? $current['forms']['civis_solicitud']['to_name'] ?? '')),
                'subject_prefix' => trim((string) ($next['forms']['civis_solicitud']['subject_prefix'] ?? $current['forms']['civis_solicitud']['subject_prefix'] ?? '')),
                'copy_to_sender' => (bool) ($next['forms']['civis_solicitud']['copy_to_sender'] ?? $current['forms']['civis_solicitud']['copy_to_sender'] ?? true),
            ],
        ],
    ];

    $dir = dirname(cms_smtp_file());
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    file_put_contents(cms_smtp_file(), json_encode($doc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    return $doc;
}

function cms_mailer(array $cfg): PHPMailer
{
    $m = new PHPMailer(true);
    $m->isSMTP();
    $m->Host = (string) ($cfg['SMTP']['host'] ?? $cfg['host'] ?? 'localhost');
    $m->Port = (int) ($cfg['SMTP']['port'] ?? $cfg['port'] ?? 25);

    $smtpUser = trim((string) ($cfg['SMTP']['user'] ?? $cfg['user'] ?? ''));
    $smtpPass = trim((string) ($cfg['SMTP']['password'] ?? $cfg['password'] ?? ''));
    $m->SMTPAuth = $smtpUser !== '' && $smtpPass !== '';
    if ($m->SMTPAuth) {
        $m->Username = $smtpUser;
        $m->Password = $smtpPass;
    }

    $secure = strtolower(trim((string) ($cfg['SMTP']['secure'] ?? $cfg['secure'] ?? '')));
    if ($secure === 'ssl' || $secure === 'tls') {
        $m->SMTPSecure = $secure;
    }

    $m->CharSet = 'UTF-8';
    $m->Encoding = 'base64';
    $m->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ];

    $fromEmail = (string) ($cfg['SMTP']['from_email'] ?? $cfg['from_email'] ?? '');
    $fromName = (string) ($cfg['SMTP']['from_name'] ?? $cfg['from_name'] ?? 'Nueva Acrópolis RD');
    if ($fromEmail !== '') {
        $m->setFrom($fromEmail, $fromName);
    }

    return $m;
}

function cms_send_plain_mail(array $cfg, array $opts): void
{
    if (empty($cfg['host']) || empty($cfg['user']) || empty($cfg['password'])) {
        throw new RuntimeException('SMTP no configurado. Revisa la configuración en el editor.');
    }

    $mail = cms_mailer($cfg);
    $mail->addAddress((string) $opts['to'], (string) ($opts['toName'] ?? ''));
    if (!empty($opts['cc'])) {
        $mail->addCC((string) $opts['cc']);
    }
    if (!empty($opts['replyTo'])) {
        $mail->addReplyTo((string) $opts['replyTo']);
    }
    $mail->Subject = (string) $opts['subject'];
    $mail->isHTML(false);
    $mail->Body = (string) $opts['body'];
    $mail->send();
}

function cms_validate_civis_solicitud(array $body): array
{
    $empresa = trim((string) ($body['empresa'] ?? ''));
    $contactoNombre = trim((string) ($body['contactoNombre'] ?? ''));
    $contactoApellido = trim((string) ($body['contactoApellido'] ?? ''));
    $email = trim((string) ($body['email'] ?? ''));
    $telefono = trim((string) ($body['telefono'] ?? ''));
    $message = trim((string) ($body['message'] ?? $body['body'] ?? ''));

    if ($empresa === '') {
        return ['ok' => false, 'error' => 'Indique el nombre de la empresa.'];
    }
    if ($contactoNombre === '') {
        return ['ok' => false, 'error' => 'Indique el nombre de la persona de contacto.'];
    }
    if ($contactoApellido === '') {
        return ['ok' => false, 'error' => 'Indique el apellido.'];
    }
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['ok' => false, 'error' => 'Indique un correo de contacto válido.'];
    }
    if ($telefono === '') {
        return ['ok' => false, 'error' => 'Indique teléfono o WhatsApp.'];
    }
    if (strlen($message) < 80) {
        return ['ok' => false, 'error' => 'El contenido de la solicitud es incompleto.'];
    }
    if (strlen($message) > 12000) {
        return ['ok' => false, 'error' => 'La solicitud supera el tamaño permitido.'];
    }

    return [
        'ok' => true,
        'data' => compact('empresa', 'contactoNombre', 'contactoApellido', 'email', 'telefono', 'message'),
    ];
}

function cms_send_civis_solicitud(array $body, array $config): array
{
    $check = cms_validate_civis_solicitud($body);
    if (!$check['ok']) {
        return $check;
    }

    $cfg = cms_load_smtp_config($config);
    $form = $cfg['forms']['civis_solicitud'] ?? [];
    $toEmail = trim((string) ($form['to_email'] ?? 'civis@acropolis.org'));
    $toName = trim((string) ($form['to_name'] ?? 'Civis Consulting'));
    $prefix = trim((string) ($form['subject_prefix'] ?? '[CIVIS] Solicitud de propuesta'));
    $subject = $prefix . ' — ' . $check['data']['empresa'];
    $copyToSender = ($form['copy_to_sender'] ?? true) !== false;

    try {
        cms_send_plain_mail($cfg, [
            'to' => $toEmail,
            'toName' => $toName,
            'cc' => $copyToSender ? $check['data']['email'] : null,
            'replyTo' => $check['data']['email'],
            'subject' => $subject,
            'body' => $check['data']['message'],
        ]);
    } catch (Throwable $e) {
        return ['ok' => false, 'error' => 'No se pudo enviar la solicitud. Inténtelo más tarde.'];
    }

    return ['ok' => true];
}
