# CHIREC MUN 2025 Website

Welcome to the official codebase for the **CHIREC MUN 2025** website!

## Overview
A premium, modern, and fully responsive website for CHIREC MUN 2025, featuring dynamic content, a beautiful UI, and a powerful admin panel. Built with HTML, Tailwind CSS, and custom JavaScript, this site is designed to impress delegates, faculty, and visitors alike.

## Features
- **Dynamic Committees:** All committee data is loaded from a central `committees.json` file for easy updates.
- **Admin Panel:** Secure login, edit committees, update registration link/announcement, and manage global site data.
- **Registration Page:** Always displays the latest registration link and announcement (live from Google Sheets via SheetDB API).
- **OC Heads Page:** Beautiful grid of Organizing Committee heads, easily customizable.
- **Premium Design:** Gold/black/red color scheme, glassy navbar/footer, animated hero, countdown timer, and site-wide particles background.
- **Mobile-First & Responsive:** Looks stunning on all devices.
- **Sticky Register Button:** Always-visible call-to-action for mobile users.
- **Easy Customization:** All content and branding can be updated via JSON or HTML.

## Setup Instructions
1. **Clone or Download** this repository.
2. Place all files in your web server or open `index.html` directly in your browser.
3. To enable live registration/announcement updates, configure your SheetDB API in the admin panel JS.
4. For dynamic committees, edit `committees.json`.
5. For OC Heads, edit `ocheads.html` (replace images, names, and roles as needed).

## How to Run

This is a static website. You can run it in any of the following ways:

- **Option 1: Open Directly**
  - Double-click `index.html` or open it in your browser.
  - (Some features like dynamic fetch may not work due to browser security restrictions.)

- **Option 2: Use a Local Web Server (Recommended)**
  - This enables all features (fetch, dynamic loading, etc.).
  - **VS Code:** Use the Live Server extension.
  - **Python:**
    ```sh
    # In the project folder:
    python -m http.server 8080
    # Then open http://localhost:8080 in your browser
    ```
  - **Node.js:** Use `npx serve` or any static server.
  - **Netlify/Vercel:** Upload the folder for instant deployment.

**Note:** For full admin and dynamic content functionality, always use a web server (local or hosted).

## File Structure
```
├── index.html           # Landing page (hero, committees, countdown, etc.)
├── committees.html      # Committees grid
├── committee-detail.html# Committee detail template
├── register.html        # Registration info & link
├── admin.html           # Admin panel (login, edit, global settings)
├── ocheads.html         # Organizing Committee Heads page
├── committees.json      # Committees data (dynamic)
├── style.css            # Custom styles & overrides
├── script.js            # Custom JS (dynamic loading, animations, admin logic)
├── logo.png             # Branding logo
```

## Customization
- **Branding:** Replace `logo.png` and update colors in `style.css` as needed.
- **Committees:** Edit `committees.json` for instant updates across the site.
- **OC Heads:** Edit the grid in `ocheads.html` (add photos, names, roles).
- **Admin Password:** Change the password in `admin.html` JS for security.
- **Particles/Animations:** Tweak the config in `script.js` for different effects.

## Credits
- **Design & Development:** Your team + AI assistance
- **Libraries:** Tailwind CSS, Swiper.js, tsParticles, AOS, SheetDB
- **Branding:** CHIREC MUN 2025 Organizing Committee

---

For questions or contributions, contact [contact.mun@chirec.ac.in](mailto:contact.mun@chirec.ac.in) or visit [@chirecmun](https://instagram.com/chirecmun) on Instagram. 