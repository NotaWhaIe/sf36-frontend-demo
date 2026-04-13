const STORAGE_KEY = "sf36-frontend-draft-v1";
const SHEETS_FALLBACK_SHEET_NAME = "Анонимно";
const APP_CONFIG = {
  spreadsheetUrl: globalThis.SF36_CONFIG?.googleSheetsSpreadsheetUrl || "",
  webAppUrl: globalThis.SF36_CONFIG?.googleSheetsWebAppUrl || "",
};

const OPTION_SETS = {
  q1: [
    { value: 5, label: "Отличное", emoji: "😄" },
    { value: 4, label: "Очень хорошее", emoji: "🙂" },
    { value: 3, label: "Хорошее", emoji: "😐" },
    { value: 2, label: "Посредственное", emoji: "🙁" },
    { value: 1, label: "Плохое", emoji: "😠" },
  ],
  q2: [
    { value: 1, label: "Значительно лучше, чем год назад", emoji: "😄" },
    { value: 2, label: "Несколько лучше, чем год назад", emoji: "🙂" },
    { value: 3, label: "Примерно так же, как год назад", emoji: "😐" },
    { value: 4, label: "Несколько хуже, чем год назад", emoji: "🙁" },
    { value: 5, label: "Гораздо хуже, чем год назад", emoji: "😠" },
  ],
  q3to12: [
    { value: 1, label: "Да, значительно ограничивает" },
    { value: 2, label: "Да, немного ограничивает" },
    { value: 3, label: "Нет, совсем не ограничивает" },
  ],
  q13to19: [
    { value: 1, label: "Да" },
    { value: 2, label: "Нет" },
  ],
  q20: [
    { value: 5, label: "Совсем не мешало", emoji: "😄" },
    { value: 4, label: "Немного", emoji: "🙂" },
    { value: 3, label: "Умеренно", emoji: "😐" },
    { value: 2, label: "Сильно", emoji: "🙁" },
    { value: 1, label: "Очень сильно", emoji: "😠" },
  ],
  q21: [
    { value: 6, label: "Совсем не испытывал(а)" },
    { value: 5, label: "Очень слабую" },
    { value: 4, label: "Слабую" },
    { value: 3, label: "Умеренную" },
    { value: 2, label: "Сильную" },
    { value: 1, label: "Очень сильную" },
  ],
  q22: [
    { value: 5, label: "Совсем не мешала", emoji: "😄" },
    { value: 4, label: "Немного", emoji: "🙂" },
    { value: 3, label: "Умеренно", emoji: "😐" },
    { value: 2, label: "Сильно", emoji: "🙁" },
    { value: 1, label: "Очень сильно", emoji: "😠" },
  ],
  q23to31: [
    { value: 1, label: "Все время" },
    { value: 2, label: "Большую часть времени" },
    { value: 3, label: "Часто" },
    { value: 4, label: "Иногда" },
    { value: 5, label: "Редко" },
    { value: 6, label: "Ни разу" },
  ],
  q32: [
    { value: 1, label: "Все время", emoji: "😠" },
    { value: 2, label: "Большую часть времени", emoji: "🙁" },
    { value: 3, label: "Иногда", emoji: "😐" },
    { value: 4, label: "Редко", emoji: "🙂" },
    { value: 5, label: "Ни разу", emoji: "😄" },
  ],
  q33to36: [
    { value: 1, label: "Определенно верно", emoji: "😠" },
    { value: 2, label: "В основном верно", emoji: "🙁" },
    { value: 3, label: "Не знаю", emoji: "😐" },
    { value: 4, label: "В основном неверно", emoji: "🙂" },
    { value: 5, label: "Определенно неверно", emoji: "😄" },
  ],
};

