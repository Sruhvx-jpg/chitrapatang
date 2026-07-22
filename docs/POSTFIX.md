# Postfix Mail Server Specification

> **Local SMTP Relay Setup, Production Internet Site Configuration, DNS Records, and TLS Certs.**

---

## 🧭 Navigation
[⬅ Master Documentation Hub](README.md) • [Agile Scrum Guide](SCRUM.md) • [System Design](SYSTEM_DESIGN.md) • [API Reference](API_REFERENCE.md)

---

## Local Development Configuration

For local development, the mail server runs locally. However, to avoid local delivery issues, it is recommended to configure Postfix to use a **relay server** (such as an external SMTP provider or local mail catcher):

1. **System Mail Name**: Use the keyword `devserver` as the system mail name for the local setup.
2. **Relay Host Setup**: Update `/etc/postfix/main.cf` to direct outgoing mail through a relay:
   ```text
   relayhost = [smtp.your-provider.com]:587
   ```
3. **SASL Authentication**: Configure SMTP authentication in Postfix to authenticate with your relay provider using credentials.

---

## Production / Internet Site Deployment

To configure Postfix as an independent **Internet Site** (sending and receiving mail directly via SMTP), the following setup and prerequisites are required:

### 1. Postfix Installation & Mode
Select **Internet Site** during Postfix configuration (`sudo dpkg-reconfigure postfix`):
- **System mail name**: Should match your domain (e.g., `example.com`).

### 2. DNS Requirements
For reliable email delivery, the following DNS records must be configured:
- **MX Record**: Points mail traffic for your domain to the mail server's IP address.
- **A/AAAA Records**: Maps the mail server's hostname (e.g., `mail.example.com`) to its public IP.
- **PTR Record (Reverse DNS)**: Maps the server's IP address back to its hostname (configured via your VPS/hosting provider).
- **SPF Record**: Defines authorized IP addresses that can send email on behalf of your domain.
- **DKIM (DomainKeys Identified Mail)**: Cryptographically signs outgoing emails to verify sender authenticity.
- **DMARC Record**: Establishes policies on how receivers should handle emails that fail SPF/DKIM checks.

### 3. TLS Certificates (Security)
Secure SMTP traffic using TLS certificates (e.g., Let's Encrypt / Certbot):
1. Obtain certificates for your mail subdomain (e.g., `mail.example.com`).
2. Update `/etc/postfix/main.cf` with certificate paths:
   ```text
   smtpd_use_tls = yes
   smtpd_tls_cert_file = /etc/letsencrypt/live/mail.example.com/fullchain.pem
   smtpd_tls_key_file = /etc/letsencrypt/live/mail.example.com/privkey.pem
   smtpd_tls_security_level = may
   ```

### 4. Firewall Configuration
Ensure the following ports are open in your server firewall:
- **Port 25**: SMTP (mandatory for receiving/transferring mail).
- **Port 587**: STARTTLS submission (mandatory for clients sending mail).

---

*Chitrapatang Terminal — Postfix Mail Server Specification.*
