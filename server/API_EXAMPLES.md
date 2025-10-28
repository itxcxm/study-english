# Review API Documentation

## Tổng quan

API để quản lý câu hỏi ôn tập (review questions) cho các chủ đề khác nhau.

## Base URL

```
http://localhost:3000/api/review
```

## Authentication

Tất cả các endpoint đều yêu cầu authentication token trong header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### 1. Lấy danh sách tất cả các topic có sẵn

**GET** `/api/review/topics`

**Response:**

```json
{
  "success": true,
  "topics": [
    "Family",
    "Relationships",
    "Education",
    "Jobs",
    "Weather",
    "Time",
    "DatesSeasons",
    "Colors",
    "Numbers",
    "Animals",
    "FoodDrinks",
    "VegetablesFruits",
    "Clothing",
    "House",
    "SchoolSupplies",
    "Transportation",
    "Travel",
    "Health",
    "Emotions",
    "Technology",
    "Sports",
    "ArtMusic",
    "Entertainment",
    "Nature",
    "PlantsFlowers",
    "Places",
    "ShoppingMoney",
    "Festivals",
    "Shapes",
    "VerbsActions",
    "VocabularyOther",
    "Nouns",
    "Pronouns",
    "Adjectives",
    "Adverbs",
    "Verbs",
    "Prepositions",
    "Conjunctions",
    "Articles",
    "Conditionals",
    "PassiveVoice",
    "ReportedSpeech",
    "Questions",
    "Negation",
    "Comparisons",
    "Emphasis",
    "Subjunctive",
    "RelativeClauses",
    "NounClauses",
    "AdverbialClauses",
    "Inversion",
    "CleftSentences",
    "Existential",
    "UsedTo",
    "WishIfOnly",
    "GrammarOther",
    "PresentSimple",
    "PresentContinuous",
    "PresentPerfect",
    "PresentPerfectContinuous",
    "PastSimple",
    "PastContinuous",
    "PastPerfect",
    "PastPerfectContinuous",
    "FutureSimple",
    "FutureContinuous",
    "FuturePerfect",
    "FuturePerfectContinuous",
    "VerbTensesOther"
  ]
}
```

---

### 2. Lấy 20 câu hỏi ngẫu nhiên từ một topic

**GET** `/api/review?topic={TopicName}`

**Query Parameters:**

- `topic` (required): Tên của topic, phải khớp chính xác với tên trong danh sách topics

**Example Request:**

```
GET /api/review?topic=Adjectives
GET /api/review?topic=PresentSimple
GET /api/review?topic=Family
```

**Success Response (200):**

```json
{
  "success": true,
  "topic": "Adjectives",
  "count": 20,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "question": "Choose the correct adjective: This is a ___ book.",
      "answers": ["good", "well", "better", "best"],
      "correctAnswer": 0,
      "explanation": "'Good' is the correct adjective to describe the noun 'book'.",
      "isActive": true,
      "createdAt": "2025-10-28T10:30:00.000Z",
      "updatedAt": "2025-10-28T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "question": "The weather is ___ today.",
      "answers": ["beauty", "beautiful", "beautifully", "beautify"],
      "correctAnswer": 1,
      "explanation": "'Beautiful' is an adjective that describes the weather.",
      "isActive": true,
      "createdAt": "2025-10-28T10:35:00.000Z",
      "updatedAt": "2025-10-28T10:35:00.000Z"
    }
    // ... 18 more questions
  ]
}
```

**Error Response (400 - Bad Request):**

```json
{
  "success": false,
  "message": "Tham số 'topic' là bắt buộc. Ví dụ: ?topic=Adjectives"
}
```

**Error Response (500 - Topic không tồn tại):**

```json
{
  "success": false,
  "message": "Topic \"InvalidTopic\" không tồn tại. Các topic có sẵn: Family, Relationships, Education, ..."
}
```

---

### 3. Thêm câu hỏi mới vào một topic

**POST** `/api/review`

**Request Body:**

```json
{
  "topic": "Adjectives",
  "question": "She is very ___ at math.",
  "answers": ["good", "well", "better", "best"],
  "correctAnswer": 0,
  "explanation": "We use 'good' as an adjective after the verb 'to be'. 'Well' is typically used as an adverb."
}
```

**Field Descriptions:**

- `topic` (string, required): Tên topic (phải khớp với tên model)
- `question` (string, required): Nội dung câu hỏi
- `answers` (array, required): Mảng các đáp án (2-6 phần tử)
- `correctAnswer` (number, required): Index của đáp án đúng (0-based, phải < answers.length)
- `explanation` (string, required): Giải thích đáp án

**Success Response (201 - Created):**

```json
{
  "success": true,
  "message": "Thêm câu hỏi thành công",
  "topic": "Adjectives",
  "data": {
    "_id": "507f1f77bcf86cd799439999",
    "question": "She is very ___ at math.",
    "answers": ["good", "well", "better", "best"],
    "correctAnswer": 0,
    "explanation": "We use 'good' as an adjective after the verb 'to be'. 'Well' is typically used as an adverb.",
    "isActive": true,
    "createdAt": "2025-10-28T12:00:00.000Z",
    "updatedAt": "2025-10-28T12:00:00.000Z"
  }
}
```

**Error Response (400 - Missing Fields):**

