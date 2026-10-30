/* SCRIPT.JS — darslarni ko'rsatish, mashqlarni ishlatish va navigatsiya. */
let activeModuleId = null;
let activeLessonId = null;

function clearElement(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function makeElement(tag, options = {}) {
  const node = document.createElement(tag);
  if (options.text !== undefined) node.textContent = options.text;
  if (options.className) node.className = options.className;
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
  }
  return node;
}

function setText(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text;
}

function getLessonsForModule(moduleId) {
  return Object.values(LESSONS)
    .filter(lesson => lesson.moduleId === moduleId)
    .sort((a, b) => a.number - b.number);
}

function renderModuleList() {
  const container = document.getElementById("module-list");
  clearElement(container);

  MODULES.forEach(module => {
    const lessons = getLessonsForModule(module.id);
    const completed = lessons.filter(lesson => getLessonProgress(lesson.id).completed).length;
    const card = makeElement("button", { className: "module-card", attributes: { type: "button", "aria-pressed": module.id === activeModuleId ? "true" : "false" } });
    if (module.id === activeModuleId) card.classList.add("active");

    const top = makeElement("div", { className: "module-topline" });
    top.appendChild(makeElement("span", { className: "module-number", text: `Modul ${module.number}` }));
    top.appendChild(makeElement("span", { className: "module-count", text: lessons.length ? `${completed}/${lessons.length} dars` : "Rejada" }));
    card.appendChild(top);
    card.appendChild(makeElement("span", { className: "module-title", text: module.title }));

    const track = makeElement("div", { className: "module-progress-track", attributes: { "aria-label": "Modul progressi" } });
    const fill = makeElement("div", { className: "module-progress-fill" });
    fill.style.width = lessons.length ? `${Math.round((completed / lessons.length) * 100)}%` : "0%";
    track.appendChild(fill);
    card.appendChild(track);

    card.addEventListener("click", () => {
      activeModuleId = module.id;
      renderModuleList();
      renderLessonList(module.id);
    });
    container.appendChild(card);
  });
}

