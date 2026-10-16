/* Fusion Fast menu. Prices taken from their live Uber Eats listing (Oct 2026).
   Confirm in-store / direct prices with the owner before going live. */
window.FF_MENU = [
  { id: "platters", name: "Sharing Platters", blurb: "Charcoal grilled, built for the table.", items: [
    { id: "mix-grill", name: "Mix Grill", price: 15.00, desc: "Charcoal grilled lamb kofta, chicken shish and lamb shish. Served with rice or chips.", tags: ["popular"], img: "mixgrill" },
    { id: "special-mix-grill", name: "Special Mix Grill", price: 18.00, desc: "Grilled wings, lamb kofta, chicken shish and lamb shish. Served with rice or chips.", tags: [] },
    { id: "mix-grill-4", name: "Mix Grill for 4", price: 39.00, desc: "2 lamb shish, 2 chicken shish, 2 lamb kofta, wings, doner and chicken shawarma. Rice or chips.", tags: ["share"] },
    { id: "family-mix-grill", name: "Family Mix Grill", price: 50.00, desc: "Whole chicken, lamb shish, chicken shish, kofta, wings, houmous, nuggets, doner, shawarma and 4 cans.", tags: ["share"] }
  ]},
  { id: "signature", name: "Signature", blurb: "The dishes people come back for.", items: [
    { id: "fusion-box", name: "Fusion Fast Box", price: 19.00, desc: "Boneless chicken, fusion doner, a lamb chop, 3 honey glazed wings, spicy rice or chips and a drink.", tags: ["popular"], img: "box" },
    { id: "sea-bass", name: "Grilled Sea Bass", price: 15.00, desc: "Marinated in our special sauce. Served with rice or chips.", tags: [], img: "tt-sea-bass" }
  ]},
  { id: "mains", name: "Mains", blurb: "Off the spit and off the coals.", items: [
    { id: "naga-doner", name: "Fusion Naga Doner", price: 8.50, desc: "Our doner with a proper naga kick. The one reviewers keep naming.", tags: ["popular", "spicy"], img: "doner-whole" },
    { id: "spicy-doner", name: "Fusion Spicy Doner", price: 8.50, desc: "Doner with our house heat.", tags: ["spicy"], img: "spit" },
    { id: "shatkora-doner", name: "Shatkora Doner", price: 8.50, desc: "Doner lifted with shatkora, the citrus of Sylhet.", tags: ["spicy"] },
    { id: "mix-doner-shawarma", name: "Mix Doner & Chicken Shawarma", price: 8.50, desc: "The best of both spits.", tags: ["spicy"] },
    { id: "chicken-shawarma", name: "Chicken Shawarma", price: 8.50, desc: "Classic Lebanese chicken shawarma.", tags: ["spicy"] },
    { id: "chicken-fusion-shawarma", name: "Chicken Fusion Shawarma", price: 8.50, desc: "Shawarma meets our Asian spice blend.", tags: ["spicy"] },
    { id: "chicken-shish", name: "Chicken Shish", price: 8.50, desc: "Marinated chicken skewers over charcoal.", tags: ["spicy"], img: "skewers" },
    { id: "lamb-shish", name: "Lamb Shish", price: 9.00, desc: "Charcoal grilled lamb skewers.", tags: ["spicy"] },
    { id: "mix-shish", name: "Mix Shish (Large)", price: 12.00, desc: "Chicken and lamb shish together.", tags: ["spicy"], img: "skewers" }
  ]},
  { id: "specialities", name: "Fusion Specialities", blurb: "Glazed, marinated, fire-kissed.", items: [
    { id: "boneless-chicken", name: "Boneless Chicken", price: 8.50, desc: "Served with rice or chips.", tags: [], img: "tt-charcoal-grill" },
    { id: "boneless-spicy-rice", name: "Boneless Chicken with Spicy Rice", price: 9.50, desc: "Boneless chicken on our spicy rice.", tags: ["spicy"] },
    { id: "honey-boneless", name: "Honey Glazed Boneless Chicken", price: 11.00, desc: "Served with rice and chips or spicy rice.", tags: ["spicy"] },
    { id: "whole-chicken", name: "Whole Chicken", price: 15.00, desc: "Marinated in special sauce. Rice and chips or spicy rice.", tags: ["spicy", "share"] },
    { id: "lebanese-wings", name: "Lebanese Marinated Grilled Wings", price: 9.00, desc: "Served with rice or chips.", tags: [], img: "stock-wings-grill" },
    { id: "honey-wings", name: "Honey Glazed Grilled Wings", price: 9.00, desc: "Served with rice or chips.", tags: [], img: "stock-wings-plate" },
    { id: "lamb-kofta", name: "Lamb Kofta", price: 9.00, desc: "Rice and chips or spicy rice.", tags: ["spicy"] },
    { id: "lamb-chops", name: "Lamb Chops in Sauce", price: 16.00, desc: "Marinated lamb chops with spicy rice.", tags: ["spicy"], img: "chops" }
  ]},
  { id: "burgers", name: "Burgers", blurb: "Grilled, never deep-fried.", items: [
    { id: "burger-quarter", name: "Grilled Burger ¼ Pounder", price: 7.00, desc: "Flame grilled beef.", tags: [] },
    { id: "burger-half", name: "Grilled Burger ½ Pounder", price: 9.00, desc: "Double the beef.", tags: [] },
    { id: "chicken-burger", name: "Grilled Chicken Burger", price: 7.50, desc: "Charcoal grilled chicken fillet.", tags: [] },
    { id: "doner-burger", name: "Doner Burger", price: 7.00, desc: "Doner in a bun.", tags: [] },
    { id: "shawarma-burger", name: "Shawarma Burger", price: 7.00, desc: "Chicken shawarma in a bun.", tags: [] },
    { id: "smashburger", name: "Smashburger", price: 8.00, desc: "Crispy edged smash patty.", tags: [] }
  ]},
  { id: "wraps", name: "Wraps", blurb: "Rolled tight, eaten fast.", items: [
    { id: "doner-wrap", name: "Doner Wrap", price: 7.00, desc: "", tags: [] },
    { id: "shawarma-wrap", name: "Chicken Shawarma Wrap", price: 7.00, desc: "", tags: [] },
    { id: "mix-doner-wrap", name: "Mix Doner Wrap", price: 7.00, desc: "", tags: [] },
    { id: "lamb-shish-wrap", name: "Lamb Shish Wrap", price: 7.50, desc: "", tags: [] },
    { id: "mix-shish-wrap", name: "Mix Shish Wrap", price: 10.00, desc: "", tags: [] },
    { id: "kofta-wrap", name: "Lamb Kofta Wrap", price: 7.50, desc: "", tags: [] },
    { id: "falafel-wrap", name: "Falafel Wrap", price: 6.00, desc: "", tags: ["veg"] },
    { id: "halloumi-wrap", name: "Halloumi Wrap", price: 6.00, desc: "", tags: ["veg"] },
    { id: "falafel-halloumi-wrap", name: "Falafel & Halloumi Wrap", price: 7.00, desc: "", tags: ["veg"] }
  ]},
  { id: "starters", name: "Starters & Sides", blurb: "For the table, or for you.", items: [
    { id: "hummus-shawarma", name: "Hummus Chicken Shawarma", price: 5.50, desc: "With tortilla.", tags: [] },
    { id: "hummus-bread", name: "Hummus with Bread", price: 5.50, desc: "", tags: ["veg"], img: "stock-hummus" },
    { id: "falafel", name: "Falafel (4)", price: 5.00, desc: "", tags: ["veg"], img: "stock-falafel" },
    { id: "halloumi", name: "Grilled Halloumi (4)", price: 5.50, desc: "", tags: ["veg"] },
    { id: "nuggets-chips", name: "Chicken Nuggets & Chips", price: 5.50, desc: "", tags: [] },
    { id: "popcorn", name: "Chicken Popcorn", price: 4.50, desc: "", tags: [] },
    { id: "onion-rings", name: "Onion Rings", price: 3.50, desc: "", tags: ["veg"] },
    { id: "spicy-chips", name: "Spicy Chips", price: 5.00, desc: "", tags: ["spicy", "veg"] },
    { id: "cheesy-chips", name: "Cheesy Chips", price: 5.50, desc: "", tags: ["veg"] },
    { id: "chips", name: "Chips", price: 2.50, desc: "", tags: ["veg"] }
  ]},
  { id: "drinks", name: "Drinks", blurb: "Cold cans. No alcohol, ever.", items: [
    { id: "coke", name: "Coke", price: 1.20, desc: "", tags: [] },
    { id: "diet-coke", name: "Diet Coke", price: 1.20, desc: "", tags: [] },
    { id: "pepsi", name: "Pepsi", price: 1.20, desc: "", tags: [] },
    { id: "7up", name: "7 Up", price: 1.20, desc: "", tags: [] },
    { id: "fanta", name: "Fanta", price: 1.20, desc: "", tags: [] },
    { id: "mirinda-orange", name: "Orange Mirinda", price: 1.50, desc: "", tags: [] },
    { id: "mirinda-strawberry", name: "Strawberry Mirinda", price: 1.50, desc: "", tags: [] },
    { id: "rubicon-mango", name: "Rubicon Mango", price: 1.20, desc: "", tags: [] },
    { id: "water", name: "Water", price: 1.20, desc: "", tags: [] }
  ]}
];
window.FF_INFO = {
  name: "Fusion Fast",
  address: "284 Brixton Road, London SW9 6AG",
  phone: "020 8075 1647",
  phoneHref: "tel:+442080751647",
  /* TEMPORARY WhatsApp number for the demo. Replace with the restaurant's own number before launch. */
  whatsapp: "447508407866",
  maps: "https://www.google.com/maps/search/?api=1&query=Fusion+Fast+284+Brixton+Road+London+SW9+6AG",
  uber: "https://www.ubereats.com/gb/store/fusion-fast/DCAekJylQ6O1MS98WWAFcQ",
  justeat: "https://www.just-eat.co.uk/restaurants-fusion--fast-lebanese-grill-nine-elms-/menu",
  tiktok: "https://www.tiktok.com/@fusionfastofficial",
  instagram: "https://www.instagram.com/fusionfastofficial/"
};
