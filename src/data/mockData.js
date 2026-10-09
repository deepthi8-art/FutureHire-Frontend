// FutureHire Comprehensive Mock Data Store

export const initialStudentProfile = {
  id: "STD-2026-001",
  name: "Alex Morgan",
  email: "alex.morgan@university.edu",
  college: "National Institute of Technology",
  department: "Computer Science & Engineering",
  yearOfStudy: "4th Year (Final Year)",
  phone: "+91 98765 43210",
  cgpa: "8.95 / 10.0",
  targetCompany: "Amazon / Microsoft",
  role: "student",
  stats: {
    codingSolved: 142,
    totalCoding: 250,
    aptitudeScore: 88,
    mockInterviewsCompleted: 4,
    readinessScore: 85,
  }
};

export const initialAdminProfile = {
  id: "ADM-001",
  name: "Dr. Rajesh Sharma",
  email: "admin@futurehire.org",
  designation: "Head of Training & Placement",
  role: "admin",
};

export const initialCodingProblems = [
  {
    id: "CP-101",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    solved: true,
    acceptanceRate: "82.4%",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    sampleInput: "nums = [2,7,11,15], target = 9",
    sampleOutput: "[0,1]",
    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`
    }
  },
  {
    id: "CP-102",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    solved: true,
    acceptanceRate: "79.1%",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if open brackets are closed by the same type of brackets and in correct order.",
    sampleInput: "s = \"()[]{}\"",
    sampleOutput: "true",
    explanation: "All brackets open and close properly in valid order.",
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
    starterCode: {
      javascript: `function isValid(s) {\n  const stack = [];\n  const pairs = { ')': '(', '}': '{', ']': '[' };\n  for (let char of s) {\n    if (!pairs[char]) stack.push(char);\n    else if (stack.pop() !== pairs[char]) return false;\n  }\n  return stack.length === 0;\n}`,
      python: `def isValid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else:\n            stack.append(char)\n    return not stack`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`
    }
  },
  {
    id: "CP-103",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    solved: false,
    acceptanceRate: "54.8%",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    sampleInput: "s = \"abcabcbb\"",
    sampleOutput: "3",
    explanation: "The answer is \"abc\", with the length of 3.",
    constraints: "0 <= s.length <= 5 * 10^4",
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  let maxLen = 0, start = 0;\n  const map = new Map();\n  for (let i = 0; i < s.length; i++) {\n    if (map.has(s[i])) {\n      start = Math.max(start, map.get(s[i]) + 1);\n    }\n    map.set(s[i], i);\n    maxLen = Math.max(maxLen, i - start + 1);\n  }\n  return maxLen;\n}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    charMap = {}\n    left = maxLen = 0\n    for right, char in enumerate(s):\n        if char in charMap and charMap[char] >= left:\n            left = charMap[char] + 1\n        charMap[char] = right\n        maxLen = max(maxLen, right - left + 1)\n    return maxLen`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int n = s.length(), maxLen = 0;\n        Map<Character, Integer> map = new HashMap<>();\n        for (int j = 0, i = 0; j < n; j++) {\n            if (map.containsKey(s.charAt(j))) {\n                i = Math.max(map.get(s.charAt(j)) + 1, i);\n            }\n            map.put(s.charAt(j), j);\n            maxLen = Math.max(maxLen, j - i + 1);\n        }\n        return maxLen;\n    }\n}`
    }
  },
  {
    id: "CP-104",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Heap / Priority Queue",
    solved: false,
    acceptanceRate: "41.2%",
    description: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\nMerge all the linked-lists into one sorted linked-list and return it.",
    sampleInput: "lists = [[1,4,5],[1,3,4],[2,6]]",
    sampleOutput: "[1,1,2,3,4,4,5,6]",
    explanation: "The linked-lists are merged into one sorted list.",
    constraints: "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500",
    starterCode: {
      javascript: `function mergeKLists(lists) {\n  // Write your priority queue or divide & conquer logic here\n  return null;\n}`,
      python: `def mergeKLists(lists):\n    # Write Python implementation\n    pass`,
      java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        return null;\n    }\n}`
    }
  },
  {
    id: "CP-105",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Trees & BFS",
    solved: true,
    acceptanceRate: "66.3%",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "[[3],[9,20],[15,7]]",
    explanation: "Traverse nodes level by level using Queue.",
    constraints: "The number of nodes in the tree is in the range [0, 2000].",
    starterCode: {
      javascript: `function levelOrder(root) {\n  if (!root) return [];\n  const result = [], queue = [root];\n  while (queue.length) {\n    const levelSize = queue.length, currentLevel = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(currentLevel);\n  }\n  return result;\n}`,
      python: `def levelOrder(root):\n    # BFS algorithm implementation\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        return new ArrayList<>();\n    }\n}`
    }
  }
];

