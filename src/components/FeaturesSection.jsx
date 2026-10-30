import React from 'react';
import { Car, Users, ShieldCheck, Sliders, CheckCircle } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Car className="w-6 h-6 text-emerald-600" />,
      title: "Ease of Travel",
      description:
        "Seamless door-to-door pickups from Delhi NCR or Chandigarh. Sanitized private cabs (Innova Crysta, Dzire, Tempo) or luxury Volvo semi-sleepers."
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: "Local Pahadi Guidance",
      description:
        "Born and raised in the mountains, our chauffeurs and trek leaders know secret scenic spots, local cafes, and the safest weather routes."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Safe & Reliable",
      description:
        "24/7 dedicated mountain support desk. Real-time updates on high-pass road conditions, landslide clearance, and certified tourist-rated stays."
    },
    {
      icon: <Sliders className="w-6 h-6 text-emerald-600" />,
      title: "Flexible Custom Plans",
      description:
        "No rigid timelines. Customize pace, add romantic candle-light dinners, honeymoon cakes, snow activities, or senior-friendly halts at zero extra fuss."
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-slate-200/70 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-sans">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
