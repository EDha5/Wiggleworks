# Little Layer Club

A first storefront concept for physical 3D printed animal models. Temporary name, illustrated models, and sample prices are placeholders for owner review.

## Preview on this Mac

Open `public/index.html` in a browser, or run from this directory:

```sh
python3 -m http.server 8080 --directory public
```

Visit http://localhost:8080. No build or dependency installation is needed.

## Included

- Responsive collection filtered by dogs, cats, and lizards.
- Monthly or one-time boxes with 1, 3, or 5 models and 1–20 boxes per delivery.
- Individual model selection or surprise preferences by animal category.
- Five colors, calculated sample pricing, and a draft saved to this browser.
- Firebase Hosting configuration and a local Git repository.

The draft is not an order. There is no payment processing, account system, backend storage, admin upload screen, or fulfillment system yet. Surprise preferences are captured without generating or revealing an order. Selections repeat across boxes in a delivery, and one color applies to the entire order.

## Connect GitHub

Git is installed on this Mac. You do not need GitHub Desktop to use GitHub, though its interface can make signing in and publishing easier. In GitHub Desktop, sign in, add this existing local repository, then publish it as a private repository. Alternatively, connect an authenticated GitHub remote using Git.

Before making your first commit, configure your preferred author name and email locally in this project. A GitHub privacy email is fine. Do not commit credentials or private customer data.

## Publish to Firebase Hosting

Install Node.js with npm, then authenticate with the Firebase CLI. Select your actual Firebase project explicitly; no project has been created or selected by this starter.

```sh
npx -y firebase-tools@latest login
npx -y firebase-tools@latest deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```

`firebase.json` publishes only `public/`. Backend services will need separate configuration and access rules. GitHub upload and Firebase publishing are independent; automatic GitHub deployment can be configured after both accounts are connected.

## Before accepting orders

Confirm the store name, model catalog/photos, available filament colors, print sizes, prices, shipping area/costs, and subscription policies. Add a secure backend for catalog, customer preferences, orders, and stock; authenticated admin uploads; payment checkout and verified webhooks for recurring billing; and a fulfillment workflow. The backend must calculate prices from trusted catalog data rather than trusting browser totals.
