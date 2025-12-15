// data.js
const tasksData = [
  // Sunday
  {
    day: 'Sunday',
    date: '02.11.2025',
    progress: 67,
    tasks: [
      { id: 1, name: 'Create a development plan', completed: true },
      { id: 2, name: 'Redo script', completed: true },
      { id: 3, name: 'Analyze the marketing report', completed: true },
      { id: 4, name: 'Finish the project brief: Clio-31', completed: false },
      { id: 5, name: 'Set up website traffic', completed: false },
      { id: 6, name: 'Pay the targeting specialist', completed: true },
    ],
  },
  // Monday
  {
    day: 'Monday',
    date: '03.11.2025',
    progress: 86,
    tasks: [
      { id: 1, name: 'Organize personal finances', completed: true },
      { id: 2, name: 'Write 10 content pieces', completed: true },
      { id: 3, name: 'Prepare the commercial project', completed: true },
      { id: 4, name: 'Review subscriptions', completed: true },
      { id: 5, name: 'Organize the workspace', completed: true },
      { id: 6, name: 'Call Grey', completed: true },
      { id: 7, name: 'Renew gym membership', completed: false },
    ],
  },  {
    day: 'tue',
    date: '02.11.2025',
    progress: 67,
    tasks: [
      { id: 1, name: 'Create a development plan', completed: true },
      { id: 2, name: 'Redo script', completed: true },
      { id: 3, name: 'Analyze the marketing report', completed: true },
      { id: 4, name: 'Finish the project brief: Clio-31', completed: false },
      { id: 5, name: 'Set up website traffic', completed: false },
      { id: 6, name: 'Pay the targeting specialist', completed: true },
    ],
  },  {
    day: 'wed',
    date: '02.11.2025',
    progress: 67,
    tasks: [
      { id: 1, name: 'Create a development plan', completed: true },
      { id: 2, name: 'Redo script', completed: true },
      { id: 3, name: 'Analyze the marketing report', completed: true },
      { id: 4, name: 'Finish the project brief: Clio-31', completed: false },
      { id: 5, name: 'Set up website traffic', completed: false },
      { id: 6, name: 'Pay the targeting specialist', completed: true },
    ],
  },  {
    day: 'thru',
    date: '02.11.2025',
    progress: 67,
    tasks: [
      { id: 1, name: 'Create a development plan', completed: true },
      { id: 2, name: 'Redo script', completed: true },
      { id: 3, name: 'Analyze the marketing report', completed: true },
      { id: 4, name: 'Finish the project brief: Clio-31', completed: false },
      { id: 5, name: 'Set up website traffic', completed: false },
      { id: 6, name: 'Pay the targeting specialist', completed: true },
    ],
  },  {
    day: 'friday',
    date: '02.11.2025',
    progress: 67,
    tasks: [
      { id: 1, name: 'Create a development plan', completed: true },
      { id: 2, name: 'Redo script', completed: true },
      { id: 3, name: 'Analyze the marketing report', completed: true },
      { id: 4, name: 'Finish the project brief: Clio-31', completed: false },
      { id: 5, name: 'Set up website traffic', completed: false },
      { id: 6, name: 'Pay the targeting specialist', completed: true },
    ],
  },  {
    day: 'satday',
    date: '02.11.2025',
    progress: 67,
    tasks: [
      { id: 1, name: 'Create a development plan', completed: true },
      { id: 2, name: 'Redo script', completed: true },
      { id: 3, name: 'Analyze the marketing report', completed: true },
      { id: 4, name: 'Finish the project brief: Clio-31', completed: false },
      { id: 5, name: 'Set up website traffic', completed: false },
      { id: 6, name: 'Pay the targeting specialist', completed: true },
    ],
  },
  // ... (Add all other days)
];

const overallData = {
  tasksCompleted: 27,
  tasksTotal: 41,
  progressPercentage: 66,
  weeklyBarData: [
    { name: 'Sun', completed: 4, incomplete: 2 },
    { name: 'Mon', completed: 6, incomplete: 1 },
    { name: 'Tue', completed: 6, incomplete: 1 },
    { name: 'Wed', completed: 3, incomplete: 3 },
    { name: 'Thu', completed: 1, incomplete: 5 },
    { name: 'Fri', completed: 4, incomplete: 1 },
    { name: 'Sat', completed: 5, incomplete: 2 },
  ],
};

// Updated habitsData structure in data.js
const habitsData = [
  { 
    name: 'Wake up at 06:00', 
    sun: true, mon: true, tue: true, wed: false, thu: true, fri: false, sat: true, 
    progress: 57 
  },
  { 
    name: 'No alcohol', 
    sun: true, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, 
    progress: 100 
  },
  { 
    name: '1 hour on social media', 
    sun: false, mon: false, tue: true, wed: false, thu: true, fri: false, sat: false, 
    progress: 28 
  },
  // ... more habits
];

export { tasksData, overallData, habitsData };