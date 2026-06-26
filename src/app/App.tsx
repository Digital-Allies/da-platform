import { useState, useCallback } from "react";
import { Sidebar } from "./components/Sidebar";
import { MobileTopBar, MobileBottomNav } from "./components/MobileNav";
import { useWindowSize } from "./hooks/useWindowSize";
import { LobbyScreen } from "./components/LobbyScreen";
import { RoomScreen } from "./components/RoomScreen";
import { LessonScreen } from "./components/LessonScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { NotesScreen } from "./components/NotesScreen";
import { HelpScreen } from "./components/HelpScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { CertificatesScreen } from "./components/CertificatesScreen";
import { DiscoveryFormScreen } from "./components/DiscoveryFormScreen";
import { ROOMS, type Room, type Course } from "./data/rooms";
import { type StudyNote, NOTES_KEY } from "./data/notes";

const STORAGE_KEY = "htc-progress-v2";

function initProgress(): Record<string, number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  const seed: Record<string, number> = {};
  for (const room of ROOMS) {
    for (const course of room.courses) {
      seed[`${room.id}::${course.t}`] = course.pct;
    }
  }
  return seed;
}

function initNotes(): StudyNote[] {
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

export type View =
  | "lobby" | "room" | "lesson" | "dashboard"
  | "certificates" | "notes" | "help" | "settings" | "discovery-form";

export default function App() {
  const [progress, setProgress] = useState<Record<string, number>>(initProgress);
  const [notes, setNotes] = useState<StudyNote[]>(initNotes);
  const [view, setView] = useState<View>("lobby");
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const setPct = useCallback((roomId: string, courseTitle: string, pct: number) => {
    setProgress(prev => {
      const next = { ...prev, [`${roomId}::${courseTitle}`]: pct };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /**/ }
      return next;
    });
  }, []);

  const addNote = useCallback((note: StudyNote) => {
    setNotes(prev => {
      const next = [note, ...prev];
      try { localStorage.setItem(NOTES_KEY, JSON.stringify(next)); } catch { /**/ }
      return next;
    });
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => {
      const next = prev.filter(n => n.id !== id);
      try { localStorage.setItem(NOTES_KEY, JSON.stringify(next)); } catch { /**/ }
      return next;
    });
  }, []);

  const navigate = useCallback((v: View, room?: Room) => {
    setView(v);
    if (room) setActiveRoom(room);
  }, []);

  const enterRoom  = useCallback((room: Room) => { setActiveRoom(room); setView("room"); }, []);
  const startLesson = useCallback((room: Room, course: Course) => {
    setActiveRoom(room); setActiveCourse(course); setView("lesson");
  }, []);
  const backToRoom     = useCallback(() => { setView("room"); setActiveCourse(null); }, []);
  const completeLesson = useCallback(() => { setView("room"); setActiveCourse(null); }, []);

  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div style={{
      display: "flex", height: "100vh", width: "100%",
      overflow: "hidden", background: "#F4F6F9", fontFamily: "Inter,sans-serif",
      flexDirection: isMobile ? "column" : "row",
    }}>
      {!isMobile && (
        <Sidebar view={view} activeRoom={activeRoom} onNavigate={navigate} progress={progress} />
      )}
      {isMobile && (
        <MobileTopBar view={view} activeRoom={activeRoom} onNavigate={navigate} progress={progress} />
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {view === "lobby" && <LobbyScreen progress={progress} onEnterRoom={enterRoom} />}
        {view === "room" && activeRoom && (
          <RoomScreen room={activeRoom} progress={progress} onBack={() => setView("lobby")} onStartLesson={startLesson} />
        )}
        {view === "lesson" && activeRoom && activeCourse && (
          <LessonScreen
            room={activeRoom} course={activeCourse}
            onBack={backToRoom} onComplete={completeLesson}
            onSetProgress={setPct} onAddNote={addNote}
            existingNotes={notes}
          />
        )}
        {view === "dashboard"    && <DashboardScreen progress={progress} />}
        {view === "certificates" && <CertificatesScreen progress={progress} />}
        {view === "notes"        && <NotesScreen notes={notes} onDelete={deleteNote} />}
        {view === "help"         && <HelpScreen />}
        {view === "settings"     && <SettingsScreen />}
        {view === "discovery-form" && <DiscoveryFormScreen />}
      </div>

      {isMobile && (
        <MobileBottomNav view={view} onNavigate={navigate} />
      )}
    </div>
  );
}
