# Real-Time Document Collaboration Platform

A modern, real-time document collaboration platform built with Next.js, Supabase, and Liveblocks. This application allows users to create, edit, and collaborate on documents in real-time with other users.

[Watch the demo here !!](https://youtu.be/hBYfwCrmH4k)

## Features

- **Real-time Collaboration**: Multiple users can edit documents simultaneously
- **User Authentication**: Secure authentication system using Supabase
- **Rich Text Editor**: Feature-rich document editor with formatting options
- **Document Management**: Create, access, and manage multiple documents
- **User Profiles**: Customizable user profiles with avatars and preferences
- **Access Control**: Granular control over document access and permissions

## Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Real-time Engine**: Liveblocks
- **UI Components**:
  - Shadcn/ui
  - TipTap Editor
  - Tailwind CSS
- **Type Safety**: TypeScript

## Project Structure

```
├── app
│   ├── api             # api endpoints (liveblocks-auth, add-user-to-room, create-room)
│   ├── (auth)          # the email confirmation module
│   ├── components      # Some Costume ui components
│   ├── editor          # Editor page with dynamic routing (depends on the room Id)
│   ├── error           # Error page
│   ├── login           # Login and signup page with utility fucntions (actions.ts)
│   ├── playground      # Document management
│   ├── setup_profile   # Profile setup
│   ├── styles
│   ├── no-access       # No access page
│   ├── utils 
│   ├── layout.jsx
│   ├── page.jsx
│   └── middleware.ts
├── components          # shadcn components
│   ├── login-form.tsx
│   ├── signup-form.tsx
│   └── ui
└── lib
    └── utils.ts
```

## Key Components

- **Editor**: Real-time collaborative editor built with TipTap and Liveblocks
- **Room**: Manages real-time connections and user presence
- **Authentication Flow**: Complete auth system with login, signup, and profile setup
- **Document Management**: Interface for creating and managing documents
- **Access Control**: System for managing document permissions and user access

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/real-time-document-collaboration.git
cd real-time-document-collaboration
```

2. Install docker if not installed [Docker](https://docs.docker.com/engine/install/)
3. Build the docker Image

```bash
docker build -t <your-image-name> .
```

4. Run the docker container

```bash
docker run -p 3000:3000 <your-image-name>
```

## Environment Setup

The application requires the following services:

1. **Supabase Project**

   - Authentication setup
   - Database with required tables (profiles, etc.)

2. **Liveblocks Account**
   - API key for real-time collaboration
   - Room management setup
