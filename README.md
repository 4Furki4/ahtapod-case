# Text Post Web App - Ahtapod Case Study

In this project, I have created a simple web application that allows users to create, read, update, and delete text posts. The application is built using Next.js, a React framework, and Tailwind CSS and ShadCN UI for styling. The application uses MongoDB as the database to store the text posts and user information. The application is deployed on Vercel and can be accessed [here](https://ahtapod-case.vercel.app/).

## Features

- Users can create a new text post by entering a title and content. I've managed to add the created or edited post to the list of posts or remove them from the list when a post deleted without refreshing the page using the react-query library's state-management features.
- Users can sign up and log in to the application through the clerk auth service. I set up a webhook to save the user information to the database when a new user signs up.
- Posts are paginated, and users can navigate between pages to view all posts.
- Forms are validated using the react-hook-form library to ensure that the user enters the correct information.
- Dashboard page is protected, and only authorized users can access it. Also, only signed-in users can create posts.

## Technologies

- Next.js 14
- React 18
- Tailwind CSS
- ShadCN UI
- MongoDB
- Prisma
- Clerk Auth Service
- React Query
- Axios
- React Hook Form
- zod
- Next Themes
- Vercel

## Installation

### Required Environment Variables

````bash
DATABASE_URI=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
# You can get the following keys from the Clerk dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=
# You'll need this in production
NEXT_PUBLIC_API_URL=
````
### Setting Webhook Up for Local Development

- To set up a webhook for local development, you need to install the [``ngrok``](https://ngrok.com/) package. Please follow instructions [`here`](https://clerk.com/docs/integrations/webhooks/overview)

`You also need a backend server to get the posts. Here's the repo of the backend server that I used in this project:` [Backend Server](https://github.com/4Furki4/ahtapod-backend)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
