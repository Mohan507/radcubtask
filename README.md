# Contact Us & Admin Dashboard
---------------------------------

A modern Contact Us page and Admin Dashboard built using React, TypeScript, and Vite.
This project focuses on clean UI design, smooth animations, form validation, and responsive layout without relying on heavy UI libraries.
----------------------------------------------------------------
# Live Demo: https://contactadmindashboardpage.netlify.app/

# GitHub Repository: https://github.com/Mohan507/radcubtask.git
------------------------------------------------------------------
# Tech Stack

React


TypeScript

Vite

React Hook Form

Pure CSS (No UI frameworks)

Netlify for deployment

Optional tools (if implemented):

Framer Motion for animations

Redux Toolkit for state management

React Query

Jest + React Testing Library
----------------------------------------------
# Features

# Contact Us Page
# Admin Dashboard

Fully custom layout inspired by the visual style of radcube.com

Clean and professional UI

Smooth entrance animations when the page loads

Interactive hover and focus states

Modern responsive layout

Form Validation

The form is built using React Hook Form.

Validation includes:

All fields are required

Email format validation

Email validation runs on blur (after leaving the field) instead of while typing

Friendly error messages for invalid inputs

Smooth animated error appearance

Valid fields show a success state (green border)

Form Submission

The form calls a mock API function.

Behavior:

Uses a Promise with a simulated delay using setTimeout

Submitted data is logged to the console

Submit button shows a loading state

A success toast notification appears after submission

A 20% random failure simulation is included to demonstrate error handling

Example submission object:

{
  name: "John Doe",
  email: "john@example.com",
  subject: "Project Inquiry",
  message: "I would like to discuss a collaboration.",
  timestamp: "2026-03-05T12:30:00"
}
----------------------------------------------------------------
# Admin Dashboard Page

The Admin Dashboard displays all contact form submissions.

Displayed fields:

Name

Email

Subject

Message

Timestamp

Layout

A table layout was chosen because it presents structured data clearly and scales better when there are many submissions.

Features

View all contact form submissions

Search or filter submissions by name or email

Fully responsive layout

Mobile-friendly design

Meaningful empty state when there are no submissions

Example empty state message:

No submissions yet. Once users submit the contact form, they will appear here.

Sort by name or date

Staggered fade-in animation for rows
-------------------------------------------------------------------------
# Project Structure
src
  components
    ContactForm
    Toast
    Modal
    DashboardTable

  pages
    ContactPage
    AdminDashboard

  hooks
    useMockApi.ts

  styles
    global.css

  types
    submission.ts

  App.tsx
  main.tsx
-----------------------------------------------------------
# Installation & Setup

1. Clone the repository

git clone https://github.com/yourusername/your-repo-name.git

2. Navigate into the project folder

cd your-repo-name

3. Install dependencies

npm install

4. Start the development server

npm run dev

The application will run at:

# http://localhost:5173

# Build for Production

To build the project:

npm run build

To preview the production build:

npm run preview
----------------------------------------------------
# Deployment

This project is deployed using Netlify.