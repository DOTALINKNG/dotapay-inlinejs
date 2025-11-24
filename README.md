## Dotapay Inline Checkout

Build and render a lightweight inline checkout experience (similar to Paystack Inline) that currently supports bank-transfer flows. The script handles the UI shell, loading spinner, bank-detail screen with countdown, and a simple success/error acknowledgement.

### Usage

1. Host `inline.js` on your CDN (or serve it statically).
2. Include the script on any page where you need checkout:

```html
<script src="/path/to/inline.js"></script>
<script>
  function startCheckout() {
    DotapayInline.open({
      // gatewayUrl is optional - defaults to "https://dotapay.backend-dev.dotapay.ng/api/v1"
      gatewayUrl: "https://gateway.example.com", // Optional
      tenantToken: "TENANT_TOKEN",
      payload: {
        public_key: "PUB_xxx",
        items: [
          { unit_cost: 500, quantity: 2, split_group_id: "SG_1" },
          { unit_cost: 1000, quantity: 1, split_group_id: null }
        ],
        customer_email: "alice@example.com",
        customer_name: "Alice Johnson",
        order_id: "ORD2022...",
        fee_bearer: "merchant"
      },
      callback: function (verificationResponse) {
        /**
         * Called with the verification response from /payment/verify endpoint.
         * The response contains the transaction object with status (APPROVED, PENDING, etc.).
         * Use this to handle the verification result (e.g., update your database, send notifications).
         */
        console.log("Verification response:", verificationResponse);
      }
    });
  }
</script>
```

### Screens & Flow

1. **Spinner Screen** – Shown immediately while initiating `/payment/request`.
2. **Bank Details Screen** – Renders the transfer instructions (account name/number, bank name, amount, expiry countdown) returned from your gateway. Includes a button for the customer to notify completion.
3. **Success/Failure Screen** – Displayed after the customer clicks "I've made the transfer" (verification is called automatically). The `callback` function is invoked with the verification response. If any error occurs while creating the request, a failure screen is shown.

### Configuration

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `gatewayUrl` | `string` | ❌ | Base URL for your gateway (`https://...`). The script appends `/payment/request`. Defaults to `"https://dotapay.backend-dev.dotapay.ng/api/v1"` if not provided. |
| `tenantToken` | `string` | ✅ | Token used for the `Authorization: Bearer ...` header. |
| `payload` | `object` | ✅ | Body sent to the gateway (see sample above). |
| `headers` | `Record<string,string>` | ❌ | Additional headers to merge with defaults. |
| `callback` | `(verificationResponse) => void` | ❌ | Called with the verification response from `/payment/verify` after the customer taps "I've made the transfer". The response contains the transaction object with status (APPROVED, PENDING, etc.). |
| `onClose` | `() => void` | ❌ | Fired whenever the modal closes. |
| `theme` | `string \| Theme` | ❌ | Either the name of a built-in theme (`"dotapayDark"`) or an object that can override palette + logo (see below). |

#### Theme system

`DotapayInline` exposes a `themes` map. Pass either `theme: "dotapayDark"` or provide overrides (`theme: { brandColor: "#00ff00", overlayBg: "rgba(...)" }`). The default `dotapayDark` theme applies the Dotapay purple gradient, logo, and a “Secured by Dotapay” footer similar to Paystack’s inline checkout.

```html
DotapayInline.open({
  ...,
  theme: {
    name: "dotapayDark",
    brandColor: "#ff7aec",
    securedText: "Secured by MyPay"
  }
});
```

The checkout now renders inside its own iframe, so host-page CSS cannot bleed into the experience. The only global styles applied to the merchant page are for the transparent overlay container.

### Development

This repository is intentionally dependency-free; edit `inline.js` directly. Use any static server to load an HTML file that references the script while you exercise the flow manually.