export const initialAptitudeQuizzes = [
  {
    id: "APT-Quant-1",
    title: "Quantitative Aptitude Mastery - Speed, Distance & Time",
    category: "Quantitative Aptitude",
    durationMinutes: 15,
    questions: [
      {
        id: "Q1",
        question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 metres", "150 metres", "180 metres", "324 metres"],
        correctIndex: 1,
        explanation: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Length = Speed * Time = (50/3) * 9 = 150 metres."
      },
      {
        id: "Q2",
        question: "A and B can do a piece of work in 12 days, B and C in 15 days, and C and A in 20 days. How long will A take to finish it alone?",
        options: ["30 days", "24 days", "40 days", "20 days"],
        correctIndex: 0,
        explanation: "2(A+B+C)'s 1 day work = (1/12 + 1/15 + 1/20) = 12/60 = 1/5. (A+B+C) 1 day = 1/10. A's 1 day = 1/10 - 1/15 = 1/30. Thus 30 days."
      },
      {
        id: "Q3",
        question: "In a 100m race, A beats B by 10m and C by 13m. In a race of 180m, B will beat C by how many meters?",
        options: ["5.4 m", "6 m", "4.5 m", "7.5 m"],
        correctIndex: 1,
        explanation: "A:B:C = 100:90:87. Ratio B/C = 90/87. When B runs 180m, C runs (87/90)*180 = 174m. Thus B beats C by 180 - 174 = 6m."
      }
    ]
  },
  {
    id: "APT-Logical-1",
    title: "Logical Reasoning & Syllogism Assessment",
    category: "Logical Reasoning",
    durationMinutes: 10,
    questions: [
      {
        id: "LQ1",
        question: "Statements: All bags are handles. All handles are clips.\nConclusions: I. All bags are clips. II. Some clips are handles.",
        options: ["Only I follows", "Only II follows", "Either I or II follows", "Both I and II follow"],
        correctIndex: 3,
        explanation: "Since Bags ⊂ Handles ⊂ Clips, both conclusions logically follow."
      },
      {
        id: "LQ2",
        question: "If 'TIGER' is coded as 'QDFHS', how is 'HORSE' coded in that system?",
        options: ["GNDRD", "EPQDR", "GNQRD", "GNRQD"],
        correctIndex: 2,
        explanation: "Each letter is shifted back by 1 position (T->S... reversed order). H->G, O->N, R->Q, S->R, E->D."
      }
    ]
  },
  {
    id: "APT-Verbal-1",
    title: "Verbal Ability & Grammar Accuracy Test",
    category: "Verbal Ability",
    durationMinutes: 10,
    questions: [
      {
        id: "VQ1",
        question: "Select the synonym of 'METICULOUS':",
        options: ["Careless", "Painstaking / Thorough", "Hasty", "Indifferent"],
        correctIndex: 1,
        explanation: "Meticulous means showing great attention to detail; very careful and precise."
      },
      {
        id: "VQ2",
        question: "Find the correctly punctuated sentence:",
        options: [
          "Although he worked hard; he didn't pass the exam.",
          "Although he worked hard, he didn't pass the exam.",
          "Although he worked hard he didn't pass, the exam.",
          "Although, he worked hard he didn't pass the exam."
        ],
        correctIndex: 1,
        explanation: "Dependent clause starting with 'Although' requires a comma after the clause."
      }
    ]
  }
];