const QUESTIONS = [
  {
    id: "q1",
    number: 1,
    text: "В целом Вы оценили бы состояние Вашего здоровья как",
    optionsKey: "q1",
    scale: "gh",
  },
  {
    id: "q2",
    number: 2,
    text: "Как бы Вы в целом оценили свое здоровье сейчас по сравнению с тем, что было год назад?",
    optionsKey: "q2",
    scale: null,
  },
  {
    id: "q3",
    number: 3,
    text: "Тяжелые физические нагрузки, такие как бег, поднятие тяжестей, занятие силовыми видами спорта",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q4",
    number: 4,
    text: "Умеренные физические нагрузки, такие как передвинуть стол, поработать с пылесосом, собирать грибы или ягоды",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q5",
    number: 5,
    text: "Поднять или нести сумку с продуктами",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q6",
    number: 6,
    text: "Подняться пешком по лестнице на несколько пролетов",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q7",
    number: 7,
    text: "Подняться пешком по лестнице на один пролет",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q8",
    number: 8,
    text: "Наклониться, встать на колени, присесть на корточки",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q9",
    number: 9,
    text: "Пройти расстояние более одного километра",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q10",
    number: 10,
    text: "Пройти расстояние в несколько кварталов",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q11",
    number: 11,
    text: "Пройти расстояние в один квартал",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q12",
    number: 12,
    text: "Самостоятельно вымыться, одеться",
    optionsKey: "q3to12",
    scale: "pf",
  },
  {
    id: "q13",
    number: 13,
    text: "За последние 4 недели пришлось сократить количество времени, затрачиваемого на работу или другие дела из-за физического состояния",
    optionsKey: "q13to19",
    scale: "rp",
  },
  {
    id: "q14",
    number: 14,
    text: "За последние 4 недели Вы выполнили меньше, чем хотели, из-за физического состояния",
    optionsKey: "q13to19",
    scale: "rp",
  },
  {
    id: "q15",
    number: 15,
    text: "За последние 4 недели Вы были ограничены в выполнении определенного вида работы или другой деятельности из-за физического состояния",
    optionsKey: "q13to19",
    scale: "rp",
  },
  {
    id: "q16",
    number: 16,
    text: "За последние 4 недели были трудности при выполнении работы или других дел, потому что требовались дополнительные усилия",
    optionsKey: "q13to19",
    scale: "rp",
  },
  {
    id: "q17",
    number: 17,
    text: "За последние 4 недели пришлось сократить количество времени, затрачиваемого на работу или другие дела из-за эмоционального состояния",
    optionsKey: "q13to19",
    scale: "re",
  },
  {
    id: "q18",
    number: 18,
    text: "За последние 4 недели Вы выполнили меньше, чем хотели, из-за эмоционального состояния",
    optionsKey: "q13to19",
    scale: "re",
  },
  {
    id: "q19",
    number: 19,
    text: "За последние 4 недели Вы выполняли свою работу или другие дела не так аккуратно, как обычно, из-за эмоционального состояния",
    optionsKey: "q13to19",
    scale: "re",
  },
  {
    id: "q20",
    number: 20,
    text: "Насколько Ваше физическое или эмоциональное состояние в течение последних 4 недель мешало Вам проводить время с семьей, друзьями, соседями или в коллективе?",
    optionsKey: "q20",
    scale: "sf",
  },
  {
    id: "q21",
    number: 21,
    text: "Насколько сильную физическую боль Вы испытывали за последние 4 недели?",
    optionsKey: "q21",
    scale: "bp",
  },
  {
    id: "q22",
    number: 22,
    text: "В какой степени боль в течение последних 4 недель мешала Вам заниматься Вашей нормальной работой, включая работу вне дома и по дому?",
    optionsKey: "q22",
    scale: "bp",
  },
  {
    id: "q23",
    number: 23,
    text: "Как часто в течение последних 4 недель Вы не чувствовали себя бодрым(ой)?",
    optionsKey: "q23to31",
    scale: "vt",
  },
  {
    id: "q24",
    number: 24,
    text: "Как часто в течение последних 4 недель Вы сильно нервничали?",
    optionsKey: "q23to31",
    scale: "mh",
  },
  {
    id: "q25",
    number: 25,
    text: "Как часто в течение последних 4 недель Вы чувствовали себя таким(ой) подавленным(ой), что ничто не могло Вас взбодрить?",
    optionsKey: "q23to31",
    scale: "mh",
  },
  {
    id: "q26",
    number: 26,
    text: "Как часто в течение последних 4 недель Вы не чувствовали себя спокойным(ой) и умиротворенным(ой)?",
    optionsKey: "q23to31",
    scale: "mh",
  },
  {
    id: "q27",
    number: 27,
    text: "Как часто в течение последних 4 недель Вы не чувствовали себя полным(ой) сил и энергии?",
    optionsKey: "q23to31",
    scale: "vt",
  },
  {
    id: "q28",
    number: 28,
    text: "Как часто в течение последних 4 недель Вы чувствовали себя упавшим(ей) духом и печальным(ой)?",
    optionsKey: "q23to31",
    scale: "mh",
  },
  {
    id: "q29",
    number: 29,
    text: "Как часто в течение последних 4 недель Вы чувствовали себя измученным(ой)?",
    optionsKey: "q23to31",
    scale: "vt",
  },
  {
    id: "q30",
    number: 30,
    text: "Как часто в течение последних 4 недель Вы не чувствовали себя счастливым(ой)?",
    optionsKey: "q23to31",
    scale: "mh",
  },
  {
    id: "q31",
    number: 31,
    text: "Как часто в течение последних 4 недель Вы чувствовали себя уставшим(ей)?",
    optionsKey: "q23to31",
    scale: "vt",
  },
  {
    id: "q32",
    number: 32,
    text: "Как часто за последние 4 недели Ваше физическое или эмоциональное состояние мешало Вам активно общаться с людьми, навещать друзей или родственников?",
    optionsKey: "q32",
    scale: "sf",
  },
  {
    id: "q33",
    number: 33,
    text: "Мне кажется, что я более склонен к болезням, чем другие",
    optionsKey: "q33to36",
    scale: "gh",
  },
  {
    id: "q34",
    number: 34,
    text: "Мое здоровье хуже, чем у большинства моих знакомых",
    optionsKey: "q33to36",
    scale: "gh",
  },
  {
    id: "q35",
    number: 35,
    text: "Я ожидаю, что мое здоровье ухудшится",
    optionsKey: "q33to36",
    scale: "gh",
  },
  {
    id: "q36",
    number: 36,
    text: "У меня плохое здоровье",
    optionsKey: "q33to36",
    scale: "gh",
  },
];

const QUESTION_INDEX = Object.fromEntries(QUESTIONS.map((question) => [question.id, question]));

