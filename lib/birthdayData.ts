// ============================================================
// CENTRAL CONFIG — edit everything about the site's content here
// ============================================================

export interface Photo {
  src: string;
  cap: string;
}

export interface TimelineItem {
  title: string;
  text: string;
  photo: string;
  alt: string;
}

export interface QuizQuestion {
  q: string;
  opts: string[];
  correct: number;
}

export interface AmazingItem {
  emoji: string;
  title: string;
  back: string;
}

export interface OpenWhenItem {
  emoji: string;
  title: string;
  body: string;
}

export interface BirthdayData {
  name: string;
  birthdayDate: string;
  message: string;
  messageMore: string;
  giftMessage: string;
  finalMessage: string;
  finalToast: string;
  hashtagShareText: string;
  photos: Photo[];
  timeline: TimelineItem[];
  quiz: QuizQuestion[];
  amazing: AmazingItem[];
  openWhen: OpenWhenItem[];
  secretMessages: {
    title: string;
    footer: string;
    konami: string;
  };
  video: {
    src: string;
    poster: string;
  };
  music: {
    src: string;
    label: string;
  };
}

export const birthdayData: BirthdayData = {
  name: "Roni",
  birthdayDate: "2026-09-05T00:00:00",
  message:
    "Today isn't just another day. It's a reminder of how special you are and how many beautiful memories you've created for the people lucky enough to know you.",
  messageMore:
    "You have this incredible way of making every room brighter just by walking into it. Every year with you feels like a new chapter of inside jokes, late-night talks, and memories I'll treasure forever. I hope today reminds you of just how loved, appreciated, and celebrated you are — not just today, but every single day. Here's to you, and to everything beautiful that's still ahead. Happy Birthday. ❤️",
  giftMessage: '"You deserve all the happiness in the world. Happy Birthday! ❤️"',
  finalMessage:
    "May your life be filled with happiness, love, laughter, adventures, and countless beautiful memories.",
  finalToast: "Here's to another amazing year! 🥂🎂✨",
  hashtagShareText: "I made a little birthday surprise for you 🎂❤️ Come check it out!",
  photos: [
    { src: "/images/photo-1.jpg", cap: "That unforgettable day..." },
    { src: "/images/photo-2.jpg", cap: "One of my favorite memories ❤️" },
    { src: "/images/photo-3.jpg", cap: "Pure happiness." },
    { src: "/images/photo-4.jpg", cap: "A moment worth remembering." },
    { src: "/images/photo-5.jpg", cap: "That laugh, though." },
    { src: "/images/photo-6.jpg", cap: "Forever a favorite." },
  ],
  timeline: [
    {
      title: "The Beginning ❤️",
      text: "Where everything started...",
      photo: "/images/timeline-1.jpg",
      alt: "The beginning",
    },
    {
      title: "The Crazy Moments 😂",
      text: "Too many memories to count.",
      photo: "/images/timeline-2.jpg",
      alt: "Crazy moments",
    },
    {
      title: "The Best Days ✨",
      text: "Some moments deserve forever.",
      photo: "/images/timeline-3.jpg",
      alt: "Best days",
    },
    {
      title: "Today 🎂",
      text: "And now we're celebrating YOU!",
      photo: "/images/timeline-4.jpg",
      alt: "Today",
    },
  ],
  quiz: [
    { q: "What's my favorite food?", opts: ["Pizza", "Sushi", "Pasta", "Tacos"], correct: 1 },
    {
      q: "Where's my favorite place to be?",
      opts: ["The beach", "The mountains", "Home", "A concert"],
      correct: 0,
    },
    {
      q: "What's my most memorable moment this year?",
      opts: ["The road trip", "The surprise party", "Graduation", "New Year's Eve"],
      correct: 1,
    },
    {
      q: "What's my favorite song right now?",
      opts: ["A pop hit", "An old classic", "A movie soundtrack", "Something unexpected"],
      correct: 2,
    },
    {
      q: "What's my biggest dream?",
      opts: ["Traveling the world", "Starting a business", "Writing a book", "All of the above"],
      correct: 3,
    },
  ],
  amazing: [
    { emoji: "😊", title: "Your Smile", back: "It lights up every room and makes hard days feel a little easier." },
    { emoji: "❤️", title: "Your Kindness", back: "You always know exactly what someone needs to hear." },
    { emoji: "✨", title: "Your Energy", back: "You make even the most ordinary moments feel exciting." },
    { emoji: "😂", title: "Your Crazy Side", back: "The laughs we've had together are unforgettable." },
    { emoji: "💖", title: "Your Beautiful Heart", back: "You care so deeply, and it shows in everything you do." },
    { emoji: "🌸", title: "Making People Happy", back: "You have a gift for making everyone around you feel special." },
  ],
  openWhen: [
    {
      emoji: "😊",
      title: "Open when you're happy",
      body: "Keep shining exactly like this — your happiness is contagious and the world is better for it.",
    },
    {
      emoji: "🥺",
      title: "Open when you're sad",
      body: "It's okay to not be okay sometimes. I'm always just a message away, and this too shall pass.",
    },
    {
      emoji: "❤️",
      title: "Open when you miss me",
      body: "I'm probably thinking of you too. Distance means nothing when someone means everything.",
    },
    {
      emoji: "💪",
      title: "Open when you need motivation",
      body: "You've overcome so much already. Whatever this is, you've got this too.",
    },
    {
      emoji: "😄",
      title: "Open when you need a reason to smile",
      body: "Remember that time we couldn't stop laughing for no reason at all? That's my favorite memory of you.",
    },
  ],
  secretMessages: {
    title: "You found a secret ❤️ You're the best part of my every day.",
    footer: '✨ "A friend like you comes once in a lifetime."',
    konami: "🎉 You found the secret code! Extra birthday magic unlocked.",
  },
  video: {
    src: "/videos/memories.mp4",
    poster: "/images/video-poster.jpg",
  },
  music: {
    src: "/music/birthday.mp3",
    label: "Our Song — Birthday Mix",
  },
};
