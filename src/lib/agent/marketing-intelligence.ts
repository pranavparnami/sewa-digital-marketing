import calendar from "@/data/marketing-calendar.json";
import competitors from "@/data/competitor-analysis.json";

interface CalendarEvent {
  name: string;
  date: string;
  type: string;
  priority: string;
  relevance: string;
  contentIdeas: string[];
  hashtags: string[];
}

export function getUpcomingEvents(days = 30): CalendarEvent[] {
  const now = new Date();
  const cutoff = new Date(now.getTime() + days * 86400000);
  return calendar.events
    .filter((e) => {
      const d = new Date(e.date);
      return d >= now && d <= cutoff;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getNextBigEvent(): CalendarEvent | null {
  const upcoming = getUpcomingEvents(90);
  const critical = upcoming.filter((e) => e.priority === "critical" || e.priority === "high");
  return critical[0] || upcoming[0] || null;
}

export function getEventsByType(type: string): CalendarEvent[] {
  return calendar.events.filter((e) => e.type === type);
}

export function getCompetitor(name: string) {
  return competitors.competitors.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function getCompetitorsByCategory(category: string) {
  return competitors.competitors.filter((c) => c.category.includes(category));
}

export function getAllCompetitors() {
  return competitors.competitors;
}

export function getMarketGaps() {
  return competitors.marketLandscape.gapsToExploit;
}

export function getPositioning() {
  return competitors.sewaPositioningRecommendation;
}

export function getCalendarSummary(days = 30): string {
  const events = getUpcomingEvents(days);
  if (events.length === 0) return "No major events in the next 30 days.";

  return events
    .map((e) => {
      const daysAway = Math.ceil(
        (new Date(e.date).getTime() - Date.now()) / 86400000
      );
      const priority = e.priority.toUpperCase();
      return `[${priority}] ${e.name} — ${daysAway} days away — ${e.type}\n  ${e.relevance}`;
    })
    .join("\n");
}

export function getEventContentSuggestions(eventName: string): string[] {
  const event = calendar.events.find(
    (e) => e.name.toLowerCase() === eventName.toLowerCase()
  );
  return event?.contentIdeas || [];
}
