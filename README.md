# Rate Card Calculator

A dynamic web application designed to calculate rates for custom resources and SWAT teams, featuring multi-currency support, an integrated email quote system, and robust data management.

## ✨ Features

*   **Custom Resource Calculator:** Calculate monthly rates based on Role, Region, and Seniority Level.
*   **SWAT Team Calculator:** Calculate rates with workload flexibility and duration discounts, including a fixed 20% SWAT Team discount.
*   **Multi-Currency Support:** Convert rates to various currencies with real-time exchange rates.
*   **Email Quote System:** Send detailed rate quotes to clients via email and store them in the database.
*   **Client-Side Caching:** Utilizes React Query for efficient data fetching and caching, providing a smooth user experience.
*   **Responsive Design:** Optimized for various screen sizes.

## 🚀 Technologies Used

*   **Next.js 14+ (App Router):** React framework for building full-stack web applications.
*   **React Query (TanStack Query):** Powerful library for data fetching, caching, and synchronization.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
*   **shadcn/ui:** Reusable UI components built with Radix UI and Tailwind CSS.
*   **Supabase:** Open-source Firebase alternative for database (PostgreSQL) and authentication.
*   **Nodemailer:** Module for sending emails from Node.js applications.
*   **Lucide React:** Beautiful and customizable open-source icons.

## 🛠️ Setup Instructions

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/rate-card-calculator.git
cd rate-card-calculator
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# Or using yarn
# yarn install
\`\`\`

### 3. Supabase Setup

This project uses Supabase for its database.

1.  **Create a Supabase Project:**
    *   Go to [Supabase](https://supabase.com/) and create a new project.
    *   Note down your Project URL and `anon` public key from `Project Settings > API`.

2.  **Run SQL Scripts:**
    *   In your Supabase project dashboard, navigate to `SQL Editor`.
    *   Create the necessary tables by running the content of `scripts/create-tables.sql`.
    *   Seed the database with initial data by running the content of `scripts/seed-data.sql`.

### 4. Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials.

\`\`\`
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Service (for sending quotes)
# You can use services like Mailtrap (for testing), SendGrid, Resend, etc.
# Ensure your host, port, user, and password are correct for your chosen service.
EMAIL_SERVER_HOST=your_email_smtp_host (e.g., smtp.mailtrap.io, smtp.resend.com)
EMAIL_SERVER_PORT=your_email_smtp_port (e.g., 587 for TLS, 465 for SSL)
EMAIL_SERVER_USER=your_email_smtp_username
EMAIL_SERVER_PASSWORD=your_email_smtp_password
EMAIL_FROM="Your Company <no-reply@yourcompany.com>" # Sender email address

# Exchange Rate API (Optional, but recommended for real-time currency updates)
# Get a free API key from https://www.exchangerate-api.com/
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
\`\`\`

**Environment Variable Descriptions:**

*   \`NEXT_PUBLIC_SUPABASE_URL\`: Your Supabase project URL. This is publicly accessible.
*   \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`: Your Supabase public `anon` key. This is publicly accessible.
*   \`EMAIL_SERVER_HOST\`: The SMTP host for your email service provider.
*   \`EMAIL_SERVER_PORT\`: The SMTP port for your email service (commonly 587 or 465).
*   \`EMAIL_SERVER_USER\`: The username for authenticating with your email service.
*   \`EMAIL_SERVER_PASSWORD\`: The password for authenticating with your email service.
*   \`EMAIL_FROM\`: The email address that will appear as the sender of the quotes.
*   \`EXCHANGE_RATE_API_KEY\`: Your API key for `exchangerate-api.com`. This is used to fetch real-time currency exchange rates.

### 5. Run the Development Server

\`\`\`bash
npm run dev -- --turbopack
# Or using yarn
# yarn dev -- --turbopack
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🚀 Deployment

This application is designed to be easily deployed to Vercel.

1.  **Create a Vercel Project:**
    *   Sign up or log in to [Vercel](https://vercel.com/).
    *   Import your Git repository (e.g., from GitHub, GitLab, Bitbucket).

2.  **Configure Environment Variables on Vercel:**
    *   During the deployment setup on Vercel, you will be prompted to add environment variables. Add all the variables from your `.env.local` file (except those prefixed with `NEXT_PUBLIC_` which are automatically exposed).
    *   Ensure you add them as "Production" and "Development" (and "Preview" if applicable) variables.

3.  **Link Supabase (Optional but Recommended):**
    *   Vercel has a direct integration with Supabase. You can link your Supabase project during the deployment setup, and Vercel will automatically configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for you.

4.  **Deploy:**
    *   Once configured, deploy your project. Vercel will build and deploy your Next.js application.

Your application will be live at the Vercel URL provided after a successful deployment!

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
