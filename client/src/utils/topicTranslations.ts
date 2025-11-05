/**
 * 🇻🇳 Bản đồ dịch các tên chủ đề từ tiếng Anh sang tiếng Việt
 * 🇻🇳 Sử dụng để hiển thị tên chủ đề bằng tiếng Việt cho người dùng
 */
export const topicTranslations: Record<string, string> = {
  // Các thì động từ (Verb Tenses)
  'PresentSimple': 'Hiện tại đơn',
  'PresentContinuous': 'Hiện tại tiếp diễn',
  'PresentPerfect': 'Hiện tại hoàn thành',
  'PresentPerfectContinuous': 'Hiện tại hoàn thành tiếp diễn',
  'PastSimple': 'Quá khứ đơn',
  'PastContinuous': 'Quá khứ tiếp diễn',
  'PastPerfect': 'Quá khứ hoàn thành',
  'PastPerfectContinuous': 'Quá khứ hoàn thành tiếp diễn',
  'FutureSimple': 'Tương lai đơn',
  'FutureContinuous': 'Tương lai tiếp diễn',
  'FuturePerfect': 'Tương lai hoàn thành',
  'FuturePerfectContinuous': 'Tương lai hoàn thành tiếp diễn',
  'OtherVerbTenses': 'Các thì động từ khác',
  
  // Ngữ pháp (Grammar)
  'Articles': 'Mạo từ',
  'Nouns': 'Danh từ',
  'Pronouns': 'Đại từ',
  'Adjectives': 'Tính từ',
  'Adverbs': 'Trạng từ',
  'Verbs': 'Động từ',
  'Prepositions': 'Giới từ',
  'Conjunctions': 'Liên từ',
  'Conditionals': 'Câu điều kiện',
  'PassiveVoice': 'Bị động',
  'ReportedSpeech': 'Câu tường thuật',
  'RelativeClauses': 'Mệnh đề quan hệ',
  'NounClauses': 'Mệnh đề danh từ',
  'AdverbialClauses': 'Mệnh đề trạng ngữ',
  'CleftSentences': 'Câu chẻ',
  'Comparisons': 'So sánh',
  'Emphasis': 'Nhấn mạnh',
  'Existential': 'Tồn tại',
  'Inversion': 'Đảo ngữ',
  'Negation': 'Phủ định',
  'Questions': 'Câu hỏi',
  'Subjunctive': 'Giả định',
  'UsedTo': 'Used to',
  'WishIfOnly': 'Wish/If only',
  
  // Chủ đề từ vựng (Vocabulary Topics)
  'Animals': 'Động vật',
  'Colors': 'Màu sắc',
  'Jobs': 'Nghề nghiệp',
  'Relationships': 'Quan hệ',
  'Time': 'Thời gian',
  'Weather': 'Thời tiết',
  'DatesSeasons': 'Ngày tháng & Mùa',
  'House': 'Nhà cửa',
  'Transportation': 'Phương tiện giao thông',
  'SchoolSupplies': 'Đồ dùng học tập',
  'Clothing': 'Quần áo',
  'Education': 'Giáo dục',
  'Emotions': 'Cảm xúc',
  'FoodDrinks': 'Thức ăn & Đồ uống',
  'Health': 'Sức khỏe',
  'Numbers': 'Số đếm',
  'Sports': 'Thể thao',
  'ArtMusic': 'Nghệ thuật & Âm nhạc',
  'VegetablesFruits': 'Rau củ & Trái cây',
  'Entertainment': 'Giải trí',
  'Technology': 'Công nghệ',
  'Festivals': 'Lễ hội',
  'Nature': 'Thiên nhiên',
  'OtherVocabulary': 'Từ vựng khác',
  'Places': 'Địa điểm',
  'ShoppingMoney': 'Mua sắm & Tiền bạc',
  'Travel': 'Du lịch',
  'Shapes': 'Hình dạng',
  'Family': 'Gia đình',
  'PlantsFlowers': 'Cây cối & Hoa',
  'VerbsActions': 'Động từ & Hành động',
};

/**
 * 🇻🇳 Hàm chuyển chủ đề từ dạng URL (kebab-case) sang dạng PascalCase theo server
 * 🇻🇳 Đảm bảo tên chủ đề khớp với format được sử dụng trong backend
 * @param topic - Tên chủ đề ở dạng kebab-case hoặc snake_case
 * @returns Tên chủ đề đã được chuẩn hóa sang PascalCase
 */