function renderLessonList(moduleId) {
  const container = document.getElementById("lesson-list");
  const module = MODULES.find(item => item.id === moduleId);
  const lessons = getLessonsForModule(moduleId);
  clearElement(container);

  setText("selected-module-title", module ? module.title : "Darslar");
  setText("selected-module-description", module ? module.description : "O'rganish uchun darsni tanlang.");

  if (lessons.length === 0) {
    const empty = makeElement("div", { className: "empty-module" });
    empty.appendChild(makeElement("strong", { text: "Bu modul tayyorlanmoqda." }));
    empty.appendChild(makeElement("span", { text: "Modulning mavzulari o'quv dasturi bo'yicha navbat bilan qo'shiladi. Hozir tayyor bo'lgan darslarni chap tomondagi boshqa moduldan tanlashingiz mumkin." }));
    container.appendChild(empty);
    return;
  }

  lessons.forEach(lesson => {
    const progress = getLessonProgress(lesson.id);
    const card = makeElement("button", { className: "lesson-card", attributes: { type: "button" } });
    const left = makeElement("span", { className: "lesson-card-left" });
    left.appendChild(makeElement("span", { className: "lesson-number", text: `${lesson.number}-dars · ${lesson.estimatedMinutes} daqiqa` }));
    left.appendChild(makeElement("span", { className: "lesson-card-title", text: lesson.title }));
    left.appendChild(makeElement("span", { className: "lesson-card-meta", text: `${lesson.objectives.length} ta maqsad · ${lesson.quiz.length} ta test savoli · mini-o'yin` }));
    const statusText = progress.completed ? "✓ Tugatilgan" : (progress.lastScore !== null && progress.lastScore !== undefined ? "Test bajarilgan" : "Boshlanmagan");
    const status = makeElement("span", { className: `lesson-status ${progress.completed ? "status-done" : progress.lastScore !== null && progress.lastScore !== undefined ? "in-progress" : "status-pending"}`, text: statusText });
    card.append(left, status);
    card.addEventListener("click", () => openLesson(lesson.id));
    container.appendChild(card);
  });
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("hidden", view.id !== viewId));
  document.getElementById("nav-home").classList.toggle("active", viewId === "view-home");
  document.getElementById("nav-progress").classList.toggle("active", viewId === "view-progress");
  document.getElementById("nav-home").setAttribute("aria-pressed", String(viewId === "view-home"));
  document.getElementById("nav-progress").setAttribute("aria-pressed", String(viewId === "view-progress"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openLesson(lessonId) {
  const lesson = LESSONS[lessonId];
  if (!lesson) return;
  stopActiveTimer();
  activeLessonId = lessonId;
  activeModuleId = lesson.moduleId;
  renderModuleList();
  renderLessonList(activeModuleId);
  showView("view-lesson");

  const progress = getLessonProgress(lessonId);
  setText("lesson-level", lesson.level || "Boshlang'ich");
  setText("lesson-title", `${lesson.number}. ${lesson.title}`);
  const extraMeta = progress.completed ? " · Tugatilgan" : "";
  setText("lesson-meta", `Taxminan ${lesson.estimatedMinutes} daqiqa · ${lesson.quiz.length} ta test savoli${extraMeta}`);
  setText("lesson-status-badge", progress.completed ? "✓ Tugatilgan" : progress.lastScore !== null && progress.lastScore !== undefined ? `Test: ${progress.lastScore}%` : "Boshlanmagan");
  document.getElementById("lesson-status-badge").classList.toggle("done", Boolean(progress.completed));

  const objectives = document.getElementById("lesson-objectives");
  clearElement(objectives);
  lesson.objectives.forEach(item => objectives.appendChild(makeElement("li", { text: item })));

  renderReading(lesson.explanationBlocks || [], lesson.explanation || [], lesson.images || []);
  renderTerms(lesson.terms || []);
  renderVideo(lesson.video);
  renderTask(lesson.task, lessonId);
  renderMiniGame(lesson.miniGame, lessonId);
  renderQuiz(lesson.quiz || [], lessonId);

  const summary = document.getElementById("lesson-summary");
  clearElement(summary);
  (lesson.summary || []).forEach(item => summary.appendChild(makeElement("li", { text: item })));

  const nextButton = document.getElementById("go-next-lesson");
  const nextLesson = lesson.nextLessonId && LESSONS[lesson.nextLessonId] ? LESSONS[lesson.nextLessonId] : null;
  nextButton.disabled = !nextLesson;
  nextButton.textContent = nextLesson ? `Keyingi dars: ${nextLesson.number} →` : "Keyingi dars hali qo'shilmagan";
  nextButton.onclick = () => { if (nextLesson) openLesson(nextLesson.id); };

  document.getElementById("mark-complete").onclick = () => completeCurrentLesson(lessonId, lesson);
  setText("lesson-action-message", "");
  updateLessonCompletionUI(lesson, progress);
  startActiveTimer(lessonId);
}

function renderReading(blocks, fallbackParagraphs, fallbackImages) {
  const container = document.getElementById("lesson-reading");
  clearElement(container);

  if (!blocks.length) {
    const legacySection = makeElement("section", { className: "reading-section" });
    fallbackImages.forEach(image => legacySection.appendChild(makeFigure(image)));
    fallbackParagraphs.forEach(paragraph => legacySection.appendChild(makeElement("p", { text: paragraph })));
    container.appendChild(legacySection);
    return;
  }

  blocks.forEach(block => {
    const section = makeElement("section", { className: "reading-section" });
    if (block.heading) section.appendChild(makeElement("h3", { text: block.heading }));
    if (block.image) section.appendChild(makeFigure(block.image));
    (block.paragraphs || []).forEach(paragraph => section.appendChild(makeElement("p", { text: paragraph })));
    if (block.callout) {
      const callout = makeElement("aside", { className: "reading-callout" });
      callout.appendChild(makeElement("strong", { text: block.callout.title || "Eslatma" }));
      callout.appendChild(makeElement("span", { text: block.callout.text || "" }));
      section.appendChild(callout);
    }
    container.appendChild(section);
  });
}

function makeFigure(image) {
  const figure = makeElement("figure", { className: `lesson-figure${image.position === "left" ? " image-left" : ""}` });
  const img = makeElement("img", { attributes: { src: image.src, alt: image.alt || "O'quv rasmi", loading: "lazy" } });
  img.addEventListener("error", () => {
    img.remove();
    if (!figure.querySelector(".image-missing")) {
      figure.appendChild(makeElement("p", { className: "image-missing placeholder-text", text: "Rasm topilmadi. assets/images papkasidagi manzilni tekshiring." }));
    }
  }, { once: true });
  figure.appendChild(img);
  if (image.caption) figure.appendChild(makeElement("figcaption", { text: image.caption }));
  return figure;
}

function renderTerms(terms) {
  const container = document.getElementById("lesson-terms");
  clearElement(container);
  if (!terms.length) {
    container.appendChild(makeElement("p", { className: "placeholder-text", text: "Bu dars uchun atamalar hali qo'shilmagan." }));
    return;
  }
  terms.forEach(item => {
    const card = makeElement("div", { className: "term-card" });
    card.appendChild(makeElement("dt", { text: item.term }));
    const definition = makeElement("dd", { text: item.definition });
    if (item.example) definition.appendChild(makeElement("span", { className: "term-example", text: `Misol: ${item.example}` }));
    card.appendChild(definition);
    container.appendChild(card);
  });
}

function renderVideo(video) {
  const container = document.getElementById("lesson-video");
  clearElement(container);
  if (!video || !video.url) {
    container.appendChild(makeElement("p", { className: "video-note", text: "Bu tanishtiruv mavzusi uchun hozircha alohida tashqi video tanlanmagan. Yozma yo'riqnomani o'qing va amaliy vazifani bajaring." }));
    return;
  }

  const wrapper = makeElement("div", { className: "video-frame" });
  if (video.embedUrl) {
    const iframe = makeElement("iframe", { attributes: {
      src: video.embedUrl,
      title: video.title || "O'quv videosi",
      loading: "lazy",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      referrerpolicy: "strict-origin-when-cross-origin",
      allowfullscreen: ""
    } });
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
  }

  const details = makeElement("div", { className: "video-details" });
  const titleGroup = makeElement("div");
  titleGroup.appendChild(makeElement("p", { className: "video-title", text: video.title || "Video dars" }));
  titleGroup.appendChild(makeElement("span", { className: "video-language", text: video.language ? `Til: ${video.language}` : "YouTube videosi" }));
  details.appendChild(titleGroup);
  const link = makeElement("a", { className: "video-fallback-link", text: "YouTube'da ochish ↗", attributes: { href: video.url, target: "_blank", rel: "noopener noreferrer" } });
  details.appendChild(link);
  container.appendChild(details);
  if (video.note) container.appendChild(makeElement("p", { className: "video-language", text: video.note }));
}

function renderTask(task, lessonId) {
  const container = document.getElementById("lesson-task");
  clearElement(container);
  if (!task) {
    container.appendChild(makeElement("p", { className: "placeholder-text", text: "Bu darsga amaliy vazifa hali qo'shilmagan." }));
    return;
  }

  const steps = makeElement("ol", { className: "task-steps" });
  (task.steps || []).forEach(step => steps.appendChild(makeElement("li", { text: step })));
  container.appendChild(steps);

  if (task.expectedResult) {
    const result = makeElement("div", { className: "task-result" });
    result.appendChild(makeElement("strong", { text: "Kutiladigan natija" }));
    result.appendChild(makeElement("span", { text: task.expectedResult }));
    container.appendChild(result);
  }

  const oldChecks = getLessonProgress(lessonId).taskChecks || [];
  if (task.checklist && task.checklist.length) {
    const checks = makeElement("div", { className: "task-checklist" });
    task.checklist.forEach((labelText, index) => {
      const label = makeElement("label", { className: "task-check" });
      const checkbox = makeElement("input", { attributes: { type: "checkbox", "data-check-index": index } });
      checkbox.checked = Boolean(oldChecks[index]);
      if (checkbox.checked) label.classList.add("checked");
      checkbox.addEventListener("change", () => {
        label.classList.toggle("checked", checkbox.checked);
        const current = Array.from(checks.querySelectorAll("input[type=checkbox]")).map(input => input.checked);
        saveTaskChecks(lessonId, current);
        updateLessonCompletionUI(LESSONS[lessonId], getLessonProgress(lessonId));
      });
      label.append(checkbox, document.createTextNode(labelText));
      checks.appendChild(label);
    });
    container.appendChild(checks);
  }

  if (task.resources && task.resources.length) {
    const resources = makeElement("div", { className: "task-resources" });
    task.resources.forEach(resource => {
      const link = makeElement("a", { className: "resource-link", text: `↗ ${resource.label}`, attributes: { href: resource.url, target: "_blank", rel: "noopener noreferrer" } });
      resources.appendChild(link);
      if (resource.description) resources.appendChild(makeElement("p", { className: "video-language", text: resource.description }));
    });
    container.appendChild(resources);
  }
}

function renderMiniGame(game, lessonId) {
  const container = document.getElementById("lesson-game");
  clearElement(container);
  if (!game) {
    container.appendChild(makeElement("p", { className: "placeholder-text", text: "Bu dars uchun mini-o'yin keyingi bosqichda qo'shiladi." }));
    return;
  }

  const card = makeElement("div", { className: "game-card" });
  card.appendChild(makeElement("h3", { text: game.title }));
  card.appendChild(makeElement("p", { className: "game-prompt", text: game.prompt }));
  const options = makeElement("div", { className: "game-options" });
  const feedback = makeElement("div", { className: "game-feedback", attributes: { role: "status", "aria-live": "polite" } });
  game.options.forEach((option, index) => {
    const button = makeElement("button", { className: "game-option", text: option, attributes: { type: "button" } });
    button.addEventListener("click", () => {
      const correct = index === game.correctIndex;
      feedback.className = `game-feedback show ${correct ? "correct" : "incorrect"}`;
      feedback.textContent = `${correct ? "To'g'ri! " : "Hali emas. "}${game.explanation}`;
      if (correct) {
        options.querySelectorAll("button").forEach(item => { item.disabled = true; });
        recordMiniGameResult(lessonId, true);
        feedback.textContent += " Mini-o'yin natijasi saqlandi.";
      } else {
        button.disabled = true;
      }
    });
    options.appendChild(button);
  });
  card.append(options, feedback);
  container.appendChild(card);
}

function renderQuiz(quiz, lessonId) {
  const container = document.getElementById("lesson-quiz");
  clearElement(container);
  if (!quiz.length) {
    container.appendChild(makeElement("p", { className: "placeholder-text", text: "Bu dars uchun test hali qo'shilmagan." }));
    return;
  }

  const form = makeElement("form", { attributes: { novalidate: "" } });
  const feedbackElements = [];
  quiz.forEach((question, questionIndex) => {
    const fieldset = makeElement("fieldset", { className: "quiz-question" });
    fieldset.appendChild(makeElement("legend", { className: "quiz-question-title", text: `${questionIndex + 1}. ${question.question}` }));
    const options = makeElement("div", { className: "quiz-options" });
    question.options.forEach((optionText, optionIndex) => {
      const label = makeElement("label");
      const radio = makeElement("input", { attributes: { type: "radio", name: `quiz-${lessonId}-${questionIndex}`, value: optionIndex } });
      label.append(radio, document.createTextNode(optionText));
      options.appendChild(label);
    });
    fieldset.appendChild(options);
    const feedback = makeElement("div", { className: "quiz-feedback", attributes: { role: "status" } });
    fieldset.appendChild(feedback);
    feedbackElements.push(feedback);
    form.appendChild(fieldset);
  });

  const submitRow = makeElement("div", { className: "quiz-submit-row" });
  const submit = makeElement("button", { className: "primary-btn", text: "Natijani tekshirish", attributes: { type: "submit" } });
  const result = makeElement("span", { className: "quiz-result", attributes: { role: "status", "aria-live": "polite" } });
  const previous = getLessonProgress(lessonId);
  if (previous.lastScore !== null && previous.lastScore !== undefined) {
    result.textContent = `Oxirgi urinish: ${previous.lastScore}%${previous.bestScore > previous.lastScore ? ` · Eng yaxshi: ${previous.bestScore}%` : ""}`;
  }
  submitRow.append(submit, result);
  form.appendChild(submitRow);

  form.addEventListener("submit", event => {
    event.preventDefault();
    let correctCount = 0;
    quiz.forEach((question, questionIndex) => {
      const selected = form.querySelector(`input[name="quiz-${lessonId}-${questionIndex}"]:checked`);
      const selectedIndex = selected ? Number(selected.value) : -1;
      const isCorrect = selectedIndex === question.correctIndex;
      if (isCorrect) correctCount += 1;
      const feedback = feedbackElements[questionIndex];
      feedback.className = `quiz-feedback show ${isCorrect ? "correct" : "incorrect"}`;
      const correctOption = question.options[question.correctIndex];
      feedback.textContent = isCorrect
        ? `To'g'ri. ${question.explanation}`
        : `To'g'ri javob: ${correctOption}. ${question.explanation}`;
    });
    const score = recordQuizResult(lessonId, correctCount, quiz.length);
    result.textContent = `Natija: ${correctCount}/${quiz.length} · ${score}%`;
    updateLessonCompletionUI(LESSONS[lessonId], getLessonProgress(lessonId));
  });
  container.appendChild(form);
}

function updateLessonCompletionUI(lesson, progress) {
  if (!lesson || !progress) return;
  const checklistLength = lesson.task && lesson.task.checklist ? lesson.task.checklist.length : 0;
  const checkedCount = Math.min(checklistLength, (progress.taskChecks || []).filter(Boolean).length);
  const taskRatio = checklistLength ? checkedCount / checklistLength : 1;
  const scoreRatio = typeof progress.lastScore === "number" ? Math.min(1, progress.lastScore / 100) : 0;
  const percent = progress.completed ? 100 : Math.round(taskRatio * 40 + scoreRatio * 60);
  document.getElementById("lesson-progress-fill").style.width = `${percent}%`;
  const button = document.getElementById("mark-complete");
  button.textContent = progress.completed ? "✓ Dars tugatilgan" : "Darsni yakunlash";
  button.disabled = Boolean(progress.completed);
}

function completeCurrentLesson(lessonId, lesson) {
  const progress = getLessonProgress(lessonId);
  const requiredChecks = lesson.task && lesson.task.checklist ? lesson.task.checklist.length : 0;
  const checked = requiredChecks ? (progress.taskChecks || []).filter(Boolean).length : requiredChecks;
  const taskComplete = checked >= requiredChecks;
  const quizComplete = !lesson.quiz.length || (typeof progress.lastScore === "number" && progress.lastScore >= 60);

  if (!taskComplete) {
    setText("lesson-action-message", `Avval amaliy vazifadagi belgilarni tugating: ${checked}/${requiredChecks}. Bu bajarilgan ishlarni eslab qolishga yordam beradi.`);
    document.getElementById("lesson-action-message").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (!quizComplete) {
    setText("lesson-action-message", "Avval mini-testni topshiring va kamida 60% natijaga erishing. Xohlasangiz, testni qayta urinib ko'rishingiz mumkin.");
    document.getElementById("lesson-action-message").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  markLessonCompleted(lessonId, progress.lastScore);
  renderModuleList();
  renderLessonList(activeModuleId);
  setText("lesson-status-badge", "✓ Tugatilgan");
  document.getElementById("lesson-status-badge").classList.add("done");
  document.getElementById("lesson-progress-fill").style.width = "100%";
  document.getElementById("mark-complete").textContent = "✓ Dars tugatilgan";
  document.getElementById("mark-complete").disabled = true;
  document.getElementById("lesson-action-message").textContent = "Ajoyib! Dars yakunlandi va natijangiz saqlandi. Keyingi darsga o'tishingiz mumkin.";
  setText("home-completed-count", String(countCompletedLessons()));
}

function renderProgressView() {
  const summary = document.getElementById("progress-summary");
  clearElement(summary);
  summary.append(
    makeStatBox(countCompletedLessons(), "Tugatilgan darslar"),
    makeStatBox(Object.keys(LESSONS).length, "Hozir mavjud darslar"),
    makeStatBox(`${Math.round(getTotalActiveSeconds() / 60)}`, "Faol daqiqa"),
    makeStatBox(getLearningStreak(), "Kunlik ketma-ketlik")
  );
  renderHeatmap();
  renderRecentResults();
}

function makeStatBox(number, label) {
  const box = makeElement("div", { className: "stat-box" });
  box.append(makeElement("div", { className: "stat-number", text: String(number) }), makeElement("div", { className: "stat-label", text: label }));
  return box;
}

function renderHeatmap() {
  const container = document.getElementById("progress-heatmap");
  clearElement(container);
  const grid = makeElement("div", { className: "heatmap" });
  const activity = loadDailyActivity();
  const today = new Date();
  const currentMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekdayIndex = (currentMonday.getDay() + 6) % 7;
  currentMonday.setDate(currentMonday.getDate() - weekdayIndex - (12 * 7));

  for (let index = 0; index < 13 * 7; index += 1) {
    const date = new Date(currentMonday);
    date.setDate(currentMonday.getDate() + index);
    const key = localDateKey(date);
    const day = activity[key] || { activeSeconds: 0, completedLessons: [], quizAttempts: 0 };
    const minutes = Math.round((day.activeSeconds || 0) / 60);
    const cell = makeElement("span", { className: "heat-cell", attributes: { role: "img" } });
    if (minutes >= 45) cell.classList.add("heat-high");
    else if (minutes >= 20) cell.classList.add("heat-mid");
    else if (minutes > 0 || (day.completedLessons || []).length || day.quizAttempts) cell.classList.add("heat-low");
    else cell.classList.add("heat-none");
    const doneCount = (day.completedLessons || []).length;
    cell.title = `${key}: ${minutes} faol daqiqa, ${doneCount} ta dars tugatilgan, ${day.quizAttempts || 0} ta test urinish`; 
    cell.setAttribute("aria-label", cell.title);
    grid.appendChild(cell);
  }
  container.appendChild(grid);
}

function renderRecentResults() {
  const container = document.getElementById("progress-recent-results");
  clearElement(container);
  const results = Object.values(loadProgress())
    .filter(progress => progress.lastScore !== null && progress.lastScore !== undefined)
    .sort((a, b) => String(b.lastQuizAt || b.lastUpdated || "").localeCompare(String(a.lastQuizAt || a.lastUpdated || "")))
    .slice(0, 8);
  if (!results.length) {
    container.appendChild(makeElement("p", { className: "placeholder-text", text: "Hali test topshirilmagan. Darsni ochib, mini-testni bajaring." }));
    return;
  }
  const list = makeElement("div", { className: "recent-results" });
  results.forEach(progress => {
    const lesson = LESSONS[progress.lessonId];
    if (!lesson) return;
    const row = makeElement("div", { className: "recent-result" });
    const info = makeElement("div");
    info.appendChild(makeElement("div", { className: "recent-result-title", text: lesson.title }));
    info.appendChild(makeElement("div", { className: "recent-result-meta", text: `${progress.quizAttempts || 0} ta urinish${progress.completed ? " · Dars tugatilgan" : ""}` }));
    row.append(info, makeElement("span", { className: "score-pill", text: `${progress.lastScore}%` }));
    list.appendChild(row);
  });
  container.appendChild(list);
}

function init() {
  renderModuleList();
  activeModuleId = MODULES[0] ? MODULES[0].id : null;
  if (activeModuleId) {
    renderModuleList();
    renderLessonList(activeModuleId);
  }
  setText("home-completed-count", String(countCompletedLessons()));

  document.getElementById("nav-home").addEventListener("click", () => {
    stopActiveTimer();
    showView("view-home");
    setText("home-completed-count", String(countCompletedLessons()));
  });
  document.getElementById("brand-home").addEventListener("click", event => {
    event.preventDefault();
    stopActiveTimer();
    showView("view-home");
    setText("home-completed-count", String(countCompletedLessons()));
  });
  document.getElementById("nav-progress").addEventListener("click", () => {
    stopActiveTimer();
    showView("view-progress");
    renderProgressView();
  });
  document.getElementById("back-to-list").addEventListener("click", () => {
    stopActiveTimer();
    showView("view-home");
  });
}

init();
