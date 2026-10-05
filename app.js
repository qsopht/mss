(function () {
  "use strict";

  const LEVELS = ["low", "moderate", "high"];
  const LEVEL_LABEL = { low: "Low", moderate: "Moderate", high: "High" };
  const LEVEL_ABBR = { low: "Low", moderate: "Mod", high: "High" };

  const state = {
    activeLevels: new Set(["moderate"]),
    hideNA: true,
    query: "",
    openCategories: new Set(MSS_DATA.categories.map(c => c.id)) // all open by default
  };

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  function openModal(html) {
    modalBody.innerHTML = html;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }
  document.getElementById("modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  /* ---------------- Parse a Low/Moderate/High cell code into readable text ---------------- */
  function parseCode(raw) {
    const trimmed = (raw || "").trim();
    if (!trimmed || trimmed === "—") {
      return { status: "na", text: "Not required at this level." };
    }
    if (trimmed === "A") return { status: "required", scope: "all", text: "Required for all systems at this level." };
    if (trimmed === "S") return { status: "required", scope: "services", text: "Required only for IT Services (systems shared outside your own workgroup)." };
    if (trimmed === "Future A") return { status: "future", scope: "all", text: "Not required yet — becomes required for all systems on a future date." };
    if (trimmed === "Future") return { status: "future", scope: null, text: "Not required yet — becomes required on a future date to be announced." };
    let m = trimmed.match(/^(.+?)\s+S$/);
    if (m && /\d/.test(m[1])) {
      return { status: "future", scope: "services", text: `Required for IT Services starting ${m[1]}.` };
    }
    m = trimmed.match(/^S\s*\(future (.+)\)$/i);
    if (m) return { status: "future", scope: "services", text: `Required for IT Services once the future date (${m[1]}) is set.` };
    if (/^\w+ \d{1,2}, \d{4}$/.test(trimmed)) {
      return { status: "future", scope: null, text: `Required starting ${trimmed}.` };
    }
    return { status: "other", text: trimmed };
  }

  function statusHasRequirement(status) {
    return status === "required" || status === "future" || status === "other";
  }

  /* ---------------- Turn a raw Low/Moderate/High cell code into display text ---------------- */
  function displayCode(raw) {
    const trimmed = (raw || "").trim();
    if (trimmed === "A") return "All";
    if (trimmed === "S") return "ITS";
    if (trimmed === "Future A") return "Future All";
    let m = trimmed.match(/^(.+?)\s+S$/);
    if (m && /\d/.test(m[1])) return `${m[1]} ITS`;
    m = trimmed.match(/^S\s*(\(future .+\))$/i);
    if (m) return `ITS ${m[1]}`;
    return trimmed;
  }

  /* ---------------- Scope + roles ---------------- */
  function renderScope() {
    const list = document.getElementById("scope-list");
    list.innerHTML = MSS_DATA.meta.scope.map(s => `<li>${s}</li>`).join("");
    document.getElementById("scope-note").textContent = MSS_DATA.meta.scopeNote;
  }

  function renderRoles() {
    const tabWrap = document.getElementById("role-tabs");
    const desc = document.getElementById("role-desc");
    let current = "responsible-person";

    function paint() {
      tabWrap.querySelectorAll(".role-tab").forEach(btn => {
        btn.setAttribute("aria-selected", String(btn.dataset.role === current));
      });
      const role = MSS_DATA.roles.find(r => r.id === current);
      desc.textContent = role.description;
    }

    tabWrap.innerHTML = MSS_DATA.roles.map(r =>
      `<button class="role-tab" role="tab" data-role="${r.id}">${r.label}</button>`
    ).join("");

    tabWrap.querySelectorAll(".role-tab").forEach(btn => {
      btn.addEventListener("click", () => { current = btn.dataset.role; paint(); });
    });
    paint();
  }

  /* ---------------- Hero ladder ---------------- */
  function renderLadder() {
    document.querySelectorAll(".rung").forEach(btn => {
      btn.addEventListener("click", () => {
        const level = btn.dataset.level;
        const def = MSS_DATA.baselineLevels.find(l => l.id === level);
        document.querySelectorAll(".rung").forEach(b => b.removeAttribute("aria-current"));
        btn.setAttribute("aria-current", "true");
        openModal(`
          <p class="modal-eyebrow">Baseline protection level</p>
          <h3 class="modal-title" style="color:var(--${def.color})">${def.label}</h3>
          <p class="modal-desc"><strong>${def.who}.</strong> ${def.description}</p>
          <p class="modal-desc"><em>Example:</em> ${def.example}</p>
          <button class="link-btn" id="modal-jump" style="font-size:0.95rem;">Show ${def.label} controls only &rarr;</button>
        `);
        document.getElementById("modal-jump").addEventListener("click", () => {
          modal.close();
          setSingleLevel(level);
          document.getElementById("controls").scrollIntoView({ behavior: "smooth" });
        });
      });
    });
  }

  function setSingleLevel(level) {
    state.activeLevels = new Set([level]);
    renderLevelChips();
    renderCategories();
  }

  /* ---------------- Finder ---------------- */
  function renderFinder() {
    const qData = document.getElementById("q-data");
    const qExternal = document.getElementById("q-external");
    const qCritical = document.getElementById("q-critical");
    const resultBox = document.getElementById("finder-result");

    const EXTERNAL_INFO = {
      none: { idx: null, note: null },
      ferpa: { idx: 1, note: "FERPA requires at least the Moderate baseline — see the FERPA special case below." },
      hipaa: { idx: 2, note: "HIPAA pushes this to the High baseline, plus the HIPAA overlay controls — see Special cases below." },
      pci: { idx: 2, note: "PCI-DSS pushes this to the High baseline, plus PCI-specific requirements and the CERTIFI process — see Special cases below." },
      cjis: { idx: 2, note: "CJIS pushes this to the High baseline, plus CJIS-specific requirements — see Special cases below." },
      dod: { idx: 2, note: "DoD contract work pushes this to the High baseline inside an ISO-approved enclave — see Special cases below." },
      other: { idx: null, note: "Confirm the specific obligation with your Information Security Liaison — it may add its own controls on top of this baseline." }
    };

    function compute() {
      const dataVal = qData.value;
      const extVal = qExternal.value;
      const critVal = qCritical.value;

      let idx = { low: 0, moderate: 1, high: 2, unsure: 1 }[dataVal];
      const notes = [];
      if (dataVal === "unsure") notes.push("You weren't sure about data sensitivity — this defaults to Moderate. Confirm the actual tier with your Information Security Liaison before relying on it.");

      const ext = EXTERNAL_INFO[extVal];
      if (ext.idx !== null) idx = Math.max(idx, ext.idx);
      if (ext.note) notes.push(ext.note);

      if (critVal === "some") idx = Math.max(idx, 1);
      if (critVal === "yes") {
        idx = Math.max(idx, 2);
        notes.push("Because this is highly critical to your unit, talk to ISO about a documented, three-year security plan and whether it should be designated Critical IT Infrastructure.");
      }

      const level = LEVELS[idx];
      const def = MSS_DATA.baselineLevels.find(l => l.id === level);

      resultBox.innerHTML = `
        <div class="result-level-${level}">
          <span class="result-badge">${def.label}</span>
          <span>is the suggested baseline for this system.</span>
        </div>
        ${notes.length ? `<ul class="finder-result-notes">${notes.map(n => `<li>${n}</li>`).join("")}</ul>` : ""}
        <p style="margin-top:1rem;"><button class="link-btn" id="finder-jump" style="color:#fff;text-decoration:underline;">Show ${def.label} controls &rarr;</button></p>
      `;
      document.getElementById("finder-jump").addEventListener("click", () => {
        setSingleLevel(level);
        document.getElementById("controls").scrollIntoView({ behavior: "smooth" });
      });
    }

    [qData, qExternal, qCritical].forEach(el => el.addEventListener("change", compute));
    compute();
  }

  /* ---------------- Controls explorer ---------------- */
  function renderLevelChips() {
    const wrap = document.getElementById("level-chips");
    wrap.innerHTML = LEVELS.map(l =>
      `<button class="chip chip-${l}" data-level="${l}" aria-pressed="${state.activeLevels.has(l)}">${LEVEL_LABEL[l]}</button>`
    ).join("");
    wrap.querySelectorAll(".chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const level = btn.dataset.level;
        if (state.activeLevels.has(level)) {
          if (state.activeLevels.size > 1) state.activeLevels.delete(level);
        } else {
          state.activeLevels.add(level);
        }
        renderLevelChips();
        renderCategories();
      });
    });
  }

  function matchesQuery(control, query) {
    if (!query) return true;
    const hay = (control.name + " " + control.desc).toLowerCase();
    return hay.includes(query);
  }

  function rowRequiredAtActiveLevels(control) {
    for (const level of state.activeLevels) {
      const { status } = parseCode(control[level]);
      if (statusHasRequirement(status)) return true;
    }
    return false;
  }

  /* ---------------- Map a parsed code's status/scope to a shared color key ---------------- */
  function scopeKey(status, scope) {
    if (status === "na") return "na";
    if (scope === "all") return "all";
    if (scope === "services") return "its";
    return "pending";
  }

  function badgeHTML(level, control) {
    const { status, text, scope } = parseCode(control[level]);
    const key = scopeKey(status, scope);
    const pending = status === "future" ? ' data-pending="true"' : "";
    const raw = control[level] && control[level].trim() !== "" ? displayCode(control[level]) : "—";
    const tag = state.activeLevels.size > 1 ? `<span class="badge-tag">${LEVEL_ABBR[level]}</span>` : "";
    return `<span class="badge badge-${key}"${pending} title="${LEVEL_LABEL[level]}: ${text.replace(/"/g, "&quot;")}">${tag}${raw}</span>`;
  }

  function openControlModal(category, control) {
    const grid = category.noLevels ? "" : `
      <div class="modal-levels">
        ${LEVELS.map(level => {
          const { text, status, scope } = parseCode(control[level]);
          const key = scopeKey(status, scope);
          const raw = control[level] && control[level].trim() !== "" ? displayCode(control[level]) : "—";
          return `<div class="modal-level modal-level-${level}">
            <div class="modal-level-name">${LEVEL_LABEL[level]}</div>
            <div class="modal-level-value modal-value-${key}">${raw}</div>
            <div style="font-size:0.85rem;color:var(--ink-soft);margin-top:0.3rem;">${text}</div>
          </div>`;
        }).join("")}
      </div>`;
    const na = category.noLevels ? `<p class="modal-desc" style="font-style:italic;">Applies at every protection level.</p>` : "";
    openModal(`
      <p class="modal-eyebrow">${category.numeral}. ${category.title}</p>
      <h3 class="modal-title">${control.name}</h3>
      <p class="modal-desc">${control.desc}</p>
      ${na}
      ${grid}
    `);
  }

  function renderCategories() {
    const wrap = document.getElementById("category-list");
    const query = state.query.trim().toLowerCase();
    let totalVisible = 0;

    const html = MSS_DATA.categories.map(cat => {
      const rows = cat.controls
        .map((control, i) => ({ control, i }))
        .filter(({ control }) => matchesQuery(control, query))
        .filter(({ control }) => {
          if (cat.noLevels) return true;
          if (!state.hideNA) return true;
          return rowRequiredAtActiveLevels(control);
        });

      if (rows.length === 0) return "";
      totalVisible += rows.length;
      const isOpen = state.openCategories.has(cat.id) || query.length > 0;

      const rowsHTML = rows.map(({ control, i }) => `
        <div class="control-row ${cat.noLevels ? "control-row-nolevel" : ""}" data-cat="${cat.id}" data-idx="${i}" tabindex="0" role="button">
          <div class="control-main">
            <div class="control-name">${control.name}</div>
            <div class="control-desc">${control.desc}</div>
          </div>
          <div class="control-badges">
            ${cat.noLevels ? "" : LEVELS.filter(l => state.activeLevels.has(l)).map(l => badgeHTML(l, control)).join("")}
          </div>
        </div>
      `).join("");

      return `
        <div class="category" data-id="${cat.id}" data-open="${isOpen}">
          <button class="category-head" data-id="${cat.id}">
            <span class="category-numeral">${cat.numeral}</span>
            <span class="category-title">${cat.title}</span>
            <span class="category-count">${rows.length} of ${cat.controls.length}</span>
            <span class="category-caret">&#9656;</span>
          </button>
          <div class="category-body" style="display:${isOpen ? "block" : "none"};">
            <p class="category-intro">${cat.intro}</p>
            ${cat.note ? `<p class="category-note">${cat.note}</p>` : ""}
            <div class="control-table">${rowsHTML}</div>
          </div>
        </div>
      `;
    }).join("");

    wrap.innerHTML = html;
    document.getElementById("no-results").hidden = totalVisible > 0;

    wrap.querySelectorAll(".category-head").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const el = wrap.querySelector(`.category[data-id="${id}"]`);
        const body = el.querySelector(".category-body");
        const open = el.dataset.open !== "true";
        el.dataset.open = String(open);
        body.style.display = open ? "block" : "none";
        if (open) state.openCategories.add(id); else state.openCategories.delete(id);
      });
    });

    wrap.querySelectorAll(".control-row").forEach(row => {
      const activate = () => {
        const cat = MSS_DATA.categories.find(c => c.id === row.dataset.cat);
        const control = cat.controls[Number(row.dataset.idx)];
        openControlModal(cat, control);
      };
      row.addEventListener("click", activate);
      row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } });
    });
  }

  function renderToolbar() {
    renderLevelChips();
    document.getElementById("search").addEventListener("input", (e) => {
      state.query = e.target.value;
      renderCategories();
    });
    document.getElementById("hide-na").addEventListener("change", (e) => {
      state.hideNA = e.target.checked;
      renderCategories();
    });
    document.getElementById("expand-all").addEventListener("click", () => {
      state.openCategories = new Set(MSS_DATA.categories.map(c => c.id));
      renderCategories();
    });
    document.getElementById("collapse-all").addEventListener("click", () => {
      state.openCategories = new Set();
      renderCategories();
    });
  }

  /* ---------------- Overlays ---------------- */
  function renderOverlays() {
    const wrap = document.getElementById("overlay-grid");
    wrap.innerHTML = MSS_DATA.overlays.map(o => `
      <button class="overlay-box" data-id="${o.id}">
        <span class="overlay-title">${o.title}</span>
        <span class="overlay-summary">${o.summary}</span>
      </button>
    `).join("");
    wrap.querySelectorAll(".overlay-box").forEach(btn => {
      btn.addEventListener("click", () => {
        const o = MSS_DATA.overlays.find(x => x.id === btn.dataset.id);
        openModal(`
          <p class="modal-eyebrow">Special case</p>
          <h3 class="modal-title">${o.title}</h3>
          ${o.full ? `<p class="modal-desc"><em>${o.full}</em></p>` : ""}
          <p class="modal-desc">${o.summary}</p>
          <ul class="modal-list">${o.details.map(d => `<li>${d}</li>`).join("")}</ul>
        `);
      });
    });
  }

  /* ---------------- Exceptions ---------------- */
  function renderExceptions() {
    document.getElementById("exceptions-intro").textContent = MSS_DATA.exceptions.intro;
    const tbody = document.querySelector("#exceptions-table tbody");
    tbody.innerHTML = MSS_DATA.exceptions.table.map(r =>
      `<tr><td>${r.level}</td><td>${r.approvals}</td><td>${r.documentation}</td></tr>`
    ).join("");
    document.getElementById("exceptions-notes").innerHTML =
      MSS_DATA.exceptions.notes.map(n => `<li>${n}</li>`).join("");
  }

  /* ---------------- Timeline ---------------- */
  function renderTimeline() {
    document.getElementById("timeline").innerHTML = MSS_DATA.timeline.map(t => `
      <li><span class="timeline-date">${t.date}</span><span>${t.text}</span></li>
    `).join("");
  }

  /* ---------------- Footer ---------------- */
  function renderFooter() {
    document.getElementById("source-link").href = MSS_DATA.meta.sourceUrl;
  }

  /* ---------------- Init ---------------- */
  renderScope();
  renderRoles();
  renderLadder();
  renderFinder();
  renderToolbar();
  renderCategories();
  renderOverlays();
  renderExceptions();
  renderTimeline();
  renderFooter();
})();
