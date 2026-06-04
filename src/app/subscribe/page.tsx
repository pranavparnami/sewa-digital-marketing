"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Discovery",
    price: 499,
    period: "monthly",
    description: "4 surprise fragrances + 1 mini candle every month. Perfect for exploring.",
    features: ["4 curated incense variants", "1 mini soy wax candle", "Monthly artisan story card", "Free shipping", "Cancel anytime"],
    color: "bg-amber-50 border-amber-200",
    buttonColor: "bg-amber-700 hover:bg-amber-800",
    popular: false,
  },
  {
    name: "Essentials",
    price: 299,
    period: "monthly",
    description: "Your 2 favourite fragrances delivered monthly. Never run out of what you love.",
    features: ["2 full-size packs of your choice", "10% off all add-on purchases", "Free shipping", "Skip or swap fragrances anytime", "Cancel anytime"],
    color: "bg-white border-amber-300 ring-2 ring-amber-700",
    buttonColor: "bg-amber-700 hover:bg-amber-800",
    popular: true,
  },
  {
    name: "Ritual",
    price: 799,
    period: "monthly",
    description: "The complete SEWA experience. Incense, candle, diffuser — all in one box.",
    features: ["3 full-size incense packs", "1 soy wax candle", "1 reed diffuser refill", "15% off all add-on purchases", "Free shipping", "Early access to new launches", "Quarterly artisan gift"],
    color: "bg-amber-50 border-amber-200",
    buttonColor: "bg-amber-700 hover:bg-amber-800",
    popular: false,
  },
];

function calculateSavings(plan: typeof plans[0], duration: 3 | 6 | 12) {
  const discounts = { 3: 10, 6: 15, 12: 20 };
  const monthlyPrice = plan.price;
  const totalFull = monthlyPrice * duration;
  const discounted = Math.round(totalFull * (1 - discounts[duration] / 100));
  return { monthlyPrice, totalFull, discounted, savings: totalFull - discounted, percent: discounts[duration] };
}

export default function SubscribePage() {
  const [duration, setDuration] = useState<3 | 6 | 12>(3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
          Never Run Out of Clean Fragrance
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto">
          Subscribe and save. Your favourite charcoal-free, toxin-free fragrances delivered monthly.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-10">
        {([3, 6, 12] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDuration(d)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              duration === d
                ? "bg-amber-700 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {d} Months {d === 12 ? "(-20%)" : d === 6 ? "(-15%)" : "(-10%)"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const savings = calculateSavings(plan, duration);
          return (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 ${plan.color} relative`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-700 text-white text-xs font-medium rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-stone-900 mt-2">{plan.name}</h3>
              <p className="text-sm text-stone-500 mt-1">{plan.description}</p>

              <div className="mt-4 mb-1">
                <span className="text-3xl font-bold text-stone-900">₹{savings.discounted / duration}</span>
                <span className="text-stone-400 text-sm">/mo</span>
              </div>
              <p className="text-xs text-amber-700 font-medium">
                Save ₹{savings.savings} ({savings.percent}% off) • Billed ₹{savings.discounted} every {duration} months
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                Full price: ₹{savings.monthlyPrice}/mo • ₹{savings.totalFull} for {duration} months
              </p>

              <ul className="mt-5 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-green-600 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`mt-6 w-full py-2.5 rounded-full text-white font-medium text-sm transition-colors ${plan.buttonColor}`}>
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-stone-400">
          All subscriptions include free shipping, cancel or skip anytime.{" "}
          <Link href="/products" className="text-amber-700 hover:underline font-medium">
            Browse products first →
          </Link>
        </p>
      </div>
    </div>
  );
}
