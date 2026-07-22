import type * as React from "react";

/** A single 30-day content-calendar entry, typically served from the CMS. */
export interface ContentCalendarEntry {
  day: number;
  week?: number | string;
  category?: string;
  topic?: string;
  hook?: string;
  caption?: string;
  promptRef?: string;
  prompt?: string;
  status?: "draft" | "approved" | "scheduled" | "posted" | "archived" | string;
}

export interface ContentCalendarProps {
  /** Calendar rows, usually piped straight from the CMS API. */
  data?: ContentCalendarEntry[];
  /** Initial sort column. */
  sortBy?: "day" | "category" | "status";
  /** Show the Status column. */
  showStatus?: boolean;
  /** Show the Asset Prompt column. */
  showPromptRef?: boolean;
  /** Row click handler — wire to open an editor. */
  onEntryClick?: ((entry: ContentCalendarEntry) => void) | null;
}

/**
 * Reusable 30-day content calendar. Sortable by day/category/status,
 * filterable by category, CMS-hookable via `data`.
 */
export declare const ContentCalendar: React.FC<ContentCalendarProps>;
