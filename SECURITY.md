# Security Policy

## Supported Versions

KSP Strategic Intelligence Hub receives continuous security updates. We strongly encourage utilizing the `main` branch to inherit the latest security patches for the ZIA Engine and Catalyst backend.

| Version | Supported          | Security Scope |
| ------- | ------------------ | -------------- |
| 1.0.x   | :white_check_mark: | Backend API & ML inference logic |
| < 1.0   | :x:                | Unsupported |

## Reporting a Vulnerability

We take the security of government and police telemetry systems extremely seriously. Given the potential application of this technology in real-world geospatial crime analytics, any discovered vulnerability will be treated as critical.

If you discover a security vulnerability, please **DO NOT** open a public issue. Instead, follow these steps:

1. Send an email to the repository maintainer (via the contact info in our GitHub profile) outlining the exact vector of the vulnerability.
2. Include the Catalyst runtime version, Python version, and OS where the bug was replicated.
3. Allow up to 48 hours for a direct technical response.

### What to Report?

*   **API Injections / XSS:** Any bypass allowing injection into the Zoho Catalyst backend endpoints (`/predict-risk`, `/geo-clusters`).
*   **Data Exfiltration / IDOR:** Weaknesses allowing unauthenticated reading of `Consolidated_Analytical_Master.csv` or `Syndicate_Graph_Data.json`.
*   **Supply Chain Weaknesses:** Found a vulnerable dependency not caught by Dependabot, Bandit, or CodeQL.

### Reward/Recognition
We will publicly acknowledge the reporter in our release notes and `SECURITY_ADVISORIES.md` file (unless you prefer to remain anonymous) after the vulnerability has been patched and merged.
