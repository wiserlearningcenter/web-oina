<?php
namespace PHPMailer\PHPMailer;
class PHPMailer {
	public bool $SMTPAuth = false;
	public string $Host = '';
	public int $Port = 0;
	public string $SMTPSecure = '';
	public string $Username = '';
	public string $Password = '';
	public string $CharSet = 'UTF-8';
	private array $to = [];
	private array $replyTo = [];
	private string $fromEmail = '';
	private string $fromName = '';
	public string $Subject = '';
	public string $Body = '';
	public string $AltBody = '';
	private bool $isSmtp = false;
	public function isSMTP(): void { $this->isSmtp = true; }
	public function setFrom(string $email, string $name = ''): void { $this->fromEmail = $email; $this->fromName = $name; }
	public function addAddress(string $email, string $name = ''): void { $this->to[] = [$email, $name]; }
	public function addReplyTo(string $email, string $name = ''): void { $this->replyTo[] = [$email, $name]; }
	public function send(): bool {
		$headers = "From: {$this->fromName} <{$this->fromEmail}>\r\n";
		if (!empty($this->replyTo)) {
			$headers .= "Reply-To: {$this->replyTo[0][0]}\r\n";
		}
		$to = $this->to[0][0] ?? '';
		if ($to === '') return false;
		return @mail($to, $this->Subject, $this->Body, $headers);
	}
}