const SCREENS = [
  {
    id: "welcome",
    type: "welcome",
  },
  {
    id: "screen-1",
    title: "Стартовые вопросы",
    subtitle: "Общая самооценка и сравнение с прошлым годом.",
    questionIds: ["q1", "q2"],
  },
  {
    id: "screen-2",
    title: "Физическое функционирование I",
    subtitle: "Первые пять вопросов о нагрузках и повседневной активности.",
    questionIds: ["q3", "q4", "q5", "q6", "q7"],
  },
  {
    id: "screen-3",
    title: "Физическое функционирование II",
    subtitle: "Еще пять вопросов про движение и самообслуживание.",
    questionIds: ["q8", "q9", "q10", "q11", "q12"],
  },
  {
    id: "screen-4",
    title: "Ограничения из-за физического состояния",
    subtitle: "Влияние физического состояния на работу и обычные дела за последние 4 недели.",
    questionIds: ["q13", "q14", "q15", "q16"],
  },
  {
    id: "screen-5",
    title: "Ограничения из-за эмоционального состояния",
    subtitle: "Как эмоции влияли на работу и повседневную активность.",
    questionIds: ["q17", "q18", "q19"],
  },
  {
    id: "screen-6",
    title: "Социальность и боль",
    subtitle: "Социальное взаимодействие, интенсивность боли и ее влияние на дела.",
    questionIds: ["q20", "q21", "q22"],
  },
  {
    id: "screen-7",
    title: "Самочувствие и настроение I",
    subtitle: "Первая часть вопросов о жизненной активности и психологическом состоянии.",
    questionIds: ["q23", "q24", "q25", "q26", "q27"],
  },
  {
    id: "screen-8",
    title: "Самочувствие и настроение II",
    subtitle: "Продолжение вопросов о настроении, утомлении и энергии.",
    questionIds: ["q28", "q29", "q30", "q31"],
  },
  {
    id: "screen-9",
    title: "Социальное функционирование и убеждения о здоровье",
    subtitle: "Финальный блок опросника SF-36.",
    questionIds: ["q32", "q33", "q34", "q35", "q36"],
  },
  {
    id: "results",
    type: "results",
  },
];

const SCALE_META = {
  pf: {
    title: "Физическое функционирование",
    shortTitle: "Физ. функция",
    group: "Физический компонент",
    groupShort: "Физ.",
    tone: "physical",
    emoji: "🚶",
    description: "Насколько свободно человек справляется с движением, нагрузкой и самообслуживанием.",
  },
  rp: {
    title: "Ролевое функционирование (физическое)",
    shortTitle: "Роль (физ.)",
    group: "Физический компонент",
    groupShort: "Физ.",
    tone: "physical",
    emoji: "💼",
    description: "Насколько физическое состояние ограничивает работу и обычные дела.",
  },
  bp: {
    title: "Интенсивность боли",
    shortTitle: "Боль",
    group: "Физический компонент",
    groupShort: "Физ.",
    tone: "physical",
    emoji: "🩹",
    description: "Как часто и насколько сильно боль влияет на активность.",
  },
  gh: {
    title: "Общее состояние здоровья",
    shortTitle: "Здоровье",
    group: "Физический компонент",
    groupShort: "Физ.",
    tone: "physical",
    emoji: "❤️",
    description: "Общая субъективная оценка здоровья и отношения к нему.",
  },
  mh: {
    title: "Психологическое здоровье",
    shortTitle: "Псих. здоровье",
    group: "Психологический компонент",
    groupShort: "Псих.",
    tone: "mind",
    emoji: "🙂",
    description: "Эмоциональная устойчивость, нервозность, подавленность и внутреннее состояние.",
  },
  re: {
    title: "Ролевое функционирование (эмоциональное)",
    shortTitle: "Роль (эмоц.)",
    group: "Психологический компонент",
    groupShort: "Псих.",
    tone: "mind",
    emoji: "🎭",
    description: "Насколько эмоциональное состояние мешает работе и повседневным задачам.",
  },
  sf: {
    title: "Социальное функционирование",
    shortTitle: "Социальность",
    group: "Психологический компонент",
    groupShort: "Псих.",
    tone: "mind",
    emoji: "🤝",
    description: "Как физическое и эмоциональное состояние влияет на общение с людьми.",
  },
  vt: {
    title: "Жизненная активность",
    shortTitle: "Энергия",
    group: "Психологический компонент",
    groupShort: "Псих.",
    tone: "mind",
    emoji: "⚡",
    description: "Ощущение бодрости, энергии и усталости в повседневной жизни.",
  },
};

const SCALE_ORDER = ["pf", "rp", "bp", "gh", "mh", "re", "sf", "vt"];

const state = loadState();
const app = typeof document !== "undefined" ? document.getElementById("app") : null;
let promoLandingDismissed = false;

if (app) {
  render();
}

function createDefaultState() {
  return {
    currentScreenIndex: 0,
    startedAt: null,
    completedAt: null,
    submissionId: null,
    participantName: "",
    answers: {},
    lastError: "",
    syncStatus: APP_CONFIG.webAppUrl ? "idle" : "needs_setup",
    syncMessage: "",
    lastSyncedSubmissionId: null,
    lastSyncedSheetName: "",
  };
}

function loadState() {
  if (typeof localStorage === "undefined") {
    return createDefaultState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultState();
    }

    const parsed = JSON.parse(raw);
    return {
      ...createDefaultState(),
      ...parsed,
      answers: parsed.answers || {},
    };
  } catch (error) {
    console.error("Не удалось прочитать черновик:", error);
    return createDefaultState();
  }
}

