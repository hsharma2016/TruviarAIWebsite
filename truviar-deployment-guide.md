# TRUVIAR WEBSITE — COMPLETE DEPLOYMENT GUIDE

**Stack:** Static HTML/CSS/JS → GitHub → Netlify → Porkbun domain
**Forms:** Calendly (strategy sessions) + Google Sheets via Google Apps Script (podcast forms)
**Estimated time:** 45–60 minutes for first deploy

---

## PHASE 1 — GET YOUR CODE ON GITHUB (10 minutes)

You need your code in a GitHub repository so Netlify can auto-deploy whenever you push changes.

### Step 1: Create a GitHub account (skip if you have one)
Go to https://github.com and sign up.

### Step 2: Install Git (skip if already installed)
Open your VS Code terminal and check:
```bash
git --version
```
If it says "not found", install from https://git-scm.com/downloads

### Step 3: Create a GitHub repo
1. Go to https://github.com/new
2. Repository name: `truviar-website`
3. Set to **Private** (your business site code doesn't need to be public)
4. Don't initialise with README (you already have files)
5. Click **Create repository**

### Step 4: Push your local code
In VS Code, open the terminal in your `truviar-website/` folder and run:
```bash
git init
git add .
git commit -m "Initial commit — Truviar AI Consulting website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/truviar-website.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your actual GitHub username.

---

## PHASE 2 — DEPLOY TO NETLIFY (10 minutes)

Netlify hosts static sites for free with HTTPS, a CDN, and auto-deploys from GitHub.

### Step 1: Create a Netlify account
Go to https://app.netlify.com and sign up with your GitHub account.

### Step 2: Connect your repo
1. Click **"Add new site"** → **"Import an existing project"**
2. Select **GitHub** as your Git provider
3. Authorise Netlify to access your GitHub
4. Select the `truviar-website` repository

### Step 3: Configure build settings
Your site is plain HTML — no build step needed:
- **Branch to deploy:** `main`
- **Build command:** *(leave blank)*
- **Publish directory:** `.` (or `/` — this means the root of your repo)

If your files are in a subfolder, put that folder name instead (e.g., `public/` or `dist/`).

### Step 4: Click Deploy
Netlify will assign you a temporary URL like `https://random-name-12345.netlify.app`. Visit it to confirm your site is live.

---

## PHASE 3 — CONNECT YOUR PORKBUN DOMAIN (15 minutes)

### Step 1: Add your domain in Netlify
1. In Netlify, go to **Site settings** → **Domain management** → **Add custom domain**
2. Enter your domain (e.g., `truviar.com`)
3. Netlify will ask you to verify ownership — click **Verify** then **Add domain**
4. Also add `www.truviar.com` as a domain alias

### Step 2: Get Netlify's DNS records
Netlify will show you the DNS records you need. You'll see something like:
- **A record:** `75.2.60.5` (Netlify's load balancer)
- **CNAME for www:** `your-site-name.netlify.app`

### Step 3: Update DNS in Porkbun
1. Log in to https://porkbun.com
2. Go to **Domain Management** → click your domain
3. Click **DNS Records**
4. **Delete** any existing A records and CNAME records for the root domain
5. **Add** these records:

| Type | Host | Answer | TTL |
|------|------|--------|-----|
| **A** | *(leave blank or @)* | `75.2.60.5` | 600 |
| **CNAME** | `www` | `your-site-name.netlify.app` | 600 |

*Replace `your-site-name.netlify.app` with your actual Netlify subdomain.*

**Alternative (recommended): Use Netlify DNS entirely**
Instead of editing Porkbun DNS records, you can point your Porkbun nameservers to Netlify's DNS for the simplest setup:
1. In Netlify → Domain settings → click **Set up Netlify DNS**
2. Netlify gives you nameservers (e.g., `dns1.p06.nsone.net`, `dns2.p06.nsone.net`, etc.)
3. In Porkbun → Domain Management → your domain → **Nameservers** → replace the Porkbun defaults with Netlify's nameservers
4. This gives Netlify full control of DNS — simplest to manage, auto-provisions HTTPS

### Step 4: Wait for propagation
DNS changes take 5 minutes to 48 hours. Usually it's under 30 minutes with Porkbun.

### Step 5: Enable HTTPS
In Netlify → Domain management → HTTPS → Click **Verify DNS configuration** then **Provision certificate**. Netlify handles Let's Encrypt SSL automatically once DNS propagates.

---

## PHASE 4 — WIRE UP CALENDLY FOR STRATEGY SESSIONS (10 minutes)

Your contact form currently submits to nothing. You have two options:

### Option A — Replace the form with a Calendly embed (recommended)
This removes the form entirely and embeds your Calendly scheduling page directly on contact.html. Prospects book a slot immediately — no email back-and-forth.

**Claude Code instruction:**
```
In contact.html, replace the contact-form-card div (the entire <div class="contact-form-card"> 
through its closing </div>) with a Calendly inline embed:

<div class="contact-form-card" style="padding: 0; border: none; box-shadow: none; min-height: 700px;">
  <div class="calendly-inline-widget" 
       data-url="https://calendly.com/YOUR_CALENDLY_USERNAME/strategy-session?hide_gdpr_banner=1&primary_color=059966" 
       style="min-width:320px;height:700px;">
  </div>
  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
</div>

Replace YOUR_CALENDLY_USERNAME with your actual Calendly handle.
The primary_color parameter uses your brand green #059966.
```

**Calendly setup:**
1. Go to https://calendly.com and create a free account (or log in)
2. Create an event type called **"Strategy Session"**
3. Set it to 30 minutes
4. Set your availability (accommodate client time zones)
5. Add custom questions to collect qualifying info:
   - Firm name (text, required)
   - Type of consulting (dropdown: Management, IT, Financial, Marketing, Engineering, HR, Other)
   - Firm size (dropdown: Solo, 3–10, 11–30, 30+)
   - Average project value (dropdown: $5K–$20K, $20K–$50K, $50K–$150K, $150K+)
   - Biggest pipeline challenge (text area)
6. Your Calendly link will be: `https://calendly.com/YOUR_USERNAME/strategy-session`

### Option B — Keep the form, add a Calendly link after submission
If you prefer keeping the qualifying form and sending a booking link manually:

**Claude Code instruction:**
```
In contact.html, update the form submission handler in the <script> at the bottom.
After the success state, show a message like:
"✓ Received! You'll get a booking link within 1 business day."

Wire the form to Google Sheets (see Phase 5) so submissions 
are logged, then manually send your Calendly link to qualified leads.
```

### Also update all "Book Your Strategy Session" CTA buttons
If you go with Option A, update the main CTA buttons across all pages to link directly to Calendly:

**Claude Code instruction:**
```
In ALL 6 HTML files, find every <a> tag with href="contact.html" that says 
"Book Your Strategy Session" or "Book a Call" or "Request My Free Strategy Session"
and consider whether it should:
  a) Still go to contact.html (which now has Calendly embedded), OR
  b) Go directly to https://calendly.com/YOUR_USERNAME/strategy-session

Recommendation: Keep contact.html as the destination (it has the sidebar context, 
guarantee mini-badge, and "what to expect" section that builds trust before booking). 
The Calendly embed on that page handles the actual scheduling.
```

---

## PHASE 5 — GOOGLE SHEETS FOR PODCAST FORMS (15 minutes)

This handles the **"Notify Me at Launch"** and **"Apply to Be a Guest"** forms on podcast.html by sending submissions directly to Google Sheets — no server needed.

### Step 1: Create the Google Sheet
1. Go to https://sheets.google.com and create a new spreadsheet
2. Name it **"Truviar — Podcast Submissions"**
3. Create two tabs:
   - **Tab 1:** "Notify List" with headers: `Timestamp | Email`
   - **Tab 2:** "Guest Applications" with headers: `Timestamp | Name | Firm & Role | Email | Topic Pitch`

### Step 2: Create a Google Apps Script
1. In the spreadsheet, go to **Extensions** → **Apps Script**
2. Delete any existing code and paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  
  if (data.type === 'notify') {
    var tab = sheet.getSheetByName('Notify List');
    tab.appendRow([new Date(), data.email]);
  } else if (data.type === 'guest') {
    var tab = sheet.getSheetByName('Guest Applications');
    tab.appendRow([new Date(), data.name, data.firmRole, data.email, data.topic]);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy** → **New deployment**
4. Type: **Web app**
5. Execute as: **Me**
6. Who has access: **Anyone**
7. Click **Deploy** and copy the web app URL (it looks like `https://script.google.com/macros/s/LONG_ID/exec`)

### Step 3: Update podcast.html form handlers

**Claude Code instruction:**
```
In podcast.html, replace the handleNotify and handleGuest functions at the bottom 
of the file with:

const SHEET_URL = 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec';

function handleNotify(e) {
  e.preventDefault();
  const email = document.getElementById('notify-email').value;
  const btn = e.target.querySelector('button');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'notify', email: email })
  }).then(() => {
    btn.textContent = '✓ You\'re on the list!';
    document.getElementById('notify-success').style.display = 'block';
  }).catch(() => {
    btn.textContent = 'Try again';
    btn.disabled = false;
  });
}

function handleGuest(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea');
  const btn = form.querySelector('button');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'guest',
      name: inputs[0].value,
      firmRole: inputs[1].value,
      email: inputs[2].value,
      topic: inputs[3].value
    })
  }).then(() => {
    btn.textContent = '✓ Application Submitted';
    document.getElementById('guest-success').style.display = 'block';
  }).catch(() => {
    btn.textContent = 'Try again';
    btn.disabled = false;
  });
}

Replace YOUR_APPS_SCRIPT_ID with the actual Apps Script deployment URL.
```

### Important note about `mode: 'no-cors'`
Google Apps Script doesn't return proper CORS headers. Using `no-cors` means the `fetch` won't get a readable response — but the data still arrives in the sheet. The `.then()` fires regardless, which is fine for showing the success message. If you want confirmation that the write actually succeeded, you'd need a proxy or a different form backend (like Formspree).

---

## PHASE 6 — CONTACT FORM FOR GOOGLE SHEETS (if keeping the form alongside Calendly)

If you chose Option B in Phase 4 (keep the contact form), wire it to Google Sheets too:

### Step 1: Add a "Contact Submissions" tab
In the same spreadsheet, add a tab called "Contact Submissions" with headers:
`Timestamp | First Name | Last Name | Email | Firm Name | Role | Consulting Type | Firm Size | Project Value | Challenge`

### Step 2: Update the Apps Script
Add a third condition to the `doPost` function:

```javascript
else if (data.type === 'contact') {
  var tab = sheet.getSheetByName('Contact Submissions');
  tab.appendRow([
    new Date(), data.firstName, data.lastName, data.email,
    data.firmName, data.role, data.consultingType,
    data.firmSize, data.projectValue, data.challenge
  ]);
}
```

Re-deploy the Apps Script (Deploy → New deployment).

### Step 3: Update contact.html form handler
**Claude Code instruction:**
```
In contact.html, update the form submission script to POST to the same 
Google Sheets Apps Script URL, sending:
{
  type: 'contact',
  firstName, lastName, email, firmName, role, 
  consultingType, firmSize, projectValue, challenge
}
Show a success message after submission.
Add name attributes to all form inputs and selects so values can be read.
```

---

## PHASE 7 — PRE-DEPLOY CHECKLIST

Run through this in Claude Code before your first push:

```
PRE-DEPLOY CHECKLIST — paste into Claude Code:

1. Search all files for "YOUR_CALENDLY_USERNAME" — replace with actual Calendly handle
2. Search all files for "YOUR_APPS_SCRIPT_ID" — replace with actual Google Apps Script URL
3. Search all files for href="#" — only Privacy Policy and Terms should remain (if pages not yet created)
4. Search all files for "<!-- TODO" — resolve or acknowledge each one
5. Search all files for "[email protected]" or "cf_email" — verify Cloudflare email decode script is present
6. Verify all 6 pages have consistent nav links and footer content
7. Verify the Calendly embed loads correctly on contact.html
8. Test at 375px, 768px, 1280px in browser DevTools
9. Run Lighthouse audit (Chrome DevTools → Lighthouse) — target 90+ on Performance and Accessibility
10. Verify the Google Sheets script receives test submissions from both podcast forms
```

---

## PHASE 8 — DEPLOY AND GO LIVE

### First deploy
```bash
cd truviar-website
git add .
git commit -m "Pre-deploy: all fixes applied, forms wired, Calendly integrated"
git push origin main
```
Netlify auto-deploys within 30–60 seconds. Check your Netlify URL.

### Every future update
```bash
git add .
git commit -m "Description of what changed"
git push origin main
```
Netlify auto-deploys. That's it. No FTP, no server management, no manual uploading.

---

## PHASE 9 — POST-DEPLOY (same day)

### Add Google Analytics 4
1. Go to https://analytics.google.com → Create a property for your domain
2. Get the measurement ID (starts with `G-`)
3. Add to every HTML file, just before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ID');
</script>
```

### Add a favicon
Place your logo as a 32x32 PNG in the root folder and add to every `<head>`:
```html
<link rel="icon" type="image/png" href="favicon.png">
```

### Set up email forwarding (optional)
If you want `hemant@truviar.com` to work:
1. In Porkbun → Email → Email Forwarding
2. Forward `hemant@truviar.com` → your personal email
3. This is free with Porkbun

---

## QUICK REFERENCE — YOUR DEPLOYMENT STACK

| Component | Service | Cost |
|-----------|---------|------|
| **Hosting** | Netlify (free tier) | $0/month |
| **Domain** | Porkbun | ~$10/year (already owned) |
| **SSL/HTTPS** | Netlify (auto Let's Encrypt) | $0 |
| **CDN** | Netlify (included) | $0 |
| **Strategy session booking** | Calendly (free tier) | $0/month |
| **Podcast form backend** | Google Sheets + Apps Script | $0 |
| **Analytics** | Google Analytics 4 | $0 |
| **Email** | Porkbun email forwarding | $0 |
| **Version control** | GitHub (private repo) | $0 |
| **Total monthly cost** | | **$0/month** |

---

## EXECUTION ORDER SUMMARY

1. Run both Claude Code audit fix sessions (colour + content)
2. Create GitHub repo and push code
3. Connect repo to Netlify
4. Point Porkbun domain to Netlify
5. Set up Calendly event + embed on contact.html
6. Set up Google Sheets + Apps Script for podcast forms
7. Run pre-deploy checklist
8. Push to GitHub → Netlify auto-deploys
9. Verify domain, HTTPS, forms, and mobile responsiveness
10. Add GA4 and favicon