export const initialCompanies = [
  {
    id: "COMP-001",
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80",
    tier: "Dream / Product",
    ctc: "₹28 - 45 LPA",
    location: "Bangalore, Hyderabad, Gurgaon",
    description: "Amazon is a global technology giant specializing in e-commerce, cloud computing (AWS), digital streaming, and artificial intelligence.",
    eligibility: {
      minCgpa: "7.5 / 10.0",
      tenthTwelveth: "70% throughout",
      allowedBranches: ["CSE", "IT", "ECE", "EEE"],
      maxBacklogs: 0
    },
    skillsRequired: ["Data Structures & Algorithms", "System Design", "Object Oriented Programming (Java/C++)", "OS & DBMS", "AWS Fundamentals"],
    selectionProcess: [
      { round: 1, name: "Online Assessment (OA)", details: "2 Coding Questions + Work Style Survey (90 mins)" },
      { round: 2, name: "Technical Round 1", details: "DSA, Problem Solving & Leadership Principles" },
      { round: 3, name: "Technical Round 2", details: "System Design / Object-Oriented Design & LLD" },
      { round: 4, name: "Bar Raiser Round", details: "Behavioral + Deep Tech Discussion" }
    ],
    interviewQuestions: [
      { q: "How would you design an LRU Cache?", difficulty: "Medium", topic: "Data Structures" },
      { q: "Explain Amazon Leadership Principles with a real project example.", difficulty: "Easy", topic: "Behavioral" },
      { q: "Find the median of two sorted arrays of different sizes.", difficulty: "Hard", topic: "Algorithms" }
    ]
  },
  {
    id: "COMP-002",
    name: "Tata Consultancy Services (TCS Digital)",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80",
    tier: "Mass / Digital",
    ctc: "₹7.0 - 9.0 LPA (Digital)",
    location: "Pan India",
    description: "TCS is a global leader in IT services, consulting, and business solutions, hiring thousands of engineers every year.",
    eligibility: {
      minCgpa: "6.5 / 10.0",
      tenthTwelveth: "60% throughout",
      allowedBranches: ["All Engineering Branches"],
      maxBacklogs: 1
    },
    skillsRequired: ["Aptitude & Reasoning", "Python / C++ / Java", "SQL & Database Queries", "Basic Data Structures"],
    selectionProcess: [
      { round: 1, name: "TCS NQT / Digital Exam", details: "Aptitude + Advanced Coding Section" },
      { round: 2, name: "Technical Interview", details: "Coding live, Project discussion, OOPs concept" },
      { round: 3, name: "HR Interview", details: "Location flexibility, shifts, behavioral evaluation" }
    ],
    interviewQuestions: [
      { q: "Difference between Method Overloading and Method Overriding?", difficulty: "Easy", topic: "Java OOPs" },
      { q: "Write a query to find the 2nd highest salary in an Employee table.", difficulty: "Easy", topic: "SQL" }
    ]
  },
  {
    id: "COMP-003",
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    tier: "Super Dream",
    ctc: "₹45 - 50 LPA",
    location: "Hyderabad, Bangalore, Noida",
    description: "Microsoft creates software, consumer electronics, personal computers, and cloud services (Azure).",
    eligibility: {
      minCgpa: "8.0 / 10.0",
      tenthTwelveth: "75% throughout",
      allowedBranches: ["CSE", "IT", "ECE"],
      maxBacklogs: 0
    },
    skillsRequired: ["Advanced DSA", "Trees & Graphs", "Dynamic Programming", "Low-Level Design", "Operating System Kernels"],
    selectionProcess: [
      { round: 1, name: "Online Coding Test", details: "3 Complex Coding Problems on Codility" },
      { round: 2, name: "Tech Interview 1", details: "Data Structures & Algorithm optimization" },
      { round: 3, name: "Tech Interview 2", details: "System Design, Threads & Memory Management" },
      { round: 4, name: "AA (As Appropriate) Round", details: "Director level cultural fitment & tech depth" }
    ],
    interviewQuestions: [
      { q: "Serialize and Deserialize a Binary Tree.", difficulty: "Hard", topic: "Trees" },
      { q: "Design a Rate Limiter system.", difficulty: "Medium", topic: "System Design" }
    ]
  }
];

export const initialInterviewExperiences = [
  {
    id: "EXP-501",
    author: "Rohan Sharma",
    college: "IIT Bombay",
    company: "Amazon",
    role: "Software Development Engineer (SDE-1)",
    verdict: "Selected",
    packageOffered: "44 LPA",
    date: "September 2025",
    difficulty: "Hard",
    content: "The selection process consisted of 1 OA round and 3 Technical Interviews. The OA had 2 questions on DP and Sliding Window. Round 1 focused heavily on Tree Traversal and Amazon Leadership Principles (Customer Obsession). Round 2 asked to design an Elevator System (LLD). Round 3 was Bar Raiser with deep questions on Garbage Collection in Java and Graph Algorithms. Key tip: Always talk out loud while coding!",
    tips: "Master Amazon's 16 Leadership Principles with STAR method stories. Practice LeetCode Medium/Hard DP problems."
  },
  {
    id: "EXP-502",
    author: "Priya Patel",
    college: "NIT Trichy",
    company: "TCS Digital",
    role: "System Engineer - Digital",
    verdict: "Selected",
    packageOffered: "7.5 LPA",
    date: "August 2025",
    difficulty: "Medium",
    content: "TCS NQT was well structured. Aptitude section was tricky on Time and Distance. Coding section had 2 problems: 1 String Manipulation and 1 Array Matrix rotation. In the tech interview, the interviewer asked SQL joins, Difference between INNER JOIN and LEFT JOIN, and asked me to write a Python script for string reverse without using built-in functions.",
    tips: "Focus on speed in Quantitative Aptitude. Be confident in DBMS & SQL queries."
  }
];

