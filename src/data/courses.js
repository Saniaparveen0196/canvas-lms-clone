export const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Smith",
    progress: 65,
    color: "#FF6B6B"
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    instructor: "Prof. Johnson",
    progress: 30,
    color: "#4ECDC4"
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    instructor: "Dr. Williams",
    progress: 80,
    color: "#45B7D1"
  },
  {
    id: 4,
    title: "Database Systems",
    instructor: "Prof. Brown",
    progress: 45,
    color: "#FFA07A"
  },
  {
    id: 5,
    title: "User Interface Design",
    instructor: "Dr. Davis",
    progress: 90,
    color: "#98D8C8"
  },
  {
    id: 6,
    title: "Mobile App Development",
    instructor: "Prof. Miller",
    progress: 20,
    color: "#D4A5A5"
  }
];
export const courseModules = [
  {
    id: 1,
    title: "Introduction to React",
    completed: true,
    items: [
      { id: 1, type: 'video', title: 'React Fundamentals', duration: 45, completed: true },
      { id: 2, type: 'reading', title: 'React Documentation', pages: 12, completed: true },
      { id: 3, type: 'assignment', title: 'First React App', completed: true }
    ]
  },
  // Add more modules...
];