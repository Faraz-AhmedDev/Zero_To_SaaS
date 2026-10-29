# Contributing to ZeroToSaaS

Thank you for your interest in contributing to **ZeroToSaaS**! 🚀

We welcome all contributions from bug reports and documentation fixes to new features and UI improvements.

---

## 🛠️ Code of Conduct

We are committed to providing a welcoming, diverse, and inclusive environment. Please treat every contributor and user with respect and courtesy.

---

## 🚀 How to Contribute

### 1. Fork the Repository
Click the **Fork** button at the top right of this repository to create your personal copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/Zero_To_SaaS.git
cd Zero_To_SaaS
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Sensible local defaults are provided so you don't need real third-party keys for basic development).*

### 5. Start Local PostgreSQL & Push Schema
```bash
# Start local PostgreSQL via Docker
docker compose up -d

# Push Drizzle schema to your database
npm run db:push
```

### 6. Create a Feature Branch
Create a descriptive branch for your work:
```bash
git checkout -b feat/your-feature-name
# or for bug fixes:
git checkout -b fix/issue-description
```

### 7. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your changes.

---

## 🧪 Verification & Quality Checklist

Before opening a pull request, ensure your code meets our quality standards:

1. **Type Checking**:
   ```bash
   npx tsc --noEmit
   ```
2. **Production Build**:
   ```bash
   npm run build
   ```
3. **Commit Messages**: Follow standard conventional commits format (e.g. `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`).

---

## 📬 Submitting a Pull Request

1. Push your branch to your forked repository:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request on the main repository (`Faraz-AhmedDev/Zero_To_SaaS`).
3. Describe the problem your PR solves and attach screenshots/GIFs for UI changes.

---

## 💡 Reporting Bugs & Requesting Features

- **Bug Reports**: Open an issue using the [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md).
- **Feature Requests**: Open an issue using the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md).

Thank you for helping make ZeroToSaaS the best open-source SaaS starter! ⭐
