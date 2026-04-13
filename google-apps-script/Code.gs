const SPREADSHEET_ID = "1KUxUNeKrTM2DKtfris1Ix5QHo7PG0Q8s2p0L_Cvh3w0";
const FALLBACK_SHEET_NAME = "Анонимно";
const QUESTION_HEADERS = Array.from({ length: 36 }, (_, index) => `q${index + 1}`);
const RAW_SCORE_HEADERS = ["raw_pf", "raw_rp", "raw_bp", "raw_gh", "raw_vt", "raw_sf", "raw_re", "raw_mh"];
const NORMALIZED_SCORE_HEADERS = [
  "score_pf",
  "score_rp",
  "score_bp",
  "score_gh",
  "score_vt",
  "score_sf",
  "score_re",
  "score_mh",
];
const HEADERS = [
  "submission_id",
  "submitted_at",
  "participant_name",
  "duration_sec",
  "comparison_to_last_year",
  ...QUESTION_HEADERS,
  ...RAW_SCORE_HEADERS,
  ...NORMALIZED_SCORE_HEADERS,
  "payload_json",
];

function doGet() {
  return jsonResponse_({
    ok: true,
    service: "sf36-google-sheets",
    spreadsheet_id: SPREADSHEET_ID,
  });
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const participantName = sanitizeDisplayName_(payload.participant_name);
    const sheetName = buildSheetName_(participantName || payload.sheet_name_hint || FALLBACK_SHEET_NAME);
    const sheet = getOrCreateSheet_(spreadsheet, sheetName);

    ensureHeaders_(sheet);
    sheet.appendRow(buildRow_(payload, participantName));

    return jsonResponse_({
      ok: true,
      sheet_name: sheet.getName(),
      row: sheet.getLastRow(),
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error.message || String(error),
    });
  }
}

function getOrCreateSheet_(spreadsheet, preferredName) {
  const existing = spreadsheet.getSheetByName(preferredName);
  if (existing) {
    return existing;
  }

  return spreadsheet.insertSheet(preferredName);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function buildRow_(payload, participantName) {
  const answers = payload.answers || {};
  const rawScores = payload.raw_scores || {};
  const normalizedScores = payload.normalized_scores || {};

  return [
    payload.submission_id || "",
    payload.submitted_at || new Date().toISOString(),
    participantName || "",
    payload.duration_sec || "",
    payload.comparison_to_last_year || "",
    ...QUESTION_HEADERS.map((key) => answers[key] ?? ""),
    ...RAW_SCORE_HEADERS.map((key) => rawScores[key.replace("raw_", "")] ?? ""),
    ...NORMALIZED_SCORE_HEADERS.map((key) => normalizedScores[key.replace("score_", "")] ?? ""),
    JSON.stringify(payload),
  ];
}

function buildSheetName_(value) {
  const cleaned = String(value || FALLBACK_SHEET_NAME)
    .replace(/[\\/?*[\]:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const name = cleaned || FALLBACK_SHEET_NAME;
  return name.slice(0, 95);
}

function sanitizeDisplayName_(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
