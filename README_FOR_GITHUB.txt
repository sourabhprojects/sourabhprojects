Sourabh Projects v9.26.1

Upload all website files into the same GitHub Pages repository root.

New local account features:
- profile.html: profile and future level/unlock system
- mailbox.html: per-user local mailbox
- style.css: purple/light-blue 3D profile and mailbox styling
- login.html: signup now includes password confirmation and creates a welcome mailbox message

IMPORTANT: This edition is still LOCAL/FRONTEND ONLY. User accounts, passwords, profiles and mailbox data are stored in the visitor browser using localStorage. This is not secure authentication and mailbox messages are not shared between visitors.

The later ONLINE edition should replace localStorage authentication/data with a real backend/database and server-side access rules. Do not use real passwords on this local demo.
