# Review API Documentation

## Overview

API for managing review questions across different topics.

## Base URL

```
http://localhost:4000/api/review
```

## Authentication

All endpoints require authentication. The server uses HTTP-only cookies for authentication:

- **Access Token**: Stored in `accessToken` cookie (expires in 15 minutes)
- **Refresh Token**: Stored in `refreshToken` cookie (expires in 7 days)

Cookies are automatically sent with requests when using `withCredentials: true` in axios or fetch.

**Note**: If using tools like cURL or Postman, you'll need to handle cookies manually. For browser-based requests, cookies are handled automatically.

---

## Endpoints

### 1. Get All Available Topics

**GET** `/api/review/topics`

**Authentication**: Required (Admin only)

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

### 2. Get 20 Random Questions from a Topic

**GET** `/api/review?topic={TopicName}`

**Authentication**: Required

**Query Parameters:**

- `topic` (required): Topic name, must match exactly with topic names from the list

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

### 3. Add New Question to a Topic

**POST** `/api/review`

**Authentication**: Required (Admin only)

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

### 4. Update Question

**PUT** `/api/review/:id`

**Authentication**: Required (Admin only)

**URL Parameters:**

- `id` (required): Question ID

**Request Body:**

```json
{
  "topic": "Adjectives",
  "question": "She is very ___ at math.",
  "answers": ["good", "well", "better", "best"],
  "correctAnswer": 0,
  "explanation": "We use 'good' as an adjective after the verb 'to be'. 'Well' is typically used as an adverb.",
  "difficulty": "medium"
}
```

**Success Response (200 - OK):**

```json
{
  "success": true,
  "message": "Cập nhật câu hỏi thành công",
  "topic": "Adjectives",
  "data": {
    "_id": "507f1f77bcf86cd799439999",
    "question": "She is very ___ at math.",
    "answers": ["good", "well", "better", "best"],
    "correctAnswer": 0,
    "explanation": "We use 'good' as an adjective after the verb 'to be'. 'Well' is typically used as an adverb.",
    "isActive": true,
    "createdAt": "2025-10-28T12:00:00.000Z",
    "updatedAt": "2025-10-28T12:30:00.000Z"
  }
}
```

---

### 5. Delete Question

**DELETE** `/api/review/:id?topic={TopicName}`

**Authentication**: Required (Admin only)

**URL Parameters:**

- `id` (required): Question ID

**Query Parameters:**

- `topic` (required): Topic name (required to identify which model to use)

**Success Response (200 - OK):**

```json
{
  "success": true,
  "message": "Xóa câu hỏi thành công",
  "topic": "Adjectives",
  "data": {
    "_id": "507f1f77bcf86cd799439999",
    "isActive": false
  }
}
```

**Note**: Questions are soft-deleted (marked as `isActive: false`) rather than permanently removed from the database.

---

### 6. Get Question Count

**GET** `/api/review/quantity?topic={TopicName}`

**Authentication**: Required

**Query Parameters:**

- `topic` (required): Topic name

**Success Response (200 - OK):**

```json
{
  "success": true,
  "topic": "Adjectives",
  "count": 150
}
```

---

## Examples với cURL

### 1. Get Topics List

**Note**: For cookie-based authentication, you need to store and send cookies. First login to get cookies:

```bash
# Login first to get cookies
curl -X POST "http://localhost:4000/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}' \
  -c cookies.txt

# Get topics (using stored cookies)
curl -X GET "http://localhost:4000/api/review/topics" \
  -b cookies.txt
```

### 2. Get 20 Questions from Topic Adjectives

```bash
curl -X GET "http://localhost:4000/api/review?topic=Adjectives" \
  -b cookies.txt
```

### 3. Add New Question to Topic Family

```bash
curl -X POST "http://localhost:4000/api/review" \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Family",
    "question": "What do you call your mother'\''s sister?",
    "answers": ["aunt", "uncle", "cousin", "niece"],
    "correctAnswer": 0,
    "explanation": "Your mother'\''s sister is called an aunt."
  }'
```

