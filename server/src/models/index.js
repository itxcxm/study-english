// Các model cho từ vựng (Vocabulary)
import { Family } from "./Vocabulary/Family.js";
import { Relationships } from "./Vocabulary/Relationships.js";
import { Education } from "./Vocabulary/Education.js";
import { Jobs } from "./Vocabulary/Jobs.js";
import { Weather } from "./Vocabulary/Weather.js";
import { Time } from "./Vocabulary/Time.js";
import { DatesSeasons } from "./Vocabulary/DatesSeasons.js";
import { Colors } from "./Vocabulary/Colors.js";
import { Numbers } from "./Vocabulary/Numbers.js";
import { Animals } from "./Vocabulary/Animals.js";
import { FoodDrinks } from "./Vocabulary/FoodDrinks.js";
import { VegetablesFruits } from "./Vocabulary/VegetablesFruits.js";
import { Clothing } from "./Vocabulary/Clothing.js";
import { House } from "./Vocabulary/House.js";
import { SchoolSupplies } from "./Vocabulary/SchoolSupplies.js";
import { Transportation } from "./Vocabulary/Transportation.js";
import { Travel } from "./Vocabulary/Travel.js";
import { Health } from "./Vocabulary/Health.js";
import { Emotions } from "./Vocabulary/Emotions.js";
import { Technology } from "./Vocabulary/Technology.js";
import { Sports } from "./Vocabulary/Sports.js";
import { ArtMusic } from "./Vocabulary/ArtMusic.js";
import { Entertainment } from "./Vocabulary/Entertainment.js";
import { Nature } from "./Vocabulary/Nature.js";
import { PlantsFlowers } from "./Vocabulary/PlantsFlowers.js";
import { Places } from "./Vocabulary/Places.js";
import { ShoppingMoney } from "./Vocabulary/ShoppingMoney.js";
import { Festivals } from "./Vocabulary/Festivals.js";
import { Shapes } from "./Vocabulary/Shapes.js";
import { VerbsActions } from "./Vocabulary/VerbsActions.js";
import { VocabularyOther } from "./Vocabulary/OtherVocabulary.js";

// Các model cho ngữ pháp (Grammar)
import { Nouns } from "./Grammar/Nouns.js";
import { Pronouns } from "./Grammar/Pronouns.js";
import { Adjectives } from "./Grammar/Adjectives.js";
import { Adverbs } from "./Grammar/Adverbs.js";
import { Verbs } from "./Grammar/Verbs.js";
import { Prepositions } from "./Grammar/Prepositions.js";
import { Conjunctions } from "./Grammar/Conjunctions.js";
import { Articles } from "./Grammar/Articles.js";
import { Conditionals } from "./Grammar/Conditionals.js";
import { PassiveVoice } from "./Grammar/PassiveVoice.js";
import { ReportedSpeech } from "./Grammar/ReportedSpeech.js";
import { Questions } from "./Grammar/Questions.js";
import { Negation } from "./Grammar/Negation.js";
import { Comparisons } from "./Grammar/Comparisons.js";
import { Emphasis } from "./Grammar/Emphasis.js";
import { Subjunctive } from "./Grammar/Subjunctive.js";
import { RelativeClauses } from "./Grammar/RelativeClauses.js";
import { NounClauses } from "./Grammar/NounClauses.js";
import { AdverbialClauses } from "./Grammar/AdverbialClauses.js";
import { Inversion } from "./Grammar/Inversion.js";
import { CleftSentences } from "./Grammar/CleftSentences.js";
import { Existential } from "./Grammar/Existential.js";
import { UsedTo } from "./Grammar/UsedTo.js";
import { WishIfOnly } from "./Grammar/WishIfOnly.js";
import { GrammarOther } from "./Grammar/OtherVerbTenses.js";

// Các model cho thì động từ (VerbTenses)
import { PresentSimple } from "./VerbTenses/PresentSimple.js";
import { PresentContinuous } from "./VerbTenses/PresentContinuous.js";
import { PresentPerfect } from "./VerbTenses/PresentPerfect.js";
import { PresentPerfectContinuous } from "./VerbTenses/PresentPerfectContinuous.js";
import { PastSimple } from "./VerbTenses/PastSimple.js";
import { PastContinuous } from "./VerbTenses/PastContinuous.js";
import { PastPerfect } from "./VerbTenses/PastPerfect.js";
import { PastPerfectContinuous } from "./VerbTenses/PastPerfectContinuous.js";
import { FutureSimple } from "./VerbTenses/FutureSimple.js";
import { FutureContinuous } from "./VerbTenses/FutureContinuous.js";
import { FuturePerfect } from "./VerbTenses/FuturePerfect.js";
import { FuturePerfectContinuous } from "./VerbTenses/FuturePerfectContinuous.js";
import { VerbTensesOther } from "./VerbTenses/OtherVerbTenses.js";

// Xuất ra tất cả các model trong một object, key là tên model (phù hợp với tên topic)
export const models = {
  // Từ vựng
  Family,
  Relationships,
  Education,
  Jobs,
  Weather,
  Time,
  DatesSeasons,
  Colors,
  Numbers,
  Animals,
  FoodDrinks,
  VegetablesFruits,
  Clothing,
  House,
  SchoolSupplies,
  Transportation,
  Travel,
  Health,
  Emotions,
  Technology,
  Sports,
  ArtMusic,
  Entertainment,
  Nature,
  PlantsFlowers,
  Places,
  ShoppingMoney,
  Festivals,
  Shapes,
  VerbsActions,
  VocabularyOther,

  // Ngữ pháp
  Nouns,
  Pronouns,
  Adjectives,
  Adverbs,
  Verbs,
  Prepositions,
  Conjunctions,
  Articles,
  Conditionals,
  PassiveVoice,
  ReportedSpeech,
  Questions,
  Negation,
  Comparisons,
  Emphasis,
  Subjunctive,
  RelativeClauses,
  NounClauses,
  AdverbialClauses,
  Inversion,
  CleftSentences,
  Existential,
  UsedTo,
  WishIfOnly,
  GrammarOther,

  // Thì động từ
  PresentSimple,
  PresentContinuous,
  PresentPerfect,
  PresentPerfectContinuous,
  PastSimple,
  PastContinuous,
  PastPerfect,
  PastPerfectContinuous,
  FutureSimple,
  FutureContinuous,
  FuturePerfect,
  FuturePerfectContinuous,
  VerbTensesOther,
};

// Xuất ra danh sách tên các chủ đề (topics) có sẵn
export const availableTopics = Object.keys(models);
