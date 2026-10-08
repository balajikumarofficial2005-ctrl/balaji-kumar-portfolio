# Balaji Kumar — Portfolio

A responsive personal portfolio based on the supplied resume, with project details, skills, education, contact links, and a downloadable copy of the resume. Built with plain HTML, CSS, and JavaScript. All visual assets and fonts work locally.

## Open and preview in VS Code

1. Open **Balaji-Kumar-Portfolio.code-workspace** in VS Code using **File → Open Workspace from File…**.
2. Select **Terminal → New Terminal**.
3. Enter `npm start`.
4. Open **http://localhost:5500** in your browser.

The preview server requires Node.js 18 or later. There are no packages to install: **you do not need to run `npm install`**. If PowerShell blocks the `npm` command, run `node server.js` instead. Stop the preview with **Ctrl+C** in its terminal.

You can also choose **Terminal → Run Task… → Preview portfolio** in VS Code to start the same server.

**Without Node.js:** open `index.html` directly in a modern browser. The site works as local files; if copying the email address is blocked by browser permissions, select and copy the displayed address instead.

## Make it yours

| File | What to edit |
| --- | --- |
| `index.html` | Intro, project cards, skills, education, certifications, and contact links |
| `styles.css` | Colors in `:root`, typography, layout, and mobile styles |
| `script.js` | The `projects` object controls the details shown when a project is opened; the `emailAddress` value controls the copy button |
| `assets/Balajikumar_resume.pdf` | Replace with an updated resume using the same filename |
| `assets/balaji-kumar.jpeg` | Your profile photo in the opening section |
| `assets/tripfinder.svg` and `assets/task-api.svg` | Project concept illustrations |
| `assets/favicon.svg` | Browser tab icon |

When changing your email, update both its links in `index.html` and `emailAddress` in `script.js`. The footer year updates automatically.

## Project visuals and links

The project visuals are original concept illustrations created for this portfolio, **not screenshots of the actual projects**. Each is labelled on the page. Replace them with real project screenshots when available, and update the image descriptions and captions in `index.html`.

Verified project repository and live demo URLs were not supplied, so the project details link to the GitHub profile from the resume. Add project-specific links only after confirming their destinations.

Contact buttons open email, phone, GitHub, or LinkedIn applications/pages. There is no contact form backend. The site supports GitHub Pages: publish the main branch from the repository root.
