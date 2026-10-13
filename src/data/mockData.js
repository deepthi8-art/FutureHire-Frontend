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
    title: "Quantitative Aptitude - Speed, Time & Work",
    category: "Quantitative Aptitude",
    durationMinutes: 25,
    questions: [
      { id: "Q1", question: "A train running at 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 m", "150 m", "180 m", "324 m"], correctIndex: 1, explanation: "Length = Speed × Time = (60 × 5/18) × 9 = 150 m." },
      { id: "Q2", question: "If 8 men complete a work in 20 days, in how many days will 16 men complete it?", options: ["5 days", "10 days", "15 days", "40 days"], correctIndex: 1, explanation: "Men × Days = constant. 8 × 20 = 16 × D → D = 10 days." },
      { id: "Q3", question: "A can do a piece of work in 12 days. B can do it in 18 days. How many days can both finish it together?", options: ["6 days", "7.2 days", "8 days", "10 days"], correctIndex: 1, explanation: "Combined rate = 1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 days." },
      { id: "Q4", question: "Ratio of speeds of two trains is 3:4. First train covers 300 km in 5 hours. Speed of second train?", options: ["48 km/h", "60 km/h", "72 km/h", "80 km/h"], correctIndex: 3, explanation: "Speed of first = 60 km/h. Ratio 3:4 → Second = 60 × (4/3) = 80 km/h." },
      { id: "Q5", question: "A pipe fills a tank in 6 hours and another empties it in 10 hours. How long to fill if both are open?", options: ["10 hours", "12 hours", "15 hours", "18 hours"], correctIndex: 2, explanation: "Net rate = 1/6 - 1/10 = 1/15. Time = 15 hours." },
      { id: "Q6", question: "A shopkeeper gains 20% profit. Cost price is ₹500. What is the selling price?", options: ["₹520", "₹550", "₹600", "₹650"], correctIndex: 2, explanation: "SP = 500 × 1.2 = ₹600." },
      { id: "Q7", question: "Simple interest on ₹4000 at 5% per annum for 3 years is:", options: ["₹400", "₹500", "₹600", "₹700"], correctIndex: 2, explanation: "SI = (4000 × 5 × 3)/100 = ₹600." },
      { id: "Q8", question: "Average of 5 consecutive integers starting from 10 is:", options: ["10", "11", "12", "13"], correctIndex: 2, explanation: "Average = (10 + 14)/2 = 12." },
      { id: "Q9", question: "What percent is 120 of 80?", options: ["100%", "120%", "150%", "180%"], correctIndex: 2, explanation: "Percentage = (120/80) × 100 = 150%." },
      { id: "Q10", question: "Two numbers are in ratio 3:5 and their LCM is 120. Find the smaller number.", options: ["18", "24", "36", "40"], correctIndex: 1, explanation: "3x and 5x, LCM = 15x = 120 → x = 8. Smaller = 3 × 8 = 24." },
      { id: "Q11", question: "A car travels 40 km/h for 3 hours then 60 km/h for 2 hours. Average speed?", options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"], correctIndex: 0, explanation: "Total dist = 120 + 120 = 240, total time = 5h. Avg = 240/5 = 48 km/h." },
      { id: "Q12", question: "Compound interest on ₹8000 at 10% per annum for 2 years compounded annually:", options: ["₹1600", "₹1620", "₹1680", "₹1728"], correctIndex: 2, explanation: "CI = 8000 × (1.1²) - 8000 = 9680 - 8000 = ₹1680." },
      { id: "Q13", question: "A person sells at ₹560 with 40% profit. Cost price?", options: ["₹350", "₹380", "₹400", "₹420"], correctIndex: 2, explanation: "CP = 560 / 1.4 = ₹400." },
      { id: "Q14", question: "A cistern fills in 9 hours and empties in 12 hours. Time to fill with both open?", options: ["30 hours", "36 hours", "40 hours", "48 hours"], correctIndex: 1, explanation: "Net = 1/9 - 1/12 = 1/36. Time = 36 hours." },
      { id: "Q15", question: "Class of 40 has average weight 65 kg. New student of 75 kg joins. New average?", options: ["65.24 kg", "65.5 kg", "65.76 kg", "66 kg"], correctIndex: 0, explanation: "New avg = (40 × 65 + 75)/41 = 2675/41 ≈ 65.24 kg." },
      { id: "Q16", question: "What is 15% of 240?", options: ["30", "36", "40", "45"], correctIndex: 1, explanation: "15% of 240 = 0.15 × 240 = 36." },
      { id: "Q17", question: "A sum doubles in 5 years at simple interest. Rate of interest per annum?", options: ["10%", "15%", "20%", "25%"], correctIndex: 2, explanation: "P = (P × R × 5)/100 → R = 100/5 = 20%." },
      { id: "Q18", question: "Find HCF of 36, 48 and 60.", options: ["6", "12", "18", "24"], correctIndex: 1, explanation: "HCF(36,48) = 12, HCF(12,60) = 12." },
      { id: "Q19", question: "Boat goes 6 km upstream in 2 hours and 12 km downstream in 2 hours. Speed in still water?", options: ["4.5 km/h", "6 km/h", "7 km/h", "9 km/h"], correctIndex: 0, explanation: "Upstream = 3 km/h, Downstream = 6 km/h. Speed in still water = (3 + 6)/2 = 4.5 km/h." },
      { id: "Q20", question: "A man spends 75% of income. Income increases 20%, savings increase 40%. Expenditure increase %?", options: ["10%", "13.3%", "15%", "20%"], correctIndex: 1, explanation: "Old: inc=100, exp=75, sav=25. New: inc=120, sav=35, exp=85. Increase = (10/75) × 100 ≈ 13.3%." }
    ]
  },
  {
    id: "APT-Logical-1",
    title: "Logical Reasoning - Syllogism, Series & Puzzles",
    category: "Logical Reasoning",
    durationMinutes: 20,
    questions: [
      { id: "LQ1", question: "Statements: All bags are handles. All handles are clips.\nConclusions: I. All bags are clips. II. Some clips are handles.", options: ["Only I follows", "Only II follows", "Either I or II follows", "Both I and II follow"], correctIndex: 3, explanation: "Bags ⊂ Handles ⊂ Clips → both conclusions logically follow." },
      { id: "LQ2", question: "Next number in series: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correctIndex: 1, explanation: "Differences: +4, +6, +8, +10, +12 → next = 30 + 12 = 42." },
      { id: "LQ3", question: "Find the odd one out: 2, 3, 5, 7, 9, 11, 13", options: ["9", "11", "13", "7"], correctIndex: 0, explanation: "9 = 3 × 3 is composite. All others are prime numbers." },
      { id: "LQ4", question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?", options: ["Granddaughter", "Daughter", "Great-granddaughter", "Niece"], correctIndex: 0, explanation: "D is C's father, C is B's mother, A is B's sister → A is D's granddaughter." },
      { id: "LQ5", question: "In a row of 40 students, Mia is 8th from left and 10th from right. Students between them?", options: ["21", "22", "23", "24"], correctIndex: 1, explanation: "Students between = 40 - 8 - 10 = 22." },
      { id: "LQ6", question: "Pointing to a girl, Ravi says 'daughter of the only son of my grandfather.' Relation?", options: ["Sister", "Niece", "Cousin", "Daughter"], correctIndex: 0, explanation: "Only son of grandfather = father. Daughter of father = sister." },
      { id: "LQ7", question: "All roses are flowers. Some flowers fade. Which conclusion is definite?", options: ["All roses fade", "Some roses fade", "No roses fade", "None is definite"], correctIndex: 3, explanation: "Cannot conclude anything definite about roses fading from the given premises." },
      { id: "LQ8", question: "Complete the series: 3, 9, 27, 81, ?", options: ["162", "243", "324", "729"], correctIndex: 1, explanation: "Each number multiplied by 3. 81 × 3 = 243." },
      { id: "LQ9", question: "A clock shows 3:15. Angle between hour and minute hands?", options: ["0°", "7.5°", "15°", "22.5°"], correctIndex: 1, explanation: "Minute hand at 90°, Hour hand at 97.5°. Difference = 7.5°." },
      { id: "LQ10", question: "Find the next pair: AZ, BY, CX, DW, ?", options: ["EV", "FU", "EW", "FV"], correctIndex: 0, explanation: "A+Z, B+Y, C+X, D+W → E+V." },
      { id: "LQ11", question: "A is older than B. C is older than D. B is older than C. Who is youngest?", options: ["A", "B", "C", "D"], correctIndex: 3, explanation: "A > B > C > D. D is the youngest." },
      { id: "LQ12", question: "If BOARD is coded as CRCTS, how is LIGHT coded?", options: ["MJHIU", "NKIHU", "MJIJU", "MJHIV"], correctIndex: 0, explanation: "Each letter is shifted by +1: LIGHT → MJHIU." },
      { id: "LQ13", question: "Statements: No cat is a dog. All dogs are animals. Conclusion: No cat is an animal.", options: ["True", "False", "Uncertain", "Partially true"], correctIndex: 2, explanation: "We cannot determine relationship of cats to animals from these premises." },
      { id: "LQ14", question: "Missing number: 4, 9, 25, 49, ?, 121", options: ["64", "81", "100", "110"], correctIndex: 1, explanation: "Squares: 2², 3², 5², 7², 9²=81, 11²=121." },
      { id: "LQ15", question: "If '+' means '×', '×' means '-', '-' means '+'. Value of: 3 + 4 × 2 - 1?", options: ["11", "13", "15", "9"], correctIndex: 0, explanation: "3 × 4 - 2 + 1 = 12 - 2 + 1 = 11." },
      { id: "LQ16", question: "Five friends sit in a row. A is right of B, E is left of D, D is left of B. Who is in middle?", options: ["A", "B", "C", "D"], correctIndex: 1, explanation: "Order: E, D, B, A with B in the middle." },
      { id: "LQ17", question: "Social media ban argument: 'Yes, it exposes children to harmful content.' Type?", options: ["Strong argument", "Weak argument", "Ambiguous", "Not an argument"], correctIndex: 0, explanation: "Directly addresses the harm of the issue → strong argument." },
      { id: "LQ18", question: "All cricket players play football. Some football players play tennis. Which is true?", options: ["All cricket players play tennis", "Some cricket players may play tennis", "No cricket player plays tennis", "All tennis players play cricket"], correctIndex: 1, explanation: "Some football (and hence some cricket) players may play tennis." },
      { id: "LQ19", question: "If WATER=25135 and TOWER=32435, code for RATE?", options: ["5315", "5235", "5135", "5125"], correctIndex: 2, explanation: "R=5, A=1, T=3, E=5 → RATE = 5135." },
      { id: "LQ20", question: "Series: 1, 4, 9, 16, 25, ?", options: ["30", "36", "42", "49"], correctIndex: 1, explanation: "Squares: 1², 2², 3², 4², 5², 6² = 36." }
    ]
  },
  {
    id: "APT-Verbal-1",
    title: "Verbal Ability - Grammar, Vocabulary & Idioms",
    category: "Verbal Ability",
    durationMinutes: 20,
    questions: [
      { id: "VQ1", question: "Synonym of 'BENEVOLENT':", options: ["Cruel", "Kind", "Greedy", "Stingy"], correctIndex: 1, explanation: "Benevolent means kind or charitable." },
      { id: "VQ2", question: "Antonym of 'VERBOSE':", options: ["Talkative", "Wordy", "Concise", "Elaborate"], correctIndex: 2, explanation: "Verbose means wordy; antonym is concise." },
      { id: "VQ3", question: "Fill in the blank: She ___ to the store every Sunday.", options: ["go", "goes", "going", "gone"], correctIndex: 1, explanation: "Third person singular present uses 'goes'." },
      { id: "VQ4", question: "Identify the error: 'He is one of the student who has passed.'", options: ["is", "one of the student", "who has", "passed"], correctIndex: 1, explanation: "'one of the students' — plural noun required after 'one of the'." },
      { id: "VQ5", question: "Correctly spelt word:", options: ["Accomodate", "Accommodate", "Acomodate", "Acommodate"], correctIndex: 1, explanation: "'Accommodate' has double 'c' and double 'm'." },
      { id: "VQ6", question: "'A blessing in disguise' means:", options: ["A hidden curse", "Something good not recognised at first", "A fake blessing", "A religious ceremony"], correctIndex: 1, explanation: "Something bad that turns out to have positive results." },
      { id: "VQ7", question: "Synonym of 'EPHEMERAL':", options: ["Eternal", "Short-lived", "Powerful", "Significant"], correctIndex: 1, explanation: "Ephemeral means lasting a very short time." },
      { id: "VQ8", question: "Correct passive voice: 'The manager signed the document.'", options: ["The document was signed by the manager.", "The document is signed by the manager.", "The document signed by the manager.", "The document has been signed."], correctIndex: 0, explanation: "Past tense passive: was + past participle (signed)." },
      { id: "VQ9", question: "'Jack of all trades, master of none' means:", options: ["Expert in everything", "Skilled in many, master of none", "Avoids work", "Very lazy"], correctIndex: 1, explanation: "Has many skills but excels at none." },
      { id: "VQ10", question: "Antonym of 'DILIGENT':", options: ["Hardworking", "Sincere", "Lazy", "Motivated"], correctIndex: 2, explanation: "Diligent means hardworking; antonym is lazy." },
      { id: "VQ11", question: "Fill in: Neither the students nor the teacher ___ present.", options: ["were", "was", "are", "have been"], correctIndex: 1, explanation: "Verb agrees with nearest subject ('teacher' = singular = was)." },
      { id: "VQ12", question: "Grammatically correct sentence:", options: ["She don't know the answer.", "She doesn't knows the answer.", "She doesn't know the answer.", "She not knowing the answer."], correctIndex: 2, explanation: "Correct: 'She doesn't know the answer.'" },
      { id: "VQ13", question: "'Bite the bullet' means:", options: ["Eat a bullet", "Endure a painful experience", "Shoot someone", "Avoid a problem"], correctIndex: 1, explanation: "Endure a painful or difficult situation with courage." },
      { id: "VQ14", question: "Synonym of 'GARRULOUS':", options: ["Silent", "Talkative", "Shy", "Aggressive"], correctIndex: 1, explanation: "Garrulous means excessively talkative." },
      { id: "VQ15", question: "Part of speech of 'quickly' in: 'She ran quickly.'", options: ["Adjective", "Noun", "Adverb", "Verb"], correctIndex: 2, explanation: "'Quickly' modifies the verb 'ran' — it is an adverb." },
      { id: "VQ16", question: "Meaning of 'UBIQUITOUS':", options: ["Rare and unique", "Present everywhere", "Very fast", "Extremely old"], correctIndex: 1, explanation: "Ubiquitous means found or appearing everywhere." },
      { id: "VQ17", question: "Fill in: The committee ___ divided in their opinion.", options: ["was", "were", "is", "has"], correctIndex: 1, explanation: "Committee acting as separate individuals → plural verb 'were'." },
      { id: "VQ18", question: "Correctly punctuated sentence:", options: ["Its a beautiful day.", "It's a beautiful day.", "It's a beautifull day.", "Its' a beautiful day."], correctIndex: 1, explanation: "It's = It is. Apostrophe marks the contraction." },
      { id: "VQ19", question: "'Cost an arm and a leg' means:", options: ["Very cheap", "Very expensive", "Physically demanding", "Painfully difficult"], correctIndex: 1, explanation: "This idiom means something is very expensive." },
      { id: "VQ20", question: "Choose the correct sentence:", options: ["I am going to the market yesterday.", "She have completed her work.", "They are playing cricket now.", "He go to school daily."], correctIndex: 2, explanation: "'They are playing cricket now.' is grammatically correct." }
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
