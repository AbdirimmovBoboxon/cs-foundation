/* PROGRESS.JS — brauzerda saqlanadigan o'quv natijalari. */
const STORAGE_KEY = "csFoundationProgressV1";
const DAILY_KEY = "csFoundationDailyV1";

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Progressni o'qishda xato:", error);
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error("Progressni saqlashda xato:", error);
    return false;
  }
}

function loadDailyActivity() {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Faollik ma'lumotlarini o'qishda xato:", error);
    return {};
  }
}

function saveDailyActivity(activity) {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(activity));
  } catch (error) {
    console.error("Faollikni saqlashda xato:", error);
  }
}

function updateDailyActivity(mutator, dateKey = localDateKey()) {
  const activity = loadDailyActivity();
  const day = activity[dateKey] || { date: dateKey, activeSeconds: 0, quizAttempts: 0, miniGameWins: 0, completedLessons: [] };
  mutator(day);
  activity[dateKey] = day;
  saveDailyActivity(activity);
}

function getLessonProgress(lessonId) {
  const all = loadProgress();
  return all[lessonId] || {
    lessonId, date: null, activeSeconds: 0, quizAttempts: 0,
    lastScore: null, bestScore: null, completed: false,
    taskChecks: [], miniGameWins: 0, lastUpdated: null
  };
}

function updateLessonProgress(lessonId, mutator) {
  const all = loadProgress();
  const current = all[lessonId] || getLessonProgress(lessonId);
  mutator(current);
  current.lessonId = lessonId;
  current.lastUpdated = new Date().toISOString();
  all[lessonId] = current;
  saveProgress(all);
  return current;
}

function markLessonCompleted(lessonId, score) {
  const previous = getLessonProgress(lessonId);
  const wasCompleted = previous.completed;
  const now = new Date();
  const dayKey = localDateKey(now);
  updateLessonProgress(lessonId, progress => {
    progress.completed = true;
    progress.date = dayKey;
    progress.completedAt = now.toISOString();
    if (typeof score === "number") progress.lastScore = score;
  });
  if (!wasCompleted) {
    updateDailyActivity(day => {
      day.completedLessons = Array.isArray(day.completedLessons) ? day.completedLessons : [];
      if (!day.completedLessons.includes(lessonId)) day.completedLessons.push(lessonId);
    }, dayKey);
  }
}

function recordQuizResult(lessonId, correct, total) {
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  updateLessonProgress(lessonId, progress => {
    progress.quizAttempts = (progress.quizAttempts || 0) + 1;
    progress.lastScore = score;
    progress.bestScore = progress.bestScore === null || progress.bestScore === undefined ? score : Math.max(progress.bestScore, score);
    progress.lastQuizAt = new Date().toISOString();
    progress.lastQuizCorrect = correct;
    progress.lastQuizTotal = total;
    progress.date = localDateKey();
  });
  updateDailyActivity(day => { day.quizAttempts = (day.quizAttempts || 0) + 1; });
  return score;
}

function saveTaskChecks(lessonId, checks) {
  updateLessonProgress(lessonId, progress => {
    progress.taskChecks = checks.slice();
    progress.date = localDateKey();
  });
}

function recordMiniGameResult(lessonId, isCorrect) {
  if (!isCorrect) return;
  updateLessonProgress(lessonId, progress => {
    progress.miniGameWins = (progress.miniGameWins || 0) + 1;
    progress.date = localDateKey();
  });
  updateDailyActivity(day => { day.miniGameWins = (day.miniGameWins || 0) + 1; });
}

function addActiveSeconds(lessonId, seconds) {
  const wholeSeconds = Math.max(0, Math.round(seconds));
  if (wholeSeconds <= 0) return;
  const dateKey = localDateKey();
  updateLessonProgress(lessonId, progress => {
    progress.date = dateKey;
    progress.activeSeconds = (progress.activeSeconds || 0) + wholeSeconds;
  });
  updateDailyActivity(day => { day.activeSeconds = (day.activeSeconds || 0) + wholeSeconds; }, dateKey);
}

function countCompletedLessons() {
  return Object.values(loadProgress()).filter(progress => progress.completed).length;
}

function getTotalActiveSeconds() {
  return Object.values(loadDailyActivity()).reduce((sum, day) => sum + (day.activeSeconds || 0), 0);
}

function getLearningStreak() {
  const activity = loadDailyActivity();
  const hasLearning = key => {
    const day = activity[key];
    return Boolean(day && ((day.activeSeconds || 0) >= 60 || (day.completedLessons || []).length > 0 || (day.quizAttempts || 0) > 0));
  };
  let check = new Date();
  if (!hasLearning(localDateKey(check))) check.setDate(check.getDate() - 1);
  let streak = 0;
  while (hasLearning(localDateKey(check))) {
    streak += 1;
    check.setDate(check.getDate() - 1);
    if (streak > 3650) break;
  }
  return streak;
}

/* Faol o'qish vaqti: faqat dars sahifasi ochiq va tab faol bo'lganda hisoblanadi. */
let activeTimerStart = null;
let currentLessonIdForTimer = null;

function startActiveTimer(lessonId) {
  stopActiveTimer();
  currentLessonIdForTimer = lessonId;
  if (document.visibilityState === "visible") activeTimerStart = Date.now();
}

function pauseActiveTimer() {
  if (activeTimerStart !== null && currentLessonIdForTimer) {
    const seconds = (Date.now() - activeTimerStart) / 1000;
    addActiveSeconds(currentLessonIdForTimer, seconds);
  }
  activeTimerStart = null;
}

function stopActiveTimer() {
  pauseActiveTimer();
  currentLessonIdForTimer = null;
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    pauseActiveTimer();
  } else if (currentLessonIdForTimer && activeTimerStart === null) {
    activeTimerStart = Date.now();
  }
});
window.addEventListener("beforeunload", pauseActiveTimer);
