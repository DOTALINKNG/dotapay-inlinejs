(function (global, doc) {
  "use strict";

  var STYLE_ID = "dotapay-inline-style";
  var ACTIVE_CLASS = "dotapay-inline__open";
  var DEFAULT_BRAND = "#6A1BFF";

  var DotapayInlineThemes = {
    dotapayDark: {
      name: "dotapayDark",
      brandColor: "#8c4dff",
      accentColor: "#f7c948",
      overlayBg: "rgba(6, 9, 20, 0.82)",
      cardBg: "#0f1624",
      textColor: "#f8f9ff",
      subTextColor: "#b4bdd1",
      cardShadow: "0 30px 70px rgba(0,0,0,0.55)",
      primaryButtonBg: "linear-gradient(135deg,#7d3bff 0%,#c86bff 100%)",
      primaryButtonText: "#ffffff",
      secondaryButtonBg: "rgba(255,255,255,0.08)",
      secondaryButtonText: "#f8f9ff",
      countdownBg: "rgba(247,201,72,0.12)",
      countdownText: "#f7c948",
      statusSuccess: "#44b669",
      statusError: "#ff4d6d",
      logo: {
        type: "image",
        src: "data:image/png;base64,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"
      },
      securedText: "Secured by Dotapay"
    }
  };

  function noop() { }

  function ensureStyles(targetDoc) {
    var hostDoc = targetDoc || doc;
    if (hostDoc.getElementById(STYLE_ID)) return;
    var style = hostDoc.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      ".dotapay-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:2147483647;padding:0;margin:0;border:none;width:100%;height:100%;}" +
      ".dotapay-root{width:100%;height:100%;position:fixed;inset:0;margin:0;padding:24px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:var(--dotapay-overlay-bg,rgba(1,27,51,.65));font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}" +
      ".dotapay-card{background:var(--dotapay-card-bg,#fff);border-radius:20px;max-width:430px;width:100%;padding:36px 36px 30px;box-shadow:var(--dotapay-card-shadow,0 20px 50px rgba(0,0,0,.25));position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.04);}" +
      ".dotapay-close{position:absolute;top:16px;right:16px;background:transparent;border:none;font-size:20px;cursor:pointer;color:var(--dotapay-subtext,#4c5667);}" +
      ".dotapay-header{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:18px;}" +
      ".dotapay-logo{height:80px;display:flex;align-items:center;}" +
      ".dotapay-title{font-size:22px;font-weight:600;color:var(--dotapay-text,#011b33);margin-bottom:8px;}" +
      ".dotapay-subtitle{font-size:14px;color:var(--dotapay-subtext,#4c5667);margin-bottom:24px;line-height:1.6;}" +
      ".dotapay-section{margin-bottom:18px;}" +
      ".dotapay-section--center{display:flex;justify-content:center;}" +
      ".dotapay-label{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--dotapay-subtext,#70808f);margin-bottom:4px;}" +
      ".dotapay-value{font-size:18px;font-weight:600;color:var(--dotapay-text,#011b33);word-break:break-all;}" +
      ".dotapay-countdown{font-size:14px;font-weight:600;color:var(--dotapay-countdown-text,#c26b00);background:var(--dotapay-countdown-bg,rgba(194,107,0,.1));padding:12px 16px;border-radius:12px;display:inline-flex;align-items:center;gap:8px;}" +
      ".dotapay-amount-box{background:var(--dotapay-primary-bg," +
      DEFAULT_BRAND +
      ");border-radius:12px;padding:20px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;}" +
      ".dotapay-amount-box__label{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:rgba(255,255,255,0.8);margin-bottom:8px;}" +
      ".dotapay-amount-box__value{font-size:28px;font-weight:700;color:var(--dotapay-primary-text,#fff);}" +
      ".dotapay-amount-box__left{flex:1;}" +
      ".dotapay-amount-box__right{display:flex;align-items:center;gap:8px;}" +
      ".dotapay-actions{margin-top:24px;display:flex;flex-direction:column;gap:12px;}" +
      ".dotapay-primary{background:var(--dotapay-primary-bg," +
      DEFAULT_BRAND +
      ");border:none;color:var(--dotapay-primary-text,#fff);font-weight:600;font-size:15px;padding:15px;border-radius:10px;cursor:pointer;transition:opacity .2s,transform .15s ease;}" +
      ".dotapay-primary:active{transform:translateY(1px);}" +
      ".dotapay-primary:disabled{opacity:.5;cursor:not-allowed;}" +
      ".dotapay-secondary{background:var(--dotapay-secondary-bg,#f5f6fa);color:var(--dotapay-secondary-text,#0f172a);border:none;font-weight:600;font-size:14px;padding:12px;border-radius:8px;cursor:pointer;}" +
      ".dotapay-spinner{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:32px;color:var(--dotapay-text,#011b33);}" +
      ".dotapay-spinner:before{content:'';width:48px;height:48px;border-radius:50%;border:4px solid rgba(255,255,255,0.08);border-top-color:var(--dotapay-brand," +
      DEFAULT_BRAND +
      ");animation:dotapay-rotate 1s linear infinite;}" +
      ".dotapay-status{display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:16px;}" +
      ".dotapay-status__icon{font-size:48px;margin-bottom:16px;}" +
      ".dotapay-status__icon--success{color:var(--dotapay-status-success,#1f9d4b);}" +
      ".dotapay-status__icon--error{color:var(--dotapay-status-error,#d7263d);}" +
      ".dotapay-icon-ring{width:72px;height:72px;border-radius:22px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 15px 30px rgba(0,0,0,.35);}" +
      ".dotapay-icon-ring svg{width:32px;height:32px;display:block;}" +
      ".dotapay-icon-ring--success{background:linear-gradient(135deg,#7f5dff,#b483ff);}" +
      ".dotapay-status__message{font-size:18px;color:var(--dotapay-text,#011b33);margin-bottom:8px;font-weight:600;}" +
      ".dotapay-status__detail{font-size:14px;color:var(--dotapay-subtext,#4c5667);line-height:1.6;}" +
      ".dotapay-secured{margin-top:28px;font-size:12px;text-transform:uppercase;letter-spacing:.3em;color:var(--dotapay-subtext,#90a0b7);text-align:center;opacity:.8;}" +
      ".dotapay-secured span{font-weight:700;color:var(--dotapay-brand," +
      DEFAULT_BRAND +
      ");margin-left:6px;}" +
      "@keyframes dotapay-rotate{to{transform:rotate(360deg)}}" +
      "@media(max-width:520px){.dotapay-card{max-width:100%;padding:24px}.dotapay-title{font-size:18px}}";
    hostDoc.head.appendChild(style);
  }

  function normalizeOptions(input) {
    if (!input || typeof input !== "object") {
      throw new Error("DotapayInline: options are required.");
    }
    if (!input.tenantToken) {
      throw new Error("DotapayInline: `tenantToken` is required.");
    }
    if (!input.payload || typeof input.payload !== "object") {
      throw new Error("DotapayInline: `payload` is required.");
    }
    var theme = resolveTheme(input.theme);
    var gatewayUrl = input.gatewayUrl || "https://dotapay.backend-dev.dotapay.ng/api/v1";
    return {
      gatewayUrl: gatewayUrl.replace(/\/+$/, ""),
      tenantToken: input.tenantToken,
      payload: input.payload,
      headers: input.headers || {},
      callback: typeof input.callback === "function" ? input.callback : null,
      onClose: typeof input.onClose === "function" ? input.onClose : null,
      theme: theme
    };
  }

  function resolveTheme(themeInput) {
    if (!themeInput) {
      return Object.assign({}, DotapayInlineThemes.dotapayDark);
    }
    if (typeof themeInput === "string") {
      return Object.assign({}, DotapayInlineThemes[themeInput] || DotapayInlineThemes.dotapayDark);
    }
    if (themeInput.name && DotapayInlineThemes[themeInput.name]) {
      return Object.assign({}, DotapayInlineThemes[themeInput.name], themeInput);
    }
    return Object.assign({}, DotapayInlineThemes.dotapayDark, themeInput);
  }

  function extractBankDetails(raw) {
    if (!raw) return null;

    // Check for error response
    if (raw.error) {
      return null;
    }

    // New API format: transaction.account_metadata
    var transaction = raw.transaction;
    if (!transaction) return null;

    var accountMetadata = transaction.account_metadata;
    if (!accountMetadata) return null;

    var accountName = accountMetadata.account_name;
    var accountNumber = accountMetadata.account_number;
    var bankName = accountMetadata.bank_name;
    var expiresAt = accountMetadata.expiry_date || accountMetadata.expires_at || accountMetadata.expiry || accountMetadata.expiry_time;
    var amount = transaction.total_amount || transaction.amount || 0;
    var currency = transaction.currency || "NGN";
    var reference = transaction.reference || transaction.code || "N/A";
    var transactionCode = transaction.code;

    // Default to 4000 minutes if no expiration
    if (!expiresAt) {
      expiresAt = Date.now() + (4000 * 60 * 1000);
    }

    return {
      accountName: accountName || "Temporary Account",
      accountNumber: accountNumber || "Unavailable",
      bankName: bankName || "Your Bank",
      expiresAt: expiresAt,
      amount: amount,
      currency: currency,
      reference: reference,
      transactionCode: transactionCode,
      raw: raw
    };
  }

  function formatAmount(value, currency) {
    var amount = Number(value || 0);
    var formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency || "NGN",
      minimumFractionDigits: 2
    });
    return formatter.format(amount);
  }

  function formatCountdown(expiryMs) {
    var diff = Math.max(0, expiryMs - Date.now());
    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (days > 0) {
      return days + "d " + hours + "h";
    }
    if (hours > 0) {
      return hours + "h " + minutes + "m";
    }
    if (minutes > 0) {
      return minutes + "m " + seconds + "s";
    }
    return seconds + "s";
  }

  function parseExpiry(expiresAt) {
    if (!expiresAt) return null;
    if (typeof expiresAt === "number") {
      if (("" + expiresAt).length === 10) {
        return expiresAt * 1000;
      }
      return expiresAt;
    }
    var parsed = Date.parse(expiresAt);
    return isNaN(parsed) ? null : parsed;
  }

  function applyThemeVars(root, theme) {
    if (!root || !theme) return;
    root.style.setProperty("--dotapay-brand", theme.brandColor || DEFAULT_BRAND);
    root.style.setProperty("--dotapay-overlay-bg", theme.overlayBg || "rgba(1,27,51,.65)");
    root.style.setProperty("--dotapay-card-bg", theme.cardBg || "#fff");
    root.style.setProperty("--dotapay-card-shadow", theme.cardShadow || "0 20px 50px rgba(0,0,0,.25)");
    root.style.setProperty("--dotapay-text", theme.textColor || "#011b33");
    root.style.setProperty("--dotapay-subtext", theme.subTextColor || "#4c5667");
    root.style.setProperty("--dotapay-countdown-bg", theme.countdownBg || "rgba(194,107,0,.1)");
    root.style.setProperty("--dotapay-countdown-text", theme.countdownText || "#c26b00");
    root.style.setProperty("--dotapay-primary-bg", theme.primaryButtonBg || theme.brandColor || DEFAULT_BRAND);
    root.style.setProperty("--dotapay-primary-text", theme.primaryButtonText || "#fff");
    root.style.setProperty("--dotapay-secondary-bg", theme.secondaryButtonBg || "#f5f6fa");
    root.style.setProperty("--dotapay-secondary-text", theme.secondaryButtonText || "#0f172a");
    root.style.setProperty("--dotapay-status-success", theme.statusSuccess || "#1f9d4b");
    root.style.setProperty("--dotapay-status-error", theme.statusError || "#d7263d");
  }

  function DotapayInlineSession(options) {
    this.options = normalizeOptions(options);
    this.theme = this.options.theme;
    this.overlay = null;
    this.frame = null;
    this.frameDoc = null;
    this.root = null;
    this.countdownInterval = null;
    this.verificationInterval = null;
    this.paymentResponse = null;
    this.expiresAt = null;
    this.destroyed = false;
  }

  DotapayInlineSession.prototype.open = function () {
    var self = this;
    if (DotapayInlineSession.active && DotapayInlineSession.active !== this) {
      DotapayInlineSession.active.close(true);
    }
    DotapayInlineSession.active = this;

    ensureStyles();
    this.overlay = createIframeOverlay(this.theme);
    this.frame = this.overlay.querySelector("iframe");
    doc.body.classList.add(ACTIVE_CLASS);
    doc.body.appendChild(this.overlay);

    var bootstrapped = false;
    var bootstrap = function () {
      if (bootstrapped) return;
      self.frameDoc = self.frame.contentDocument || (self.frame.contentWindow && self.frame.contentWindow.document);
      if (!self.frameDoc) {
        throw new Error("DotapayInline: Unable to access iframe document.");
      }
      bootstrapped = true;
      self.frameDoc.open();
      self.frameDoc.write("<!doctype html><html><head><meta charset='utf-8'></head><body><div class='dotapay-root'></div></body></html>");
      self.frameDoc.close();

      ensureStyles(self.frameDoc);
      applyThemeVars(self.frameDoc.documentElement || self.frameDoc.body, self.theme);

      self.root = self.frameDoc.body.querySelector(".dotapay-root");
      self.attachClose();
      self.renderSpinner("Creating payment request...");
      self.createPaymentRequest();
    };

    if (this.frame.contentDocument && this.frame.contentDocument.readyState === "complete") {
      bootstrap();
    } else {
      this.frame.addEventListener("load", bootstrap, { once: true });
      setTimeout(function () {
        try {
          bootstrap();
        } catch (err) {
          // swallow; load event will handle final bootstrap
        }
      }, 0);
    }

    return this;
  };

  DotapayInlineSession.prototype.attachClose = function () {
    var self = this;
    if (this.overlay) {
      this.overlay.addEventListener("click", function (evt) {
        if (evt.target === self.overlay) {
          self.close();
        }
      });
    }
    if (this.root) {
      this.root.addEventListener("click", function (evt) {
        if (evt.target === self.root) {
          self.close();
        }
      });
    }
  };

  DotapayInlineSession.prototype.renderSpinner = function (message) {
    if (!this.root) return;
    this.root.innerHTML =
      '<div class="dotapay-card">' +
      buildHeader(this.theme) +
      '<button class="dotapay-close" data-close>&times;</button><div class="dotapay-spinner">' +
      "<p>" +
      (message || "Please hold on...") +
      "</p></div>" +
      buildSecuredFooter(this.theme) +
      "</div>";
    this.bindCloseButton();
  };

  DotapayInlineSession.prototype.renderPolling = function () {
    if (!this.root) return;
    var expiresMs = this.expiresAt;
    var countdownMarkup = expiresMs
      ? '<div class="dotapay-countdown" data-countdown="' + expiresMs + '">Please wait for ' + formatCountdown(expiresMs) + "</div>"
      : "";

    this.root.innerHTML =
      '<div class="dotapay-card">' +
      buildHeader(this.theme) +
      '<button class="dotapay-close" data-close>&times;</button>' +
      '<div class="dotapay-spinner">' +
      "<p>We're waiting to receive your transfer. This can take up to a minute</p>" +
      "</div>" +
      (countdownMarkup ? '<div class="dotapay-section dotapay-section--center">' + countdownMarkup + "</div>" : "") +
      buildSecuredFooter(this.theme) +
      "</div>";
    this.bindCloseButton();

    // Start countdown if we have expiry time
    if (expiresMs) {
      this.startCountdown(expiresMs, "Please wait for ");
    }
  };

  DotapayInlineSession.prototype.renderBankDetails = function (details) {
    if (!this.root) return;
    var expiresMs = parseExpiry(details.expiresAt);
    this.expiresAt = expiresMs; // Store expiry time for polling
    var countdownMarkup = expiresMs
      ? '<div class="dotapay-countdown" data-countdown="' + expiresMs + '">Expires in ' + formatCountdown(expiresMs) + "</div>"
      : "";
    this.root.innerHTML =
      '<div class="dotapay-card">' +
      buildHeader(this.theme) +
      '<button class="dotapay-close" data-close>&times;</button>' +
      '<div class="dotapay-amount-box">' +
      '<div class="dotapay-amount-box__left">' +
      '<div class="dotapay-amount-box__label">Amount to send</div>' +
      '<div class="dotapay-amount-box__value">' +
      formatAmount(details.amount, details.currency) +
      "</div>" +
      "</div>" +
      (countdownMarkup ? '<div class="dotapay-amount-box__right">' + countdownMarkup + "</div>" : "") +
      "</div>" +
      '<div class="dotapay-subtitle">Send exactly the amount above to this temporary account. Use the reference below so we can match your payment.</div>' +
      '<div class="dotapay-section"><div class="dotapay-label">Account Name</div><div class="dotapay-value">' +
      details.accountName +
      "</div></div>" +
      '<div class="dotapay-section"><div class="dotapay-label">Account Number</div><div class="dotapay-value">' +
      details.accountNumber +
      "</div></div>" +
      '<div class="dotapay-section"><div class="dotapay-label">Bank</div><div class="dotapay-value">' +
      details.bankName +
      "</div></div>" +
      '<div class="dotapay-section"><div class="dotapay-label">Payment reference</div><div class="dotapay-value">' +
      details.reference +
      "</div></div>" +
      '<div class="dotapay-actions">' +
      '<button class="dotapay-primary" data-confirm> I\'ve made the transfer – ' +
      formatAmount(details.amount, details.currency) +
      ' </button>' +
      '<button class="dotapay-secondary" data-close>Cancel</button>' +
      "</div>" +
      buildSecuredFooter(this.theme) +
      "</div>";

    this.bindCloseButton();
    this.bindConfirmButton();

    if (expiresMs) {
      this.startCountdown(expiresMs);
    }
  };

  DotapayInlineSession.prototype.renderSuccess = function (message, detail) {
    if (!this.root) return;
    this.clearCountdown();
    this.clearVerificationInterval();
    this.root.innerHTML =
      '<div class="dotapay-card">' +
      buildHeader(this.theme) +
      '<button class="dotapay-close" data-close>&times;</button>' +
      '<div class="dotapay-status">' +
      '<div class="dotapay-icon-ring dotapay-icon-ring--success">' +
      '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>' +
      '<path d="M22.5 31.5l6.3 6.4 12.7-15.2" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>" +
      "</div>" +
      '<div class="dotapay-status__message">' +
      (message || "Payment noted") +
      "</div>" +
      '<div class="dotapay-status__detail">' +
      (detail || "We’re checking with your bank. You’ll get a confirmation shortly.") +
      "</div>" +
      "</div>" +
      '<div class="dotapay-actions"><button class="dotapay-primary" data-close>Close</button></div>' +
      buildSecuredFooter(this.theme) +
      "</div>";
    this.bindCloseButton();
  };

  DotapayInlineSession.prototype.renderFailure = function (message) {
    if (!this.root) return;
    this.clearCountdown();
    this.clearVerificationInterval();
    this.root.innerHTML =
      '<div class="dotapay-card">' +
      buildHeader(this.theme) +
      '<button class="dotapay-close" data-close>&times;</button>' +
      '<div class="dotapay-status__icon dotapay-status__icon--error">!</div>' +
      '<div class="dotapay-status__message">Something went wrong</div>' +
      '<div class="dotapay-status__detail">' +
      (message || "Unable to process your request. Please try again.") +
      "</div>" +
      '<div class="dotapay-actions"><button class="dotapay-primary" data-retry>Try again</button><button class="dotapay-secondary" data-close>Close</button></div>' +
      buildSecuredFooter(this.theme) +
      "</div>";
    this.bindCloseButton();
    this.bindRetryButton();
  };

  DotapayInlineSession.prototype.createPaymentRequest = function () {
    var _this = this;
    var url = this.options.gatewayUrl + "/payment/request";
    var headers = Object.assign(
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.options.tenantToken
      },
      this.options.headers
    );

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(this.options.payload)
    })
      .then(function (res) {
        return res.json().catch(function () {
          throw new Error("Invalid JSON response from gateway.");
        });
      })
      .then(function (json) {
        _this.paymentResponse = json;

        // Check for error response
        if (json.error) {
          throw new Error(json.error || "An error occurred while processing your request.");
        }

        var details = extractBankDetails(json);
        if (!details) {
          throw new Error("Gateway did not return bank transfer instructions.");
        }
        _this.renderBankDetails(details);
      })
      .catch(function (err) {
        _this.renderFailure(err.message);
      });
  };

  DotapayInlineSession.prototype.bindCloseButton = function () {
    if (!this.frameDoc) return;
    var self = this;
    var buttons = this.frameDoc.querySelectorAll("[data-close]");
    buttons.forEach(function (btn) {
      btn.onclick = function () {
        self.close();
      };
    });
  };

  DotapayInlineSession.prototype.bindRetryButton = function () {
    if (!this.frameDoc) return;
    var self = this;
    var retry = this.frameDoc.querySelector("[data-retry]");
    if (!retry) return;
    retry.onclick = function () {
      self.renderSpinner("Retrying...");
      self.createPaymentRequest();
    };
  };

  DotapayInlineSession.prototype.bindConfirmButton = function () {
    if (!this.frameDoc) return;
    var self = this;
    var confirmBtn = this.frameDoc.querySelector("[data-confirm]");
    if (!confirmBtn) return;
    confirmBtn.onclick = function () {
      self.handleConfirm();
    };
  };

  DotapayInlineSession.prototype.verifyPayment = function (showSpinner) {
    var _this = this;

    if (showSpinner) {
      this.renderSpinner("Hold on while we note your transfer...");
    }

    // Cancel any pending scheduled poll since we're actively verifying now
    this.clearVerificationInterval();

    // Get transaction code from payment response
    var transactionCode = null;
    if (this.paymentResponse && this.paymentResponse.transaction) {
      transactionCode = this.paymentResponse.transaction.code;
    }

    if (!transactionCode) {
      this.clearVerificationInterval();
      this.renderFailure("Unable to verify payment. Transaction code not found.");
      return;
    }

    // Call verification endpoint
    var url = this.options.gatewayUrl + "/payment/verify";
    var headers = Object.assign(
      {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: "Bearer " + this.options.tenantToken
      },
      this.options.headers
    );

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        identifier: transactionCode
      })
    })
      .then(function (res) {
        // Check if response is ok
        if (!res.ok) {
          return res.json().then(function (errorJson) {
            throw new Error(errorJson.error || "Gateway responded with " + res.status);
          }).catch(function () {
            throw new Error("Gateway responded with " + res.status);
          });
        }
        return res.json().catch(function () {
          throw new Error("Invalid JSON response from gateway.");
        });
      })
      .then(function (json) {
        // Check for error response
        if (json.error) {
          _this.clearVerificationInterval();
          _this.renderFailure(json.error || "Payment verification failed.");
          return;
        }

        // Get transaction from response
        var transaction = json.transaction || json;
        if (!transaction) {
          _this.clearVerificationInterval();
          _this.renderFailure("Invalid verification response.");
          return;
        }

        var status = transaction.status;
        var isExpired = _this.expiresAt && Date.now() > _this.expiresAt;

        // Handle different transaction statuses
        if (status === "APPROVED") {
          _this.clearVerificationInterval();
          _this.renderSuccess(
            "Payment successful",
            "Your payment has been confirmed."
          );
          // Call callback with verification response if provided
          if (_this.options.callback) {
            try {
              _this.options.callback(json);
            } catch (err) {
              console.error("DotapayInline: Error in callback", err);
            }
          }
        } else if (status === "PENDING") {
          // If expired and still PENDING, call callback and show failure
          if (isExpired) {
            _this.clearVerificationInterval();
            _this.renderFailure("Payment window has expired. Please start a new payment.");
            // Call callback when expired and status is still PENDING
            if (_this.options.callback) {
              try {
                _this.options.callback(json);
              } catch (err) {
                console.error("DotapayInline: Error in callback", err);
              }
            }
          } else {
            // Show polling view (only on first call)
            if (showSpinner) {
              _this.renderPolling();
            }
            // Schedule the next poll 30s after this response
            _this.startVerificationPolling();
            // Don't call callback for PENDING when not expired
          }
        } else {
          // Any other status (FAILED, REJECTED, etc.) shows failure
          _this.clearVerificationInterval();
          _this.renderFailure("Payment verification failed. Please try again or contact support.");
          // Call callback with verification response if provided
          if (_this.options.callback) {
            try {
              _this.options.callback(json);
            } catch (err) {
              console.error("DotapayInline: Error in callback", err);
            }
          }
        }
      })
      .catch(function (err) {
        _this.clearVerificationInterval();
        _this.renderFailure(err.message || "Unable to verify payment. Please try again.");
      });
  };

  DotapayInlineSession.prototype.handleConfirm = function () {
    this.verifyPayment(true);
  };

  DotapayInlineSession.prototype.startVerificationPolling = function () {
    var _this = this;
    this.clearVerificationInterval(); // Clear any existing timeout

    this.verificationInterval = setTimeout(function () {
      if (_this.destroyed) return;
      _this.verifyPayment(false);
    }, 2000); // Poll every 2 seconds
  };

  DotapayInlineSession.prototype.clearVerificationInterval = function () {
    if (this.verificationInterval) {
      clearTimeout(this.verificationInterval);
      this.verificationInterval = null;
    }
  };

  DotapayInlineSession.prototype.resolveConfirmation = function (result) {
    if (result && result.status === "failure") {
      this.renderFailure(result.message || "Transfer not verified yet. Please retry.");
      return;
    }
    this.renderSuccess(result && result.message, result && result.detail);
  };

  DotapayInlineSession.prototype.startCountdown = function (expiresMs, prefix) {
    var self = this;
    if (!this.frameDoc) return;
    var label = this.frameDoc.querySelector("[data-countdown]");
    if (!label) return;
    this.clearCountdown();
    // Extract prefix from existing text if not provided
    var countdownPrefix = prefix;
    if (!countdownPrefix && label.textContent) {
      // Try to extract prefix (text before the time)
      var match = label.textContent.match(/^(.+?)\s*\d/);
      if (match) {
        countdownPrefix = match[1] + " ";
      }
    }
    countdownPrefix = countdownPrefix || "Expires in ";
    var update = function () {
      var remaining = expiresMs - Date.now();
      if (remaining <= 0) {
        label.textContent = "Expired";
        self.clearCountdown();
        // Stop polling if active and make one final verification call
        if (self.verificationInterval) {
          self.clearVerificationInterval();
          // Make one final verification call to get status and call callback if still PENDING
          self.verifyPayment(false);
        }
        return;
      }
      label.textContent = countdownPrefix + formatCountdown(expiresMs);
    };
    update();
    this.countdownInterval = setInterval(update, 1000);
  };

  DotapayInlineSession.prototype.clearCountdown = function () {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  };

  DotapayInlineSession.prototype.close = function (silent) {
    if (this.destroyed) return;
    this.destroyed = true;
    this.clearCountdown();
    this.clearVerificationInterval();
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    doc.body.classList.remove(ACTIVE_CLASS);
    this.frame = null;
    this.frameDoc = null;
    this.root = null;
    DotapayInlineSession.active = null;
    if (!silent && this.options.onClose) {
      this.options.onClose();
    }
  };

  var DotapayInline = {
    open: function (options) {
      var session = new DotapayInlineSession(options);
      session.open();
      return {
        close: function () {
          session.close();
        }
      };
    }
  };

  DotapayInline.init = DotapayInline.open;
  DotapayInline.themes = DotapayInlineThemes;

  if (typeof global !== "undefined") {
    global.DotapayInline = DotapayInline;
  }

  function buildHeader(theme) {
    var logoMarkup = "";
    if (theme && theme.logo) {
      if (theme.logo.type === "image" && theme.logo.src) {
        logoMarkup = '<img class="dotapay-logo" src="' + theme.logo.src + '" alt="' + (theme.logo.alt || "Dotapay") + '"/>';
      } else if (theme.logo.type === "svg" && theme.logo.svg) {
        logoMarkup = '<div class="dotapay-logo">' + theme.logo.svg + "</div>";
      }
    }
    return '<div class="dotapay-header">' + logoMarkup + "</div>";
  }

  function buildSecuredFooter(theme) {
    var text = (theme && theme.securedText) || "Secured by Dotapay";
    return '<div class="dotapay-secured">Secured by<span>' + text.replace(/Secured by/i, "").trim() + "</span></div>";
  }

  function createIframeOverlay(theme) {
    var overlay = doc.createElement("div");
    overlay.className = "dotapay-overlay";
    var iframe = doc.createElement("iframe");
    iframe.setAttribute("title", "Dotapay checkout");
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.position = "fixed";
    iframe.style.inset = "0";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.style.background = "transparent";

    overlay.appendChild(iframe);
    return overlay;
  }
})(window, document);


