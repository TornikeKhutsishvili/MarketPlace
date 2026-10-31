"use strict";

/* Demo product dataset (acts as a mock backend). */
window.MP = window.MP || {};

MP.categories = [
  { id: "electronics", name: "ელექტრონიკა", icon: "💻" },
  { id: "fashion", name: "მოდა", icon: "👕" },
  { id: "home", name: "სახლი", icon: "🏠" },
  { id: "sports", name: "სპორტი", icon: "⚽" },
  { id: "books", name: "წიგნები", icon: "📚" },
  { id: "toys", name: "სათამაშოები", icon: "🧸" }
];

MP.products = [
  { id: 1, name: "უკაბელო ყურსასმენი Pro", category: "electronics", price: 149, oldPrice: 199, rating: 4.7, emoji: "🎧", colors: ["#e0e7ff", "#c7d2fe"], seller: "TechHub", desc: "ხმაურის შემცირება, 30 საათიანი ბატარეა და Bluetooth 5.3.", specs: { ბატარეა: "30 სთ", კავშირი: "Bluetooth 5.3", გარანტია: "12 თვე" } },
  { id: 2, name: "სმარტ საათი Fit 2", category: "electronics", price: 239, oldPrice: null, rating: 4.5, emoji: "⌚", colors: ["#dbeafe", "#bfdbfe"], seller: "TechHub", desc: "პულსის, ძილისა და ვარჯიშის თვალყური, წყალგამძლე კორპუსი.", specs: { ეკრანი: "1.4\" AMOLED", წყალგამძლეობა: "5 ATM", გარანტია: "12 თვე" } },
  { id: 3, name: "ლეპტოპი UltraBook 14", category: "electronics", price: 1899, oldPrice: 2099, rating: 4.8, emoji: "💻", colors: ["#e2e8f0", "#cbd5e1"], seller: "DigiStore", desc: "მსუბუქი და სწრაფი ლეპტოპი სამუშაოსა და სწავლისთვის.", specs: { პროცესორი: "8 ბირთვი", RAM: "16 GB", SSD: "512 GB" } },
  { id: 4, name: "მობილური Nova X", category: "electronics", price: 999, oldPrice: null, rating: 4.4, emoji: "📱", colors: ["#fae8ff", "#f5d0fe"], seller: "DigiStore", desc: "ძლიერი კამერა და სწრაფი დატენვა.", specs: { ეკრანი: "6.5\" OLED", მეხსიერება: "256 GB", კამერა: "50 MP" } },
  { id: 5, name: "მამაკაცის ჯინსის ქურთუკი", category: "fashion", price: 89, oldPrice: 119, rating: 4.2, emoji: "🧥", colors: ["#dbeafe", "#93c5fd"], seller: "StyleHouse", desc: "კლასიკური ჭრის, მაღალი ხარისხის ბამბა.", specs: { მასალა: "100% ბამბა", ზომები: "S–XXL", ფერი: "ლურჯი" } },
  { id: 6, name: "სპორტული ბოტასი Run", category: "fashion", price: 119, oldPrice: null, rating: 4.6, emoji: "👟", colors: ["#fee2e2", "#fecaca"], seller: "StyleHouse", desc: "მსუბუქი და კომფორტული ყოველდღიური სირბილისთვის.", specs: { ზომები: "36–46", მასალა: "ქსოვილი + რეზინი", წონა: "280 გ" } },
  { id: 7, name: "ქალის ზურგჩანთა City", category: "fashion", price: 59, oldPrice: 75, rating: 4.3, emoji: "🎒", colors: ["#fef3c7", "#fde68a"], seller: "BagCorner", desc: "წყალგამძლე ზურგჩანთა ლეპტოპის განყოფილებით.", specs: { მოცულობა: "22 ლ", მასალა: "ნეილონი", ფერი: "ყვითელი" } },
  { id: 8, name: "ყავის მანქანა Barista", category: "home", price: 329, oldPrice: 399, rating: 4.7, emoji: "☕", colors: ["#ffedd5", "#fed7aa"], seller: "HomePlus", desc: "ესპრესო და კაპუჩინო ერთი ღილაკით.", specs: { წნევა: "15 ბარი", ტევადობა: "1.5 ლ", სიმძლავრე: "1450 ვტ" } },
  { id: 9, name: "მაგიდის ლამპა LED", category: "home", price: 39, oldPrice: null, rating: 4.1, emoji: "💡", colors: ["#fef9c3", "#fef08a"], seller: "HomePlus", desc: "რეგულირებადი სიკაშკაშე და ფერის ტემპერატურა.", specs: { სიმძლავრე: "10 ვტ", რეჟიმები: "3", USB: "კი" } },
  { id: 10, name: "ორთოპედიული ბალიში", category: "home", price: 45, oldPrice: 60, rating: 4.5, emoji: "🛏️", colors: ["#ede9fe", "#ddd6fe"], seller: "HomePlus", desc: "მემორი ქაფი, ხერხემლის სწორი პოზიციისთვის.", specs: { მასალა: "Memory foam", ზომა: "60×40", გარანტია: "6 თვე" } },
  { id: 11, name: "იოგას ხალიჩა", category: "sports", price: 35, oldPrice: null, rating: 4.4, emoji: "🧘", colors: ["#dcfce7", "#bbf7d0"], seller: "FitLife", desc: "არაცურვადი ზედაპირი, 6 მმ სისქე.", specs: { სისქე: "6 მმ", ზომა: "183×61 სმ", მასალა: "TPE" } },
  { id: 12, name: "ჰანტელების ნაკრები 20 კგ", category: "sports", price: 129, oldPrice: 149, rating: 4.6, emoji: "🏋️", colors: ["#e2e8f0", "#94a3b8"], seller: "FitLife", desc: "რეგულირებადი წონა სახლში ვარჯიშისთვის.", specs: { წონა: "2×10 კგ", მასალა: "ფოლადი", გარანტია: "24 თვე" } },
  { id: 13, name: "ველოსიპედი Mountain 27.5", category: "sports", price: 799, oldPrice: null, rating: 4.5, emoji: "🚲", colors: ["#d1fae5", "#a7f3d0"], seller: "FitLife", desc: "21 სიჩქარე, ალუმინის ჩარჩო.", specs: { ბორბალი: "27.5\"", სიჩქარე: "21", ჩარჩო: "ალუმინი" } },
  { id: 14, name: "„სუფთა კოდი“ — წიგნი", category: "books", price: 49, oldPrice: null, rating: 4.9, emoji: "📘", colors: ["#dbeafe", "#bfdbfe"], seller: "BookNest", desc: "პროგრამისტის გზამკვლევი სუფთა და მარტივად მოსახმარი კოდის წერაში.", specs: { გვერდები: "464", ენა: "ქართული", ყდა: "რბილი" } },
  { id: 15, name: "რომანი „მოგზაური“", category: "books", price: 24, oldPrice: 30, rating: 4.3, emoji: "📖", colors: ["#fce7f3", "#fbcfe8"], seller: "BookNest", desc: "თანამედროვე ქართული პროზა.", specs: { გვერდები: "320", ენა: "ქართული", ყდა: "მაგარი" } },
  { id: 16, name: "კონსტრუქტორი 500 ელემენტი", category: "toys", price: 69, oldPrice: 85, rating: 4.8, emoji: "🧩", colors: ["#fef3c7", "#fcd34d"], seller: "KidsWorld", desc: "შემოქმედებითი თამაში 6+ წლის ბავშვებისთვის.", specs: { ელემენტები: "500", ასაკი: "6+", მასალა: "პლასტმასი" } },
  { id: 17, name: "რადიომართვადი მანქანა", category: "toys", price: 55, oldPrice: null, rating: 4.2, emoji: "🏎️", colors: ["#fee2e2", "#fca5a5"], seller: "KidsWorld", desc: "სწრაფი და გამძლე, 2.4 GHz პულტით.", specs: { სიჩქარე: "25 კმ/სთ", ბატარეა: "800 mAh", ასაკი: "8+" } }
];