function saveState() {
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearState() {
  const next = createDefaultState();
  Object.assign(state, next);

  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function resetSyncState() {
  state.syncStatus = APP_CONFIG.webAppUrl ? "idle" : "needs_setup";
  state.syncMessage = "";
  state.lastSyncedSubmissionId = null;
  state.lastSyncedSheetName = "";
}

function render() {
  if (!promoLandingDismissed) {
    renderPromoLanding();
    return;
  }

  const screen = SCREENS[state.currentScreenIndex];

  if (screen.type === "welcome") {
    renderWelcome();
  } else if (screen.type === "results") {
    renderResults();
  } else {
    renderQuestionScreen(screen);
  }
}

function renderPromoLanding() {
  app.innerHTML = `
    <section class="app-panel promo-panel">
      <div class="promo-inner">
        <p class="promo-overline">Эксклюзив 2026</p>
        <h2 class="promo-title">БЕСПЛАТНО • БЕЗ РЕГИСТРАЦИИ • БЕЗ СМС</h2>
        <p class="promo-subtitle">
          Пройди тест по самой новейшей супер‑системе SF-36 и узнай профиль качества жизни за пару минут.
        </p>

        <div class="promo-strip">
          <span class="promo-chip">Только сегодня</span>
          <span class="promo-chip">Мгновенный результат</span>
          <span class="promo-chip">Никаких оплат</span>
        </div>

        <button class="promo-cta" id="promo-enter-btn" type="button">
          ПРОЙТИ ТЕСТ ПРЯМО СЕЙЧАС
        </button>

        <p class="promo-footnote">Шутливая интерактивная заставка для учебного демо.</p>
      </div>
    </section>
  `;

  document.getElementById("promo-enter-btn").addEventListener("click", () => {
    promoLandingDismissed = true;
    render();
  });
}

function renderWelcome() {
  const hasDraft = countAnsweredQuestions() > 0;
  const participantName = state.participantName || "";

  app.innerHTML = `
    <section class="app-panel welcome-layout">
      <div class="welcome-main">
        <article class="welcome-card">
          <h3>Кто проходит тест</h3>
          <div class="field-stack">
            <label class="field-label" for="participant-name-input">ФИО участника</label>
            <input
              class="text-input"
              id="participant-name-input"
              name="participantName"
              type="text"
              maxlength="120"
              placeholder="Например, Иванов Иван Иванович"
              value="${escapeHtml(participantName)}"
            >
            <p class="field-hint">
              Поле необязательное. Если оставить пустым, ответы сохранятся на лист <strong>${SHEETS_FALLBACK_SHEET_NAME}</strong>.
            </p>
          </div>
        </article>

        <article class="welcome-card">
          <h3>Как будет выглядеть прохождение</h3>
          <p class="question-hint">
            Опрос разбит на 9 экранов. Можно вернуться назад, поменять ответ и заново пересчитать результат.
          </p>
          <div class="button-row">
            <button class="btn btn-primary" id="start-btn">${hasDraft ? "Продолжить" : "Начать опрос"}</button>
            ${
              hasDraft
                ? '<button class="btn btn-secondary" id="restart-btn">Начать заново</button>'
                : ""
            }
          </div>
        </article>
      </div>
    </section>
  `;

  const participantInput = document.getElementById("participant-name-input");
  participantInput.addEventListener("input", (event) => {
    const nextValue = event.target.value;
    if (state.participantName === nextValue) {
      return;
    }
    state.participantName = nextValue;
    state.submissionId = null;
    state.completedAt = null;
    resetSyncState();
    saveState();
  });

  document.getElementById("start-btn").addEventListener("click", () => {
    state.participantName = participantInput.value.trim();
    if (!state.startedAt) {
      state.startedAt = new Date().toISOString();
    }
    if (state.currentScreenIndex === 0) {
      state.currentScreenIndex = 1;
    }
    state.lastError = "";
    resetSyncState();
    saveState();
    render();
  });

  const restartButton = document.getElementById("restart-btn");
  if (restartButton) {
    restartButton.addEventListener("click", () => {
      clearState();
      state.participantName = participantInput.value.trim();
      state.startedAt = new Date().toISOString();
      state.currentScreenIndex = 1;
      saveState();
      render();
    });
  }
}

function renderQuestionScreen(screen) {
  const totalQuestionScreens = SCREENS.filter((item) => !item.type).length;
  const currentScreenNumber = SCREENS.filter((item, index) => !item.type && index <= state.currentScreenIndex).length;
  const answeredCount = countAnsweredQuestions();
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const html = `
    <section class="app-panel app-panel--questions">
      <header class="screen-header">
        <div class="screen-meta">
          <span class="screen-kicker">Экран ${currentScreenNumber} из ${totalQuestionScreens}</span>
          <span class="support-text" id="screen-progress-count">${answeredCount} из ${QUESTIONS.length} ответов заполнено</span>
        </div>
        <div class="progress-shell" aria-hidden="true">
          <div class="progress-bar" id="screen-progress-bar" style="width: ${progress}%"></div>
        </div>
        <div>
          <h2 class="screen-title">${screen.title}</h2>
          <p class="screen-subtitle">${screen.subtitle}</p>
        </div>
      </header>

      ${
        state.lastError
          ? `
            <div class="status-banner" id="validation-banner" role="alert">
              <p>${state.lastError}</p>
            </div>
          `
          : ""
      }

      <div class="question-grid">
        ${screen.questionIds.map((questionId) => renderQuestionCard(QUESTION_INDEX[questionId])).join("")}
      </div>

      <div class="screen-actions">
        <button class="btn btn-secondary" id="back-btn">Назад</button>
        <button class="btn btn-primary" id="next-btn">${isLastQuestionScreen() ? "Посмотреть результат" : "Далее"}</button>
      </div>
    </section>
  `;

  app.innerHTML = html;

  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", handleAnswerChange);
  });

  document.getElementById("back-btn").addEventListener("click", goBack);
  document.getElementById("next-btn").addEventListener("click", goNext);
}

