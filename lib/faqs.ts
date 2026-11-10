// Shared by the home page's Small print (grouped by `group`) and /support. Wording follows docs/support.html and the privacy policy.
export const faqs = [
  {
    group: "Getting it",
    question: "Do I need an account?",
    answer:
      "No. AllerLens has no sign-up and no sign-in. Your allergen profile and scan history are stored on your device.",
  },
  {
    group: "Labels and results",
    question: "Can I rely on it instead of asking the restaurant?",
    answer:
      "No. AllerLens uses AI to read menus and it can make mistakes or miss an ingredient. It's guidance, not medical advice. Always confirm ingredients and preparation with restaurant staff before you order, especially if your allergy is severe.",
  },
  {
    group: "Labels and results",
    question: "A dish was flagged wrong. What do I do?",
    answer:
      "Open the dish, tap Report a problem with this result and pick a reason. That sends us a short anonymous report: the dish name, the tag the app showed, the reason you picked and the app version. It doesn't include your allergen profile or anything that identifies you, so we can't reply to it. Email us if you want an answer.",
  },
  {
    group: "Scanning",
    question: "How do I get a menu into the app?",
    answer:
      "Point the camera at a printed menu (up to five pages, read as one menu), point it at the QR code on the table, paste a link to a menu, or upload a PDF (the first 10 pages) or photos.",
  },
  {
    group: "Scanning",
    question: "The scan didn't pick up my menu.",
    answer:
      "Scanning works best on printed menus in good light, with the whole menu in frame and the text roughly upright. If the camera can't focus, import a photo from your library instead.",
  },
  {
    group: "Scanning",
    question: "Which languages does it translate?",
    answer:
      "AllerLens reads menus in many languages and translates them into English or Spanish, keeping the original text under each dish. The app itself is in English and Spanish, following your phone.",
  },
  {
    group: "Scanning",
    question: "Does it work offline?",
    answer:
      "No. Scanning needs an internet connection, because the menu is read on our server. Scans you already saved stay on your phone and open without one.",
  },
  {
    group: "Labels and results",
    question: "What does Ask staff mean?",
    answer:
      "It means the app has nothing to go on: the menu gives no description, the dish changes daily, or it points at a list of sauces the app did not see. Ask staff is never shown as Safe.",
  },
  {
    group: "Labels and results",
    question: "Which allergens does it check?",
    answer:
      "Nine: peanuts, tree nuts, dairy, eggs, gluten, soy, fish, shellfish and sesame. It also flags allergens a dish usually contains when the menu lists no ingredients, and treats related ones, such as squid for a fish allergy, as Caution.",
  },
  {
    group: "Your data",
    question: "How do I delete my data?",
    answer:
      "Open Profile, then Clear scans and settings, or delete the app. We don't keep your personal data in the cloud, so either one removes everything.",
  },
  {
    group: "Getting it",
    question: "What does it cost, and where does it run?",
    answer:
      "AllerLens is free, with no in-app purchases and no subscription. It runs on iPhone only. There is no iPad or Android version.",
  },
]
