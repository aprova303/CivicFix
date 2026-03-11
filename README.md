# CivicFix

A community-driven platform empowering citizens to report and resolve civic issues in their neighborhoods.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project

CivicFix is a community-driven platform that empowers citizens to report and resolve civic issues in their neighborhoods. Users can submit detailed reports about local problems, browse existing issues, track the status of their reports, and contribute to positive change in their communities. The platform bridges the gap between citizens and local authorities by providing a transparent, organized system for issue management.

---

## Project Overview

CivicFix aims to:

- Increase civic engagement and community awareness
- Provide a transparent system for tracking local issues
- Enable efficient communication between citizens and authorities
- Create a collaborative environment for community problem-solving

**Key Stats:**

- Full-stack web application with authentication
- RESTful API with external service integration
- Responsive design for mobile and desktop users
- Secure database storage with role-based access

---

## Key Features

- **Report Issues** — Submit civic issues with detailed descriptions, images, and severity levels
- **Browse Issues** — Explore all reported issues in the community with advanced filtering
- **Issue Management** — Track and manage issues you've reported with real-time status updates
- **User Authentication** — Secure login and registration with email/password or OAuth
- **Issue Details** — View comprehensive information including status, priority, and community feedback
- **Responsive Design** — Fully optimized UI for mobile, tablet, and desktop devices

---

## Tech Stack

**Frontend:** React.js · Next.js · Tailwind CSS · DaisyUI · React Icons

**Backend:** Node.js · Next.js API Routes · MongoDB · Mongoose

**Authentication:** NextAuth.js · JWT

**Tools & Services:** Git · Vercel · Firebase · REST APIs

---

## Dependencies

```json
{
  "next": "^14.x",
  "react": "^18.x",
  "mongoose": "^7.x",
  "next-auth": "^4.x",
  "tailwindcss": "^3.x",
  "daisyui": "^3.x",
  "react-hot-toast": "^2.x",
  "react-icons": "^4.x"
}
```

---

## Installation & Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/aprova303/CivicFix.git
cd CivicFix
npm install
```

2. Set up environment variables by creating a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

3. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Folder Structure

```plaintext
CivicFix/
│
├── src/
│   ├── app/
│   │   ├── api/              # API routes (auth, issues, proxy)
│   │   ├── components/       # Reusable components
│   │   ├── Issues/           # Issue detail pages
│   │   ├── browse-issues/    # Issue browsing page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── manage/           # Manage issues page
│   │   └── layout.jsx        # Root layout
│   ├── models/               # MongoDB schemas (Issue, User)
│   ├── lib/                  # Database connection
│   ├── data/                 # Static data files
│   └── middleware.js         # Next.js middleware
│
├── scripts/                  # Utility scripts
├── public/                   # Static assets
├── package.json              # Dependencies
└── vercel.json              # Vercel deployment config
```

---

## Contributions

This project was developed as a collaborative effort to improve civic engagement. Contributors include team members working on frontend, backend, and deployment.

---

## How to Contribute

We welcome contributions! Here's how you can help:

- Fork the Project
- Create a feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## Contact

**GitHub:** [aprova303](https://github.com/aprova303/CivicFix)

**Email:** [provaananya@gmail.com](mailto:provaananya@gmail.com)

**Portfolio:** [Your Portfolio](https://yourportfolio.com)