function renderQuestionCard(question) {
  const options = OPTION_SETS[question.optionsKey];
  const selectedValue = state.answers[question.id];
  const isEmojiScale = options.length === 5 && options.every((option) => option.emoji);
  const selectedLabel = getAnswerLabel(question.id, selectedValue);

  if (isEmojiScale) {
    return `
      <article class="question-card" data-question-id="${question.id}">
        <span class="question-label">Вопрос ${question.number}</span>
        <p class="question-text">${question.text}</p>
        <div class="question-response-shell">
          <div class="emoji-scale" role="radiogroup" aria-label="Варианты ответа для вопроса ${question.number}">
            ${options
              .map((option) => {
                const isSelected = Number(selectedValue) === option.value;
                return `
                  <label class="emoji-option ${isSelected ? "is-selected" : ""}" title="${option.label}">
                    <input
                      type="radio"
                      name="${question.id}"
                      value="${option.value}"
                      ${isSelected ? "checked" : ""}
                    >
                    <span class="emoji-face" aria-hidden="true">${option.emoji}</span>
                  </label>
                `;
              })
              .join("")}
          </div>
          <p class="emoji-caption">
            ${selectedLabel ? `Выбрано: ${selectedLabel}` : "Нажмите на смайлик, который лучше всего подходит"}
          </p>
        </div>
      </article>
    `;
  }

  return `
    <article class="question-card" data-question-id="${question.id}">
      <span class="question-label">Вопрос ${question.number}</span>
      <p class="question-text">${question.text}</p>
      <div class="question-response-shell">
        <div class="options-grid options-grid--compact">
          ${options
            .map((option) => {
              const isSelected = Number(selectedValue) === option.value;
              return `
                <label class="option-tile ${isSelected ? "is-selected" : ""}">
                  <input
                    type="radio"
                    name="${question.id}"
                    value="${option.value}"
                    ${isSelected ? "checked" : ""}
                  >
                  <span class="option-label">${option.label}</span>
                </label>
              `;
            })
            .join("")}
        </div>
      </div>
    </article>
  `;
}

function renderResults() {
  const results = calculateScores(state.answers);
  const durationSeconds = getDurationSeconds();
  const averageScore = Math.round(
    SCALE_ORDER.reduce((sum, scaleKey) => sum + results.normalized[scaleKey], 0) / SCALE_ORDER.length,
  );
  const participantLabel = getParticipantLabel();
  const resultActionButtons = `
    <button class="btn btn-primary" id="download-json-btn">Скачать JSON результата</button>
    <button class="btn btn-secondary" id="review-btn">Вернуться к вопросам</button>
    <button class="btn btn-ghost" id="reset-btn">Очистить и начать заново</button>
  `;

  app.innerHTML = `
    <section class="app-panel result-panel">
      <article class="result-hero result-hero--compact">
        <div>
          <p class="eyebrow">Результат готов</p>
          <h2>Профиль качества жизни по SF-36</h2>
          <p>
            Ниже показаны восемь шкал SF-36 и общий индикатор по силуэту: чем выше процент, тем выше итоговый профиль.
          </p>
          <div class="result-person-chip">${escapeHtml(participantLabel)}</div>
        </div>

        <div class="result-hero-stats">
          <div class="summary-card summary-card--stat">
            <span class="summary-label">Средний профиль</span>
            <strong class="summary-value">${averageScore}<span class="summary-value-suffix">/100</span></strong>
          </div>
          <div class="summary-card summary-card--stat">
            <span class="summary-label">Ответов</span>
            <strong class="summary-value">${countAnsweredQuestions()}<span class="summary-value-suffix">/36</span></strong>
          </div>
          <div class="summary-card summary-card--stat">
            <span class="summary-label">Заполнение</span>
            <strong class="summary-value summary-value--text">${formatDuration(durationSeconds)}</strong>
          </div>
        </div>
      </article>

      <div class="result-orbit-layout">
        <article class="result-radar-card result-radar-card--orbit">
          <div class="metrics-matrix">
            <div class="matrix-slot matrix-slot--1">${renderResultMetric(SCALE_ORDER[0], results.normalized[SCALE_ORDER[0]])}</div>
            <div class="matrix-slot matrix-slot--2">${renderResultMetric(SCALE_ORDER[1], results.normalized[SCALE_ORDER[1]])}</div>
            <div class="matrix-slot matrix-slot--3">${renderResultMetric(SCALE_ORDER[2], results.normalized[SCALE_ORDER[2]])}</div>
            <div class="matrix-slot matrix-slot--4">${renderResultMetric(SCALE_ORDER[3], results.normalized[SCALE_ORDER[3]])}</div>
            <div class="matrix-center">
              ${renderRadarChart(results.normalized)}
            </div>
            <div class="matrix-slot matrix-slot--6">${renderResultMetric(SCALE_ORDER[4], results.normalized[SCALE_ORDER[4]])}</div>
            <div class="matrix-slot matrix-slot--7">${renderResultMetric(SCALE_ORDER[5], results.normalized[SCALE_ORDER[5]])}</div>
            <div class="matrix-slot matrix-slot--8">${renderResultMetric(SCALE_ORDER[6], results.normalized[SCALE_ORDER[6]])}</div>
            <div class="matrix-slot matrix-slot--9">${renderResultMetric(SCALE_ORDER[7], results.normalized[SCALE_ORDER[7]])}</div>
          </div>
        </article>
      </div>

      <div class="result-insights result-insights--single">
        ${renderSheetSyncCard(resultActionButtons)}
      </div>

    </section>
  `;

  document.getElementById("review-btn").addEventListener("click", () => {
    state.currentScreenIndex = 1;
    state.lastError = "";
    saveState();
    render();
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    const participantName = state.participantName;
    clearState();
    state.participantName = participantName;
    state.startedAt = new Date().toISOString();
    state.currentScreenIndex = 1;
    saveState();
    render();
  });

  document.getElementById("download-json-btn").addEventListener("click", () => {
    downloadPayload(buildSubmissionPayload(results));
  });

  const syncButton = document.getElementById("sheet-sync-primary-btn");
  if (syncButton) {
    syncButton.addEventListener("click", () => {
      const action = syncButton.dataset.syncAction;
      if (action === "save" || action === "retry") {
        syncResultsToGoogleSheets(results);
      }
    });
  }
}