export function normalizeTopicKey(topic: string): string {
  if (!topic) return topic;

  // 🇻🇳 Hàm helper: Chuyển từ kebab-case/snake_case sang PascalCase
  const toPascal = (s: string) =>
    s
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");

  // 🇻🇳 Đối chiếu các trường hợp đặc biệt cho tên ghép (các từ có dấu gạch ngang)
  const specialCases: Record<string, string> = {
    "dates-seasons": "DatesSeasons",
    "food-drinks": "FoodDrinks",
    "vegetables-fruits": "VegetablesFruits",
    "school-supplies": "SchoolSupplies",
    "passive-voice": "PassiveVoice",
    "reported-speech": "ReportedSpeech",
    "relative-clauses": "RelativeClauses",
    "noun-clauses": "NounClauses",
    "adverbial-clauses": "AdverbialClauses",
    "cleft-sentences": "CleftSentences",
    "used-to": "UsedTo",
    "wish-if-only": "WishIfOnly",
    "present-simple": "PresentSimple",
    "present-continuous": "PresentContinuous",
    "present-perfect": "PresentPerfect",
    "present-perfect-continuous": "PresentPerfectContinuous",
    "past-simple": "PastSimple",
    "past-continuous": "PastContinuous",
    "past-perfect": "PastPerfect",
    "past-perfect-continuous": "PastPerfectContinuous",
    "future-simple": "FutureSimple",
    "future-continuous": "FutureContinuous",
    "future-perfect": "FuturePerfect",
    "future-perfect-continuous": "FuturePerfectContinuous",
    "other-verbenses": "OtherVerbTenses",
    "otherverbenses": "OtherVerbTenses",
    "other-vocabulary": "OtherVocabulary",
    "other-grammar": "OtherGrammar",
    "plants-flowers": "PlantsFlowers",
    "shopping-money": "ShoppingMoney",
    "art-music": "ArtMusic",
    "verbs-actions": "VerbsActions",
  };

  // 🇻🇳 Ưu tiên kiểm tra trường hợp đặc biệt trước
  if (specialCases[topic.toLowerCase()]) {
    return specialCases[topic.toLowerCase()];
  }

  // 🇻🇳 Kiểm tra khớp trực tiếp (đã là PascalCase)
  if (topicTranslations[topic]) return topic;

  // 🇻🇳 Chuyển sang PascalCase và kiểm tra lại
  const pascalKey = toPascal(topic);
  if (topicTranslations[pascalKey]) return pascalKey;

  // 🇻🇳 Không khớp thì trả lại phiên bản PascalCase
  return pascalKey || topic;
}

/**
 * 🇻🇳 Hàm dịch tên chủ đề sang tiếng Việt
 * 🇻🇳 Hỗ trợ nhiều định dạng đầu vào (PascalCase, kebab-case, snake_case, v.v.)
 * @param topic - Tên chủ đề cần dịch (có thể ở nhiều định dạng khác nhau)
 * @returns Tên chủ đề đã được dịch sang tiếng Việt, hoặc trả về nguyên bản nếu không tìm thấy
 */
export function translateTopic(topic: string): string {
  if (!topic) return topic;

  // 🇻🇳 1) So khớp trực tiếp với key trong bản đồ dịch
  if (topicTranslations[topic]) return topicTranslations[topic];

  // 🇻🇳 2) So khớp không phân biệt hoa thường với key
  const directKey = Object.keys(topicTranslations).find(
    (k) => k.toLowerCase() === topic.toLowerCase()
  );
  if (directKey) return topicTranslations[directKey];

  // 🇻🇳 3) Chuẩn hoá các trường hợp chủ đề thường gặp từ URL sang PascalCase trong map
  const toPascal = (s: string) =>
    s
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");

  const pascalKey = toPascal(topic);
  if (topicTranslations[pascalKey]) return topicTranslations[pascalKey];

  // 🇻🇳 4) Thử loại bỏ dấu phân cách và viết hoa chữ cái đầu, kiểm tra lại
  const compact = topic.replace(/[-_\s]+/g, "");
  const compactPascal = compact.charAt(0).toUpperCase() + compact.slice(1);
  if (topicTranslations[compactPascal]) return topicTranslations[compactPascal];

  // 🇻🇳 5) Không tìm thấy: trả về nguyên bản
  return topic;
}

