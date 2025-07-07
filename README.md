# Halliday: Smart Scheduling

Halliday is a **Next.js application** designed to streamline the process of scheduling lectures and allocating halls within an academic institution. It provides an intelligent solution for managing faculty preferences, hall availability, and course scheduling, leveraging the power of generative AI to create optimized timetables. This project is built with a modern tech stack including **TypeScript, React, and Tailwind CSS**, and utilizes **shadcn/ui** for its component library.

-----

## Core Features

  - **Faculty Management:** Define and manage faculty members, including their departmental affiliations, preferred teaching halls, and availability.
  - **Hall Management:** Input and manage available lecture halls with details such as capacity, available time slots, and equipment.
  - **AI-Powered Scheduling:** Automatically generate optimized class schedules and hall allocations based on faculty preferences, hall availability, and other constraints using a generative AI tool.
  - **Schedule Visualization:** View the generated schedule in a clear, easy-to-read table format, showing course names, assigned faculty, halls, and time slots.
  - **Manual Adjustments:** While not explicitly implemented in the provided code, the system is designed to allow for manual overrides and adjustments to the AI-generated schedule.

-----

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  - **Node.js:** Make sure you have Node.js version 18.0.0 or higher installed.
  - **npm or yarn:** This project uses npm for package management.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/tharinda-pamindu/lecturer-hall_allocator.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd lecturer-hall_allocator
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm run dev
    ```
2.  Open [http://localhost:9002](https://www.google.com/search?q=http://localhost:9002) with your browser to see the result.

-----

## Tech Stack

  - **Framework:** [Next.js](https://nextjs.org/)
  - **Language:** [TypeScript](https://www.typescriptlang.org/)
  - **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  - **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
  - **AI/ML:** [Genkit](https://firebase.google.com/docs/genkit)
  - **Forms:** [React Hook Form](https://react-hook-form.com/)
  - **Schema Validation:** [Zod](https://zod.dev/)

-----

## Project Structure

The project follows a standard Next.js `app` directory structure.

  - `src/app/(app)`: Contains the main application routes for faculty, halls, and the schedule dashboard.
  - `src/components`: Reusable React components, including UI elements built with shadcn/ui and custom form components.
  - `src/ai`: Houses the Genkit implementation for AI-powered schedule generation.
  - `src/context`: Contains the React Context provider for managing application state.
  - `src/lib`: Utility functions, data types, and initial data for the application.
  - `docs/`: Project documentation, including the application blueprint.

-----

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

-----

## License

Distributed under the MIT License. See `LICENSE` for more information.

-----

## Contact

Tharinda Pamindu - [@tharindupamindu](https://www.google.com/search?q=https://twitter.com/tharindupamindu)

Project Link: [https://github.com/tharinda-pamindu/lecturer-hall\_allocator](https://www.google.com/search?q=https://github.com/tharinda-pamindu/lecturer-hall_allocator)
