// Types for our data
export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  reactions: {
    agree: number;
    disagree: number;
    pass: number;
  };
};

export type Discussion = {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
};

// Helper function to get relative time
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}d ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  }
  if (diffInMins > 0) {
    return `${diffInMins}m ago`;
  }
  return "Just now";
}

// Mock data for discussions
export const MOCK_DISCUSSIONS: Discussion[] = [
  {
    id: "1",
    title: "Web3 Social: The Future or Just Hype?",
    description:
      "Is web3 social media going to revolutionize how we interact online, or is it just another tech bubble waiting to burst?",
    author: "alice.eth",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    comments: [
      {
        id: "101",
        author: "bob.eth",
        content:
          "I think it has real potential to change the ownership model of content creation, but we need better UX before mainstream adoption.",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        reactions: { agree: 15, disagree: 3, pass: 2 },
      },
      {
        id: "102",
        author: "carol.eth",
        content:
          "The decentralization narrative is powerful, but I am still waiting to see a killer app that actually delivers on the promise.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        reactions: { agree: 12, disagree: 5, pass: 1 },
      },
      {
        id: "103",
        author: "dave.eth",
        content:
          "It is overhyped for now, but the underlying tech will eventually make a significant impact.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        reactions: { agree: 8, disagree: 9, pass: 3 },
      },
    ],
  },
  {
    id: "2",
    title: "AI Integration in Daily Workflows",
    description:
      "How are you incorporating AI tools into your daily workflows? Share your experiences and best practices.",
    author: "emma.eth",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    comments: [
      {
        id: "201",
        author: "frank.eth",
        content:
          "I use AI for code refactoring and documentation. It has saved me hours of tedious work every week.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        reactions: { agree: 23, disagree: 1, pass: 0 },
      },
      {
        id: "202",
        author: "grace.eth",
        content:
          "I find it most useful for content ideation and editing. Still cannot trust it for research though.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        reactions: { agree: 18, disagree: 4, pass: 1 },
      },
      {
        id: "203",
        author: "henry.eth",
        content:
          "It is great for summarizing long documents and extracting key points from meetings.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        reactions: { agree: 14, disagree: 2, pass: 1 },
      },
    ],
  },
  {
    id: "3",
    title: "Decentralized Governance Models",
    description:
      "What governance models have worked best for DAOs and other decentralized organizations?",
    author: "ivan.eth",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    comments: [
      {
        id: "301",
        author: "julia.eth",
        content:
          "Quadratic voting has been effective for our DAO. It balances the power between large and small token holders.",
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        reactions: { agree: 19, disagree: 3, pass: 1 },
      },
      {
        id: "302",
        author: "kevin.eth",
        content:
          "I prefer multisig for core decisions and token voting for less critical matters.",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        reactions: { agree: 11, disagree: 8, pass: 4 },
      },
      {
        id: "303",
        author: "liam.eth",
        content:
          "We have had success with reputation-based voting that accounts for contribution history.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        reactions: { agree: 15, disagree: 5, pass: 3 },
      },
    ],
  },
  {
    id: "4",
    title: "The Role of Memes in Crypto Culture",
    description:
      "How have memes shaped crypto culture and influenced market movements? Are they just fun or a powerful force?",
    author: "mia.eth",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    comments: [
      {
        id: "401",
        author: "noah.eth",
        content:
          "Memes are the modern language of community building. They create shared identity faster than any mission statement.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        reactions: { agree: 27, disagree: 2, pass: 0 },
      },
      {
        id: "402",
        author: "olivia.eth",
        content:
          "It is all fun until people invest life savings in a dog coin. We need to balance fun with responsibility.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        reactions: { agree: 16, disagree: 12, pass: 1 },
      },
      {
        id: "403",
        author: "peter.eth",
        content:
          "Memes democratize marketing. They allow projects with small budgets to gain massive visibility.",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        reactions: { agree: 21, disagree: 3, pass: 0 },
      },
    ],
  },
  {
    id: "5",
    title: "Zero-Knowledge Proofs: Applications Beyond Privacy",
    description:
      "ZK proofs are known for privacy applications, but what other use cases could benefit from this technology?",
    author: "quinn.eth",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    comments: [
      {
        id: "501",
        author: "rachel.eth",
        content:
          "Identity verification without revealing personal data is a massive opportunity. Think KYC without the data honeypots.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        reactions: { agree: 24, disagree: 1, pass: 0 },
      },
      {
        id: "502",
        author: "sam.eth",
        content:
          "Voting systems could be revolutionized. Prove you voted without revealing who you voted for.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        reactions: { agree: 18, disagree: 3, pass: 2 },
      },
      {
        id: "503",
        author: "taylor.eth",
        content:
          "Gaming has huge potential. Prove you have certain items or achievements without revealing your entire inventory.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        reactions: { agree: 15, disagree: 4, pass: 3 },
      },
    ],
  },
];
