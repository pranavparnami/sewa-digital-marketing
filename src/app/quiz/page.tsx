"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string; icon: string }[];
}

const questions: Question[] = [
  {
    id: "occasion",
    question: "What's the occasion?",
    options: [
      { label: "Meditation & Yoga", value: "meditation", icon: "🧘" },
      { label: "Pooja & Rituals", value: "pooja", icon: "🛕" },
      { label: "Relaxation & Self-Care", value: "relaxation", icon: "🕯️" },
      { label: "Gifting Someone Special", value: "gifting", icon: "🎁" },
      { label: "Home Fragrance", value: "home", icon: "🏠" },
    ],
  },
  {
    id: "scent",
    question: "What scent profile appeals to you?",
    options: [
      { label: "Woody & Earthy", value: "woody", icon: "🌲" },
      { label: "Floral & Sweet", value: "floral", icon: "🌸" },
      { label: "Fresh & Herbal", value: "fresh", icon: "🌿" },
      { label: "Spicy & Warm", value: "spicy", icon: "✨" },
      { label: "No Preference — Surprise Me", value: "any", icon: "🎲" },
    ],
  },
  {
    id: "intensity",
    question: "How intense would you like the fragrance?",
    options: [
      { label: "Subtle — A gentle whisper", value: "mild", icon: "🌬️" },
      { label: "Balanced — Noticeable but not overpowering", value: "medium", icon: "⚖️" },
      { label: "Bold — Fill the room", value: "intense", icon: "🔥" },
    ],
  },
  {
    id: "format",
    question: "Which format do you prefer?",
    options: [
      { label: "Incense Sticks (45 min burn)", value: "sticks", icon: "🪔" },
      { label: "Cones (backflow compatible)", value: "cones", icon: "🔺" },
      { label: "Bambooless Sticks (zero waste)", value: "bambooless", icon: "🌿" },
      { label: "Candles (40+ hours)", value: "candles", icon: "🕯️" },
      { label: "Reed Diffuser (6-8 weeks)", value: "diffuser", icon: "🏺" },
      { label: "Essential Oil (for diffusers)", value: "oil", icon: "💧" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: [
      { label: "Under ₹299 — Trial size", value: "low", icon: "💰" },
      { label: "₹299–₹599 — Standard pack", value: "mid", icon: "💰💰" },
      { label: "₹599–₹999 — Premium experience", value: "high", icon: "💰💰💰" },
      { label: "₹999+ — Gift box / Full ritual kit", value: "premium", icon: "🎁" },
    ],
  },
];

const recommendations: Record<string, { product: string; reason: string; url: string }[]> = {
  meditation: [
    { product: "Sandalwood Incense Sticks", reason: "The classic meditation companion — grounding, centering, and deeply calming. Used for centuries in spiritual practice.", url: "/products#incense-sticks" },
    { product: "Nag Champa Incense Sticks", reason: "Rich, earthy, and transcendent. The fragrance that defined temple meditation for generations.", url: "/products#incense-sticks" },
  ],
  pooja: [
    { product: "Pure Kapoor (Camphor)", reason: "The essential for every aarti. Clean-burning, residue-free, pure devotion.", url: "/products#camphor" },
    { product: "Sandalwood Incense Sticks", reason: "The most sacred fragrance for pooja rituals. Purifies the space and elevates the ceremony.", url: "/products#incense-sticks" },
  ],
  relaxation: [
    { product: "Lavender Bambooless Sticks", reason: "Pure botanical relaxation. Near-zero smoke, maximum calm. Perfect for unwinding.", url: "/products#bambooless-sticks" },
    { product: "Vanilla Soy Wax Candle", reason: "Warm, comforting, and toxin-free. 40+ hours of gentle relaxation.", url: "/products#candles" },
  ],
  gifting: [
    { product: "Jasmine Reed Diffuser", reason: "Elegant, flame-free, and beautiful. The perfect housewarming or festive gift.", url: "/products#reed-diffusers" },
    { product: "Vanilla Soy Wax Candle", reason: "Luxurious and universally loved. A gift that speaks of thoughtfulness and quality.", url: "/products#candles" },
  ],
  home: [
    { product: "Jasmine Reed Diffuser", reason: "6-8 weeks of continuous, flame-free luxury fragrance. Transforms any room.", url: "/products#reed-diffusers" },
    { product: "Eucalyptus Diffuser Oil", reason: "Crisp, refreshing, and natural. Energises your space without any toxins.", url: "/products#diffuser-oils" },
  ],
};

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const getRecommendations = () => {
    const occasion = answers.occasion || "meditation";
    return recommendations[occasion] || recommendations.meditation;
  };

  if (done) {
    const recs = getRecommendations();
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          Your Perfect Scent ✨
        </h1>
        <p className="text-stone-500 text-lg mb-10">
          Based on your preferences, here&apos;s what we recommend
        </p>
        <div className="space-y-4">
          {recs.map((rec) => (
            <div
              key={rec.product}
              className="bg-white rounded-2xl border border-stone-200 p-6 text-left hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-stone-900">{rec.product}</h3>
              <p className="text-stone-500 text-sm mt-1">{rec.reason}</p>
              <Link
                href={rec.url}
                className="inline-block mt-3 px-5 py-2 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
        <button
          onClick={() => { setCurrent(0); setAnswers({}); setDone(false); }}
          className="mt-8 text-sm text-stone-500 hover:text-amber-700 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="mb-8">
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-700 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-stone-400 mt-2">
          Question {current + 1} of {questions.length}
        </p>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">
        {q.question}
      </h2>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(q.id, opt.value)}
            className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all flex items-center gap-4 group"
          >
            <span className="text-2xl">{opt.icon}</span>
            <span className="font-medium text-stone-700 group-hover:text-amber-800 transition-colors">
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {current > 0 && (
        <button
          onClick={() => setCurrent(current - 1)}
          className="mt-6 text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
