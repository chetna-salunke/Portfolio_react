# 🚀 Chetna Salunke — Portfolio

Personal portfolio built with **React · TypeScript · Redux Toolkit · Tailwind CSS**  
Featuring unit tests with **Jest + React Testing Library** and deployed on **Netlify**.

---

## 🛠 Tech Stack

| Category      | Technology                          |
|---------------|-------------------------------------|
| Framework     | React 18 + TypeScript               |
| State         | Redux Toolkit                       |
| Styling       | Tailwind CSS                        |
| Build Tool    | Vite                                |
| Testing       | Jest + React Testing Library        |
| Deployment    | Netlify                             |

---

## 📁 Project Structure

```
src/
├── components/       # React components (Navbar, Hero, About, Skills, Projects, Contact, Footer)
├── store/
│   ├── index.ts      # Redux store + typed hooks
│   └── slices/
│       └── portfolioSlice.ts   # Theme, activeSection, contactFormStatus
├── types/
│   └── index.ts      # Shared TypeScript interfaces
└── __tests__/        # Unit tests for all key components
```

---

## ⚡ Getting Started Locally

### Step 1 — Install Node.js
Download from https://nodejs.org (version 18 or higher)

### Step 2 — Extract & Open Folder
Unzip the project folder and open it in VS Code

### Step 3 — Install Dependencies
Open terminal in VS Code and run:
```bash
npm install
```

### Step 4 — Start Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser ✅

### Step 5 — Run Tests
```bash
npm test
```

### Step 6 — Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Netlify (Step-by-Step)

### Option A — Netlify Drop (Easiest — No Account Needed)
1. Run `npm run build` — this creates a `dist/` folder
2. Go to https://app.netlify.com/drop
3. Drag and drop the `dist/` folder onto the page
4. Your site is LIVE instantly! Copy the URL 🎉

### Option B — GitHub + Netlify (Recommended for auto-deploy)
1. Push this project to a GitHub repository
2. Go to https://netlify.com → Sign up free
3. Click **"Add new site" → "Import an existing project"**
4. Connect your GitHub account → Select your repo
5. Set these build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy site** → Live in ~2 minutes! 🚀

---

## ✏️ Customise Before Deploying

Open these files and update your info:

| File                          | What to update                              |
|-------------------------------|---------------------------------------------|
| `src/components/Hero.tsx`     | Your name, bio text                         |
| `src/components/About.tsx`    | Stats, LinkedIn URL, about text             |
| `src/components/Projects.tsx` | Add real GitHub/Live URLs to your projects  |
| `src/components/Contact.tsx`  | Your email, LinkedIn URL                    |
| `index.html`                  | Page title and meta description             |

---

## 🧪 Unit Tests Coverage

| Test File                        | What it tests                                  |
|----------------------------------|------------------------------------------------|
| `portfolioSlice.test.ts`         | Redux actions: toggleTheme, setActiveSection, setContactFormStatus |
| `Hero.test.tsx`                  | Renders name, CTAs, Open to Work badge         |
| `Skills.test.tsx`                | Filter tabs, skill rendering                   |
| `Contact.test.tsx`               | Form validation — empty, invalid email, short message |

---

## 📝 License
MIT — Free to use and customise.