export const initialMockInterviews = [
  {
    id: "MI-101",
    mentorName: "Karthik Subramanian",
    mentorTitle: "Senior SDE at Google",
    date: "2026-10-10",
    time: "04:00 PM - 05:00 PM",
    type: "Technical (DSA & Coding)",
    status: "Available",
    meetingLink: ""
  },
  {
    id: "MI-102",
    mentorName: "Neha Verma",
    mentorTitle: "Engineering Lead at Microsoft",
    date: "2026-10-12",
    time: "06:00 PM - 07:00 PM",
    type: "System Design & HR",
    status: "Available",
    meetingLink: ""
  },
  {
    id: "MI-103",
    mentorName: "Ananya Deshmukh",
    mentorTitle: "Tech Recruiter & Ex-Amazon",
    date: "2026-09-28",
    time: "05:00 PM - 06:00 PM",
    type: "HR & Behavioral Mock",
    status: "Completed",
    meetingLink: "https://meet.google.com/mock-demo-xyz",
    feedback: {
      rating: 4.8,
      strengths: "Excellent communication, clear explanation of past projects.",
      areasToImprove: "Need more confidence in answer structure for 'Tell me about a time you failed'."
    }
  }
];

export const initialStudyResources = [
  {
    id: "RES-01",
    title: "Complete Data Structures & Algorithms Handcrafted Notes",
    category: "Data Structures",
    format: "PDF",
    size: "14.2 MB",
    downloads: 3420,
    author: "FutureHire Placement Team",
    downloadUrl: "#"
  },
  {
    id: "RES-02",
    title: "Top 100 SQL Queries Frequently Asked in Campus Placements",
    category: "DBMS",
    format: "CheatSheet",
    size: "4.8 MB",
    downloads: 5120,
    author: "Database Experts Guild",
    downloadUrl: "#"
  },
  {
    id: "RES-03",
    title: "Operating Systems & System Design Flashcards",
    category: "Operating Systems",
    format: "PDF",
    size: "8.1 MB",
    downloads: 2890,
    author: "Core Tech Mentors",
    downloadUrl: "#"
  },
  {
    id: "RES-04",
    title: "Quantitative Aptitude Formulas & Short Tricks E-Book",
    category: "Aptitude",
    format: "PDF",
    size: "18.5 MB",
    downloads: 8900,
    author: "Aptitude Master Class",
    downloadUrl: "#"
  },
  {
    id: "RES-05",
    title: "HR Interview Guide: 50+ Top Answer Templates for Freshers",
    category: "HR Interview",
    format: "PDF",
    size: "6.2 MB",
    downloads: 4300,
    author: "HR Leadership Council",
    downloadUrl: "#"
  }
];

export const initialNotifications = [
  {
    id: "NOTIF-1",
    title: "Amazon SDE-1 Campus Drive Registered",
    message: "Online Assessment scheduled for 15th Oct 2026. Make sure your resume is updated!",
    time: "2 hours ago",
    read: false,
    type: "placement"
  },
  {
    id: "NOTIF-2",
    title: "New Weekly Coding Contest Live!",
    message: "Weekly Challenge #42 'Graph Algorithms & DP' is now open for practice.",
    time: "1 day ago",
    read: false,
    type: "challenge"
  },
  {
    id: "NOTIF-3",
    title: "Mock Interview Slot Confirmed",
    message: "Your HR mock interview with Ananya Deshmukh is booked for 28th Sept.",
    time: "3 days ago",
    read: true,
    type: "reminder"
  }
];

export const initialAdminUsersList = [
  { id: "STD-101", name: "Alex Morgan", email: "alex.morgan@university.edu", department: "CSE", year: "4th Year", cgpa: "8.95", status: "Active" },
  { id: "STD-102", name: "Rohan Sharma", email: "rohan.s@university.edu", department: "ECE", year: "4th Year", cgpa: "8.40", status: "Active" },
  { id: "STD-103", name: "Sneha Reddy", email: "sneha.r@university.edu", department: "IT", year: "3rd Year", cgpa: "9.12", status: "Active" },
  { id: "STD-104", name: "Vikram Malhotra", email: "vikram.m@university.edu", department: "MECH", year: "4th Year", cgpa: "7.80", status: "Inactive" }
];

export const progressChartData = [
  { month: "May", codingSolved: 25, aptitudeScore: 65, mockRating: 3.5 },
  { month: "Jun", codingSolved: 48, aptitudeScore: 72, mockRating: 3.8 },
  { month: "Jul", codingSolved: 80, aptitudeScore: 78, mockRating: 4.1 },
  { month: "Aug", codingSolved: 110, aptitudeScore: 84, mockRating: 4.4 },
  { month: "Sep", codingSolved: 142, aptitudeScore: 88, mockRating: 4.8 }
];

export const departmentDistributionData = [
  { name: "Computer Science (CSE)", students: 450 },
  { name: "Information Tech (IT)", students: 320 },
  { name: "Electronics (ECE)", students: 280 },
  { name: "Electrical (EEE)", students: 190 },
  { name: "Mechanical & Civil", students: 140 }
];