function renderScaleCard(scaleKey, score) {
  const meta = SCALE_META[scaleKey];
  return `
    <article class="scale-card">
      <div class="scale-group-label">${meta.group}</div>
      <h3>${meta.title}</h3>
      <div class="scale-score">${score}<span class="support-text">/100</span></div>
      <div class="scale-meter" aria-hidden="true">
        <div class="scale-meter-fill" style="width: ${score}%"></div>
      </div>
      <p class="scale-footnote">
        <strong>${getBandLabel(score)}.</strong> ${meta.description}
      </p>
    </article>
  `;
}

function renderMiniScale(scaleKey, score) {
  return `
    <div class="mini-item">
      <span class="mini-name">${SCALE_META[scaleKey].title}</span>
      <span class="mini-score">${score}/100</span>
    </div>
  `;
}

function renderSheetSyncCard(extraActions = "") {
  const stateMeta = getSheetSyncMeta();
  const tableAction = APP_CONFIG.spreadsheetUrl
    ? `<a class="btn btn-secondary" href="${APP_CONFIG.spreadsheetUrl}" target="_blank" rel="noreferrer">Открыть таблицу</a>`
    : "";
  const primaryButton = stateMeta.primary
    ? `
      <button
        class="btn ${stateMeta.primary.disabled ? "btn-secondary" : "btn-primary"}"
        id="sheet-sync-primary-btn"
        data-sync-action="${stateMeta.primary.action}"
        ${stateMeta.primary.disabled ? "disabled" : ""}
      >${stateMeta.primary.label}</button>
    `
    : "";

  return `
    <article class="summary-card summary-card--sync summary-card--${stateMeta.tone}" id="sheet-sync-card">
      <div class="scale-group-label">Google Sheets</div>
      <p class="summary-copy" id="sheet-sync-message">${stateMeta.message}</p>
      ${
        state.lastSyncedSheetName
          ? `<div class="sync-chip" id="sheet-sync-sheet">Лист: ${escapeHtml(state.lastSyncedSheetName)}</div>`
          : '<div class="sync-chip sync-chip--ghost" id="sheet-sync-sheet">Лист будет выбран автоматически</div>'
      }
      <div class="result-actions result-actions--sync result-actions--single-line">
        ${primaryButton}
        ${tableAction}
        ${extraActions}
      </div>
    </article>
  `;
}

function getSheetSyncMeta() {
  if (!APP_CONFIG.webAppUrl) {
    return {
      tone: "muted",
      message: "Чтобы сайт сам писал результаты в таблицу, нужно опубликовать Apps Script и вставить его URL в config.js.",
      primary: null,
    };
  }

  switch (state.syncStatus) {
    case "saving":
      return {
        tone: "info",
        message: "Сохраняем ответы в Google Sheets…",
        primary: {
          action: "none",
          label: "Сохраняем…",
          disabled: true,
        },
      };
    case "saved":
      return {
        tone: "success",
        message: "Результат сохранен в Google Sheets.",
        primary: {
          action: "done",
          label: "Сохранено в таблицу",
          disabled: true,
        },
      };
    case "sent":
      return {
        tone: "success",
        message: "Запрос на сохранение отправлен. Если Apps Script опубликован правильно, строка уже появится в таблице.",
        primary: {
          action: "done",
          label: "Сохранено в таблицу",
          disabled: true,
        },
      };
    case "error":
      return {
        tone: "danger",
        message: state.syncMessage || "Не удалось отправить результат в таблицу.",
        primary: {
          action: "retry",
          label: "Повторить сохранение",
          disabled: false,
        },
      };
    default:
      return {
        tone: "muted",
        message: "Таблица подключена. Можно сохранить этот результат в отдельный лист по имени участника.",
        primary: {
          action: "save",
          label: "Сохранить в таблицу",
          disabled: false,
        },
      };
  }
}

async function syncResultsToGoogleSheets(results) {
  if (!APP_CONFIG.webAppUrl) {
    return;
  }

  if (state.syncStatus === "saving") {
    return;
  }

  const payload = buildSubmissionPayload(results);
  if (state.lastSyncedSubmissionId === payload.submission_id && ["saved", "sent"].includes(state.syncStatus)) {
    return;
  }

  state.syncStatus = "saving";
  state.syncMessage = "";
  saveState();
  updateSheetSyncUI();

  try {
    const response = await sendSubmissionToGoogleSheets(payload);
    state.lastSyncedSubmissionId = payload.submission_id;
    state.lastSyncedSheetName = response.sheet_name || payload.sheet_name_hint || SHEETS_FALLBACK_SHEET_NAME;
    state.syncStatus = response.confirmed ? "saved" : "sent";
    state.syncMessage = "";
    saveState();
    updateSheetSyncUI();
  } catch (error) {
    state.syncStatus = "error";
    state.syncMessage = error instanceof Error ? error.message : "Не удалось сохранить результат.";
    saveState();
    updateSheetSyncUI();
  }
}