```json
{
  "success": false,
  "message": "Thiếu thông tin bắt buộc: question, answers, correctAnswer, explanation"
}
```

**Error Response (400 - Invalid Answers):**

```json
{
  "success": false,
  "message": "Answers phải là mảng chứa từ 2 đến 6 đáp án"
}
```

**Error Response (400 - Invalid correctAnswer):**

```json
{
  "success": false,
  "message": "correctAnswer phải nằm trong khoảng 0 đến 3"
}
```

**Error Response (500 - Topic không tồn tại):**

```json
{
  "success": false,
  "message": "Topic \"InvalidTopic\" không tồn tại. Các topic có sẵn: Family, Relationships, ..."
}
```

---

## Examples với cURL

### 1. Lấy danh sách topics

```bash
curl -X GET "http://localhost:3000/api/review/topics" \
  -H "Authorization: Bearer your-jwt-token"
```

### 2. Lấy 20 câu hỏi từ topic Adjectives

```bash
curl -X GET "http://localhost:3000/api/review?topic=Adjectives" \
  -H "Authorization: Bearer your-jwt-token"
```

### 3. Thêm câu hỏi mới vào topic Family

```bash
curl -X POST "http://localhost:3000/api/review" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Family",
    "question": "What do you call your mother'\''s sister?",
    "answers": ["aunt", "uncle", "cousin", "niece"],
    "correctAnswer": 0,
    "explanation": "Your mother'\''s sister is called an aunt."
  }'
```

---

## Examples với JavaScript (fetch)

### 1. Lấy danh sách topics

```javascript
const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/review/topics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${yourToken}`,
      },
    });

    const data = await response.json();
    console.log("Available topics:", data.topics);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 2. Lấy 20 câu hỏi ngẫu nhiên

```javascript
const getQuestions = async (topic) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/review?topic=${topic}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${yourToken}`,
        },
      }
    );

    const data = await response.json();
    console.log(`${data.count} questions from ${data.topic}:`, data.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Sử dụng
getQuestions("Adjectives");
```

### 3. Thêm câu hỏi mới

```javascript
const addQuestion = async (questionData) => {
  try {
    const response = await fetch("http://localhost:3000/api/review", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${yourToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: "PresentSimple",
        question: "She ___ to school every day.",
        answers: ["go", "goes", "going", "gone"],
        correctAnswer: 1,
        explanation:
          "In Present Simple with third person singular (she), we add -s or -es to the verb.",
      }),
    });

    const data = await response.json();
    console.log("Question added:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Validation Rules

### Answers Array

- Phải là một mảng (array)
- Chứa từ **2 đến 6** phần tử
- Mỗi phần tử là một chuỗi (string)

### correctAnswer

- Phải là một số nguyên (integer)
- Giá trị phải >= 0
- Giá trị phải < độ dài của mảng answers
- Ví dụ: Nếu answers có 4 phần tử, correctAnswer phải từ 0-3

### Question & Explanation

- Phải là chuỗi không rỗng
- Sẽ được trim (loại bỏ khoảng trắng đầu cuối)

### Topic

- Phải khớp chính xác với tên model
- Case-sensitive (phân biệt chữ hoa/thường)
- Ví dụ: "Adjectives" ✓, "adjectives" ✗, "ADJECTIVES" ✗

---

## Categories

### Vocabulary (Từ vựng)

Family, Relationships, Education, Jobs, Weather, Time, DatesSeasons, Colors, Numbers, Animals, FoodDrinks, VegetablesFruits, Clothing, House, SchoolSupplies, Transportation, Travel, Health, Emotions, Technology, Sports, ArtMusic, Entertainment, Nature, PlantsFlowers, Places, ShoppingMoney, Festivals, Shapes, VerbsActions, VocabularyOther

### Grammar (Ngữ pháp)

Nouns, Pronouns, Adjectives, Adverbs, Verbs, Prepositions, Conjunctions, Articles, Conditionals, PassiveVoice, ReportedSpeech, Questions, Negation, Comparisons, Emphasis, Subjunctive, RelativeClauses, NounClauses, AdverbialClauses, Inversion, CleftSentences, Existential, UsedTo, WishIfOnly, GrammarOther

### VerbTenses (Thì động từ)

PresentSimple, PresentContinuous, PresentPerfect, PresentPerfectContinuous, PastSimple, PastContinuous, PastPerfect, PastPerfectContinuous, FutureSimple, FutureContinuous, FuturePerfect, FuturePerfectContinuous, VerbTensesOther

---

## Notes

1. **Random Selection**: Mỗi lần gọi GET endpoint sẽ trả về 20 câu hỏi ngẫu nhiên khác nhau (nếu có đủ).

2. **Active Questions Only**: Chỉ những câu hỏi có `isActive: true` mới được trả về.

3. **Auto-Generated Fields**: Khi thêm câu hỏi mới, các field sau sẽ tự động được tạo:

   - `_id`: MongoDB ObjectId
   - `isActive`: true (mặc định)
   - `createdAt`: Timestamp khi tạo
   - `updatedAt`: Timestamp khi cập nhật

4. **Topic Names**: Topic name phải khớp chính xác với tên file model. Sử dụng endpoint `/api/review/topics` để xem danh sách chính xác.