### 4. Update Question

```bash
curl -X PUT "http://localhost:4000/api/review/507f1f77bcf86cd799439999" \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Adjectives",
    "question": "She is very ___ at math.",
    "answers": ["good", "well", "better", "best"],
    "correctAnswer": 0,
    "explanation": "We use '\''good'\'' as an adjective after the verb '\''to be'\''."
  }'
```

### 5. Delete Question

```bash
curl -X DELETE "http://localhost:4000/api/review/507f1f77bcf86cd799439999?topic=Adjectives" \
  -b cookies.txt
```

### 6. Get Question Count

```bash
curl -X GET "http://localhost:4000/api/review/quantity?topic=Adjectives" \
  -b cookies.txt
```

---

## Examples with JavaScript (fetch)

### 1. Get Topics List

```javascript
const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/review/topics", {
      method: "GET",
      credentials: "include", // Important: sends cookies automatically
    });

    const data = await response.json();
    console.log("Available topics:", data.topics);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 2. Get 20 Random Questions

```javascript
const getQuestions = async (topic) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/review?topic=${topic}`,
      {
        method: "GET",
        credentials: "include", // Important: sends cookies automatically
      }
    );

    const data = await response.json();
    console.log(`${data.count} questions from ${data.topic}:`, data.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Usage
getQuestions("Adjectives");
```

### 3. Add New Question

```javascript
const addQuestion = async (questionData) => {
  try {
    const response = await fetch("http://localhost:4000/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important: sends cookies automatically
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

### 4. Update Question

```javascript
const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/review/${questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: sends cookies automatically
        body: JSON.stringify(questionData),
      }
    );

    const data = await response.json();
    console.log("Question updated:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 5. Delete Question

```javascript
const deleteQuestion = async (questionId, topic) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/review/${questionId}?topic=${topic}`,
      {
        method: "DELETE",
        credentials: "include", // Important: sends cookies automatically
      }
    );

    const data = await response.json();
    console.log("Question deleted:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 6. Get Question Count

```javascript
const getQuestionCount = async (topic) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/review/quantity?topic=${topic}`,
      {
        method: "GET",
        credentials: "include", // Important: sends cookies automatically
      }
    );

    const data = await response.json();
    console.log(`Topic "${data.topic}" has ${data.count} questions`);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Validation Rules

### Answers Array

- Must be an array
- Must contain between **2 and 6** elements
- Each element must be a string

### correctAnswer

- Must be an integer
- Value must be >= 0
- Value must be < the length of the answers array
- Example: If answers has 4 elements, correctAnswer must be 0-3

### Question & Explanation

- Must be non-empty strings
- Will be trimmed (whitespace removed from start/end)

### Topic

- Must match exactly with the model name
- Case-sensitive (distinguishes uppercase/lowercase)
- Example: "Adjectives" ✓, "adjectives" ✗, "ADJECTIVES" ✗

### Difficulty (Optional)

- Valid values: "easy", "medium", "hard"
- Can be omitted when creating/updating questions

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

1. **Random Selection**: Each GET request returns 20 random questions (or fewer if not enough available).

2. **Active Questions Only**: Only questions with `isActive: true` are returned.

3. **Auto-Generated Fields**: When adding a new question, these fields are automatically created:

   - `_id`: MongoDB ObjectId
   - `isActive`: true (default)
   - `createdAt`: Creation timestamp
   - `updatedAt`: Update timestamp

4. **Topic Names**: Topic name must match exactly with the model file name. Use the `/api/review/topics` endpoint to get the exact list of available topics.

5. **Cookie-Based Authentication**: The API uses HTTP-only cookies for authentication. Make sure to include `credentials: "include"` in fetch requests or `withCredentials: true` in axios configuration.

6. **Soft Delete**: DELETE endpoint marks questions as inactive (`isActive: false`) rather than permanently deleting them from the database.