async function sendSubmissionToGoogleSheets(payload) {
  const body = JSON.stringify(payload);

  try {
    const response = await fetch(APP_CONFIG.webAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body,
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Google Sheets вернул статус ${response.status}.`);
    }

    const text = await response.text();
    if (!text) {
      return { confirmed: true, sheet_name: payload.sheet_name_hint };
    }

    const parsed = JSON.parse(text);
    if (parsed.ok === false) {
      throw new Error(parsed.error || "Apps Script не подтвердил сохранение.");
    }

    return {
      confirmed: true,
      sheet_name: parsed.sheet_name || parsed.sheetName || payload.sheet_name_hint,
    };
  } catch (error) {
    try {
      await fetch(APP_CONFIG.webAppUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body,
      });

      return {
        confirmed: false,
        sheet_name: payload.sheet_name_hint,
      };
    } catch {
      throw error;
    }
  }
}

function updateSheetSyncUI() {
  const message = document.getElementById("sheet-sync-message");
  const sheetChip = document.getElementById("sheet-sync-sheet");
  const card = document.getElementById("sheet-sync-card");
  const button = document.getElementById("sheet-sync-primary-btn");

  if (!message || !sheetChip || !card) {
    return;
  }

  const meta = getSheetSyncMeta();
  message.textContent = meta.message;
  card.className = `summary-card summary-card--sync summary-card--${meta.tone}`;

  if (button && meta.primary) {
    button.textContent = meta.primary.label;
    button.dataset.syncAction = meta.primary.action;
    button.disabled = meta.primary.disabled;
    button.className = `btn ${meta.primary.disabled ? "btn-secondary" : "btn-primary"}`;
  }

  if (state.lastSyncedSheetName) {
    sheetChip.textContent = `Лист: ${state.lastSyncedSheetName}`;
    sheetChip.className = "sync-chip";
  } else {
    sheetChip.textContent = "Лист будет выбран автоматически";
    sheetChip.className = "sync-chip sync-chip--ghost";
  }
}

function getParticipantLabel() {
  const rawName = (state.participantName || "").trim();
  return rawName || SHEETS_FALLBACK_SHEET_NAME;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderResultMetric(scaleKey, score) {
  const meta = SCALE_META[scaleKey];

  return `
    <article class="metric-orbit metric-orbit--${meta.tone}" title="${meta.title}">
      <div class="metric-orbit-head">
        <span class="metric-emoji" aria-hidden="true">${meta.emoji}</span>
        <div>
          <div class="metric-name">${meta.title}</div>
          <div class="metric-group">${meta.group}</div>
        </div>
      </div>
      <div class="metric-value">${score}<span>/100</span></div>
      <div class="metric-track" aria-hidden="true">
        <div class="metric-track-fill" style="width: ${score}%"></div>
      </div>
      <div class="metric-band">${getBandLabel(score)}</div>
    </article>
  `;
}

function renderRadarChart(normalizedScores) {
  const silhouetteHeight = 360;
  const averageScore = Math.round(
    SCALE_ORDER.reduce((sum, scaleKey) => sum + normalizedScores[scaleKey], 0) / SCALE_ORDER.length,
  );
  const fillHeight = Math.round((averageScore / 100) * silhouetteHeight);
  const fillY = silhouetteHeight - fillHeight;

  return `
    <div class="radar-chart-wrap">
      <div class="radar-human-shell" aria-label="Индикатор общего результата">
        <div class="radar-human-figure">
          <svg class="radar-human" viewBox="0 0 200 360" role="img" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="human-clip">
              <circle cx="100" cy="48" r="30"></circle>
              <path d="M62 92 C45 92 34 103 28 115 L15 152 C11 162 12 173 17 181 L33 214 C36 220 43 222 48 219 C53 216 55 210 52 205 L42 184 L50 184 L50 304 C50 318 60 328 74 328 C88 328 98 318 98 304 L98 228 L102 228 L102 304 C102 318 112 328 126 328 C140 328 150 318 150 304 L150 184 L158 184 L148 205 C145 210 147 216 152 219 C157 222 164 220 167 214 L183 181 C188 173 189 162 185 152 L172 115 C166 103 155 92 138 92 Z"></path>
            </clipPath>
              <linearGradient id="human-fill-gradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="#d37d3f"></stop>
                <stop offset="38%" stop-color="#f0b562"></stop>
                <stop offset="100%" stop-color="#74c89e"></stop>
              </linearGradient>
          </defs>
          <rect x="0" y="0" width="200" height="${silhouetteHeight}" class="human-meter-base" clip-path="url(#human-clip)"></rect>
          <rect x="0" y="${fillY}" width="200" height="${fillHeight}" fill="url(#human-fill-gradient)" clip-path="url(#human-clip)"></rect>
          <circle cx="100" cy="48" r="30" class="human-meter-outline"></circle>
          <path class="human-meter-outline" d="M62 92 C45 92 34 103 28 115 L15 152 C11 162 12 173 17 181 L33 214 C36 220 43 222 48 219 C53 216 55 210 52 205 L42 184 L50 184 L50 304 C50 318 60 328 74 328 C88 328 98 318 98 304 L98 228 L102 228 L102 304 C102 318 112 328 126 328 C140 328 150 318 150 304 L150 184 L158 184 L148 205 C145 210 147 216 152 219 C157 222 164 220 167 214 L183 181 C188 173 189 162 185 152 L172 115 C166 103 155 92 138 92 Z"></path>
          </svg>
          <div class="human-meter-label human-meter-label--overlay">${averageScore}%</div>
        </div>
      </div>
    </div>
  `;
}

function handleAnswerChange(event) {
  const input = event.target;
  const questionId = input.name;
  const value = Number(input.value);

  state.answers[questionId] = value;
  state.completedAt = null;
  state.submissionId = null;
  state.lastError = "";
  resetSyncState();
  saveState();
  updateQuestionCardUI(questionId);
  updateQuestionScreenProgress();
  clearValidationBanner();
}

function updateQuestionCardUI(questionId) {
  const questionCard = document.querySelector(`.question-card[data-question-id="${questionId}"]`);
  if (!questionCard) {
    return;
  }

  questionCard.querySelectorAll('input[type="radio"]').forEach((radio) => {
    const tile = radio.closest(".emoji-option, .option-tile");
    if (tile) {
      tile.classList.toggle("is-selected", radio.checked);
    }
  });

  const caption = questionCard.querySelector(".emoji-caption");
  if (caption) {
    const selectedLabel = getAnswerLabel(questionId, state.answers[questionId]);
    caption.textContent = selectedLabel
      ? `Выбрано: ${selectedLabel}`
      : "Нажмите на смайлик, который лучше всего подходит";
  }
}

function updateQuestionScreenProgress() {
  const answeredCount = countAnsweredQuestions();
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
  const progressText = document.getElementById("screen-progress-count");
  const progressBar = document.getElementById("screen-progress-bar");

  if (progressText) {
    progressText.textContent = `${answeredCount} из ${QUESTIONS.length} ответов заполнено`;
  }

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

function clearValidationBanner() {
  const banner = document.getElementById("validation-banner");
  if (banner) {
    banner.remove();
  }
}

function goBack() {
  state.lastError = "";

  if (state.currentScreenIndex <= 1) {
    state.currentScreenIndex = 0;
  } else {
    state.currentScreenIndex -= 1;
  }

  saveState();
  render();
}

function goNext() {
  const screen = SCREENS[state.currentScreenIndex];
  const isComplete = screen.questionIds.every((questionId) => state.answers[questionId] !== undefined);

  if (!isComplete) {
    state.lastError = "Перед переходом дальше нужно выбрать ответ для каждого вопроса на текущем экране.";
    saveState();
    render();
    return;
  }

  state.lastError = "";

  if (isLastQuestionScreen()) {
    if (!state.completedAt) {
      state.completedAt = new Date().toISOString();
    }
    if (!state.submissionId) {
      state.submissionId = createSubmissionId();
    }
    state.currentScreenIndex = SCREENS.length - 1;
  } else {
    state.currentScreenIndex += 1;
  }

  saveState();
  render();
}

function isLastQuestionScreen() {
  return state.currentScreenIndex === SCREENS.length - 2;
}

function countAnsweredQuestions() {
  return QUESTIONS.reduce((count, question) => {
    return state.answers[question.id] !== undefined ? count + 1 : count;
  }, 0);
}

function calculateScores(answers) {
  const raw = {
    pf: 0,
    rp: 0,
    bp: 0,
    gh: 0,
    vt: 0,
    sf: 0,
    re: 0,
    mh: 0,
  };

  for (const question of QUESTIONS) {
    const value = Number(answers[question.id]);
    if (!Number.isFinite(value) || !question.scale) {
      continue;
    }

    raw[question.scale] += value;
  }

  const normalized = {
    pf: clampScore(Math.ceil(((raw.pf - 10) / 20) * 100)),
    rp: clampScore(Math.ceil(((raw.rp - 4) / 4) * 100)),
    bp: clampScore(Math.ceil(((raw.bp - 2) / 9) * 100)),
    gh: clampScore(Math.ceil(((raw.gh - 5) / 20) * 100)),
    vt: clampScore(Math.ceil(((raw.vt - 4) / 20) * 100)),
    sf: clampScore(Math.ceil(((raw.sf - 2) / 8) * 100)),
    re: clampScore(Math.ceil(((raw.re - 3) / 3) * 100)),
    mh: clampScore(Math.ceil(((raw.mh - 5) / 25) * 100)),
  };

  return { raw, normalized };
}

function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}

function getBandLabel(score) {
  if (score <= 25) {
    return "Низкий уровень";
  }
  if (score <= 50) {
    return "Сниженный уровень";
  }
  if (score <= 75) {
    return "Средний уровень";
  }
  return "Высокий уровень";
}

function getAnswerLabel(questionId, value) {
  const question = QUESTION_INDEX[questionId];
  if (!question) {
    return "";
  }

  const option = OPTION_SETS[question.optionsKey].find((item) => item.value === Number(value));
  return option ? option.label : "";
}

function formatDuration(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return "Не определено";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds} сек`;
  }

  return `${minutes} мин ${seconds} сек`;
}

function getDurationSeconds() {
  if (!state.startedAt) {
    return 0;
  }

  const started = new Date(state.startedAt).getTime();
  const finished = state.completedAt ? new Date(state.completedAt).getTime() : Date.now();

  if (!Number.isFinite(started) || !Number.isFinite(finished) || finished < started) {
    return 0;
  }

  return Math.round((finished - started) / 1000);
}

function createSubmissionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `sf36-${Date.now()}`;
}

function buildSubmissionPayload(results) {
  const participantName = (state.participantName || "").trim() || null;

  return {
    submission_id: state.submissionId || createSubmissionId(),
    calculator: "SF-36",
    calculator_version: "frontend-v2",
    submitted_at: state.completedAt || new Date().toISOString(),
    duration_sec: getDurationSeconds(),
    participant_name: participantName,
    sheet_name_hint: participantName || SHEETS_FALLBACK_SHEET_NAME,
    answers: QUESTIONS.reduce((acc, question) => {
      acc[question.id] = state.answers[question.id];
      return acc;
    }, {}),
    raw_scores: results.raw,
    normalized_scores: results.normalized,
    comparison_to_last_year: getAnswerLabel("q2", state.answers.q2) || null,
  };
}

function downloadPayload(payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `sf36-result-${payload.submission_id}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    OPTION_SETS,
    QUESTIONS,
    SCREENS,
    SCALE_META,
    calculateScores,
    getBandLabel,
    getAnswerLabel,
  };
}
